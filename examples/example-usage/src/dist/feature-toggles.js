Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.FeatureToggles = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _context = require('./context');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var FeatureToggles = (exports.FeatureToggles = function FeatureToggles(_ref) {
  var _ref$features = _ref.features,
    features = _ref$features === undefined ? [] : _ref$features,
    children = _ref.children;
  return _react2.default.createElement(
    _context.Provider,
    { value: features },
    children
  );
});

FeatureToggles.propTypes = {
  features: _propTypes2.default.array
};
