# react-feature-toggles
Feature Toggles for React Projects

I have an idea for this. I think it would work well if it we structured it similar to react router 4, use React Components to make it very compasable as well as enable url params to change enabled features. I would like feedback on that idea.

## Requirements
* Universal, server and client side
* Conditionally execute code based on the presence or absence of a specific feature. 
* Should be able to toggle features with url parameters
* Feature Dependency. If a feature depends a another feature that is disabled, then neither of them should exectue.

## FeatureToggle Config Object
This will need to be fleshed out quite a bit more, but here is a basic idea
```javascript
{
  'comments': {
    enabled: false,
    dependencies: []
  },
  'user-ratings' {
    enabled: false,
    dependencies: ['comments']
  }
}
```
## Utils

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

## Components

### FeatureToggles
Renders all children and sets an array of enabled features into the React context after checking the window search string for feature overrides.
```javascript
FeatureToggles({ features: Object, children: Object }) => Object
```

### FeatureEnabled
Renders children when a feature is enabled
```javascript
FeatureDisabled({name: String, children: Object}, context: Object) => Object | null
```

### FeatureDisabled
Renders children when a feature is disabled or not declared in context
```javascript
FeatureDisabled({name: String, children: Object}, context: Object) => Object | null
```

## Quick Example

```javascript
<BrowserFeatureToggles features={{
  comments: {
    enabled: true,
    dependencies: []
  }
}}>
  <App>
    <p>Some page Content</p>
    <FeatureEnabled name={'comments'}>
      <div>
        My feature is enabled :)
      </div>
    </FeatureEnabled>
    <FeatureDisabled name={'comments'}>
      <div>
        My feature is not enabled :(
      </div>
    </FeatureEnabled>
    <p>Some other page Content</p>
  </App>
</BrowserFeatureToggles>
```