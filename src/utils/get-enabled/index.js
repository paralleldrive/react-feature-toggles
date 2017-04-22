import getIsEnabled from "../get-is-enabled";

// Returns all the names of enabled features
// getEnabled(features: Object) => enabledFeatureNames: Array

const getEnabled = (features = {}) =>
  Object.keys(features).filter(key => getIsEnabled(key, features));

export default getEnabled;
