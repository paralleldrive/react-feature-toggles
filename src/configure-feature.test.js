import { describe } from 'riteway';
import dom from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { configureFeature } from './configure-feature';
import { Provider } from './context';

const render = ReactDOMServer.renderToStaticMarkup;

const createTestComponent = componentName => () => (
  <div className={componentName} />
);

describe('configureFeature(inactiveComponent)(name)(activeComponent)', async assert => {
  {
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
      given: 'the feature is not enabled',
      should: 'not render the Active component',
      actual: $('.active').length,
      expected: 0
    });

    assert({
      given: 'the feature is not enabled',
      should: 'render the Inactive component',
      actual: $('.inactive').length,
      expected: 1
    });
  }
  {
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
      should: 'render the Active component',
      actual: $('.active').length,
      expected: 1
    });
  }
});
