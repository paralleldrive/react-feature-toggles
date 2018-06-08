Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Provider = exports.Consumer = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _React$createContext = _react2.default.createContext([]),
  Consumer = _React$createContext.Consumer,
  Provider = _React$createContext.Provider;

exports.Consumer = Consumer;
exports.Provider = Provider;
