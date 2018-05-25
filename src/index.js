import createRouteMiddleware from './create-route-middleware';
import getEnabledFeatures from './get-enabled-features';
import updateFeaturesWithQuery from './update-features-with-query';

export { configureFeature } from './configure-feature';
export { mergeFeatures } from './merge-features';
export { isActive } from './is-active';
export { FeatureToggles } from './feature-toggles';
export { Feature } from './feature';
export { deactivateFeatures } from './deactivate-features';
export { parseQuery } from './parse-query';

export {
  createRouteMiddleware,
  getEnabledFeatures,
  updateFeaturesWithQuery
};
