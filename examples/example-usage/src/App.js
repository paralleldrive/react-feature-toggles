import React from 'react';
import { FeatureToggles } from './dist/index';
import { featureOr404 } from './hocs/featureOr404';
import { CreateReactAppPage } from './features/CreateReactAppPage';
import { withButtons } from './hocs/withButtons';

const CreateReactApp = featureOr404('react', CreateReactAppPage);
const features = ['react'];

export const App = withButtons(({ features }) => {
  return (
    <FeatureToggles features={features}>
      <CreateReactApp />
    </FeatureToggles>
  );
})(features);
