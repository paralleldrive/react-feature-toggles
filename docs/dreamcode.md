# Dream Code

## HOC to supply feature list as a prop
```js
// ... other page HOC imports

const export default = compose(
  withFeatures(initialFeatures)
  hoc1,
  hoc2,
);
```


## Conditionally render a component based on feature state
```js
import { configureFeature } from 'react-feature-toggles';

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
