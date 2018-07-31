declare module '@paralleldrive/react-feature-toggles' {
  type Component = (props: any) => JSX.Element;

  function Feature(props: {
    inactiveComponent: Component;
    activeComponent: Component;
    name: string;
  }): JSX.Element;
  function Feature(props: {
    children: (obj: { features: ReadonlyArray<string> }) => JSX.Element;
  }): JSX.Element;

  export { Feature };

  function FeatureToggles(props: {
    readonly features: ReadonlyArray<string>;
    readonly children: JSX.Element;
  }): JSX.Element;

  export { FeatureToggles };

  function configureFeature(
    inactiveComponent: Component
  ): (name: string) => (activeComponent: Component) => Component;
  export { configureFeature };
}
