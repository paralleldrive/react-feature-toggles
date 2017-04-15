# react-feature-toggles
Feature Toggles for React Projects

I have an idea for this. I think it would work well if it we structured it similar to react router 4, use React Components to make it very compasable as well as enable url params to change enabled features. I would like feedback on that idea, also where are we going to keep this library/module. Do you want it private? On my github or paralleldrive.

## Requirements
* Universal, server and client side
* Conditionally execute code based on the presence or absence of a specific feature. 
* Should be able to toggle features with url parameters
* Feature Dependency. If a feature requires a another feature that is disabled, then neither of them should exectue.

## FeatureToggle Config Object
This will need to be fleshed out quite a bit more, but here is a basic idea
```javascript
{
  'comments': {
    enabled: false,
    allow_url_params_override: true,
    requires: []
  },
  'user-ratings' {
    enabled: false,
    allow_url_params_override: true,
    requires: ['comments']
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

### <BrowserFeatureToggles />
Same as FeatureToggles but merges the featuresthe browser search params so that features can be enabled or disabled via the url


### DisplayFeature
Takes a features name and renders it if the feature is enabled.
It checks the feature state via react context and renders its children if the features is enabled.

#### Props
* `featureName` (String) the name of a feature
* `children` (React Element)


