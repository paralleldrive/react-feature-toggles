Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Feature = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _context = require('./context');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var noop = function noop() {
  return null;
};

var Feature = (exports.Feature = function Feature(_ref) {
  var activeComponent = _ref.activeComponent,
    children = _ref.children,
    _ref$inactiveComponen = _ref.inactiveComponent,
    inactiveComponent =
      _ref$inactiveComponen === undefined ? noop : _ref$inactiveComponen,
    name = _ref.name;
  return _react2.default.createElement(_context.Consumer, null, function(
    features
  ) {
    var Component = features.includes(name)
      ? activeComponent
      : inactiveComponent;
    return activeComponent
      ? _react2.default.createElement(Component, null)
      : children({ features: features });
  });
});

Feature.propTypes = {
  activeComponent: _propTypes2.default.func,
  children: _propTypes2.default.oneOfType([
    _propTypes2.default.func,
    _propTypes2.default.node
  ]),
  inactiveComponent: _propTypes2.default.func,
  name: _propTypes2.default.string
};
