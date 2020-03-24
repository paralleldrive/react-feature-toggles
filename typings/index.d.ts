declare module '@paralleldrive/react-feature-toggles' {
  import { ComponentClass, SFC, StatelessComponent, Provider, Consumer, ComponentType } from 'react';
  type FeatureNames = ReadonlyArray<string>;
  type Component = ComponentClass | SFC<any> | StatelessComponent;

  export function Feature(props: {
    children: (args: { features: FeatureNames }) => JSX.Element;
  }): JSX.Element;

  export function Feature(props: {
    inactiveComponent: Component;
    activeComponent: Component;
    name: string;
  }): JSX.Element;

  export function FeatureToggles(props: {
    readonly features: FeatureNames;
    readonly children: JSX.Element;
  }): JSX.Element;

  export function configureFeature<T = any,P = any>(
    inactiveComponent: ComponentType<P>
	): (name: string) => (activeComponent: ComponentType<T>) => ComponentType<T>;

  export interface FeatureTogglesContext<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    displayName?: string;
  }

  export function withFeatures(
      component: Component
  ): any;

  export function useFeatures(): FeatureNames;
}
