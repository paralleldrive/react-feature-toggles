import React from 'react';
import curry from './curry';
import { Feature } from './feature';

export const configureFeature = curry(
  (InactiveComponent, name, ActiveComponent) => props => (
    <Feature
      name={name}
      inactiveComponent={() => <InactiveComponent {...props} />}
      activeComponent={() => <ActiveComponent {...props} />}
    />
  )
);
