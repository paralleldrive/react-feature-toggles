# Dream Code

## HOC to supply hasFeature through props or context

```js
// ... other page HOC imports
const export default = compose(
  // actually render-prop under the hood
  withFeatures(initialFeatures)
  hoc1,
  hoc2,
);
```

## Conditionally render a component based on feature state

```js
import { configureFeature } from 'react-feature-toggles';

// Set default feature-not-available component for whole app.
const featureOr404 = configureFeature(NotFound);
export default featureOr404;
```

## Render the feature if my-feature-name is enabled, else render 404

```js
import featureOr404 from './feature-or-404';
const Component = () => <div>This component requires 'my-feature-name'</div>;

export default featureOr404('my-feature-name', Component);
```
