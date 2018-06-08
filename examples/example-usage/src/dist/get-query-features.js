Object.defineProperty(exports, '__esModule', {
  value: true
});
// eslint-disable-next-line
var getQueryFeatures = (exports.getQueryFeatures = function getQueryFeatures() {
  var _ref =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    ft = _ref.ft;

  return ft ? ft.split(',') : [];
});
