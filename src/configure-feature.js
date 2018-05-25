import React from 'react';
import curry from 'ramda/src/curry';
import { Feature } from './feature';

export const configureFeature = curry(
  (inactiveComponent, feature, activeComponent) => () => (
    <Feature
      name={feature}
      inactiveComponent={inactiveComponent}
      activeComponent={activeComponent}
    />
  )
);
