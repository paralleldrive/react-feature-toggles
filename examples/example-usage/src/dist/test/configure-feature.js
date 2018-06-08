'use strict';

var _riteway = require('riteway');

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _configureFeature = require('../configure-feature');

var _context4 = require('../context');

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
  'configureFeature(inactiveComponent)(name)(activeComponent)',
  (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(should) {
        var _should,
          assert,
          ActiveComponent,
          InactiveComponent,
          ConfiguredFeature,
          features,
          $,
          _ActiveComponent,
          _InactiveComponent,
          _ConfiguredFeature,
          _features,
          _$;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (_should = should()), (assert = _should.assert);
                  ActiveComponent = createTestComponent('active');
                  InactiveComponent = createTestComponent('inactive');
                  ConfiguredFeature = (0, _configureFeature.configureFeature)(
                    InactiveComponent
                  )('game')(ActiveComponent);
                  features = [];
                  $ = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _context4.Provider,
                        { value: features },
                        _react2.default.createElement(ConfiguredFeature, null)
                      )
                    )
                  );

                  assert({
                    given: 'the feature is not enabled',
                    should: 'not render the Active component',
                    actual: $('.active').length,
                    expected: 0
                  });

                  assert({
                    given: 'the feature is not enabled',
                    should: 'render the Inactive component',
                    actual: $('.inactive').length,
                    expected: 1
                  });
                  _ActiveComponent = createTestComponent('active');
                  _InactiveComponent = createTestComponent('inactive');
                  _ConfiguredFeature = (0, _configureFeature.configureFeature)(
                    _InactiveComponent
                  )('game')(_ActiveComponent);
                  _features = ['game', 'bar', 'baz'];
                  _$ = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _context4.Provider,
                        { value: _features },
                        _react2.default.createElement(_ConfiguredFeature, null)
                      )
                    )
                  );

                  assert({
                    given: 'the feature is enabled',
                    should: 'not render the Inactive component',
                    actual: _$('.inactive').length,
                    expected: 0
                  });

                  assert({
                    given: 'the feature is enabled',
                    should: 'render the Active component',
                    actual: _$('.active').length,
                    expected: 1
                  });

                case 15:
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
  'configureFeature(inactiveComponent)(name, activeComponent)',
  (function() {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(should) {
        var _should2,
          assert,
          ActiveComponent,
          InactiveComponent,
          ConfiguredFeature,
          features,
          $,
          _ActiveComponent2,
          _InactiveComponent2,
          _ConfiguredFeature2,
          _features2,
          _$2;

        return regeneratorRuntime.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  (_should2 = should()), (assert = _should2.assert);
                  ActiveComponent = createTestComponent('active');
                  InactiveComponent = createTestComponent('inactive');
                  ConfiguredFeature = (0, _configureFeature.configureFeature)(
                    InactiveComponent
                  )('game', ActiveComponent);
                  features = ['game', 'bar', 'baz'];
                  $ = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _context4.Provider,
                        { value: features },
                        _react2.default.createElement(ConfiguredFeature, null)
                      )
                    )
                  );

                  assert({
                    given: 'the feature is enabled',
                    should: 'not render the Inactive component',
                    actual: $('.inactive').length,
                    expected: 0
                  });

                  assert({
                    given: 'the feature is enabled',
                    should: 'render the Active component',
                    actual: $('.active').length,
                    expected: 1
                  });
                  _ActiveComponent2 = createTestComponent('active');
                  _InactiveComponent2 = createTestComponent('inactive');
                  _ConfiguredFeature2 = (0, _configureFeature.configureFeature)(
                    _InactiveComponent2
                  )('game', _ActiveComponent2);
                  _features2 = [];
                  _$2 = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _context4.Provider,
                        { value: _features2 },
                        _react2.default.createElement(_ConfiguredFeature2, null)
                      )
                    )
                  );

                  assert({
                    given: 'the feature is not enabled',
                    should: 'not render the Active component',
                    actual: _$2('.active').length,
                    expected: 0
                  });

                  assert({
                    given: 'the feature is not enabled',
                    should: 'render the Inactive component',
                    actual: _$2('.inactive').length,
                    expected: 1
                  });

                case 15:
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
  'configureFeature(inactiveComponent, name, activeComponent)',
  (function() {
    var _ref3 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(should) {
        var _should3,
          assert,
          ActiveComponent,
          InactiveComponent,
          ConfiguredFeature,
          features,
          $,
          _ActiveComponent3,
          _InactiveComponent3,
          _ConfiguredFeature3,
          _features3,
          _$3;

        return regeneratorRuntime.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  (_should3 = should()), (assert = _should3.assert);
                  ActiveComponent = createTestComponent('active');
                  InactiveComponent = createTestComponent('inactive');
                  ConfiguredFeature = (0, _configureFeature.configureFeature)(
                    InactiveComponent,
                    'game',
                    ActiveComponent
                  );
                  features = ['game', 'bar', 'baz'];
                  $ = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _context4.Provider,
                        { value: features },
                        _react2.default.createElement(ConfiguredFeature, null)
                      )
                    )
                  );

                  assert({
                    given: 'the feature is enabled',
                    should: 'not render the Inactive component',
                    actual: $('.inactive').length,
                    expected: 0
                  });

                  assert({
                    given: 'the feature is enabled',
                    should: 'render the Active component',
                    actual: $('.active').length,
                    expected: 1
                  });
                  _ActiveComponent3 = createTestComponent('active');
                  _InactiveComponent3 = createTestComponent('inactive');
                  _ConfiguredFeature3 = (0, _configureFeature.configureFeature)(
                    _InactiveComponent3,
                    'game',
                    _ActiveComponent3
                  );
                  _features3 = [];
                  _$3 = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(
                        _context4.Provider,
                        { value: _features3 },
                        _react2.default.createElement(_ConfiguredFeature3, null)
                      )
                    )
                  );

                  assert({
                    given: 'the feature is not enabled',
                    should: 'not render the Active component',
                    actual: _$3('.active').length,
                    expected: 0
                  });

                  assert({
                    given: 'the feature is not enabled',
                    should: 'render the Inactive component',
                    actual: _$3('.inactive').length,
                    expected: 1
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
