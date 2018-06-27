declare module '@paralleldrive/react-feature-toggles' {
  import * as React from 'react';
  
  interface Feature {
    readonly name: string;
    readonly isActive: boolean;
    readonly dependencies?: ReadonlyArray<string>;
  }

  interface Query {
    readonly ft: string;
  }
  
  interface Req {
    readonly query: Query;
  }
  
  interface CurrentActiveFeatures {
    readonly initialFeatures: ReadonlyArray<string>;
    readonly req?: Req;
    readonly search?: string;
  }
  
  function Feature(
    inactiveComponent: any,
    activeComponent: any,
    name: string,
    children?: (args: React.ReactNode) => React.ReactNode
  ): JSX.Element;
  export { Feature };

  function FeatureToggles({
    features
  }?: {
    readonly features?: ReadonlyArray<string>;
    readonly children?: React.ReactNode;
  }): JSX.Element;
  export { FeatureToggles };

  function getActiveFeatures(
    features: ReadonlyArray<Feature>
  ): ReadonlyArray<string>;
  export { getActiveFeatures };

  function getQueryFeatures(query?: Query): ReadonlyArray<string>;
  export { getQueryFeatures };

  function mergeFeatures(
    currentFeatures: ReadonlyArray<string>, // tslint:disable-next-line:readonly-array
    ...restOfFeatures: Array<ReadonlyArray<string>>
  ): ReadonlyArray<string>;
  export { mergeFeatures };

  function removeFeatures(
    currentFeatures: ReadonlyArray<string>,
    features: ReadonlyArray<string>
  ): ReadonlyArray<string>;
  export { removeFeatures };

  function isActive(
    name: string,
    currentFeatures: ReadonlyArray<string>
  ): boolean;
  function isActive(
    name: string
  ): (currentFeatures: ReadonlyArray<string>) => boolean;
  export { isActive };

  function getReqQueryFeatures(req?: Req): ReadonlyArray<string>;
  export { getReqQueryFeatures };

  function getBrowserQueryFeatures(search?: string): ReadonlyArray<string>;
  export { getBrowserQueryFeatures };

  function getCurrentActiveFeatures(
    obj: CurrentActiveFeatures
  ): ReadonlyArray<string>;
  export { getCurrentActiveFeatures };

  function configureFeature(
    inactiveComponent: any
  ): (name: string) => (activeComponent: any) => () => JSX.Element;
  function configureFeature(
    inactiveComponent: any
  ): (name: string, activeComponent: any) => () => JSX.Element;
  function configureFeature(
    inactiveComponent: any,
    name: string
  ): (activeComponent: any) => () => JSX.Element;
  function configureFeature(
    inactiveComponent: any,
    name: string,
    activeComponent: any
  ): () => JSX.Element;
  export { configureFeature };
}
