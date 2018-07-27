import React from 'react';
import { FeatureToggles } from './feature-toggles';

export const withFeatureToggles = ({ features } = {}) => Component => props => (
  <FeatureToggles features={features}>
    <Component {...props} />
  </FeatureToggles>
);
