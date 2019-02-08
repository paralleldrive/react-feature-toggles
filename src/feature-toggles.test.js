import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { describe } from 'riteway';
import dom from 'cheerio';

import { FeatureToggles } from './feature-toggles';
import { Consumer } from './context';

const render = ReactDOMServer.renderToStaticMarkup;

describe('FeatureToggles()', async assert => {
  {
    const $ = dom.load(
      render(
        <FeatureToggles>
          <Consumer>
            {features => <div className="features">{features.toString()}</div>}
          </Consumer>
        </FeatureToggles>
      )
    );

    assert({
      given: 'no features prop',
      should: 'it should provide an empty array of features via context',
      actual: $('.features').text(),
      expected: ''
    });
  }
  {
    const $ = dom.load(
      render(
        <FeatureToggles features={[]}>
          <Consumer>
            {features => <div className="features">{features.toString()}</div>}
          </Consumer>
        </FeatureToggles>
      )
    );

    assert({
      given: 'empty features array',
      should: 'it should provide the correct features via context',
      actual: $('.features').text(),
      expected: ''
    });
  }
  {
    const features = ['foo', 'bar', 'baz'];

    const $ = dom.load(
      render(
        <FeatureToggles features={features}>
          <Consumer>
            {features => <div className="features">{features.toString()}</div>}
          </Consumer>
        </FeatureToggles>
      )
    );

    assert({
      given: 'features array',
      should: 'it should provide the correct features via context',
      actual: $('.features').text(),
      expected: features.toString()
    });
  }
});
