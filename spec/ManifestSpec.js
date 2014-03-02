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

(function () {
  'use strict';

  var
    Manifest = require('../lib/Manifest.js');

  describe('Manifest', function () {
    var createManifest;

    createManifest = function () {
      var
        manifest = new Manifest(),
        vars = {};

      vars.name = 'nap';
      vars.version = '0.1.0';
      vars.date = new Date();
      vars.directory = __dirname;
      vars.user = 'nap';
      vars.group = 'apps';
      vars.startScript = 'npm start';
      vars.description = '';

      manifest.vars = vars;

      return manifest;
    };

    it('should get the manifest template', function () {
      var manifest = createManifest();
      expect(manifest.getTemplate()).toEqual(jasmine.any(String));
    });

    it('should render the filename', function () {
      var manifest = createManifest();
      expect(manifest.renderFilename()).toEqual('nap-manifest.xml');
    });

    it('should render the manifest', function () {
      var
        manifest = createManifest(),
        vars = manifest.vars;

      manifest.getTemplate = function () {
        return '{{name}}{{version}}{{date}}{{directory}}{{user}}{{group}}' +
          '{{startScript}}{{description}}';
      };

      expect(manifest.render()).toEqual(vars.name + vars.version +
        vars.date + vars.directory.replace(/\//g, '&#x2F;') + vars.user +
        vars.group + vars.startScript + vars.description);
    });

    it('should write the manifest to disk', function () {
      var
        fs = require('fs'),
        manifest = createManifest();

      manifest.write('/tmp/');

      expect(fs.existsSync('/tmp/nap-manifest.xml')).toEqual(true);
    });
  });
}());