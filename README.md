# react-feature-toggles

[![Build Status](https://travis-ci.com/paralleldrive/react-feature-toggles.svg?token=Ba8H1FN3UT5CqqFhs2AM&branch=master)](https://travis-ci.com/paralleldrive/react-feature-toggles)

## Requirements

React Feature Toggles attempts to satisfy the following requirements:

* Universal - server and client side
* Conditionally execute code based on the presence or absence of a specific feature
* Toggle features on with url parameters
* Feature Dependency - if a feature depends on a another feature that is disabled, then neither of them should execute

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
  (DefaultFallbackComponent: ReactComponent) =>
  (featureName: String) =>
  (FeatureComponent: ReactComponent, FallbackComponent = DefaultFallbackComponent) => ReactComponent
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
