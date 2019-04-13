import React from 'react';
import curry from './curry';
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
