# React Feature Toggles

[![Build Status](https://travis-ci.com/paralleldrive/react-feature-toggles.svg?token=Ba8H1FN3UT5CqqFhs2AM&branch=master)](https://travis-ci.com/paralleldrive/react-feature-toggles)[![Known Vulnerabilities](https://snyk.io/test/github/paralleldrive/react-feature-toggles/badge.svg?targetFile=package.json)](https://snyk.io/test/github/paralleldrive/react-feature-toggles?targetFile=package.json)

## Version 2

This is version 2, it contains many breaking changes from version 1.

## Requirements

React Feature Toggles attempts to satisfy the following requirements:

- Universal - server and client side
- Conditionally render components based on the presence or absence of a specific feature


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
import { FeatureToggles, Feature } from '@paralleldrive/react-feature-toggles';
import { isActiveFeatureName } from '@paralleldrive/feature-toggles';
const MyApp = () => {
  return (
    <FeatureToggles>
      <Feature>
        {({ features }) =>
          isActiveFeatureName('bacon', features)
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

`(inactiveComponent: Component) => (name: String) => (activeComponent: Component) => Component`

`configureFeature` is a higher order component that allows you to configure a `Feature` component.

`configureFeature` is autocurried, so you can call it with one or more of its arguments to create a partial application of the function. In the following example, `featureOr404()` is a partial application of `configureFeature()`:

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

#### withFeatures

If you'd prefer to directly access the list of active Features, you can obtain a `features` prop with the HoC:

```js
import { withFeatures } from '@paralleldrive/react-feature-toggles';

function MyButton({ title, features }) {
    return (
        <Button disabled={features.includes('disable-login-button')}>{title}</Button>
    );
}
export default withFeatures(MyButton);
```

#### useFeatures

If you're using React >= 16.8, you can access the active Features with the `useFeatures()` hook:

```js
import { useFeatures } from '@paralleldrive/react-feature-toggles';

export default function MyButton({ title }) {
    const features = useFeatures();
    return (
        <Button disabled={features.includes('disable-login-button')}>{title}</Button>
    );
}
```

## Enabling features from the URL

In v2, query logic has been moved out of the provider component. You should now handle this logic before passing features to `FeatureToggles`

```js
import { FeatureToggles } from '@paralleldrive/react-feature-toggles';
import {
  getCurrentActiveFeatureNames
} from '@paralleldrive/feature-toggles';
import parse from 'url-parse';

const url = 'https://domain.com/foo?ft=foo,bar';
const query = parse(url, true);

const initialFeatures = [
  { name: 'foo', isActive: true },
  { name: 'bar', isActive: false },
  { name: 'baz', isActive: false }
];

const features = getCurrentActiveFeatureNames({
  initialFeatures,
  req: { query }
});

const MyApp = () => {
  return <FeatureToggles features={features}>{...stuff}</FeatureToggles>;
};
```
