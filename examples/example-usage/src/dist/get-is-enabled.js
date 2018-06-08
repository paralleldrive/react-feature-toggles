Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getIsEnabled = undefined;

var _find = require('ramda/src/find');

var _find2 = _interopRequireDefault(_find);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// matchName = s => x => boolean;
var matchName = function matchName(s) {
  return function(x) {
    return x.name === s;
  };
};

// isActive = x: Feature => boolean
var isActive = function isActive(x) {
  return x && x.isActive ? true : false;
};

// hasDependencies = x: Feature => boolean
var hasDependencies = function hasDependencies(x) {
  return x.dependencies && x.dependencies.length > 0;
};

// checkDependencies = [...Feature] => [...String] => boolean;
var checkDependencies = function checkDependencies(features) {
  return function(names) {
    return names.reduce(function(acc, x) {
      return acc ? getIsEnabled(features, x) : acc;
    }, true);
  };
};

// getIsEnabled = [...Feature] => String => boolean
var getIsEnabled = (exports.getIsEnabled = (0, _curry2.default)(function() {
  var features =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var featureName =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var feature = (0, _find2.default)(matchName(featureName))(features);
  /**
   * If the feature doesn't exist or is not enabled then
   * return false.
   */
  if (!isActive(feature)) return false;

  /**
   * If the feature doesn't have any requirements, return true.
   */
  if (!hasDependencies(feature)) return true;

  /**
   * If the feature has dependencies, then check for any disabled dependencies
   */
  return checkDependencies(features)(feature.dependencies);
}));
