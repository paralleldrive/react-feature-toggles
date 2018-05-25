import find from 'ramda/src/find';
import curry from 'ramda/src/curry';

// matchName = s => x => boolean;
const matchName = s => x => x.name === s;

// isActive = x: Feature => boolean
const isActive = x => (x && x.isActive ? true : false);

// hasDependencies = x: Feature => boolean
const hasDependencies = x => x.dependencies && x.dependencies.length > 0;

// checkDependencies = [...Feature] => [...String] => boolean;
const checkDependencies = features => names =>
  names.reduce((acc, x) => (acc ? getIsEnabled(features, x) : acc), true);

// getIsEnabled = [...Feature] => String => boolean
export const getIsEnabled = curry((features = [], featureName = '') => {
  const feature = find(matchName(featureName))(features);
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
});
