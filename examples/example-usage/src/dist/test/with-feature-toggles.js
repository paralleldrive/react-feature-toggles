'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _riteway = require('riteway');

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _withFeatureToggles = require('../with-feature-toggles');

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

var createTestComponent = function createTestComponent() {
  return function() {
    var _ref =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      propCheck = _ref.propCheck;

    return _react2.default.createElement(_context2.Consumer, null, function(
      features
    ) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'features' },
          features.toString()
        ),
        _react2.default.createElement(
          'div',
          { className: 'prop-check' },
          propCheck
        )
      );
    });
  };
};

(0, _riteway.describe)(
  'withFeatureToggles()',
  (function() {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(should) {
        var _should,
          assert,
          Component,
          Page,
          $,
          _should2,
          _assert,
          _Component,
          features,
          _Page,
          _$,
          _should3,
          _assert2,
          _Component2,
          _features,
          _Page2,
          _$2,
          _Component3,
          _Page3,
          propCheck,
          _$3;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (_should = should()), (assert = _should.assert);
                  Component = createTestComponent();
                  Page = (0, _withFeatureToggles.withFeatureToggles)()(
                    Component
                  );
                  $ = _cheerio2.default.load(
                    render(_react2.default.createElement(Page, null))
                  );

                  assert({
                    given: 'no features argument',
                    should: 'provide an empty array of features via context',
                    actual: $('.features').text(),
                    expected: ''
                  });
                  (_should2 = should()), (_assert = _should2.assert);
                  _Component = createTestComponent();
                  features = [];
                  _Page = (0, _withFeatureToggles.withFeatureToggles)({
                    features: features
                  })(_Component);
                  _$ = _cheerio2.default.load(
                    render(_react2.default.createElement(_Page, null))
                  );

                  _assert({
                    given: 'empty features array',
                    should: 'provide the correct features via context',
                    actual: _$('.features').text(),
                    expected: ''
                  });
                  (_should3 = should()), (_assert2 = _should3.assert);
                  _Component2 = createTestComponent();
                  _features = ['foo', 'bar', 'baz'];
                  _Page2 = (0, _withFeatureToggles.withFeatureToggles)({
                    features: _features
                  })(_Component2);
                  _$2 = _cheerio2.default.load(
                    render(_react2.default.createElement(_Page2, null))
                  );

                  _assert2({
                    given: 'features array',
                    should: 'provide the correct features via context',
                    actual: _$2('.features').text(),
                    expected: _features.toString()
                  });
                  _Component3 = createTestComponent();
                  _Page3 = (0, _withFeatureToggles.withFeatureToggles)()(
                    _Component3
                  );
                  propCheck = 'bacon and eggs';
                  _$3 = _cheerio2.default.load(
                    render(
                      _react2.default.createElement(_Page3, {
                        propCheck: propCheck
                      })
                    )
                  );

                  assert({
                    given: 'props',
                    should: 'pass through props',
                    actual: _$3('.prop-check').text(),
                    expected: 'bacon and eggs'
                  });

                case 22:
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

    return function(_x2) {
      return _ref2.apply(this, arguments);
    };
  })()
);
