'use strict';

var _riteway = require('riteway');

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _removeFeatures = require('../remove-features');

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
  'removeFeatures()',
  (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(should) {
        var _should,
          assert,
          currentFeatures,
          _currentFeatures,
          removedFeatures,
          _currentFeatures2;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (_should = should()), (assert = _should.assert);

                  assert({
                    given: 'no arguments',
                    should: 'return an empty array',
                    actual: (0, _removeFeatures.removeFeatures)(),
                    expected: []
                  });

                  assert({
                    given: 'two empty arrays',
                    should: 'return an empty array',
                    actual: (0, _removeFeatures.removeFeatures)([], []),
                    expected: []
                  });

                  assert({
                    given:
                      'empty array of Current Features and an array of Features to Remove',
                    should: 'return an empty array',
                    actual: (0, _removeFeatures.removeFeatures)(
                      [],
                      ['foo', 'bar']
                    ),
                    expected: []
                  });
                  currentFeatures = (0, _deepFreeze2.default)(['foo', 'bar']);

                  assert({
                    given:
                      'array of Current Features and an empty array of Features to Remove',
                    should: 'equivalent array of Current Features',
                    actual: (0, _removeFeatures.removeFeatures)(
                      currentFeatures,
                      []
                    ),
                    expected: ['foo', 'bar']
                  });
                  _currentFeatures = (0, _deepFreeze2.default)([
                    'foo',
                    'bar',
                    'baz',
                    'cat'
                  ]);
                  removedFeatures = (0, _deepFreeze2.default)([
                    'fish',
                    'bar',
                    'cat'
                  ]);

                  assert({
                    given:
                      'array of Current Features and an array of Features to Remove',
                    should: 'the correct new array',
                    actual: (0, _removeFeatures.removeFeatures)(
                      _currentFeatures,
                      removedFeatures
                    ),
                    expected: ['foo', 'baz']
                  });
                  _currentFeatures2 = (0, _deepFreeze2.default)([
                    'foo',
                    'bar',
                    'baz'
                  ]);

                  assert({
                    given: 'an array with items',
                    should: 'return equivalent array',
                    actual: (0, _removeFeatures.removeFeatures)(
                      _currentFeatures2
                    ),
                    expected: _currentFeatures2
                  });

                case 11:
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
