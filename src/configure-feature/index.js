import React from 'react';
import PropTypes from 'prop-types';

//
// const configureFeature =
//   (NotFoundComponent: ReactComponent) =>
//   (featureName: String) =>
//   (FeatureComponent: ReactComponent, FallbackComponent = NotFoundComponent) => ReactComponent
//

const checkIfEnabled = (featureName, features) =>
  features.indexOf(featureName) >= 0;

const configureFeature = NotFoundComponent => featureName => (
  FeatureComponent,
  FallbackComponent = NotFoundComponent
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
