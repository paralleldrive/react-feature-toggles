'use strict';

var _riteway = require('riteway');

var _getReqQueryFeatures = require('../get-req-query-features');

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

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
  'getReqQueryFeatures()',
  (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(should) {
        var _should, assert, req, _req, _req2, _req3;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (_should = should('')), (assert = _should.assert);

                  assert({
                    given: 'no arguments',
                    should: 'return an empty array',
                    actual: (0, _getReqQueryFeatures.getReqQueryFeatures)(),
                    expected: []
                  });
                  req = (0, _deepFreeze2.default)({
                    query: null
                  });

                  assert({
                    given: 'incorrectly formed req object',
                    should: 'return an empty array',
                    actual: (0, _getReqQueryFeatures.getReqQueryFeatures)(req),
                    expected: []
                  });
                  _req = (0, _deepFreeze2.default)({
                    query: {
                      ft: null
                    }
                  });

                  assert({
                    given: 'incorrectly formed req object',
                    should: 'return an empty array',
                    actual: (0, _getReqQueryFeatures.getReqQueryFeatures)(_req),
                    expected: []
                  });
                  _req2 = (0, _deepFreeze2.default)({
                    something: {
                      wrong: 'undefined'
                    }
                  });

                  assert({
                    given: 'incorrectly formed req object',
                    should: 'return an empty array',
                    actual: (0, _getReqQueryFeatures.getReqQueryFeatures)(
                      _req2
                    ),
                    expected: []
                  });
                  _req3 = (0, _deepFreeze2.default)({
                    query: {
                      ft: 'foo,bar,help'
                    }
                  });

                  assert({
                    given: 'req object with features',
                    should: 'return the correct features',
                    actual: (0, _getReqQueryFeatures.getReqQueryFeatures)(
                      _req3
                    ),
                    expected: ['foo', 'bar', 'help']
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
