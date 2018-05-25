import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { describe } from 'riteway';
import dom from 'cheerio';
import { withFeatureToggles } from '../with-feature-toggles';

import { Consumer } from '../context';

const render = ReactDOMServer.renderToStaticMarkup;

const createTestHOCComponent = componentName => ({ propCheck } = {}) => (
  <Consumer propCheck={propCheck}>
    {features => {
      return (
        <div>
          <div className={componentName}>{features.toString()}</div>
          <div className="prop-check">{propCheck}</div>
        </div>
      );
    }}
  </Consumer>
);

describe('withFeatureToggles()', async should => {
  const { assert } = should();

  {
    const Component = createTestHOCComponent('component');
    const Page = withFeatureToggles()(Component);
    const $ = dom.load(render(<Page />));

    assert({
      given: 'no features argument',
      should: 'render the component',
      actual: $('.component').length,
      expected: 1
    });

    assert({
      given: 'no features argument',
      should: 'provide an empty array of features via context',
      actual: $('.component').text(),
      expected: ''
    });
  }

  {
    const { assert } = should();
    const Component = createTestHOCComponent('component');
    const features = [];
    const Page = withFeatureToggles({ features })(Component);

    const $ = dom.load(render(<Page />));

    assert({
      given: 'an empty features array',
      should: 'render the component',
      actual: $('.component').length,
      expected: 1
    });

    assert({
      given: 'empty features array',
      should: 'provide the correct features via context',
      actual: $('.component').text(),
      expected: ''
    });
  }
  {
    const { assert } = should();
    const Component = createTestHOCComponent('component');
    const features = ['foo', 'bar', 'baz'];

    const Page = withFeatureToggles({ features })(Component);

    const $ = dom.load(render(<Page />));

    assert({
      given: 'features array',
      should: 'provide the correct features via context',
      actual: $('.component').text(),
      expected: features.toString()
    });
  }

  {
    const Component = createTestHOCComponent('component');
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
