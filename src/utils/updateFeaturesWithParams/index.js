// getParamFeatures(params: Object) => features: [...String]
const getParamFeatures = function getParamFeatures(params) {
  var { ft } = params;
  return ft ? ft.split(',') : [];
};

// getParams(search: String) => params: Object
const getParams = (search = '') => {
  var params = {};
  if (search && search.length > 1) {
    var parts = search.slice(1).split('&');

    parts.forEach(function(part) {
      var pair = part.split('=');
      pair[0] = decodeURIComponent(pair[0]);
      pair[1] = decodeURIComponent(pair[1]);
      params[pair[0]] = pair[1] !== 'undefined' ? pair[1] : true;
    });
  }
  return params;
};

// getParams(search: String) => params: Object
const overrideFeature = (acc, featureName) => {
  acc[featureName] = Object.assign({}, acc[featureName], {
    enabled: true,
    dependencies: acc[featureName] ? acc[featureName].dependencies : []
  });
  return acc;
};

const overrideFeatures = (features = {}, params = []) => {
  return params.reduce(overrideFeature, Object.assign({}, features));
};

// updateFeaturesWithParams(features: Object, search: String) => features: Object

const updateFeaturesWithParams = (features = {}, search = '') => {
  return overrideFeatures(features, getParamFeatures(getParams(search)));
};

export default updateFeaturesWithParams;
