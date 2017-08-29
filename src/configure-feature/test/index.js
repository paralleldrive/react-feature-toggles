import describe from 'tape';
import dom from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import withContext from './with-context';
import configureFeature from '../index';

const render = ReactDOMServer.renderToStaticMarkup;

const createTestComponent = componentName => ({ someOtherProp } = {}) => (
  <div>
    <div className={componentName} />
    <div className='some-other-prop'>{someOtherProp}</div>
  </div>
);

describe('configureFeature()', ({ test }) => {
  test('...feature not enabled, with FallbackComponent', ({
    end,
    deepEqual
  }) => {
    const DefaultFallbackComponent = createTestComponent('default-fallback-component');
    const Feature = createTestComponent('feature');
    const FallbackComponent = createTestComponent('fall-back-component');

    const ConfiguredFeature =
      configureFeature(DefaultFallbackComponent)('game')(Feature, FallbackComponent);

    const FeatureWithContext = withContext([])(ConfiguredFeature);

    const someOtherProp = 'bacon and eggs';

    const $ = dom.load(
      render(<FeatureWithContext someOtherProp={someOtherProp} />)
    );
    {
      const msg = 'it should not render DefaultFallbackComponent component';
      const actual = $('.default-fallback-component').length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should not render the Feature component';
      const actual = $('.feature').length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should render the FallbackComponent component';
      const actual = $('.fall-back-component').length;
      const expected = 1;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should pass through received props';
      const actual = $('.some-other-prop').text();
      const expected = someOtherProp;
      deepEqual(actual, expected, msg);
    }
    end();
  });

  test('...feature enabled, with FallbackComponent', ({ end, deepEqual }) => {
    const DefaultFallbackComponent = createTestComponent('default-fallback-component');
    const Feature = createTestComponent('feature');
    const FallbackComponent = createTestComponent('fall-back-component');

    const ConfiguredFeature =
      configureFeature(DefaultFallbackComponent)('game')(Feature, FallbackComponent);

    const FeatureWithContext = withContext(['help', 'game', 'food'])(
      ConfiguredFeature
    );

    const someOtherProp = 'bacon and eggs';

    const $ = dom.load(
      render(<FeatureWithContext someOtherProp={someOtherProp} />)
    );
    {
      const msg = 'it should not render DefaultFallbackComponent component';
      const actual = $('.default-fallback-component').length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should render the Feature component';
      const actual = $('.feature').length;
      const expected = 1;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should not render the FallbackComponent component';
      const actual = $('.fall-back-component').length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should pass through received props';
      const actual = $('.some-other-prop').text();
      const expected = someOtherProp;
      deepEqual(actual, expected, msg);
    }
    end();
  });

  test('...feature not enabled, no FallbackComponent', ({ end, deepEqual }) => {
    const DefaultFallbackComponent = createTestComponent('default-fallback-component');
    const Feature = createTestComponent('feature');
    const ConfiguredFeature = configureFeature(DefaultFallbackComponent)('game')(Feature);
    const FeatureWithContext = withContext([])(ConfiguredFeature);

    const someOtherProp = 'bacon and eggs';

    const $ = dom.load(
      render(<FeatureWithContext someOtherProp={someOtherProp} />)
    );
    {
      const msg = 'it should render DefaultFallbackComponent component';
      const actual = $('.default-fallback-component').length;
      const expected = 1;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should not render the Feature component';
      const actual = $('.feature').length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should not render the FallbackComponent component';
      const actual = $('.fall-back-component').length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should pass through received props';
      const actual = $('.some-other-prop').text();
      const expected = someOtherProp;
      deepEqual(actual, expected, msg);
    }
    end();
  });

  test('...feature enabled, no FallbackComponent', ({ end, deepEqual }) => {
    const DefaultFallbackComponent = createTestComponent('default-fallback-component');
    const Feature = createTestComponent('feature');
    const ConfiguredFeature = configureFeature(DefaultFallbackComponent)('game')(Feature);
    const FeatureWithContext = withContext(['lessions', 'game'])(
      ConfiguredFeature
    );

    const someOtherProp = 'bacon and eggs';

    const $ = dom.load(
      render(<FeatureWithContext someOtherProp={someOtherProp} />)
    );
    {
      const msg = 'it should not render DefaultFallbackComponent component';
      const actual = $('.default-fallback-component').length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should render the Feature component';
      const actual = $('.feature').length;
      const expected = 1;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should not render the FallbackComponent component';
      const actual = $('.fall-back-component').length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should pass through received props';
      const actual = $('.some-other-prop').text();
      const expected = someOtherProp;
      deepEqual(actual, expected, msg);
    }
    end();
  });
});
