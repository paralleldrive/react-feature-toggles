Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isActive = undefined;

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
// eslint-disable-next-line
var isActive = (exports.isActive = (0, _curry2.default)(function() {
  var featureName =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var features =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return features.includes(featureName);
}));
