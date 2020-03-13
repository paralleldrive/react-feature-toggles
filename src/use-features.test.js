import { describe } from 'riteway';
import dom from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Provider } from './context';
import { useFeatures } from './use-features';

const render = ReactDOMServer.renderToStaticMarkup;

describe('useFeatures()', async assert => {
  {
    const TestComponentWithHook = () => {
      const features = useFeatures();
      return (
        <div className={features.includes('foo') ? 'flag-on' : 'flag-off'} />
      );
    };

    const features = ['foo', 'bar', 'baz'];

    const $ = dom.load(
      render(
        <Provider value={features}>
          <TestComponentWithHook />
        </Provider>
      )
    );

    assert({
      given: 'the feature is disabled and a hooked component',
      should: 'render the flag enabled component',
      actual: $('.flag-on').length,
      expected: 1
    });

    assert({
      given: 'the feature is enabled and a hooked component',
      should: 'not render the flag disabled component',
      actual: $('.flag-off').length,
      expected: 0
    });
  }
  {
    const TestComponentWithHook = () => {
      const features = useFeatures();
      return (
        <div className={features.includes('foo') ? 'flag-on' : 'flag-off'} />
      );
    };

    const features = ['not-foo', 'bar', 'baz'];

    const $ = dom.load(
      render(
        <Provider value={features}>
          <TestComponentWithHook />
        </Provider>
      )
    );

    assert({
      given: 'the feature is disabled and a hooked component',
      should: 'not render the flag enabled component',
      actual: $('.flag-on').length,
      expected: 0
    });

    assert({
      given: 'the feature is enabled and a hooked component',
      should: 'render the flag disabled component',
      actual: $('.flag-off').length,
      expected: 1
    });
  }
});
