import getIsEnabled from "../get-is-enabled";

/**
 * Returns an array of strings of all enabled features
 * @param {Object} features
 * @return {Array} 
 */

const getEnabled = (features = {}) =>
  Object.keys(features).filter(key => getIsEnabled(key, features));

export default getEnabled;
