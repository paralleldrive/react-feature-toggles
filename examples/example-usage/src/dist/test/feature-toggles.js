'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _riteway = require('riteway');

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _featureToggles = require('../feature-toggles');

var _context2 = require('../context');

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

var render = _server2.default.renderToStaticMarkup;

(0, _riteway.describe)(
  'FeatureToggles()',
  (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(should) {
        var _should, assert, $, _$, features, _$2;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (_should = should()), (assert = _should.assert);
                  $ = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _featureToggles.FeatureToggles,
                        null,
                        _react2.default.createElement(
                          _context2.Consumer,
                          null,
                          function(features) {
                            return _react2.default.createElement(
                              'div',
                              { className: 'features' },
                              features.toString()
                            );
                          }
                        )
                      )
                    )
                  );

                  assert({
                    given: 'no features prop',
                    should:
                      'it should provide an empty array of features via context',
                    actual: $('.features').text(),
                    expected: ''
                  });
                  _$ = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _featureToggles.FeatureToggles,
                        { features: [] },
                        _react2.default.createElement(
                          _context2.Consumer,
                          null,
                          function(features) {
                            return _react2.default.createElement(
                              'div',
                              { className: 'features' },
                              features.toString()
                            );
                          }
                        )
                      )
                    )
                  );

                  assert({
                    given: 'empty features array',
                    should:
                      'it should provide the correct features via context',
                    actual: _$('.features').text(),
                    expected: ''
                  });
                  features = ['foo', 'bar', 'baz'];
                  _$2 = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _featureToggles.FeatureToggles,
                        { features: features },
                        _react2.default.createElement(
                          _context2.Consumer,
                          null,
                          function(features) {
                            return _react2.default.createElement(
                              'div',
                              { className: 'features' },
                              features.toString()
                            );
                          }
                        )
                      )
                    )
                  );

                  assert({
                    given: 'features array',
                    should:
                      'it should provide the correct features via context',
                    actual: _$2('.features').text(),
                    expected: features.toString()
                  });

                case 8:
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
