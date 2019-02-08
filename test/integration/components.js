import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { describe } from 'riteway';
import dom from 'cheerio';

import {
  FeatureToggles,
  Feature,
  configureFeature,
  withFeatureToggles
} from '../../src/index';

const render = ReactDOMServer.renderToStaticMarkup;

const createTestComponent = componentName => () => (
  <div className={componentName} />
);

describe('FeatureToggles and Feature', async assert => {
  {
    const FooActive = createTestComponent('foo-active');
    const FooInactive = createTestComponent('foo-inactive');
    const HelpActive = createTestComponent('help-active');
    const HelpInactive = createTestComponent('help-inactive');

    const $ = dom.load(
      render(
        <FeatureToggles features={['foo', 'bar']}>
          <Feature
            name={'foo'}
            inactiveComponent={FooInactive}
            activeComponent={FooActive}
          />
          <Feature
            name={'help'}
            inactiveComponent={HelpInactive}
            activeComponent={HelpActive}
          />
        </FeatureToggles>
      )
    );

    assert({
      given: 'feature is active',
      should: 'render the active component',
      actual: $('.foo-active').length,
      expected: 1
    });

    assert({
      given: 'feature is active',
      should: 'do not render the inactive component',
      actual: $('.foo-inactive').length,
      expected: 0
    });

    assert({
      given: 'feature is inactive',
      should: 'render the inactive component',
      actual: $('.help-inactive').length,
      expected: 1
    });

    assert({
      given: 'feature is inactive',
      should: 'do not render the active component',
      actual: $('.help-active').length,
      expected: 0
    });
  }
});

describe('FeatureToggles and configureFeature', async assert => {
  {
    const FooActive = createTestComponent('foo-active');
    const FooInactive = createTestComponent('foo-inactive');
    const HelpActive = createTestComponent('help-active');
    const HelpInactive = createTestComponent('help-inactive');

    const ConfiguredFoo = configureFeature(FooInactive)('foo')(FooActive);
    const ConfiguredHelp = configureFeature(HelpInactive)('help')(HelpActive);

    const $ = dom.load(
      render(
        <FeatureToggles features={['foo', 'bar']}>
          <ConfiguredFoo />
          <ConfiguredHelp />
        </FeatureToggles>
      )
    );

    assert({
      given: 'feature is active',
      should: 'render the active component',
      actual: $('.foo-active').length,
      expected: 1
    });

    assert({
      given: 'feature is active',
      should: 'not render the inactive component',
      actual: $('.foo-inactive').length,
      expected: 0
    });

    assert({
      given: 'feature is inactive',
      should: 'render the inactive component',
      actual: $('.help-inactive').length,
      expected: 1
    });

    assert({
      given: 'feature is inactive',
      should: 'not render the active component',
      actual: $('.help-active').length,
      expected: 0
    });
  }
});

describe('withFeatureToggles and configureFeature', async assert => {
  {
    const FooActive = createTestComponent('foo-active');
    const FooInactive = createTestComponent('foo-inactive');
    const HelpActive = createTestComponent('help-active');
    const HelpInactive = createTestComponent('help-inactive');

    const ConfiguredFoo = configureFeature(FooInactive)('foo')(FooActive);
    const ConfiguredHelp = configureFeature(HelpInactive)('help')(HelpActive);
    const features = ['foo', 'bar'];

    const FooPage = withFeatureToggles({ features })(ConfiguredFoo);
    const HelpPage = withFeatureToggles({ features })(ConfiguredHelp);

    const $ = dom.load(
      render(
        <div>
          <FooPage />
          <HelpPage />
        </div>
      )
    );

    assert({
      given: 'feature is active',
      should: 'render the active component',
      actual: $('.foo-active').length,
      expected: 1
    });

    assert({
      given: 'feature is active',
      should: 'not render the inactive component',
      actual: $('.foo-inactive').length,
      expected: 0
    });

    assert({
      given: 'feature is inactive',
      should: 'render the inactive component',
      actual: $('.help-inactive').length,
      expected: 1
    });

    assert({
      given: 'feature is inactive',
      should: 'not render the active component',
      actual: $('.help-active').length,
      expected: 0
    });
  }
});
