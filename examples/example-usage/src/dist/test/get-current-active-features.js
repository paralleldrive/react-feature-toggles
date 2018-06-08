'use strict';

var _riteway = require('riteway');

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _getCurrentActiveFeatures = require('../get-current-active-features');

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
  'deactivateFeatures()',
  (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(should) {
        var _should, assert, req, search;

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
                    _getCurrentActiveFeatures.getCurrentActiveFeatures)(),
                    expected: []
                  });

                  assert({
                    given: 'an empty object',
                    should: 'return an empty array',
                    actual: (0,
                    _getCurrentActiveFeatures.getCurrentActiveFeatures)({}),
                    expected: []
                  });

                  assert({
                    given: 'an empty initial features',
                    should: 'return an empty array',
                    actual: (0,
                    _getCurrentActiveFeatures.getCurrentActiveFeatures)({
                      initialFeatures: []
                    }),
                    expected: []
                  });

                  assert({
                    given: 'initial features',
                    should: 'return the correct features',
                    actual: (0,
                    _getCurrentActiveFeatures.getCurrentActiveFeatures)({
                      initialFeatures: ['foo', 'bar']
                    }),
                    expected: ['foo', 'bar']
                  });
                  req = (0, _deepFreeze2.default)({
                    query: {
                      ft: 'baz,bat,help'
                    }
                  });
                  search = '?ft=cat,else';

                  assert({
                    given: 'initial features and req and search',
                    should: 'return the correct features',
                    actual: (0,
                    _getCurrentActiveFeatures.getCurrentActiveFeatures)({
                      initialFeatures: ['foo', 'bar'],
                      req: req,
                      search: search
                    }),
                    expected: [
                      'foo',
                      'bar',
                      'baz',
                      'bat',
                      'help',
                      'cat',
                      'else'
                    ]
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
