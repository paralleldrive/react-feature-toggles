import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { describe } from 'riteway';
import dom from 'cheerio';

import { withFeatureToggles } from './with-feature-toggles';
import { Consumer } from './context';

const render = ReactDOMServer.renderToStaticMarkup;

const createTestComponent = () => ({ propCheck } = {}) => (
  <Consumer>
    {features => {
      return (
        <div>
          <div className="features">{features.toString()}</div>
          <div className="prop-check">{propCheck}</div>
        </div>
      );
    }}
  </Consumer>
);

describe('withFeatureToggles()', async assert => {
  {
    const Component = createTestComponent();
    const Page = withFeatureToggles()(Component);
    const $ = dom.load(render(<Page />));

    assert({
      given: 'no features argument',
      should: 'provide an empty array of features via context',
      actual: $('.features').text(),
      expected: ''
    });
  }

  {
    const Component = createTestComponent();
    const features = [];
    const Page = withFeatureToggles({ features })(Component);

    const $ = dom.load(render(<Page />));

    assert({
      given: 'empty features array',
      should: 'provide the correct features via context',
      actual: $('.features').text(),
      expected: ''
    });
  }
  {
    const Component = createTestComponent();
    const features = ['foo', 'bar', 'baz'];

    const Page = withFeatureToggles({ features })(Component);

    const $ = dom.load(render(<Page />));

    assert({
      given: 'features array',
      should: 'provide the correct features via context',
      actual: $('.features').text(),
      expected: features.toString()
    });
  }

  {
    const Component = createTestComponent();
    const Page = withFeatureToggles()(Component);
    const propCheck = 'bacon and eggs';
    const $ = dom.load(render(<Page propCheck={propCheck} />));

    assert({
      given: 'props',
      should: 'pass through props',
      actual: $('.prop-check').text(),
      expected: 'bacon and eggs'
    });
  }
});
