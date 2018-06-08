Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.withFeatureToggles = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _featureToggles = require('./feature-toggles');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// ({ features = [...String] } = {}) => Component => Component
// eslint-disable-next-line
var withFeatureToggles = (exports.withFeatureToggles = function withFeatureToggles() {
  var _ref =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    features = _ref.features;

  return function(Component) {
    return function(props) {
      return _react2.default.createElement(
        _featureToggles.FeatureToggles,
        { features: features },
        _react2.default.createElement(Component, props)
      );
    };
  };
});
