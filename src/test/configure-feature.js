import { describe } from 'riteway';
import dom from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import withContext from '../test-fixtures/with-context';
import configureFeature from '../configure-feature';

const render = ReactDOMServer.renderToStaticMarkup;

const createTestComponent = componentName => ({ propCheck } = {}) => (
  <div>
    <div className={componentName} />
    <div className='prop-check'>{propCheck}</div>
  </div>
);

describe('configureFeature(Default)(FeatureName)(Feature, Fallback)', async should => {
  const { assert } = should();

  const Default = createTestComponent('default');
  const Feature = createTestComponent('feature');
  const Fallback = createTestComponent('fallback');

  const ConfiguredFeature = configureFeature(Default)('game')(Feature, Fallback);

  const FeatureWithContext = withContext([])(ConfiguredFeature);

  const propCheck = 'bacon and eggs';

  const $ = dom.load(render(<FeatureWithContext propCheck={propCheck} />));
  
  assert({
    given: 'the feature is not enabled and there is a Fallback component',
    should: 'not render the Default component',
    actual: $('.default').length,
    expected: 0
  });

  assert({
    given: 'the feature is not enabled and there is a Fallback component',
    should: 'not render the Feature component',
    actual: $('.feature').length,
    expected: 0
  });

  assert({
    given: 'the feature is not enabled and there is a Fallback component',
    should: 'render the Fallback component',
    actual: $('.fallback').length,
    expected: 1
  });

  assert({
    given: 'props',
    should: 'pass through props',
    actual: $('.prop-check').text(),
    expected: propCheck
  });

});

describe('configureFeature(Default)(FeatureName)(Feature, Fallback)', async should => {
  const { assert } = should();

  const Default = createTestComponent('default');
  const Feature = createTestComponent('feature');
  const Fallback = createTestComponent('fallback');

  const ConfiguredFeature = configureFeature(Default)('game')(Feature, Fallback);

  const FeatureWithContext = withContext(['help', 'game', 'food'])(ConfiguredFeature);

  const propCheck = 'bacon and eggs';

  const $ = dom.load(render(<FeatureWithContext propCheck={propCheck} />));
  
  assert({
    given: 'the feature is enabled',
    should: 'not render the Default component',
    actual: $('.default').length,
    expected: 0
  });

  assert({
    given: 'the feature is enabled',
    should: 'render the Feature component',
    actual: $('.feature').length,
    expected: 1
  });

  assert({
    given: 'the feature is enabled and there is a Fallback component',
    should: 'not render the Fallback component',
    actual: $('.fallback').length,
    expected: 0
  });

  assert({
    given: 'props',
    should: 'pass through props',
    actual: $('.prop-check').text(),
    expected: propCheck
  });

});

describe('configureFeature(Default)(FeatureName)(Feature)', async should => {
  const { assert } = should();

  const Default = createTestComponent('default');
  const Feature = createTestComponent('feature');

  const ConfiguredFeature = configureFeature(Default)('game')(Feature);

  const FeatureWithContext = withContext([])(ConfiguredFeature);

  const propCheck = 'bacon and eggs';

  const $ = dom.load(render(<FeatureWithContext propCheck={propCheck} />));
  
  assert({
    given: 'the feature is disabled and there is no Fallback component',
    should: 'render the Default component',
    actual: $('.default').length,
    expected: 1
  });

  assert({
    given: 'the feature is disabled',
    should: 'not render the Feature component',
    actual: $('.feature').length,
    expected: 0
  });

  assert({
    given: 'the feature is disabled and there is no Fallback component',
    should: 'not render the Fallback component',
    actual: $('.fallback').length,
    expected: 0
  });

  assert({
    given: 'props',
    should: 'pass through props',
    actual: $('.prop-check').text(),
    expected: propCheck
  });

});

describe('configureFeature(Default)(FeatureName)(Feature)', async should => {
  const { assert } = should();

  const Default = createTestComponent('default');
  const Feature = createTestComponent('feature');

  const ConfiguredFeature = configureFeature(Default)('game')(Feature);

  const FeatureWithContext = withContext(['lessons', 'game'])(ConfiguredFeature);

  const propCheck = 'bacon and eggs';

  const $ = dom.load(render(<FeatureWithContext propCheck={propCheck} />));
  
  assert({
    given: 'the feature is enabled',
    should: 'no render the Default component',
    actual: $('.default').length,
    expected: 0
  });

  assert({
    given: 'the feature is enabled',
    should: 'render the Feature component',
    actual: $('.feature').length,
    expected: 1
  });

  assert({
    given: 'the feature is enabled',
    should: 'not render the Fallback component',
    actual: $('.fallback').length,
    expected: 0
  });

  assert({
    given: 'props',
    should: 'pass through props',
    actual: $('.prop-check').text(),
    expected: propCheck
  });

});
