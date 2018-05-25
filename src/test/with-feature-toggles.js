import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { describe } from 'riteway';
import dom from 'cheerio';
import { withFeatureToggles } from '../with-feature-toggles';

import { Consumer } from '../context';

const render = ReactDOMServer.renderToStaticMarkup;

const createTestHOCComponent = componentName => () => (
  <Consumer>
    {features => <div className={componentName}>{features.toString()}</div>}
  </Consumer>
);

describe('withFeatureToggles()', async should => {
  const { assert } = should();
  const Component = createTestHOCComponent('Component');

  const Page = withFeatureToggles()(Component);

  {
    const $ = dom.load(render(<Page />));

    assert({
      given: 'no features prop',
      should:
        'it should provide an empty array of features via context for each component',
      actual: $('.Component').text(),
      expected: ''
    });
  }

  {
    const { assert } = should();
    const Component = createTestHOCComponent('Component');
    const features = [];
    const Page = withFeatureToggles({ features })(Component);

    const $ = dom.load(render(<Page />));

    assert({
      given: 'empty features array',
      should: 'it should provide the correct features via context',
      actual: $('.Component').text(),
      expected: ''
    });
  }
  {
    const { assert } = should();
    const Component = createTestHOCComponent('Component');
    const features = ['foo', 'bar', 'baz'];

    const Page = withFeatureToggles({ features })(Component);

    const $ = dom.load(render(<Page />));

    assert({
      given: 'features array',
      should: 'provide the correct features via context',
      actual: $('.Component').length,
      expected: 1
    });

    assert({
      given: 'features array',
      should: 'provide the correct features via context',
      actual: $('.Component').text(),
      expected: features.toString()
    });
  }
});
