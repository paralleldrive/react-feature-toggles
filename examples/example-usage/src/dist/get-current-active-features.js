Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getCurrentActiveFeatures = undefined;

var _mergeFeatures = require('./merge-features');

var _getReqQueryFeatures = require('./get-req-query-features');

var _getBrowserQueryFeatures = require('./get-browser-query-features');
// eslint-disable-next-line
var getCurrentActiveFeatures = (exports.getCurrentActiveFeatures = function getCurrentActiveFeatures() {
  var _ref =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$initialFeatures = _ref.initialFeatures,
    initialFeatures =
      _ref$initialFeatures === undefined ? [] : _ref$initialFeatures,
    req = _ref.req,
    search = _ref.search;

  return (0, _mergeFeatures.mergeFeatures)(
    initialFeatures,
    (0, _getReqQueryFeatures.getReqQueryFeatures)(req),
    (0, _getBrowserQueryFeatures.getBrowserQueryFeatures)(search)
  );
});
