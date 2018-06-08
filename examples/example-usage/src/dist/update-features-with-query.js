Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.updateFeaturesWithQuery = undefined;

var _lensProp = require('ramda/src/lensProp');

var _lensProp2 = _interopRequireDefault(_lensProp);

var _view = require('ramda/src/view');

var _view2 = _interopRequireDefault(_view);

var _set = require('ramda/src/set');

var _set2 = _interopRequireDefault(_set);

var _map = require('ramda/src/map');

var _map2 = _interopRequireDefault(_map);

var _contains = require('ramda/src/contains');

var _contains2 = _interopRequireDefault(_contains);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var enabledLens = (0, _lensProp2.default)('isActive');
var nameLens = (0, _lensProp2.default)('name');

// getParamFeatures(query: Object) => featureNames: [...String]
var getParamFeatures = function getParamFeatures(_ref) {
  var ft = _ref.ft;
  return ft ? ft.split(',') : [];
};

var overrideFeature = function overrideFeature(names) {
  return function(feature) {
    if (
      (0, _contains2.default)((0, _view2.default)(nameLens, feature), names)
    ) {
      return (0, _set2.default)(enabledLens, true, feature);
    } else {
      return feature;
    }
  };
};

// overrideFeatures = ([...Feature], [...String]) => [...Feature];
var enableFeatures = function enableFeatures() {
  var features =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var names =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return (0, _map2.default)(overrideFeature(names), features);
};

// updateFeaturesWithQuery = ([...Feature], query: Object) => [...Feature];
// eslint-disable-next-line
var updateFeaturesWithQuery = (exports.updateFeaturesWithQuery = function updateFeaturesWithQuery() {
  var features =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var query =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return enableFeatures(features, getParamFeatures(query));
});
