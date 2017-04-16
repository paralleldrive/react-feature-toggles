/**
 * This function takes a feature name
 * @param {String} featureName 
 * @param {Object} features
 * @return {Boolean} Feature is enabled/disabled;
 */

const getIsEnabled = (featureName = "", features = {}) => {
  const feature = features[featureName];

  /**
   * If the feature doesn't exist or is not enabled then 
   * return false immediatly.
   */
  if (!feature || !feature.enabled) return false;

  /**
   * If the feature doesn't have any requirements, return 
   * its value.
   */
  if (feature.dependencies && feature.dependencies.length <= 0)
    return feature.enabled;

  /**
   * if the feature has dependencies, then create a map
   * of each dependencies values, then check if any are
   * disabled.
   */
  return !feature.dependencies
    .map(nextFeatureName => getIsEnabled(nextFeatureName, features))
    .includes(false);
};

export default getIsEnabled;
