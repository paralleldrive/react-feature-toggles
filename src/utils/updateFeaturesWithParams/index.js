import { lensProp, view, set, map, contains } from 'ramda';

const enabledLens = lensProp('enabled');
const nameLens = lensProp('name');

// getParamFeatures(query: Object) => featureNames: [...String]
const getParamFeatures = ({ ft }) => ft ? ft.split(',') : [];

const overrideFeature = names => feature => {
  if (contains(view(nameLens, feature), names)) {
    return set(enabledLens, true, feature);
  } else {
    return feature;
  }
};

// overrideFeatures = ([...Feature], [...String]) => [...Feature];
const enableFeatures = (features = [], names = []) => map(overrideFeature(names), features);

// updateFeaturesWithParams = ([...Feature], query: Object) => [...Feature];
const updateFeaturesWithParams = (features = [], query = {}) => enableFeatures(features, getParamFeatures(query));

export default updateFeaturesWithParams;
