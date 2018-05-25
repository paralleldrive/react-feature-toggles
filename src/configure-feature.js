import React from 'react';
import curry from 'ramda/src/curry';
import { Feature } from './feature';

export const configureFeature = curry(
  (inactiveComponent, name, activeComponent) => () => (
    <Feature
      name={name}
      inactiveComponent={inactiveComponent}
      activeComponent={activeComponent}
    />
  )
);
