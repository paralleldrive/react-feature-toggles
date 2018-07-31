declare module '@paralleldrive/react-feature-toggles' {
  type features = ReadonlyArray<string>;
  type Component = (props: any) => JSX.Element;

  export function Feature(props: {
    children: (obj: { features: features }) => JSX.Element;
  }): JSX.Element;

  export function Feature(props: {
    inactiveComponent: Component;
    activeComponent: Component;
    name: string;
  }): JSX.Element;

  export function configureFeature(
    inactiveComponent: Component
  ): (name: string) => (activeComponent: Component) => Component;

  export function FeatureToggles(props: {
    readonly features: features;
    readonly children: JSX.Element;
  }): JSX.Element;

  export function withFeatureToggles(config: { features: features }): Component;
}
