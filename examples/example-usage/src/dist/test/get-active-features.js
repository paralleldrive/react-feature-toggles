'use strict';

var _riteway = require('riteway');

var _getActiveFeatures = require('../get-active-features');

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
  'getActiveFeatures()',
  (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(should) {
        var _should, assert;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (_should = should('return an empty array')),
                    (assert = _should.assert);

                  assert({
                    given: 'no arguments',
                    actual: (0, _getActiveFeatures.getActiveFeatures)(),
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
  'getActiveFeatures([])',
  (function() {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(should) {
        var _should2, assert;

        return regeneratorRuntime.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  (_should2 = should('return an empty array')),
                    (assert = _should2.assert);

                  assert({
                    given: 'an empty array',
                    actual: (0, _getActiveFeatures.getActiveFeatures)(),
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
  'getActiveFeatures([...Feature])',
  (function() {
    var _ref3 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(should) {
        var _should3, assert, features;

        return regeneratorRuntime.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  (_should3 = should()), (assert = _should3.assert);
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
                    }),
                    (0, _createFeature.createFeature)({
                      name: 'report-rating',
                      isActive: true,
                      dependencies: ['reports']
                    }),
                    (0, _createFeature.createFeature)({
                      name: 'report-rating-graph',
                      isActive: true,
                      dependencies: ['report-rating']
                    }),
                    (0, _createFeature.createFeature)({
                      name: 'comments',
                      isActive: true
                    }),
                    (0, _createFeature.createFeature)({
                      name: 'comment-rating',
                      isActive: true,
                      dependencies: ['comments']
                    }),
                    (0, _createFeature.createFeature)({
                      name: 'comment-rating-graph',
                      isActive: true,
                      dependencies: ['comment-rating']
                    })
                  ];

                  (0, _deepFreeze2.default)(features);

                  assert({
                    given: 'an array of features',
                    should: 'return the correct active features',
                    actual: (0, _getActiveFeatures.getActiveFeatures)(features),
                    expected: [
                      'posts',
                      'comments',
                      'comment-rating',
                      'comment-rating-graph'
                    ]
                  });

                case 4:
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
