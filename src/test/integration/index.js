import describe from 'tape';
import dom from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import withFeatures from '../../with-features';
import configureFeature from '../../configure-feature';

const render = ReactDOMServer.renderToStaticMarkup;

/*
Test Scenarios:
  no features
    no config
      no fallbackComponent ✗
      with fallbackComponent
    empty config object
      no fallbackComponent
      with fallbackComponent
  with features
    config with initialFeatures
      one feature enabled ✔
        with props
      two features enabled
      no features enabled
    config with initialFeatures plus overrides from URL search params
*/

describe('integration of withFeatures() & configureFeature()', ({ test }) => {
  test('...no config (no features), no fallbackComponent', ({ end, deepEqual }) => {
    const NotFound = () => <div className="not-found">No help for you today!</div>;
    const SomeComponent = () => <div></div>;
    const HelpChatComponent = () => <div className="help-chat">Need help? Call XXX-XXX-XXXX</div>;
    const Features = withFeatures()(SomeComponent);
    const ConfiguredFeature = configureFeature(NotFound)('help')(HelpChatComponent);

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
      const actual = $('.help-chat').length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should not render the Fallback component';
      const actual = $('.fall-back').length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    end();
  });

  test('...config with initialFeatures, no fallbackComponent', ({ end, deepEqual }) => {
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

    const NotFound = () => <div className="not-found">No help for you today!</div>;
    const SomeComponent = () => <div></div>;
    const HelpChatComponent = () => <div className="help-chat">Need help? Call XXX-XXX-XXXX</div>;
    const Features = withFeatures({ initialFeatures })(SomeComponent);
    const ConfiguredFeature = configureFeature(NotFound)('help')(HelpChatComponent);

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
      const actual = $('.help-chat').length;
      const expected = 1;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'it should not render the Fallback component';
      const actual = $('.fall-back').length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    end();
  });

  // test('...config with initialFeatures, no fallbackComponent, with props', ({ end, deepEqual }) => {
  //   const initialFeatures = {
  //     comments: {
  //       enabled: false,
  //       dependencies: []
  //     },
  //     help: {
  //       enabled: true,
  //       dependencies: []
  //     },
  //     sorting: {
  //       enabled: false,
  //       dependencies: []
  //     }
  //   };
  //
  //   const WrappedComponent = createWrappedComponent();
  //   const FeatureComponent = withFeatures({ initialFeatures })(WrappedComponent);
  //   const NotFound = createTestComponent('not-found');
  //   const ConfiguredFeature = configureFeature(NotFound)('help')(FeatureComponent);
  //   // const FeatureWithContext = withContext([])(ConfiguredFeature);
  //
  //   const someOtherProp = 'bacon and eggs';
  //
  //   const $ = dom.load(
  //     render(<ConfiguredFeature someOtherProp={someOtherProp} />)
  //   );
  //   {
  //     const msg = 'it should not render NotFound component';
  //     const actual = $('.not-found').length;
  //     const expected = 0;
  //     deepEqual(actual, expected, msg);
  //   }
  //   {
  //     const msg = 'it should render the Feature component';
  //     const actual = $('.feature').length;
  //     const expected = 1;
  //     deepEqual(actual, expected, msg);
  //   }
  //   {
  //     const msg = 'it should not render the Fallback component';
  //     const actual = $('.fall-back').length;
  //     const expected = 0;
  //     deepEqual(actual, expected, msg);
  //   }
  //   {
  //     const msg = 'it should pass through received props';
  //     const actual = $('.some-other-prop').text();
  //     const expected = someOtherProp;
  //     deepEqual(actual, expected, msg);
  //   }
  //   end();
  // });
});
