import React from 'react';
import { FeatureToggles } from './dist/index';
import { featureOr404 } from './hocs/featureOr404';
import { CreateReactAppPage } from './features/CreateReactAppPage';

const CreateReactApp = featureOr404('react', CreateReactAppPage);

export const App = ({ features }) => {
  return (
    <FeatureToggles features={features}>
      <CreateReactApp />
    </FeatureToggles>
  );
};
