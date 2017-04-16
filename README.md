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

## Components

### FeatureToggles
Takes feature configuration and sets it into react context 
This component should wrap the app.

#### Props
* `features` (FeatureToggle config object)
* `children` (React Element)

### BrowserFeatureToggles
This component check the url params, and applies updates to the features object then pass it to the FeaturesToggles Component.

#### Props
* `features` (FeatureToggle config object)
* `children` (React Element)

### FeatureEnabled
Checks the features state via react context and renders the children if the feature is enabled. It will not render the children if the
feature is not specified.

#### Props
* `name` (String) the name of a feature
* `children` (React Element)

### FeatureDisabled
Checks the features state via react context and renders the children if the feature is disabled. It will also render the children if the feature is not specified.

#### Props
* `name` (String) the name of a feature
* `children` (React Element)

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