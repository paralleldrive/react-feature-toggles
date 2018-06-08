'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.constCreateWrappedComponent = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var constCreateWrappedComponent = (exports.constCreateWrappedComponent = function constCreateWrappedComponent() {
  var WrappedComponent = function WrappedComponent(props, context) {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'context-features-string' },
        context.features.toString()
      ),
      _react2.default.createElement(
        'div',
        { className: 'props-features-string' },
        props.features.toString()
      ),
      _react2.default.createElement(
        'div',
        { className: 'props-name' },
        props.name
      )
    );
  };

  WrappedComponent.contextTypes = { features: _propTypes2.default.array };

  return WrappedComponent;
});
