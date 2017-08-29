import { compose, lensProp, view, set, map, contains } from 'ramda';

const enabledLens = lensProp('enabled');
const nameLens = lensProp('name');


// getParamFeatures(params: Object) => featureNames: [...String]
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

const getFeatureOverrides = compose(getParamFeatures, getParams);

const overrideFeature = names => feature => {
  if (contains(view(nameLens, feature), names)) {
    return set(enabledLens, true, feature);
  } else {
    return feature;
  }
};

// overrideFeatures = ([...Feature], [...String]) => [...Feature];
const enableFeatures = (features = [], names = []) => map(overrideFeature(names), features);

// updateFeaturesWithParams = ([...Feature], search: String) => [...Feature];
const updateFeaturesWithParams = (features = [], search = '') => enableFeatures(features, getFeatureOverrides(search));

export default updateFeaturesWithParams;
