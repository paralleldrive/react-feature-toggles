import { curry } from 'ramda';

const isFeatureIncluded = (features = [], featureName = '') =>
  features.includes(featureName);

export default curry(isFeatureIncluded);
