Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getBrowserQueryFeatures = undefined;

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _getQueryFeatures = require('./get-query-features');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
// eslint-disable-next-line
var getBrowserQueryFeatures = (exports.getBrowserQueryFeatures = function getBrowserQueryFeatures() {
  var search =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : typeof window === 'undefined' ? '' : window.location.search;

  var _parse = (0, _urlParse2.default)(search, true),
    query = _parse.query;

  return (0, _getQueryFeatures.getQueryFeatures)(query);
});
