declare module '@paralleldrive/react-feature-toggles' {
  import * as React from 'react';

  type Feature1 = {
    children?: (features: ReadonlyArray<string>) => React.ReactNode;
  };
  type Feature2 = {
    inactiveComponent: () => React.ReactNode;
    activeComponent: () => React.ReactNode;
    name: string;
  };
  function Feature({ children }: Feature1): React.ReactNode;
  function Feature({ inactiveComponent, name, activeComponent }: Feature2);
  export { Feature };

  function FeatureToggles({
    features
  }?: {
    readonly features?: ReadonlyArray<string>;
    readonly children?: React.ReactNode;
  }): JSX.Element;
  export { FeatureToggles };

  function configureFeature(
    inactiveComponent: React.ReactNode
  ): (name: string) => (activeComponent: React.ReactNode) => () => JSX.Element;
  export { configureFeature };
}
