Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createRouteMiddleware = undefined;

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _url = require('url');

var _getIsEnabled = require('./get-is-enabled');

var _updateFeaturesWithQuery = require('./update-features-with-query');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

var setStatus = function setStatus(res, isEnabled) {
  return isEnabled ? res.status(200) : res.status(404);
};

var createRouteMiddleware = (0, _curry2.default)(function(features, _ref) {
  var requiredFeature = _ref.requiredFeature,
    methods = _objectWithoutProperties(_ref, ['requiredFeature']);

  return function(req, res, next) {
    var parsedUrl = (0, _url.parse)(req.url, true);
    var query = parsedUrl.query;

    var updatedFeatures = (0, _updateFeaturesWithQuery.updateFeaturesWithQuery)(
      features,
      query
    );
    setStatus(
      res,
      (0, _getIsEnabled.getIsEnabled)(updatedFeatures, requiredFeature)
    );

    var handler = methods[req.method.toLowerCase()];
    if (handler !== undefined && typeof handler === 'function') {
      return handler(req, res);
    }

    next();
  };
});
exports.createRouteMiddleware = createRouteMiddleware;
