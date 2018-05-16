import curry from 'ramda/src/curry';

export const isActive = curry((featureName = '', features = []) =>
  features.includes(featureName)
);
