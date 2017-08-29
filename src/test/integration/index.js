import describe from 'tape';
import dom from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import createFeature from '../fixtures/createFeature';
import { withFeatures, configureFeature } from '../../../src/';

const render = ReactDOMServer.renderToStaticMarkup;

describe('test integration of withFeatures() & configureFeature()', ({ test }) => {
  test('...enabled feature', ({ end, deepEqual }) => {
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

    const PresentationalComponent = ({children} = {}) => <div>{children}</div>;
    const NotFoundComponent = () => <div className="not-found">No help for you today!</div>;
    const FeatureComponent = () => <div className="feature">Need help? Call XXX-XXX-XXXX</div>;
    const ConfiguredFeature = configureFeature(NotFoundComponent)('help')(FeatureComponent);
    const Features = withFeatures({ initialFeatures })(PresentationalComponent);

    const $ = dom.load(
      render(
        <Features>
          <ConfiguredFeature />
        </Features>
      )
    );
    {
      const msg = 'it should not render NotFound component';
      const actual = $('.not-found').length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should render the Feature component';
      const actual = $('.feature').length;
      const expected = 1;
      deepEqual(actual, expected, msg);
    }
    end();
  });

  test('...disabled feature', ({ end, deepEqual }) => {
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

    const PresentationalComponent = ({children} = {}) => <div>{children}</div>;
    const NotFoundComponent = () => <div className="not-found">No help for you today!</div>;
    const FeatureComponent = () => <div className="feature">Need help? Call XXX-XXX-XXXX</div>;
    const ConfiguredFeature = configureFeature(NotFoundComponent)('help')(FeatureComponent);
    const Features = withFeatures({ initialFeatures })(PresentationalComponent);

    const $ = dom.load(
      render(
        <Features>
          <ConfiguredFeature />
        </Features>
      )
    );
    {
      const msg = 'it should render NotFound component';
      const actual = $('.not-found').length;
      const expected = 1;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should not render the Feature component';
      const actual = $('.feature').length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    end();
  });
});
