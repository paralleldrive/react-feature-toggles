'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _createRouteMiddleware = require('../create-route-middleware');

var _createFeatures = require('../test-fixtures/create-features');

var _riteway = require('riteway');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            }
          );
        }
      }
      return step('next');
    });
  };
}

(0, _riteway.describe)(
  'createRouteMiddleware()',
  (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(should) {
        var _should,
          assert,
          app,
          features,
          handler,
          path,
          _app,
          _features,
          _handler,
          _path,
          _app2,
          _features2,
          _handler2,
          _path2,
          _app3,
          _features3,
          _handler3,
          _path3,
          _app4,
          _features4,
          _path4,
          _handler4,
          _app5,
          _features5,
          _handler5,
          _path5,
          _app6,
          _features6,
          _handler6,
          _path6;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (_should = should()), (assert = _should.assert);
                  app = (0, _express2.default)();
                  features = (0, _createFeatures.createFeatures)();
                  handler = (0, _createRouteMiddleware.createRouteMiddleware)(
                    features,
                    {
                      requiredFeature: 'posts',
                      get: function get(req, res) {
                        res.send();
                      }
                    }
                  );
                  path = '/posts';

                  app.use(path, handler);

                  (0, _supertest2.default)(app)
                    .get(path)
                    .end(function(err, res) {
                      assert({
                        given: 'a feature that is enabled',
                        should: 'set the correct response status code',
                        actual: res.statusCode,
                        expected: 200
                      });
                    });
                  _app = (0, _express2.default)();
                  _features = (0, _createFeatures.createFeatures)();
                  _handler = (0, _createRouteMiddleware.createRouteMiddleware)(
                    _features,
                    {
                      requiredFeature: 'help',
                      get: function get(req, res) {
                        res.send();
                      }
                    }
                  );
                  _path = '/posts';

                  _app.use(_path, _handler);

                  (0, _supertest2.default)(_app)
                    .get(_path)
                    .end(function(err, res) {
                      assert({
                        given: 'a feature that is disabled',
                        should: 'set the correct response status code',
                        actual: res.statusCode,
                        expected: 404
                      });
                    });
                  _app2 = (0, _express2.default)();
                  _features2 = (0, _createFeatures.createFeatures)();
                  _handler2 = (0, _createRouteMiddleware.createRouteMiddleware)(
                    _features2,
                    {
                      requiredFeature: 'help',
                      get: function get(req, res) {
                        res.send();
                      }
                    }
                  );
                  _path2 = '/posts';

                  _app2.use(_path2, _handler2);

                  (0, _supertest2.default)(_app2)
                    .get(_path2 + '?ft=posts')
                    .end(function(err, res) {
                      assert({
                        given:
                          'the path has param override that is not relevant to the given disabled feature',
                        should: 'set the correct response status code',
                        actual: res.statusCode,
                        expected: 404
                      });
                    });
                  _app3 = (0, _express2.default)();
                  _features3 = (0, _createFeatures.createFeatures)();
                  _handler3 = (0, _createRouteMiddleware.createRouteMiddleware)(
                    _features3,
                    {
                      requiredFeature: 'help',
                      get: function get(req, res) {
                        res.send();
                      }
                    }
                  );
                  _path3 = '/posts';

                  _app3.use(_path3, _handler3);

                  (0, _supertest2.default)(_app3)
                    .get(_path3 + '?ft=help')
                    .end(function(err, res) {
                      assert({
                        given:
                          'the path has param override that enables a disabled feature',
                        should: 'set the correct response status code',
                        actual: res.statusCode,
                        expected: 200
                      });
                    });
                  _app4 = (0, _express2.default)();
                  _features4 = (0, _createFeatures.createFeatures)();
                  _path4 = '/posts';
                  _handler4 = (0, _createRouteMiddleware.createRouteMiddleware)(
                    _features4,
                    {
                      requiredFeature: 'posts',
                      get: function get(req, res) {
                        // Simulate async handler delay
                        // This allows subsequent express methods to be called that could possibly
                        // cause errors or change the response status if the `next` callback is not
                        // used correctly.
                        setTimeout(function() {
                          return res.send();
                        }, 3000);
                      }
                    }
                  );

                  _app4.use(_path4, _handler4);
                  _app4.get('*', function(req, res) {
                    res.status(404);
                    res.send();
                  });

                  (0, _supertest2.default)(_app4)
                    .get(_path4)
                    .end(function(err, res) {
                      if (err) throw err;
                      assert({
                        given: 'given subsequent handlers',
                        should:
                          'not effect the correct handler response status',
                        actual: res.statusCode,
                        expected: 200
                      });
                    });
                  _app5 = (0, _express2.default)();
                  _features5 = (0, _createFeatures.createFeatures)();
                  _handler5 = (0, _createRouteMiddleware.createRouteMiddleware)(
                    _features5,
                    {
                      requiredFeature: 'posts',
                      post: function post(req, res) {
                        res.send();
                      }
                    }
                  );
                  _path5 = '/posts';

                  _app5.use(_path5, _handler5);

                  (0, _supertest2.default)(_app5)
                    .post(_path5)
                    .end(function(err, res) {
                      assert({
                        given: 'a post method',
                        should: 'should use the post method',
                        actual: res.statusCode,
                        expected: 200
                      });
                    });
                  _app6 = (0, _express2.default)();
                  _features6 = (0, _createFeatures.createFeatures)();
                  _handler6 = (0, _createRouteMiddleware.createRouteMiddleware)(
                    _features6,
                    {
                      requiredFeature: 'posts',
                      put: function put(req, res) {
                        res.send();
                      }
                    }
                  );
                  _path6 = '/posts';

                  _app6.use(_path6, _handler6);

                  (0, _supertest2.default)(_app6)
                    .put(_path6)
                    .end(function(err, res) {
                      assert({
                        given: 'a put method',
                        should: 'should use the put method',
                        actual: res.statusCode,
                        expected: 200
                      });
                    });

                case 44:
                case 'end':
                  return _context.stop();
              }
            }
          },
          _callee,
          undefined
        );
      })
    );

    return function(_x) {
      return _ref.apply(this, arguments);
    };
  })()
);
