import React from 'react';
import PropTypes from 'prop-types';
import { isActive } from './is-active';

const configureFeature = Default => featureName => (
  Feature,
  Fallback = Default
) => {
  const ConfigureFeatureHOC = (props, context) => {
    const isEnabled = isActive(featureName, context.features);
    return isEnabled ? <Feature {...props} /> : <Fallback {...props} />;
  };
  ConfigureFeatureHOC.contextTypes = {
    features: PropTypes.array
  };
  return ConfigureFeatureHOC;
};

export default configureFeature;
