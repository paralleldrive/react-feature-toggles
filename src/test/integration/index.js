import describe from 'tape';
import dom from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { withFeatures, configureFeature } from '../../../src/';

const render = ReactDOMServer.renderToStaticMarkup;

describe('test integration of withFeatures() & configureFeature()', ({ test }) => {
  test('...passing an enabled feature renders the feature\'s component', ({ end, deepEqual }) => {
    const initialFeatures = {
      comments: {
        enabled: false,
        dependencies: []
      },
      help: {
        enabled: true,
        dependencies: []
      },
      sorting: {
        enabled: false,
        dependencies: []
      }
    };

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

  test('...passing a disabled feature renders the NotFound component', ({ end, deepEqual }) => {
    const initialFeatures = {
      comments: {
        enabled: true,
        dependencies: []
      },
      help: {
        enabled: false,
        dependencies: []
      },
      sorting: {
        enabled: false,
        dependencies: []
      }
    };

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
