'use strict';

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _riteway = require('riteway');

var _updateFeaturesWithQuery = require('../update-features-with-query');

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _createFeature = require('../test-fixtures/create-feature');

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
  'updateFeaturesWithQuery()',
  (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(should) {
        var _should, assert;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (_should = should()), (assert = _should.assert);

                  assert({
                    given: 'no arguments',
                    should: 'return an empty array',
                    actual: (0,
                    _updateFeaturesWithQuery.updateFeaturesWithQuery)(),
                    expected: []
                  });

                case 2:
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
  'updateFeaturesWithQuery([])',
  (function() {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(should) {
        var _should2, assert;

        return regeneratorRuntime.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  (_should2 = should()), (assert = _should2.assert);

                  assert({
                    given: 'empty array of features',
                    should: 'return an empty array',
                    actual: (0,
                    _updateFeaturesWithQuery.updateFeaturesWithQuery)([]),
                    expected: []
                  });

                case 2:
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
  'updateFeaturesWithQuery([], Query)',
  (function() {
    var _ref3 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(should) {
        var _should3, assert;

        return regeneratorRuntime.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  (_should3 = should()), (assert = _should3.assert);

                  assert({
                    given: 'empty array of features and a Query',
                    should: 'return an empty array',
                    actual: (0,
                    _updateFeaturesWithQuery.updateFeaturesWithQuery)([], {
                      q: 'js'
                    }),
                    expected: []
                  });

                case 2:
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

(0, _riteway.describe)(
  'updateFeaturesWithQuery([...Feature], Query)',
  (function() {
    var _ref4 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(should) {
        var _should4, assert, features, expectedFeatures;

        return regeneratorRuntime.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  (_should4 = should()), (assert = _should4.assert);
                  features = [
                    (0, _createFeature.createFeature)({
                      name: 'posts',
                      isActive: true
                    }),
                    (0, _createFeature.createFeature)({
                      name: 'post-rating',
                      isActive: false,
                      dependencies: ['posts']
                    }),
                    (0, _createFeature.createFeature)({
                      name: 'post-rating-graph',
                      isActive: true,
                      dependencies: ['post-rating']
                    }),
                    (0, _createFeature.createFeature)({
                      name: 'reports',
                      isActive: false
                    })
                  ];

                  (0, _deepFreeze2.default)(features);

                  assert({
                    given: 'an array of features and no Query',
                    should: 'return an equivalent array of features',
                    actual: (0,
                    _updateFeaturesWithQuery.updateFeaturesWithQuery)(features),
                    expected: features
                  });

                  assert({
                    given: 'an array of features and a empty Query object',
                    should: 'return an equivalent array of features',
                    actual: (0,
                    _updateFeaturesWithQuery.updateFeaturesWithQuery)(
                      features,
                      {}
                    ),
                    expected: features
                  });

                  assert({
                    given:
                      'an array of features and a Query object that does not match any features',
                    should: 'return an equivalent array of features',
                    actual: (0,
                    _updateFeaturesWithQuery.updateFeaturesWithQuery)(
                      features,
                      { q: 'js' }
                    ),
                    expected: features
                  });

                  expectedFeatures = [].concat(features);

                  expectedFeatures[1] = _extends({}, expectedFeatures[1], {
                    isActive: true
                  });
                  expectedFeatures[3] = _extends({}, expectedFeatures[3], {
                    isActive: true
                  });
                  assert({
                    given:
                      'an array of features and a Query object that does not match any features',
                    should: 'return an equivalent array of features',
                    actual: (0,
                    _updateFeaturesWithQuery.updateFeaturesWithQuery)(
                      features,
                      {
                        ft: 'post-rating,reports,login'
                      }
                    ),
                    expected: expectedFeatures
                  });

                case 10:
                case 'end':
                  return _context4.stop();
              }
            }
          },
          _callee4,
          undefined
        );
      })
    );

    return function(_x4) {
      return _ref4.apply(this, arguments);
    };
  })()
);
