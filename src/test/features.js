import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { describe } from 'riteway';
import dom from 'cheerio';

import Features from '../features';
import withContext from '../test-fixtures/with-context';

const render = ReactDOMServer.renderToStaticMarkup;

const Feature = (props, context) => (
  <div className={`feature`}>
    <div className={`props-hasFeature`}>
      {props.hasFeature(props.featureName).toString()}
    </div>
    <div className={`context-hasFeature`}>
      {context.hasFeature(props.featureName).toString()}
    </div>
  </div>
);

Feature.contextTypes = { hasFeature: PropTypes.func };

describe('Features()', async should => {
  const { assert } = should();

  {
    const $ = dom.load(
      render(
        <Features>
          {({ hasFeature }) => (
            <Feature hasFeature={hasFeature} featureName="foo" />
          )}
        </Features>
      )
    );

    assert({
      given: 'no features prop and no query',
      should: 'render the render feature component',
      actual: $('.feature').length,
      expected: 1
    });

    assert({
      given: 'no features prop and no query',
      should:
        'provide hasFeature via props and hasFeature should return the correct boolean value',
      actual: $('.props-hasFeature').text(),
      expected: 'false'
    });

    assert({
      given: 'no features prop and no query',
      should:
        'provide hasFeature via context and hasFeature should return the correct boolean value',
      actual: $('.context-hasFeature').text(),
      expected: 'false'
    });
  }

  {
    const initialFeatures = [
      {
        name: 'foo',
        enabled: true
      },
      {
        name: 'sorting',
        enabled: false
      }
    ];

    const $ = dom.load(
      render(
        <Features initialFeatures={initialFeatures}>
          {({ hasFeature }) => (
            <Feature hasFeature={hasFeature} featureName="foo" />
          )}
        </Features>
      )
    );

    assert({
      given: 'features prop and no query',
      should: 'render the render feature component',
      actual: $('.feature').length,
      expected: 1
    });

    assert({
      given: 'features prop and no query',
      should:
        'provide hasFeature via props and hasFeature should return the correct boolean value',
      actual: $('.props-hasFeature').text(),
      expected: 'true'
    });

    assert({
      given: 'features prop and no query',
      should:
        'provide hasFeature via context and hasFeature should return the correct boolean value',
      actual: $('.context-hasFeature').text(),
      expected: 'true'
    });
  }
  {
    const initialFeatures = [
      {
        name: 'foo',
        enabled: true
      },
      {
        name: 'bar',
        enabled: false
      }
    ];

    const $ = dom.load(
      render(
        <Features initialFeatures={initialFeatures}>
          {({ hasFeature }) => (
            <Feature hasFeature={hasFeature} featureName="bar" />
          )}
        </Features>
      )
    );

    assert({
      given: 'features prop and no query',
      should: 'render the render feature component',
      actual: $('.feature').length,
      expected: 1
    });

    assert({
      given: 'features prop and no query',
      should:
        'provide hasFeature via props and hasFeature should return the correct boolean value',
      actual: $('.props-hasFeature').text(),
      expected: 'false'
    });

    assert({
      given: 'features prop and no query',
      should:
        'provide hasFeature via context and hasFeature should return the correct boolean value',
      actual: $('.context-hasFeature').text(),
      expected: 'false'
    });
  }

  {
    const initialFeatures = [
      {
        name: 'foo',
        enabled: true
      },
      {
        name: 'bar',
        enabled: false
      }
    ];

    const $ = dom.load(
      render(
        <Features initialFeatures={initialFeatures} query={{ ft: 'bar' }}>
          {({ hasFeature }) => (
            <Feature hasFeature={hasFeature} featureName="bar" />
          )}
        </Features>
      )
    );

    assert({
      given: 'query and initialFeatures',
      should: 'render the render feature component',
      actual: $('.feature').length,
      expected: 1
    });

    assert({
      given: 'query and initialFeatures',
      should:
        'provide hasFeature via props and hasFeature should return the correct boolean value',
      actual: $('.props-hasFeature').text(),
      expected: 'true'
    });

    assert({
      given: 'query and initialFeatures',
      should:
        'provide hasFeature via context and hasFeature should return the correct boolean value',
      actual: $('.context-hasFeature').text(),
      expected: 'true'
    });
  }

  {
    // context
    const initialFeatures = [
      {
        name: 'foo',
        enabled: true
      },
      {
        name: 'bar',
        enabled: false
      }
    ];

    const FeaturesWithContext = withContext(undefined, { ft: 'bar' })(Features);

    const $ = dom.load(
      render(
        <FeaturesWithContext initialFeatures={initialFeatures}>
          {({ hasFeature }) => (
            <Feature hasFeature={hasFeature} featureName="bar" />
          )}
        </FeaturesWithContext>
      )
    );

    assert({
      given: 'query in context and initialFeatures',
      should: 'render the render feature component',
      actual: $('.feature').length,
      expected: 1
    });

    assert({
      given: 'query in context and initialFeatures',
      should:
        'provide hasFeature via props and hasFeature should return the correct boolean value',
      actual: $('.props-hasFeature').text(),
      expected: 'true'
    });

    assert({
      given: 'query in context and initialFeatures',
      should:
        'provide hasFeature via context and hasFeature should return the correct boolean value',
      actual: $('.context-hasFeature').text(),
      expected: 'true'
    });
  }
});
