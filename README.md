# React Feature Toggles

[![Build Status](https://travis-ci.com/paralleldrive/react-feature-toggles.svg?token=Ba8H1FN3UT5CqqFhs2AM&branch=master)](https://travis-ci.com/paralleldrive/react-feature-toggles)

## Version 2

This is version 2, it contains many breaking changes from version 1.

## Requirements

React Feature Toggles attempts to satisfy the following requirements:

- Universal - server and client side
- Conditionally execute code based on the presence or absence of a specific feature
- Toggle features on with url parameters
- Feature Dependency - if a feature depends on a another feature that is disabled, then neither of them should execute

## Install

```
npm install --save @paralleldrive/react-feature-toggles
```

## Basic Usage

```js
import { FAQComponent } from '../features/faq';
import { NotFoundComponent } from '../features/404-page';
import { FeatureToggles, Feature } from '@paralleldrive/react-feature-toggles';

const features = ['faq', 'foo', 'bar'];

const MyApp = () => {
  return (
    <FeatureToggles features={features}>
      <Feature
        name="faq"
        inactiveComponent={NotFoundComponent}
        activeComponent={FAQComponent}
      />
    </FeatureToggles>
  );
};
```

## API

### Components

#### FeatureToggles

`FeatureToggles` is a provider component.

**props**

- features = []

```js
import { FeatureToggles } from '@paralleldrive/react-feature-toggles';

const features = ['foo', 'bar', 'baz', 'cat'];

const MyApp = () => {
  return <FeatureToggles features={features}>{...stuff}</FeatureToggles>;
};
```

#### Feature

`Feature` is a consumer component.

If the feature is enabled then the _activeComponent_ will render else it renders the _inactiveComponent_.

Feature takes these **props**

- name = ""
- inactiveComponent = noop
- activeComponent = null

```js
import { FeatureToggles, Feature } from '@paralleldrive/react-feature-toggles';

const MyApp = () => {
  return (
    <FeatureToggles>
      <Feature
        name="faq"
        inactiveComponent={NotFoundComponent}
        activeComponent={FAQComponent}
      />
      <Feature
        name="help"
        inactiveComponent={NotFoundComponent}
        activeComponent={HelpComponent}
      />
    </FeatureToggles>
  );
};
```

Alternatively, you can use `Feature` as a render prop component. Do this by passing a function as the children to the `Feature` component. Note: This will only work if an `activeComponent` is not provided.

```js
import {
  FeatureToggles,
  Feature,
  isActive
} from '@paralleldrive/react-feature-toggles';

const MyApp = () => {
  return (
    <FeatureToggles>
      <Feature>
        {({ features }) =>
          isActive('bacon', features)
            ? 'The bacon feature is active'
            : 'Bacon is inactive'
        }
      </Feature>
    </FeatureToggles>
  );
};
```

### Higher Order Components

#### withFeatureToggles

`({ features = [...String] } = {}) => Component => Component`

You can use `withFeatureToggles` to compose your page functionality.

```js
import MyPage from '../feautures/my-page';
import { withFeatureToggles } from '@paralleldrive/react-feature-toggles';

const features = ['foo', 'bar', 'baz', 'cat'];

export default = compose(
  withFeatureToggles({ features }),
  // ... other page HOC imports
  hoc1,
  hoc2,
);
```

Depending on your requirements, you might need something slightly different than the default `withFeatureToggles`. The default `withFeatureToggles` should serve as a good example to create your own.

#### configureFeature

`(inactiveComponent, name, activeComponent) => Component`

`configureFeature` is a higher order component that allows you to configure a `Feature` component. configureFeature is auto curried so that you can partially apply the props.

```js
import { FeatureToggles } from '@paralleldrive/react-feature-toggles';
const NotFoundPage = () => <div>404</div>;
const ChatPage = () => <div>Chat</div>;

const featureOr404 = configureFeature(NotFoundPage);
const Chat = featureOr404('chat', ChatPage);

const features = ['foo', 'bar', 'chat'];

const myPage = () => (
  <FeatureToggles features={features}>
    <Chat />
  </FeatureToggles>
);
```

### Interfaces

#### Feature

```js
interface Feature {
  name: String,
  isActive: false,
  dependencies?: [...String]
}
```

### Functions

#### getActiveFeatures

`([...Feature]) => [...String]`

Takes an array of feature objects and returns an array of active feature names.

#### getQueryFeatures

`(query = {}) => [...String]`

Takes a [query object](https://nodejs.org/api/url.html) and returns an array of enabled feature names.

```js
const query = { ft='foo,bar,help' }
getQueryFeatures(query); // ['foo', 'bar', 'help']
```

#### mergeFeatures

`(...[...String]) => [...String]`

Merge feature names without duplicating.

```js
const currentFeatures = ['foo', 'bar', 'baz'];
mergeFeatures(currentFeatures, ['fish', 'bar', 'cat']); // ['foo', 'bar', 'baz', 'fish', 'cat']
```

#### removeFeatures

`([...String], [...String]) => [...String]`

Removes feature names

```js
const currentFeatures = ['foo', 'bar', 'baz', 'cat'];
removeFeatures(currentFeatures, ['fish', 'bar', 'cat']); // ['foo', 'baz']
```

#### isActive

`(String, [...String]) => boolean`

Returns true if a feature name is in the array else it returns false.

```js
const currentFeatures = ['foo', 'bar', 'baz'];
isActive('bar', currentFeatures); // true
isActive('cat', currentFeatures); // false
```

#### getReqQueryFeatures

`(req = {}) => [...String]`

Takes a [req object](https://expressjs.com/en/api.html#req.query) and returns an array of enabled feature names.

```js
const req = {
  query:{
    ft='foo,bar,help'
  }
};

getReqQueryFeatures(req); // ['foo', 'bar', 'help']
```

#### getBrowserQueryFeatures

Takes a `window.location.search` string and returns an array of active feature names. If search is not provided will grab the global `window.location.search` if available.

`(search?) => [...String]`

```js
const search = '?ft=foo,bar,baz';

getBrowserQueryFeatures(search); // ['foo', 'bar', 'baz']
```

#### getCurrentActiveFeatures

Takes an array of initialFeatures, a req object, and a `window.location.search` string and returns an array of active Features. If search is not provided will grab the global `window.location.search` if available.

`({ initialFeatures = [...String], req? , search? }) => [...String])]`

```js
const initialFeatures = ['cat', 'bar'];
const req = {
    query:{
      ft='fiz,bat,help'
    }
  };
const search = '?ft=foo,bar,baz';

getCurrentActiveFeatures({ initialFeatures, req, search }); // ['cat', 'bar', 'fiz', 'bat', 'help', 'foo', 'baz']
getCurrentActiveFeatures({ initialFeatures }); // -> parses the `window.location.search` string if present if not -> ['cat', 'bar']
```

#### createExpressMiddleware

Takes an array of initialFeatures and an object with a required feature and methods.

`({ initialFeatures: [...String] }, { requiredFeature: String, ...methods }) => (req, res, next) => void`

```js
const initialFeatures = ['cat', 'bar'];
createExpressMiddleware(initialFeatures, { 'help', get: (req, res) => { res.send() } }) //res.statusCode = 404
createExpressMiddleware(initialFeatures, { 'cat', get: (req, res) => { res.send() } }) //res.statusCode = 200
```

## Enabling features from the URL

In v2, query logic has been moved out of the provider component. You should now handle this logic before passing features to `FeatureToggles`

```js
import {
  FeatureToggles,
  mergeFeatures,
  getQueryFeatures
} from '@paralleldrive/react-feature-toggles';
import parse from 'url-parse';

const url = 'https://domain.com/foo?ft=foo,bar';
const query = parse(url, true);
const initialFeatures = ['faq', 'foo', 'bar'];
const features = mergeFeatures(initialFeatures, getQueryFeatures(query));

const MyApp = () => {
  return <FeatureToggles features={features}>{...stuff}</FeatureToggles>;
};
```
