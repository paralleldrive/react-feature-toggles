Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.configureFeature = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _feature = require('./feature');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
// eslint-disable-next-line
var configureFeature = (exports.configureFeature = (0, _curry2.default)(
  function(inactiveComponent, name, activeComponent) {
    return function() {
      return _react2.default.createElement(_feature.Feature, {
        name: name,
        inactiveComponent: inactiveComponent,
        activeComponent: activeComponent
      });
    };
  }
));
