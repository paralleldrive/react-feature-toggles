# react-feature-toggles

[![Build Status](https://travis-ci.com/paralleldrive/react-feature-toggles.svg?token=Ba8H1FN3UT5CqqFhs2AM&branch=master)](https://travis-ci.com/paralleldrive/react-feature-toggles)

## Requirements

React Feature Toggles attempts to satisify the following requirements

* Universal, server and client side
* Conditionally execute code based on the presence or absence of a specific feature. 
* Toggle features on with url parameters
* Feature Dependency. If a feature depends a another feature that is disabled, then neither of them should exectue.

## API

### withFeatures()

Creates an array of enabled features, then sets the features array into react context and passes it onto the wrapped component via props.

```javascript
withFeatures = ({
  initialFeatures = {}, 
  windowLocationSearch = ""
} = {}) => (Component: ReactComponent) => ReactComponent
```


__example config object__

```javascript
{
  windowLocationSearch: '?ft=comments'
  initialFeatures: {
    'comments': {
      enabled: false,
      dependencies: []
    },
    'user-ratings': {
      enabled: false,
      dependencies: ['comments']
    }
  }
}
```

### configureFeature()

Conditionally renders components based on enabled features

```javascript
configureFeature =
  (NotFound: ReactComponent) =>
  (featureName: String) => 
  (Component: ReactComponent) =>
  (FallbackComponent = NotFound: ReactComponent) => ReactComponent | null
```


In progress

### Utils

### getEnabled
Returns all the names of enabled features
```javascript
getEnabled(features: Object) => enabledFeatureNames: [...String]
```

### getIsEnabled
Returns the enabled value of a single feature. If the feature does not exist it is considered disabled
```javascript
getIsEnabled(featureName: String, features: Object) => enabled: Boolean
```
