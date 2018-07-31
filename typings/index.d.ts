declare module '@paralleldrive/react-feature-toggles' {
  import * as React from 'react';

  function Feature({
    children
  }: {
    children?: (
      { features }: { features: ReadonlyArray<string> }
    ) => React.ReactNode;
  }): React.ReactNode;
  function Feature({
    inactiveComponent,
    name,
    activeComponent
  }: {
    inactiveComponent: () => React.ReactNode;
    activeComponent: () => React.ReactNode;
    name: string;
  });
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
