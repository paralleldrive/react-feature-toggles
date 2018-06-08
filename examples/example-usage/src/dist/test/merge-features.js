'use strict';

var _riteway = require('riteway');

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _mergeFeatures = require('../merge-features');

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
  'mergeFeatures()',
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
                    given: 'one array',
                    should: 'return an new empty array',
                    actual: (0, _mergeFeatures.mergeFeatures)(
                      (0, _deepFreeze2.default)([])
                    ),
                    expected: []
                  });

                  assert({
                    given: 'two or more empty arrays',
                    should: 'return an new empty array',
                    actual: (0, _mergeFeatures.mergeFeatures)(
                      (0, _deepFreeze2.default)([]),
                      (0, _deepFreeze2.default)([]),
                      (0, _deepFreeze2.default)([])
                    ),
                    expected: []
                  });

                  assert({
                    given:
                      'two or more arrays of strings with duplicate values',
                    should: 'return a new array with all the unique values',
                    actual: (0, _mergeFeatures.mergeFeatures)(
                      (0, _deepFreeze2.default)(['foo', 'bar', 'baz']),
                      (0, _deepFreeze2.default)(['bar', 'cat', 'bat']),
                      (0, _deepFreeze2.default)(['baz', 'rat', 'dog'])
                    ),
                    expected: ['foo', 'bar', 'baz', 'cat', 'bat', 'rat', 'dog']
                  });

                case 4:
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
