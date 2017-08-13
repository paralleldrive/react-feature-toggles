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
withFeatures = ({
  initialFeatures = {},
  windowLocationSearch = ""
} = {}) => (WrappedComponent: ReactComponent) => ReactComponent
```

__initialFeatures__

```javascript
const initialFeatures = {
  'comments': {
    enabled: false,
    dependencies: []
  },
  'user-ratings': {
    enabled: false,
    dependencies: ['comments']
  }
}
```

__windowLocationSearch__

Should be a string that is equivalent to the browser `window.location.search`; this is mostly used test for purposes.

```javascript
const windowLocationSearch = '?ft=comments'
```

### configureFeature()

Conditionally renders components based on enabled features in the React context.

```javascript
configureFeature =
  (NotFoundComponent: ReactComponent) =>
  (featureName: String) =>
  (FeatureComponent: ReactComponent, FallbackComponent = NotFoundComponent) => ReactComponent
```
**🚧  _Work in Progress_ 🚧**

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
