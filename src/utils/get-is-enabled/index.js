// find = f => xs => x 
const find = f => xs => xs.find(f);

// findByName = s => x => x;
const findByName = s => x => x.name === s;

// enabled = x: Feature => boolean
const enabled = x => x && x.enabled ? true : false;

// hasDependencies = x: Feature => boolean
const hasDependencies = x => x.dependencies && x.dependencies.length > 0 ? true : false;

// checkDependencies = xs => ss => boolean;
const checkDependencies = xs => ss => ss.reduce((acc, x) => acc ? getIsEnabled(xs, x) : acc ,true);

// getIsEnabled = [...Feature] => String => boolean
const getIsEnabled = (features = [], featureName = '') => {
  const feature = find(findByName(featureName))(features);
  /**
   * If the feature doesn't exist or is not enabled then
   * return false immediatly.
   */
  if (!enabled(feature)) return false;

  /**
   * If the feature doesn't have any requirements, return true.
   */
  if (!hasDependencies(feature)) return true;

  /**
   * if the feature has dependencies, then create a map
   * of each dependencies values, then check if any are
   * disabled.
   */
  return checkDependencies(features)(feature.dependencies);
};

export default getIsEnabled;
