import configureFeature from './configure-feature';
import createRouteMiddleware from './create-route-middleware';
import getIsEnabled from './get-is-enabled';
import getEnabledFeatures from './get-enabled-features';
import updateFeaturesWithQuery from './update-features-with-query';

export { mergeFeatures } from './merge-features';
export { isActive } from './is-active';
export { FeatureToggles } from './feature-toggles';
export { Feature } from './feature';
export { deactivateFeatures } from './deactivate-features';
export { parseQuery } from './parse-query';
export { withFeatureToggles } from './with-feature-toggles';

export {
  configureFeature,
  createRouteMiddleware,
  getIsEnabled,
  getEnabledFeatures,
  updateFeaturesWithQuery
};
