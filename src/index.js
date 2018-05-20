import configureFeature from './configure-feature';
import createRouteMiddleware from './create-route-middleware';
import getIsEnabled from './get-is-enabled';
import getEnabled from './get-enabled';
import updateFeaturesWithQuery from './update-features-with-query';

export { mergeFeatures } from './merge-features';
export { isActive } from './is-active';
export { FeatureToggles } from './feature-toggles';
export { Feature } from './feature';
export { deactivateFeatures } from './deactivate-features';

export {
  configureFeature,
  createRouteMiddleware,
  getIsEnabled,
  getEnabled,
  updateFeaturesWithQuery
};
