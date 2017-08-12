# Dream Code

// Component to wrap
```js
import configureFeature from 'react-feature-toggle';

const featureOr404 = configureFeature(NotFound);
// featureOrUpgrade, etc...

const Component = () => <div></div>;

export default featureOr404('feature name', Component);
```

```js
const configureFeature = ({ notFound }) => (featureName, Component, fallbackComponent = NotFound) => {
  // implementation
};
```

```js
// ... other page HOC imports

const export default = compose(
  featureToggle
  hoc1,
  hoc2,
);
```
