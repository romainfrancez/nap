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
 * @file Represents a node.js application
 * @author Romain Francez
 *   {@link https://github.com/romainfrancez|@romainfrancez}
 */
(function () {
  'use strict';

  var
    fs = require('fs'),
    path = require('path'),

    Application,
    
    getInfoKey;

  /**
   * Given a list of keys, the function
   * will attempt to retrieve the value
   * matching the key chain
   * @this Application
   * @param {...String}
   * @returns {*}
   * @example getInfoKey('a'); // info.a, if a exists, null otherwise
   * @example getInfoKey('a', 'b', 'c'); // info.a.b.c if a, b and c exists
   */
  getInfoKey = function () {
    var
      i = 0,
      info = this.getInfo(),
      l = arguments.length;

    while (i < l) {
      if (typeof info !== 'object' || info === null) {
        return null;
      }
      info = info[arguments[i]];
      i += 1;
    }

    return info;
  };

  /**
   * Creates a new application
   * @constructor
   * @param {String} [directory = process.cwd()] The application directory
   */
  Application = function (directory) {
    if (this === undefined) {
      return new Application(directory);
    }
    directory = directory || process.cwd();
    this.directory = path.normalize(directory);
  };

  /**
   * Gets the application directory
   * @returns {String} The application directory
   */
  Application.prototype.getDirectory = function () {
    return this.directory;
  };

  /**
   * Gets the application info object from the package.json
   * @returns {Object} The application info
   */
  Application.prototype.getInfo = function () {
    var
      info;

    try {
      info = JSON.parse(fs.readFileSync(this.getDirectory() + '/package.json',
        'utf8'));
    } catch (e) {
      info = {};
    }

    this.getInfo = function () {
      return info;
    };
    return info;
  };

  /**
   * Gets the application name
   * @returns {String} The application name
   */
  Application.prototype.getName = function () {
    return getInfoKey.apply(this, ['name']);
  };

  /**
   * Gets the application description
   * @returns {String} The application description
   */
  Application.prototype.getDescription = function () {
    return getInfoKey.apply(this, ['description']);
  };

  /**
   * Gets the application version
   * @returns {String} The application version
   */
  Application.prototype.getVersion = function () {
    return getInfoKey.apply(this, ['version']);
  };

  /**
   * Gets the application start script
   * @returns {String} The application start script
   */
  Application.prototype.getStartScript = function () {
    return getInfoKey.apply(this, ['script', 'start']);
  };

  /**
   * Gets the application server port
   * @returns {String} The application server port
   */
  Application.prototype.getPortConfig = function () {
    return getInfoKey.apply(this, ['config', 'port']);
  };

  module.exports = Application;
}());