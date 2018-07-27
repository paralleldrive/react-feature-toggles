import React from 'react';
import { Feature } from './feature';

export const configureFeature = inactiveComponent => name => activeComponent => () => (
  <Feature
    name={name}
    inactiveComponent={inactiveComponent}
    activeComponent={activeComponent}
  />
);
