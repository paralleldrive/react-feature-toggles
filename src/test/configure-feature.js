import { describe } from 'riteway';
import dom from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import withContext from '../test-fixtures/with-context';
import configureFeature from '../configure-feature';
const render = ReactDOMServer.renderToStaticMarkup;

const createTestComponent = componentName => ({ propCheck }) => (
  <div>
    <div className={componentName} />
    <div className="prop-check">{propCheck}</div>
  </div>
);

describe('configureFeature(Inactive)(FeatureName)(Feature)', async should => {
  const { assert } = should();

  const Inactive = createTestComponent('inactive');
  const Feature = createTestComponent('feature');

  const ConfiguredFeature = configureFeature(Inactive)('game')(Feature);

  const FeatureWithContext = withContext([])(ConfiguredFeature);

  const propCheck = 'bacon and eggs';

  const $ = dom.load(render(<FeatureWithContext propCheck={propCheck} />));

  assert({
    given: 'the feature is not enabled and there is a Inactive component',
    should: 'not render the Feature component',
    actual: $('.feature').length,
    expected: 0
  });

  assert({
    given: 'the feature is not enabled and there is a Inactive component',
    should: 'render the Inactive component',
    actual: $('.inactive').length,
    expected: 1
  });

  assert({
    given: 'props',
    should: 'pass through props',
    actual: $('.prop-check').text(),
    expected: propCheck
  });
});

describe('configureFeature(Inactive)(FeatureName)(Feature)', async should => {
  const { assert } = should();

  const Inactive = createTestComponent('inactive');
  const Feature = createTestComponent('feature');

  const ConfiguredFeature = configureFeature(Inactive)('game')(Feature);

  const FeatureWithContext = withContext(['help', 'game', 'food'])(
    ConfiguredFeature
  );

  const propCheck = 'bacon and eggs';

  const $ = dom.load(render(<FeatureWithContext propCheck={propCheck} />));

  assert({
    given: 'the feature is enabled',
    should: 'not render the Inactive component',
    actual: $('.inactive').length,
    expected: 0
  });

  assert({
    given: 'the feature is enabled',
    should: 'render the Feature component',
    actual: $('.feature').length,
    expected: 1
  });

  assert({
    given: 'props',
    should: 'pass through props',
    actual: $('.prop-check').text(),
    expected: propCheck
  });
});

describe('configureFeature()(FeatureName)(Feature)', async should => {
  const { assert } = should();

  const Feature = createTestComponent('feature');

  const ConfiguredFeature = configureFeature()('game')(Feature);

  const FeatureWithContext = withContext([])(ConfiguredFeature);

  const propCheck = 'bacon and eggs';

  const $ = dom.load(render(<FeatureWithContext propCheck={propCheck} />));

  assert({
    given: 'the feature is disabled',
    should: 'not render the Feature component',
    actual: $('.feature').length,
    expected: 0
  });

  assert({
    given: 'props',
    should: 'not pass through props',
    actual: $('.prop-check').text(),
    expected: ''
  });
});

describe('configureFeature(Inactive)(FeatureName, Feature)', async should => {
  const { assert } = should();

  const Inactive = createTestComponent('inactive');
  const Feature = createTestComponent('feature');

  const ConfiguredFeature = configureFeature(Inactive)('game', Feature);

  const FeatureWithContext = withContext(['lessons', 'game'])(
    ConfiguredFeature
  );

  const propCheck = 'bacon and eggs';

  const $ = dom.load(render(<FeatureWithContext propCheck={propCheck} />));

  assert({
    given: 'the feature is enabled',
    should: 'no render the Inactive component',
    actual: $('.inactive').length,
    expected: 0
  });

  assert({
    given: 'the feature is enabled',
    should: 'render the Feature component',
    actual: $('.feature').length,
    expected: 1
  });

  assert({
    given: 'props',
    should: 'pass through props',
    actual: $('.prop-check').text(),
    expected: propCheck
  });
});
