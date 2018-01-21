import { describe } from 'riteway';
import dom from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import createFeature from '../test-fixtures/create-feature';
import { withFeatures, configureFeature } from '../../src';

const render = ReactDOMServer.renderToStaticMarkup;

describe('integration of withFeatures() and configureFeature()', async should => {
  const { assert } = should();

  {
    const initialFeatures = [
      createFeature({
        name: 'comments',
        enabled: false,
        dependencies: []
      }),
      createFeature({
        name: 'help',
        enabled: true,
        dependencies: []
      }),
      createFeature({
        name: 'sorting',
        enabled: false,
        dependencies: []
      })
    ];

    const PresentationalComponent = ({ children } = {}) => (
      <div>{children}</div>
    );
    const DefaultFallBackComponent = () => (
      <div className="default-fallback-component">No help for you today!</div>
    );
    const FeatureComponent = () => (
      <div className="feature">Need help? Call XXX-XXX-XXXX</div>
    );
    const ConfiguredFeature = configureFeature(DefaultFallBackComponent)(
      'help'
    )(FeatureComponent);
    const Features = withFeatures({ initialFeatures })(PresentationalComponent);

    const $ = dom.load(
      render(
        <Features>
          <ConfiguredFeature />
        </Features>
      )
    );

    assert({
      given: 'the feature is enabled',
      should: 'not render the DefaultFallbackComponent',
      actual: $('.default-fallback-component').length,
      expected: 0
    });

    assert({
      given: 'the feature is enabled',
      should: 'render the Feature component',
      actual: $('.feature').length,
      expected: 1
    });
  }
  {
    const initialFeatures = [
      createFeature({
        name: 'comments',
        enabled: true,
        dependencies: []
      }),
      createFeature({
        name: 'help',
        enabled: false,
        dependencies: []
      }),
      createFeature({
        name: 'sorting',
        enabled: false,
        dependencies: []
      })
    ];

    const PresentationalComponent = ({ children } = {}) => (
      <div>{children}</div>
    );
    const DefaultFallBackComponent = () => (
      <div className="default-fallback-component">No help for you today!</div>
    );
    const FeatureComponent = () => (
      <div className="feature">Need help? Call XXX-XXX-XXXX</div>
    );
    const ConfiguredFeature = configureFeature(DefaultFallBackComponent)(
      'help'
    )(FeatureComponent);
    const Features = withFeatures({ initialFeatures })(PresentationalComponent);

    const $ = dom.load(
      render(
        <Features>
          <ConfiguredFeature />
        </Features>
      )
    );

    assert({
      given: 'the feature is disabled',
      should: 'render DefaultFallbackComponent component',
      actual: $('.default-fallback-component').length,
      expected: 1
    });

    assert({
      given: 'the feature is disabled',
      should: 'not render the Feature component',
      actual: $('.feature').length,
      expected: 0
    });
  }
});
