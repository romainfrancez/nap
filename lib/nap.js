// Copyright (c) 2014 Romain Francez and other nap contributors.
//
// This file is part of nap.
//
// nap is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3 of the License.
//
// nap is distributed in the hope that it will be useful,
// but WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
// NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE. See the GNU General Public License
// for more details.
//
// You should have received a copy of the GNU General Public License
// along with nap. If not, see <http://www.gnu.org/licenses/gpl-3.0.txt>.

/**
 * @file Wrapper to
 * @author Romain Francez
 *   {@link https://github.com/romainfrancez|@romainfrancez}
 */
(function () {
  'use strict';

  var
    readline = require('readline'),
    Application = require('./Application.js'),
    Manifest = require('./Manifest.js'),

    application = new Application(),
    ask,
    date,
    manifest = new Manifest(),
    rl,
    tmp = '',
    vars = application.toConfig();

    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    if (vars.name === '') {
      aks.name = '';
    }
    if (vars.version = '') {
      ask.version = '';
    }
    if (vars)
    ask.user = '';
    ask.group = '';
    
    rl.question("What do you think of node.js? ", function(answer) {
      // TODO: Log the answer in a database
      console.log("Thank you for your valuable feedback:", answer);

      rl.close();
    });
    
    date = new Date();
    vars.date = '' + date.getUTCFullYear();

    tmp = date.getUTCMonth() + 1;
    if (tmp < 10) {
      tmp = '0' + tmp;
    }
    vars.date += tmp;

    tmp = date.getUTCDate();
    if (tmp < 10) {
      tmp = '0' + tmp;
    }
    vars.date += tmp;

    tmp = date.getUTCHours();
    if (tmp < 10) {
      tmp = '0' + tmp;
    }
    vars.date += tmp;

    tmp = date.getUTCMinutes();
    if (tmp < 10) {
      tmp = '0' + tmp;
    }
    vars.date += tmp;

    tmp = date.getUTCSeconds();
    if (tmp < 10) {
      tmp = '0' + tmp;
    }
    vars.date += tmp;


    manifest.vars = vars;
    manifest.write(application.getDirectory());
}());