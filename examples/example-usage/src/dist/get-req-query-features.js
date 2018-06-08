Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getReqQueryFeatures = undefined;

var _getQueryFeatures = require('./get-query-features');
// eslint-disable-next-line
var getReqQueryFeatures = (exports.getReqQueryFeatures = function getReqQueryFeatures() {
  var _ref =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    query = _ref.query;

  return !query ? [] : (0, _getQueryFeatures.getQueryFeatures)(query);
});
