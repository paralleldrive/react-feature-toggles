# react-feature-toggles

[![Build Status](https://travis-ci.com/paralleldrive/react-feature-toggles.svg?token=Ba8H1FN3UT5CqqFhs2AM&branch=master)](https://travis-ci.com/paralleldrive/react-feature-toggles)

## Requirements

React Feature Toggles attempts to satisfy the following requirements:

* Universal - server and client side
* Conditionally execute code based on the presence or absence of a specific feature
* Toggle features on with url parameters
* Feature Dependency - if a feature depends on a another feature that is disabled, then neither of them should execute


## Example
### For a component inside a page.
We are going to use the folder structure for nextjs for this example.
```
// game-component.js
const NotFound = () => <div className="not-found">No help for you today!</div>;
const HelpChatComponent = () => <div className="help-chat">Need help? Call XXX-XXXXX</div>
const ConfiguredHelpChatComponent = configureFeature(NotFound)('help')(HelpChatComponent);
const GameComponent = () => (
  <div>Hello, how would you like to play bacon maze!</div>
  <div>Click here to start</div>
  <ConfiguredHelpChatComponent />
);
export default ConfiguredHelpChatComponent
```

```
// game-page.js
import { withFeatures } from 'react-feature-toggles';
import GameComponent from './game-component';
export default withFeatures({
  initialFeatures: [
    { name: 'game-help-chat', enabled: false, dependencies: [] }
  ]
})(GameComponent);
```

## API

### withFeatures()

Creates an array of enabled features, then sets the features array into React context and passes it onto the wrapped component via props.



```javascript
// withFeatures() function signature.
const withFeatures = ({
  initialFeatures = [],
  windowLocationSearch = ""
} = {}) => (WrappedComponent: ReactComponent) => ReactComponent
```

__initialFeatures__

```javascript
interface Feature {
  name: String,
  enabled?: false,
  dependencies?: [...featureName: String]
}
const initialFeatures = [ ...Feature]
```

__windowLocationSearch__

Should be a string that is equivalent to the browser `window.location.search`; this is mostly used for testing purposes.

```javascript
const windowLocationSearch = '?ft=comments'
```

### configureFeature()

Conditionally renders components based on enabled features in the React context.

```javascript
// configureFeatures() function signature
const configureFeature =
  (NotFoundComponent: ReactComponent) =>
  (featureName: String) =>
  (FeatureComponent: ReactComponent, FallbackComponent = NotFoundComponent) => ReactComponent
```

### Utils

### getEnabled
Returns all the names of enabled features.

```javascript
getEnabled(features: Object) => enabledFeatureNames: [...String]
```

### getIsEnabled
Returns the enabled value of a single feature. If the feature does not exist it is considered disabled.

```javascript
getIsEnabled(featureName: String, features: Object) => enabled: Boolean
```
