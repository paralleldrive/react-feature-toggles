import React from 'react';
import PropTypes from 'prop-types';

//
// const configureFeature =
//   (DefaultFallbackComponent: ReactComponent) =>
//   (featureName: String) =>
//   (FeatureComponent: ReactComponent, FallbackComponent = DefaultFallbackComponent) => ReactComponent
//

const checkIfEnabled = (featureName, features) =>
  features.indexOf(featureName) >= 0;

const configureFeature = DefaultFallbackComponent => featureName => (
  FeatureComponent,
  FallbackComponent = DefaultFallbackComponent
) => {
  const ConfigureFeatureHOC = (props, context) => {
    const isEnabled = checkIfEnabled(featureName, context.features);
    return isEnabled
      ? <FeatureComponent {...props} />
      : <FallbackComponent {...props} />;
  };
  ConfigureFeatureHOC.contextTypes = {
    features: PropTypes.array
  };
  return ConfigureFeatureHOC;
};

export default configureFeature;
