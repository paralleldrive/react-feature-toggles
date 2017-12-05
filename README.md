# react-feature-toggles

[![Build Status](https://travis-ci.com/paralleldrive/react-feature-toggles.svg?token=Ba8H1FN3UT5CqqFhs2AM&branch=master)](https://travis-ci.com/paralleldrive/react-feature-toggles)

## Requirements

React Feature Toggles attempts to satisfy the following requirements:

* Universal - server and client side
* Conditionally execute code based on the presence or absence of a specific feature
* Toggle features on with url parameters
* Feature Dependency - if a feature depends on a another feature that is disabled, then neither of them should execute

## Install
```
npm install --save @paralleldrive/react-feature-toggles
```

## Setup

Setup withFeatures in the page HOC composition

```javascript
import { withFeatures } from '@paralleldrive/react-feature-toggles';
import initialFeatures from '../config/initial-features';

const pageHOC = compose(
  withRedux,
  withFeatures({ initialFeatures }),
  hoc1,
  hoc2
);
```

Configure the component fallback:

```javascript
import NotFound from '../components/not-found-component';
import { configureFeature } from '@paralleldrive/react-feature-toggles';

const requiresFeature = configureFeature(NotFound);

export default requiresFeature;
```

Build your component that requires a specific feature:

```javascript
import compose from 'lodash/fp/compose';

import requiresFeature from '../hocs/requiresFeature';
import MyComponent from '../components/my-component';
import pageHOC from '../hocs/page';

const MyPage = compose(
  pageHOC, // withFeatures should be in there
  requiresFeature('feature-name'),
  // Optionally, anything special for this page should be here, e.g.,
  // requiresRole('admin')
)(MyComponent);

export default MyPage;
```

## Interfaces

### Feature

```javascript
interface Feature {
  name: String,
  enabled: false,
  dependencies?: [...featureName: String]
}
```

## API

### withFeatures()

Returns a higher order React context provider component.

#### Function Signature

```javascript
withFeatures = ({
  initialFeatures = [ ...Feature ],
  windowLocationSearch = ""
} = {}) => (WrappedComponent: ReactComponent) => ReactComponent
```

### configureFeature()
Conditionally render components enabled features in the React context.

#### Function Signature

```javascript
configureFeature =
  (DefaultFallbackComponent: ReactComponent) =>
  (featureName: String) =>
  (FeatureComponent: ReactComponent, FallbackComponent = DefaultFallbackComponent) => ReactComponent
```

### getEnabled
Returns all the names of enabled features.

#### Function Signature

```javascript
getEnabled(features: [...Feature]) => featureNames: [...String]
```

#### Function Signature

```javascript
import { getEnabled } from '@paralleldrive/react-feature-toggles';

const enabledFeatures = getEnabled(features);
```

### getIsEnabled
Returns the enabled value of a single feature. If the feature does not exist it is considered disabled.

```javascript
getIsEnabled(features: [...Feature], featureName: String, ) => enabled: Boolean
```

```javascript

import { getIsEnabled } from '@paralleldrive/react-feature-toggles';

const helpIsEnabled = getIsEnabled(features, 'help');

```

## Enabling a feature from the url

__NOTE:__ If you are using server rendering then overriding features from the url will cause React to throw a warning that the client-side HTML result is different from the server.

Add comma-separated names to the `ft` search param. `?ft=FEATURE_NAME,FEATURE_NAME`

__example__
```
http://www.domain.com/?ft=help,comments
```

