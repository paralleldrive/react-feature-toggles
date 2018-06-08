'use strict';

var _riteway = require('riteway');

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _feature = require('../feature');

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

var createTestComponent = function createTestComponent(componentName) {
  return function() {
    return _react2.default.createElement('div', { className: componentName });
  };
};

(0, _riteway.describe)(
  'Feature()',
  (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(should) {
        var _should,
          assert,
          ActiveComponent,
          InactiveComponent,
          features,
          $,
          _ActiveComponent,
          _InactiveComponent,
          _features,
          _$,
          _ActiveComponent2,
          _features2,
          _$2,
          _ActiveComponent3,
          _features3,
          _$3,
          _InactiveComponent2,
          _ActiveComponent4,
          _features4,
          _$4;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (_should = should()), (assert = _should.assert);
                  ActiveComponent = createTestComponent('active');
                  InactiveComponent = createTestComponent('inactive');
                  features = ['foo', 'bar', 'baz'];
                  $ = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _context2.Provider,
                        { value: features },
                        _react2.default.createElement(_feature.Feature, {
                          name: 'foo',
                          inactiveComponent: InactiveComponent,
                          activeComponent: ActiveComponent
                        })
                      )
                    )
                  );

                  assert({
                    given: 'the feature is enabled and an inactive component',
                    should: 'not render the inactive component',
                    actual: $('.inactive').length,
                    expected: 0
                  });

                  assert({
                    given: 'the feature is enabled and an active component',
                    should: 'render the active component',
                    actual: $('.active').length,
                    expected: 1
                  });
                  _ActiveComponent = createTestComponent('active');
                  _InactiveComponent = createTestComponent('inactive');
                  _features = ['foo', 'bar', 'baz'];
                  _$ = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _context2.Provider,
                        { value: _features },
                        _react2.default.createElement(_feature.Feature, {
                          name: 'help',
                          inactiveComponent: _InactiveComponent,
                          activeComponent: _ActiveComponent
                        })
                      )
                    )
                  );

                  assert({
                    given:
                      'the feature is not enabled and an inactive component',
                    should: 'render the inactive component',
                    actual: _$('.inactive').length,
                    expected: 1
                  });

                  assert({
                    given: 'the feature is not enabled and an active component',
                    should: 'not render the active component',
                    actual: _$('.active').length,
                    expected: 0
                  });
                  _ActiveComponent2 = createTestComponent('active');
                  _features2 = ['foo', 'bar', 'baz'];
                  _$2 = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _context2.Provider,
                        { value: _features2 },
                        _react2.default.createElement(_feature.Feature, {
                          name: 'foo',
                          activeComponent: _ActiveComponent2
                        })
                      )
                    )
                  );

                  assert({
                    given: 'the feature is enabled, no inactive component',
                    should: 'render the active component',
                    actual: _$2('.active').length,
                    expected: 1
                  });
                  _ActiveComponent3 = createTestComponent('active');
                  _features3 = ['foo', 'bar', 'baz'];
                  _$3 = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _context2.Provider,
                        { value: _features3 },
                        _react2.default.createElement(_feature.Feature, {
                          name: 'help',
                          activeComponent: _ActiveComponent3
                        })
                      )
                    )
                  );

                  assert({
                    given: 'the feature is not enabled, no inactive component',
                    should: 'render the the default inactive component',
                    actual: _$3.html(),
                    expected: ''
                  });
                  _InactiveComponent2 = createTestComponent('inactive');
                  _ActiveComponent4 = createTestComponent('active');
                  _features4 = ['foo', 'bar', 'baz'];
                  _$4 = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _context2.Provider,
                        { value: _features4 },
                        _react2.default.createElement(
                          _feature.Feature,
                          null,
                          function(_ref2) {
                            var features = _ref2.features;
                            return features.includes('bar')
                              ? _react2.default.createElement(
                                  _ActiveComponent4,
                                  null
                                )
                              : _react2.default.createElement(
                                  _InactiveComponent2,
                                  null
                                );
                          }
                        )
                      )
                    )
                  );

                  assert({
                    given: 'no active component prop',
                    should: 'act as a render prop component',
                    actual: _$4('.active').length,
                    expected: 1
                  });

                  assert({
                    given: 'no active component prop',
                    should: 'act as a render prop component',
                    actual: _$4('.inactive').length,
                    expected: 0
                  });

                case 27:
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
