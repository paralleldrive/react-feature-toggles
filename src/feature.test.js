import { describe } from 'riteway';
import dom from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Feature } from './feature';
import { Provider } from './context';

const render = ReactDOMServer.renderToStaticMarkup;

const createTestComponent = componentName => () => (
  <div className={componentName} />
);

describe('Feature()', async assert => {
  {
    const ActiveComponent = createTestComponent('active');
    const InactiveComponent = createTestComponent('inactive');
    const features = ['foo', 'bar', 'baz'];

    const $ = dom.load(
      render(
        <Provider value={features}>
          <Feature
            name="foo"
            inactiveComponent={InactiveComponent}
            activeComponent={ActiveComponent}
          />
        </Provider>
      )
    );

    assert({
      given: 'the feature is enabled and an inactive component',
      should: 'not render the inactive component',
      actual: $('.inactive').length,
      expected: 0
    });

    assert({
      given: 'the feature is enabled and an active component',
      should: 'render the active component',
      actual: $('.active').length,
      expected: 1
    });
  }
  {
    const ActiveComponent = createTestComponent('active');
    const InactiveComponent = createTestComponent('inactive');
    const features = ['foo', 'bar', 'baz'];

    const $ = dom.load(
      render(
        <Provider value={features}>
          <Feature
            name="help"
            inactiveComponent={InactiveComponent}
            activeComponent={ActiveComponent}
          />
        </Provider>
      )
    );

    assert({
      given: 'the feature is not enabled and an inactive component',
      should: 'render the inactive component',
      actual: $('.inactive').length,
      expected: 1
    });

    assert({
      given: 'the feature is not enabled and an active component',
      should: 'not render the active component',
      actual: $('.active').length,
      expected: 0
    });
  }
  {
    const ActiveComponent = createTestComponent('active');
    const features = ['foo', 'bar', 'baz'];

    const $ = dom.load(
      render(
        <Provider value={features}>
          <Feature name="foo" activeComponent={ActiveComponent} />
        </Provider>
      )
    );

    assert({
      given: 'the feature is enabled, no inactive component',
      should: 'render the active component',
      actual: $('.active').length,
      expected: 1
    });
  }
  {
    const ActiveComponent = createTestComponent('active');
    const features = ['foo', 'bar', 'baz'];

    const $ = dom.load(
      render(
        <Provider value={features}>
          <Feature name="help" activeComponent={ActiveComponent} />
        </Provider>
      )
    );

    assert({
      given: 'the feature is not enabled, no inactive component',
      should: 'render the the default inactive component',
      actual: $.html(),
      expected: ''
    });
  }
  {
    const InactiveComponent = createTestComponent('inactive');
    const ActiveComponent = createTestComponent('active');
    const features = ['foo', 'bar', 'baz'];

    const $ = dom.load(
      render(
        <Provider value={features}>
          <Feature>
            {({ features }) =>
              features.includes('bar') ? (
                <ActiveComponent />
              ) : (
                <InactiveComponent />
              )
            }
          </Feature>
        </Provider>
      )
    );

    assert({
      given: 'no active component prop',
      should: 'act as a render prop component',
      actual: $('.active').length,
      expected: 1
    });

    assert({
      given: 'no active component prop',
      should: 'act as a render prop component',
      actual: $('.inactive').length,
      expected: 0
    });
  }
});
