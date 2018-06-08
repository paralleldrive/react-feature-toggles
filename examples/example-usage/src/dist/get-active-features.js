Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getActiveFeatures = undefined;

var _map = require('ramda/src/map');

var _map2 = _interopRequireDefault(_map);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _filter = require('ramda/src/filter');

var _filter2 = _interopRequireDefault(_filter);

var _lensProp = require('ramda/src/lensProp');

var _lensProp2 = _interopRequireDefault(_lensProp);

var _view = require('ramda/src/view');

var _view2 = _interopRequireDefault(_view);

var _getIsEnabled = require('./get-is-enabled');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var nameLens = (0, _lensProp2.default)('name');
var getName = (0, _view2.default)(nameLens);

// filterDisabled = [...Feature] => [...Feature];
var filterDisabled = function filterDisabled() {
  var features =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return (0, _filter2.default)(function(x) {
    return (0, _getIsEnabled.getIsEnabled)(features, getName(x));
  }, features);
};

// getActiveFeatures = [...Feature] => [...String]
// eslint-disable-next-line
var getActiveFeatures = (exports.getActiveFeatures = (0, _compose2.default)(
  (0, _map2.default)(getName),
  filterDisabled
));
