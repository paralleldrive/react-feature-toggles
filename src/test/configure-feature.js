import { describe } from 'riteway';
import dom from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { configureFeature } from '../configure-feature';
import { Provider } from '../context';

const render = ReactDOMServer.renderToStaticMarkup;
const createTestComponent = componentName => () => (
  <div className={componentName} />
);

describe('configureFeature(Inactive)(FeatureName)(Feature)', async should => {
  const { assert } = should();

  const ActiveComponent = createTestComponent('active');
  const InactiveComponent = createTestComponent('inactive');

  const ConfiguredFeature = configureFeature(InactiveComponent)('game')(
    ActiveComponent
  );

  const features = [];

  const $ = dom.load(
    render(
      <Provider value={features}>
        <ConfiguredFeature />
      </Provider>
    )
  );

  assert({
    given: 'the feature is not enabled and there is a Inactive component',
    should: 'not render the Active component',
    actual: $('.active').length,
    expected: 0
  });

  assert({
    given: 'the feature is not enabled and there is a Inactive component',
    should: 'render the Inactive component',
    actual: $('.inactive').length,
    expected: 1
  });
});

describe('configureFeature(Inactive)(FeatureName)(Feature)', async should => {
  const { assert } = should();

  const ActiveComponent = createTestComponent('active');
  const InactiveComponent = createTestComponent('inactive');

  const ConfiguredFeature = configureFeature(InactiveComponent)('game')(
    ActiveComponent
  );

  const features = ['game', 'bar', 'baz'];

  const $ = dom.load(
    render(
      <Provider value={features}>
        <ConfiguredFeature />
      </Provider>
    )
  );

  assert({
    given: 'the feature is enabled',
    should: 'not render the Inactive component',
    actual: $('.inactive').length,
    expected: 0
  });

  assert({
    given: 'the feature is enabled',
    should: 'render the Feature component',
    actual: $('.active').length,
    expected: 1
  });
});

describe('configureFeature(Inactive)(FeatureName, Feature)', async should => {
  const { assert } = should();

  const ActiveComponent = createTestComponent('active');
  const InactiveComponent = createTestComponent('inactive');

  const ConfiguredFeature = configureFeature(InactiveComponent)(
    'game',
    ActiveComponent
  );

  const features = ['game', 'bar', 'baz'];

  const $ = dom.load(
    render(
      <Provider value={features}>
        <ConfiguredFeature />
      </Provider>
    )
  );

  assert({
    given: 'the feature is enabled',
    should: 'no render the Inactive component',
    actual: $('.inactive').length,
    expected: 0
  });

  assert({
    given: 'the feature is enabled',
    should: 'render the Feature component',
    actual: $('.active').length,
    expected: 1
  });
});
