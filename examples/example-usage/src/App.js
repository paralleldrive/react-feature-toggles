import React from 'react';
import { FeatureToggles, Feature } from '../../../src/index';
import { NFPage } from './features/404-page';
import { Active } from './features/feature';

const features = ['active', 'foo', 'bar'];

export const App = () => {
  return (
    <FeatureToggles features={features}>
      <Feature
        name={'active'}
        inactiveComponent={NFPage}
        activeComponent={Active}
      />
    </FeatureToggles>
  );
};
