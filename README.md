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

The `withFeatures` hoc must receive `query` via props or `context`. Next.js supplies `context` automatically from `getInitialProps()`. `query` should be a [parsed url](https://nodejs.org/api/url.html) query object. You can see an example of how to pass `query` through React components in [react-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper).

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
  requiresFeature('feature-name')
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

Returns a higher order React context provider component. It requires a `query` object that can be passed via props or `context`. `query` should be a [parsed url](https://nodejs.org/api/url.html) object.

```javascript
const Features = (withFeatures = { initialFeatures: [] }());

const Wrapper = () => <Features query={query} />;
```

#### Function Signature

```javascript
withFeatures = ({ initialFeatures = [...Feature] } = {}) => (
  WrappedComponent: ReactComponent
) => ReactComponent;
```

### configureFeature()

Conditionally render components based on enabled/disabled features.

#### Function Signature

```javascript
configureFeature = (DefaultFallbackComponent: ReactComponent) => (
  featureName: String
) => (
  FeatureComponent: ReactComponent,
  FallbackComponent = DefaultFallbackComponent
) => ReactComponent;
```

### getEnabled

Returns all the names of enabled features.

#### Function Signature

```javascript
getEnabled(features: [...Feature]) => featureNames: [...String]
```

#### Use it

```javascript
import { getEnabled } from '@paralleldrive/react-feature-toggles';

const enabledFeatures = getEnabled(features);
```

### isFeatureIncluded

Returns true if the string is included in the array.

#### Function Signature

```javascript
isFeatureIncluded([...Strings], String) => Boolean
```

#### Use it

```javascript
import {
  getEnabled,
  isFeatureIncluded
} from '@paralleldrive/react-feature-toggles';

const enabledFeatures = getEnabled(features);

const helpIsEnabled = isFeatureIncluded(enabledFeatures, 'help');
```

### getIsEnabled

Returns the enabled value of a single feature. If the feature does not exist it is considered disabled.

#### Function signature

```javascript
getIsEnabled(features: [...Feature], featureName: String, ) => enabled: Boolean
```

#### Use it

```javascript
import { getIsEnabled } from '@paralleldrive/react-feature-toggles';

const helpIsEnabled = getIsEnabled(features, 'help');
```

## Enabling a feature from the url

**NOTE:** If you are using server rendering then overriding features from the url will cause React to throw a warning that the client-side HTML result is different from the server.

Add comma-separated names to the `ft` search param. `?ft=FEATURE_NAME,FEATURE_NAME`

**example**

```
http://www.example.com/?ft=help,comments
```
