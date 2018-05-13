import withFeatures from './with-features';
import configureFeature from './configure-feature';
import createRouteMiddleware from './create-route-middleware';
import getIsEnabled from './get-is-enabled';
import getEnabled from './get-enabled';
import isFeatureIncluded from './is-feature-included';
import updateFeaturesWithQuery from './update-features-with-query';

export { mergeFeatures } from './merge-features';
export { FeatureToggles } from './feature-toggles';
export { Feature } from './feature';

export {
  withFeatures,
  configureFeature,
  createRouteMiddleware,
  getIsEnabled,
  getEnabled,
  isFeatureIncluded,
  updateFeaturesWithQuery
};
