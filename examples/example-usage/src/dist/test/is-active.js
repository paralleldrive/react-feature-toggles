'use strict';

var _riteway = require('riteway');

var _isActive = require('../is-active');

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
  'isActive()',
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
                    should: 'return false',
                    actual: (0, _isActive.isActive)(),
                    expected: false
                  });

                  assert({
                    given: 'an empty array and id string',
                    should: 'return false',
                    actual: (0, _isActive.isActive)('posts', []),
                    expected: false
                  });

                  assert({
                    given:
                      'an array of feature names and existing feature id string',
                    should: 'return true',
                    actual: (0, _isActive.isActive)('bar', [
                      'foo',
                      'bar',
                      'baz'
                    ]),
                    expected: true
                  });

                  assert({
                    given:
                      'an array of feature names and non existant feature id string',
                    should: 'return false',
                    actual: (0, _isActive.isActive)('non-existant-feature-id', [
                      'foo',
                      'bar',
                      'baz'
                    ]),
                    expected: false
                  });

                case 5:
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
