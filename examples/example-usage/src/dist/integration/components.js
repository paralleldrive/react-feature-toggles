'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _riteway = require('riteway');

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _index = require('../index');

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
  'FeatureToggles and Feature',
  (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(should) {
        var _should,
          assert,
          FooActive,
          FooInactive,
          HelpActive,
          HelpInactive,
          $;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (_should = should()), (assert = _should.assert);
                  FooActive = createTestComponent('foo-active');
                  FooInactive = createTestComponent('foo-inactive');
                  HelpActive = createTestComponent('help-active');
                  HelpInactive = createTestComponent('help-inactive');
                  $ = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _index.FeatureToggles,
                        { features: ['foo', 'bar'] },
                        _react2.default.createElement(_index.Feature, {
                          name: 'foo',
                          inactiveComponent: FooInactive,
                          activeComponent: FooActive
                        }),
                        _react2.default.createElement(_index.Feature, {
                          name: 'help',
                          inactiveComponent: HelpInactive,
                          activeComponent: HelpActive
                        })
                      )
                    )
                  );

                  assert({
                    given: 'feature is active',
                    should: 'render the active component',
                    actual: $('.foo-active').length,
                    expected: 1
                  });

                  assert({
                    given: 'feature is active',
                    should: 'do not render the inactive component',
                    actual: $('.foo-inactive').length,
                    expected: 0
                  });

                  assert({
                    given: 'feature is inactive',
                    should: 'render the inactive component',
                    actual: $('.help-inactive').length,
                    expected: 1
                  });

                  assert({
                    given: 'feature is inactive',
                    should: 'do not render the active component',
                    actual: $('.help-active').length,
                    expected: 0
                  });

                case 10:
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

(0, _riteway.describe)(
  'FeatureToggles and configureFeature',
  (function() {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(should) {
        var _should2,
          assert,
          FooActive,
          FooInactive,
          HelpActive,
          HelpInactive,
          ConfiguredFoo,
          ConfiguredHelp,
          $;

        return regeneratorRuntime.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  (_should2 = should()), (assert = _should2.assert);
                  FooActive = createTestComponent('foo-active');
                  FooInactive = createTestComponent('foo-inactive');
                  HelpActive = createTestComponent('help-active');
                  HelpInactive = createTestComponent('help-inactive');
                  ConfiguredFoo = (0, _index.configureFeature)(FooInactive)(
                    'foo'
                  )(FooActive);
                  ConfiguredHelp = (0, _index.configureFeature)(HelpInactive)(
                    'help'
                  )(HelpActive);
                  $ = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _index.FeatureToggles,
                        { features: ['foo', 'bar'] },
                        _react2.default.createElement(ConfiguredFoo, null),
                        _react2.default.createElement(ConfiguredHelp, null)
                      )
                    )
                  );

                  assert({
                    given: 'feature is active',
                    should: 'render the active component',
                    actual: $('.foo-active').length,
                    expected: 1
                  });

                  assert({
                    given: 'feature is active',
                    should: 'not render the inactive component',
                    actual: $('.foo-inactive').length,
                    expected: 0
                  });

                  assert({
                    given: 'feature is inactive',
                    should: 'render the inactive component',
                    actual: $('.help-inactive').length,
                    expected: 1
                  });

                  assert({
                    given: 'feature is inactive',
                    should: 'not render the active component',
                    actual: $('.help-active').length,
                    expected: 0
                  });

                case 12:
                case 'end':
                  return _context2.stop();
              }
            }
          },
          _callee2,
          undefined
        );
      })
    );

    return function(_x2) {
      return _ref2.apply(this, arguments);
    };
  })()
);

(0, _riteway.describe)(
  'withFeatureToggles and configureFeature',
  (function() {
    var _ref3 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(should) {
        var _should3,
          assert,
          FooActive,
          FooInactive,
          HelpActive,
          HelpInactive,
          ConfiguredFoo,
          ConfiguredHelp,
          features,
          FooPage,
          HelpPage,
          $;

        return regeneratorRuntime.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  (_should3 = should()), (assert = _should3.assert);
                  FooActive = createTestComponent('foo-active');
                  FooInactive = createTestComponent('foo-inactive');
                  HelpActive = createTestComponent('help-active');
                  HelpInactive = createTestComponent('help-inactive');
                  ConfiguredFoo = (0, _index.configureFeature)(FooInactive)(
                    'foo'
                  )(FooActive);
                  ConfiguredHelp = (0, _index.configureFeature)(HelpInactive)(
                    'help'
                  )(HelpActive);
                  features = ['foo', 'bar'];
                  FooPage = (0, _index.withFeatureToggles)({
                    features: features
                  })(ConfiguredFoo);
                  HelpPage = (0, _index.withFeatureToggles)({
                    features: features
                  })(ConfiguredHelp);
                  $ = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(FooPage, null),
                        _react2.default.createElement(HelpPage, null)
                      )
                    )
                  );

                  assert({
                    given: 'feature is active',
                    should: 'render the active component',
                    actual: $('.foo-active').length,
                    expected: 1
                  });

                  assert({
                    given: 'feature is active',
                    should: 'not render the inactive component',
                    actual: $('.foo-inactive').length,
                    expected: 0
                  });

                  assert({
                    given: 'feature is inactive',
                    should: 'render the inactive component',
                    actual: $('.help-inactive').length,
                    expected: 1
                  });

                  assert({
                    given: 'feature is inactive',
                    should: 'not render the active component',
                    actual: $('.help-active').length,
                    expected: 0
                  });

                case 15:
                case 'end':
                  return _context3.stop();
              }
            }
          },
          _callee3,
          undefined
        );
      })
    );

    return function(_x3) {
      return _ref3.apply(this, arguments);
    };
  })()
);
