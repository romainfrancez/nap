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
    Application = require('../lib/Application.js');

  describe('Application', function () {
    var
      app,
      capitalise,
      createApp,
      directory = __dirname + '/../test/fakeApp',
      path = require('path'),
      testKey;

    capitalise = function (name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    createApp = function (directory) {
      return new Application(directory);
    };

    testKey = function (key, value) {
      var
        capitalisedKey = '',
        hierarchy,
        i = 0,
        info = {},
        keys = key.split('.'),
        l = keys.length - 1;

      hierarchy = info;
      while (i < l) {
        key = keys[i];
        hierarchy[key] = {};
        hierarchy = hierarchy[key];
        capitalisedKey = capitalise(key) + capitalisedKey;
        i += 1;
      }

      key = keys[i];
      hierarchy[key] = value;
      capitalisedKey = capitalise(key) + capitalisedKey;

      app.getInfo = function () {
        return info;
      };

      expect(app['get' + capitalisedKey]()).toBe(value);
    };

    beforeEach(function () {
      app = createApp(directory);
    });

    it('should read the current directory as its directory', function () {
      expect(createApp().getDirectory()).toBe(path.normalize(process.cwd()));
    });
    
    it('should read a custom directory as its directory', function () {
      expect(app.getDirectory()).toBe(path.normalize(directory));
    });

    it('should read the package.json', function () {
      expect(app.getInfo()).toEqual({});
    });

    it('should get the name of the app', function () {
      testKey('name', 'fakeApp');
    });

    it('should get the description of the app', function () {
      testKey('description', 'This is a fake test app');
    });

    it('should get the version of the app', function () {
      testKey('version', '0.1.0');
    });

    it('should get the start script', function () {
      testKey('script.start', 'node server.js');
    });

    it('should get the app server port', function () {
      testKey('config.port', 8080);
    });
  });
}());