import React from 'react';
import PropTypes from 'prop-types';
import isFeatureIncluded from './is-feature-included';

const configureFeature = Default => featureName => (
  Feature,
  Fallback = Default
) => {
  const ConfigureFeatureHOC = (props, context) => {
    const isEnabled = isFeatureIncluded(context.features, featureName);
    return isEnabled
      ? <Feature {...props} />
      : <Fallback {...props} />;
  };
  ConfigureFeatureHOC.contextTypes = {
    features: PropTypes.array
  };
  return ConfigureFeatureHOC;
};

export default configureFeature;
