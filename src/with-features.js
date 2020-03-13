import React from 'react';
import { FeatureTogglesContext } from './context';

export const withFeatures = Component => props => {
  return (
    <FeatureTogglesContext.Consumer>
      {features => <Component {...props} features={features} />}
    </FeatureTogglesContext.Consumer>
  );
};
