import lensProp from 'ramda/src/lensProp';
import view from 'ramda/src/view';
import set from 'ramda/src/set';
import map from 'ramda/src/map';
import contains from 'ramda/src/contains';

const enabledLens = lensProp('isActive');
const nameLens = lensProp('name');

// getParamFeatures(query: Object) => featureNames: [...String]
const getParamFeatures = ({ ft }) => (ft ? ft.split(',') : []);

const overrideFeature = names => feature => {
  if (contains(view(nameLens, feature), names)) {
    return set(enabledLens, true, feature);
  } else {
    return feature;
  }
};

// overrideFeatures = ([...Feature], [...String]) => [...Feature];
const enableFeatures = (features = [], names = []) =>
  map(overrideFeature(names), features);

// updateFeaturesWithQuery = ([...Feature], query: Object) => [...Feature];
export const updateFeaturesWithQuery = (features = [], query = {}) =>
  enableFeatures(features, getParamFeatures(query));
