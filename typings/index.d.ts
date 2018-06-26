declare module '@paralleldrive/react-feature-toggles' {
  import * as React from 'react';

  interface Feature {
    readonly name: string;
    readonly isActive: boolean;
    readonly dependencies?: ReadonlyArray<string>;
  }

  type Feature1 = { children?: (features: any) => React.ReactNode };
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

  type ConfigureFeature1 = (
    name: string,
    activeComponent: React.ReactNode
  ) => () => JSX.Element;
  type ConfigureFeature2 = (
    name: string
  ) => (activeComponent: React.ReactNode) => () => JSX.Element;

  function configureFeature(
    inactiveComponent: React.ReactNode
  ): ConfigureFeature1 & ConfigureFeature2;
  function configureFeature(
    inactiveComponent: React.ReactNode,
    name: string
  ): (activeComponent: React.ReactNode) => () => JSX.Element;
  function configureFeature(
    inactiveComponent: React.ReactNode,
    name: string,
    activeComponent: React.ReactNode
  ): () => JSX.Element;
  export { configureFeature };
}
