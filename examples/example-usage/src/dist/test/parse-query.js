'use strict';

var _riteway = require('riteway');

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _parseQuery = require('../parse-query');

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
  'parseQuery()',
  (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(should) {
        var _should, assert, query, _query, _query2;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (_should = should()), (assert = _should.assert);

                  assert({
                    given: 'no arguments',
                    should: 'return an empty array',
                    actual: (0, _parseQuery.parseQuery)(),
                    expected: []
                  });

                  query = (0, _deepFreeze2.default)({});

                  assert({
                    given: 'empty object',
                    should: 'return an empty array',
                    actual: (0, _parseQuery.parseQuery)(query),
                    expected: []
                  });
                  _query = (0, _deepFreeze2.default)({ foo: 'foo,bar,help' });

                  assert({
                    given: 'query object with no ft key',
                    should: 'return an empty array',
                    actual: (0, _parseQuery.parseQuery)(_query),
                    expected: []
                  });
                  _query2 = (0, _deepFreeze2.default)({
                    foo: 'something',
                    ft: 'foo,bar,help'
                  });

                  assert({
                    given:
                      'query object with key of ft and a value of a string of features',
                    should: 'return an array of the features',
                    actual: (0, _parseQuery.parseQuery)(_query2),
                    expected: ['foo', 'bar', 'help']
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
