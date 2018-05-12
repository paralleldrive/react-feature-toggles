# Dream Code

## HOC to supply hasFeature through props or context

```js
// ... other page HOC imports
const export default = compose(
  // actually render-prop under the hood
  withFeatures(initialFeatures)
  hoc1,
  hoc2,
);
```

## Conditionally render a component based on feature state

```js
import { configureFeature } from 'react-feature-toggles';

// Set default feature-not-available component for whole app.
const featureOr404 = configureFeature(NotFound);
export default featureOr404;
```

## Render the feature if my-feature-name is enabled, else render 404

```js
import featureOr404 from './feature-or-404';
const Component = () => <div>This component requires 'my-feature-name'</div>;

export default featureOr404('my-feature-name', Component);
```

```js
import { configureFeature, Feature } from '@paralleldrive/react-feature-toggles';

const NotFoundPage = () => <div>404</div>;
const HelpPage = () => <div>Help</div>;
const FAQPage = () => <div>FAQ</div>;
const ChatPage = () => <div>Chat</div>;

const featureOr404 = configureFeature(NotFoundPage);
const Chat = featureOr404('chat', ChatPage);

const features = [];
const query = {};

const myPage = () => (
  <Features features={features} query={query}>
    {/* Render a pre configured feature */}
    <Chat />

    {/* or use Feature directly */}
    <Feature feature="help" fallBackComponent={NotFoundPage} component={HelpPage} />
    <Feature feature="faq">
      {({ hasFeature }) => hasFeature('faq') ? <FAQPage /> : <NotFoundPage />}
    </Feature>
  </Features>
);

const Component = () => <div>This component requires 'my-feature-name'</div>;

export default
```

```js
import { Fragment } from 'react';
const composeComponents = (...components) => component =>
  components.reduce(
    (Stack, Curr) => (
      <Stack>
        <Curr />
      </Stack>
    ),
    Fragment
  );
```

```js
import {
  configureFeature,
  Feature,
  withFeatures
} from '@paralleldrive/react-feature-toggles';

const NotFoundPage = () => <div>404</div>;
const HelpPage = () => <div>Help</div>;
const FAQPage = () => <div>FAQ</div>;
const ChatPage = () => <div>Chat</div>;

const featureOr404 = configureFeature(NotFoundPage);
const ChatOr404 = featureOr404('chat');
const Chat = ChatOr404(ChatPage);

const features = [];
const query = {};

const Feautre = withFeatures(Feature);

const configureFeature = (disabledComponent, feature, enabledComponent) =>
  Component;

const myPage = () => (
  <Features value={features} query={query}>
    {/* Render a pre configured feature */}
    <Chat />

    {/* or use Feature directly */}
    <Feature
      enabledFeatures={['foo', 'bar']}
      feature="help"
      disabledComponent={NotFoundPage}
      enabledComponent={HelpPage}
    />

    {/* or use Feature directly */}
    <Feature feature="faq">
      {({ endabledFeatures, hasFeature }) =>
        hasFeature('faq', enabledFeatures) ? <FAQPage /> : <NotFoundPage />
      }
    </Feature>
  </Features>
);
```

```js
import MyPage from '../feautures/my-page';
import { withFeatures } from '@paralleldrive/react-feature-toggles';

const features = [];
// ... other page HOC imports
export default = compose(
  // withQuery grabs the query context and passes it to the wrapped component via props
  // see https://reactjs.org/docs/context.html#consuming-context-with-a-hoc
  withQuery,

  // withFeatures
  withFeaturesProvider(features)
  hoc1,
  hoc2,
);
```
