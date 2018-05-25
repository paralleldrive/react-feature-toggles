import React from 'react';
import { FeatureToggles } from './feature-toggles';

// ({ features = [...String] } = {}) => Component => Component

export const withFeatureToggles = ({ features } = {}) => Component => () => (
  <FeatureToggles features={features}>
    <Component />
  </FeatureToggles>
);
