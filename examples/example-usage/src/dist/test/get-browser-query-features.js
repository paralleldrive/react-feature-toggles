'use strict';

var _riteway = require('riteway');

var _getBrowserQueryFeatures = require('../get-browser-query-features');

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
  'getBrowserQueryFeatures()',
  (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(should) {
        var _should, assert, url, _url;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (_should = should()), (assert = _should.assert);

                  assert({
                    given: 'no arguments in node',
                    should: 'return empy array',
                    actual: (0,
                    _getBrowserQueryFeatures.getBrowserQueryFeatures)(),
                    expected: []
                  });
                  url = '?ft=';

                  assert({
                    given: 'search string with no features',
                    should: 'return empy array',
                    actual: (0,
                    _getBrowserQueryFeatures.getBrowserQueryFeatures)(url),
                    expected: []
                  });
                  _url = '?ft=foo,bar';

                  assert({
                    given: 'search string with features',
                    should: 'return the correct features',
                    actual: (0,
                    _getBrowserQueryFeatures.getBrowserQueryFeatures)(_url),
                    expected: ['foo', 'bar']
                  });

                case 6:
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
