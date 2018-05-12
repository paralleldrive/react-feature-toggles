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

## Basic Usage

```js
import { FAQComponent } from '../features/faq';
import { NotFoundComponent } from '../features/404-page';
import { FeatureToggles, Feature } from '@paralleldrive/react-feature-toggles';

const features = ['faq', 'foo', 'bar'];

const MyApp = () => {
  return (
    <FeatureToggles features={features}>
      <Feature name="faq" inactiveComponent={NotFoundComponent} activeComponent={FAQComponent}/>
    </FeatureToggles>
  )
}
```

## API

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

#### getEnabledFeatures

`([...Feature]) => [...String]`

Takes an array of feature objects and returns an array of enabled feature names.

#### parseQuery

`(query = {}) => [...String]`

Takes a [query object](https://nodejs.org/api/url.html) and returns an array of enabled feature names.

```js
const query = { ft='foo,bar,help' }
parseQuery(query); // ['foo', 'bar', 'help']
```

#### mergeFeatures

`(...[...String]) => [...String]`

Merge feature names without duplicating.

```js
const currentFeatures = ['foo', 'bar', 'baz'];
mergeFeatures(currentFeatures, ['fish', 'bar', 'cat']); // ['foo', 'bar', 'baz', 'fish', 'cat']
```

#### deactivate

`([...String], [...String]) => [...String]`

Removes feature names

```js
const currentFeatures = ['foo', 'bar', 'baz', 'cat'];
deactivate(currentFeatures, ['fish', 'bar', 'cat']); // ['foo', 'baz']
```

#### isActive

`(featureName = "", features = [...String]) => boolean`

Returns true if a feature name is in the array else it returns false.

```js
const currentFeatures = ['foo', 'bar', 'baz'];
isActive('bar', currentFeatures); // true
isActive('cat', currentFeatures); // false
```

### Components

#### FeatureToggles

FeatureToggles is a provider component.

**props**   
- features = []

```js
import { FeatureToggles } from '@paralleldrive/react-feature-toggles';

const features = ['foo', 'bar', 'baz', 'cat'];

const MyApp = () => {
  return (
    <FeatureToggles features={features}>
      {... stuff}
    </FeatureToggles>
  )
}
```

#### Feature

`Feature` is a consumer component. 

If the feature is enabled then the *activeComponent* will render else it renders the *inactiveComponent*.

Feature takes these **props**   
- name = ""
- inactiveComponent = noop
- activeComponent = null


Feature will pass these **props** to both the *inactiveComponent* and the *activeComponent*
- features = []
- name = ""

```js
import { FeatureToggles, Feature } from '@paralleldrive/react-feature-toggles';

const MyApp = () => {
  return (
    <FeatureToggles>
      <Feature name="faq" inactiveComponent={NotFoundComponent} activeComponent={FAQComponent}/>
      <Feature name="help" inactiveComponent={NotFoundComponent} activeComponent={HelpComponent}/>
    </FeatureToggles>
  )
}
```

Alternatively, you can use `Feature` as a render prop component by passing a function for the children.

```js
import { FeatureToggles, Feature, isActive } from '@paralleldrive/react-feature-toggles';

const MyApp = () => {
  return (
    <FeatureToggles>
      <Feature>
        {({ features }) => isActive('bacon', features) ? 'The bacon feature is active' : 'Bacon is inactive' }
      </Feature>
    </FeatureToggles>
  )
}
```

### HOCs ( Higher Order Components )

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

`(inactiveComponent, feature, activeComponent) => Component`

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

## Applying query overrides

Query logic has been moved out of the provider component, you should now handle this logic before passing features to `FeatureToggles`

```js
import { FeatureToggles, mergeFeatures, parseQuery } from '@paralleldrive/react-feature-toggles';
import parse from 'url-parse';

const url = 'https://domain.com/foo?ft=foo,bar';
const query = parse(url, true);
const initialFeatures = ['faq', 'foo', 'bar'];
const features = mergeFeatures(initialFeatures, parseQuery(query));

const MyApp = () => {
  return (
    <FeatureToggles features={features}>
      {...stuff}
    </FeatureToggles>
  )
}
```
