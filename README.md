# react-feature-toggles

[![Build Status](https://travis-ci.com/paralleldrive/react-feature-toggles.svg?token=Ba8H1FN3UT5CqqFhs2AM&branch=master)](https://travis-ci.com/paralleldrive/react-feature-toggles)

## Requirements

React Feature Toggles attempts to satisfy the following requirements:

* Universal - server and client side
* Conditionally execute code based on the presence or absence of a specific feature
* Toggle features on with url parameters
* Feature Dependency - if a feature depends on a another feature that is disabled, then neither of them should execute


## Example

### A page
Imagine you have a help chat feature you want to keep hidden until the feature is ready to be released.
If someone visits the help chat page, you want to show a 404 component.

Lets create a help chat component placeholder to start, imagine it shows chat messages and what not. 
```javascript
// help-chat-component.js
const HelpChat = () => <div>my real help chat stuff goes here..</div>;
export default HelpChat;
```

We then need to let our components know what features are enabled. To do this we can use the `withFeatures` HOC to wrap our page component.

```javascript
// help-chat-page.js
import { withFeatures } from 'react-feature-toggles';
import HelpChatContainer from './help-chat-container';
export default withFeatures({
  initialFeatures: [
    { name: 'help-chat', enabled: false, dependencies: [] }, // Specify the 'help-chat' feature
    { name: 'a-feature', enabled: true, dependencies: [] },
    { name: 'b-feature', enabled: false, dependencies: [] }
  ]
})(HelpChatContainer);
```


We might have other features in the future that should render a 404 page by default when they are disabled, so lets create a reusable component that renders the apps 404 when the given feature is not enabled. We can use `configureFeature` to build this component.

```javascript
// feature-404.js
import App404 from './app-404-component';
import { configureFeature } from 'react-feature-toggles';
export default configureFeature(App404);
```

We can now use `feature-404` anwhere we want to show a 404 page when a feature is disabled. Lets use it for our help chat container that gets rendered by the help chat page.

```javascript
// help-chat-container.js
import feature404 from './feature-404.js'
import HelpChat from './help-chat-component';

const help404 = feature404('help-chat');
export default help404(HelpChat);
```
It should now only render the HelpChat component when `help-chat` is enabled, and the 404 component when its not enabled.


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
