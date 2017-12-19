import describe from 'tape';
import withFeatures from '../with-features';
import dom from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import createWrappedComponent from '../test-fixtures/create-wrapped-component';
import createFeature from '../test-fixtures/create-feature';

const render = ReactDOMServer.renderToStaticMarkup;

describe('withFeatures()', ({ test }) => {
  test('...no config', ({ end, deepEqual }) => {
    const WrappedComponent = createWrappedComponent();
    const Component = withFeatures()(WrappedComponent);
    const $ = dom.load(render(<Component />));
    {
      const msg = 'the react context features should have no enabled features';
      const actual = $('.context-features-string').text();
      const expected = '';
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'the prop features should have no enabled features';
      const actual = $('.props-features-string').text();
      const expected = '';
      deepEqual(actual, expected, msg);
    }

    end();
  });

  test('...empty config object', ({ end, deepEqual }) => {
    const WrappedComponent = createWrappedComponent();
    const Component = withFeatures({})(WrappedComponent);
    const $ = dom.load(render(<Component />));
    {
      const msg = 'the react context features should have no enabled features';
      const actual = $('.context-features-string').text();
      const expected = '';
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'the prop features should have no enabled features';
      const actual = $('.props-features-string').text();
      const expected = '';
      deepEqual(actual, expected, msg);
    }

    end();
  });

  test('...config with initialFeatures', ({ end, deepEqual }) => {
    const initialFeatures = [
      createFeature({
        name: 'help',
        enabled: true,
        dependencies: []
      }),
      createFeature({
        name: 'comments',
        enabled: true,
        dependencies: []
      }),
      createFeature({
        name: 'sorting',
        enabled: false,
        dependencies: []
      })
    ];

    const WrappedComponent = createWrappedComponent();
    const Component = withFeatures({ initialFeatures })(WrappedComponent);
    const $ = dom.load(render(<Component />));
    {
      const msg =
        'the react context features should have the correct enabled features';
      const actual = $('.context-features-string').text();
      const expected = 'help,comments';
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'the prop features should have the correct enabled features';
      const actual = $('.props-features-string').text();
      const expected = 'help,comments';
      deepEqual(actual, expected, msg);
    }

    end();
  });

  test('...url search param overrides', ({ end, deepEqual }) => {
    const initialFeatures = [
      createFeature({
        name: 'game',
        enabled: false,
        dependencies: []
      }),
      createFeature({
        name: 'help',
        enabled: false,
        dependencies: []
      }),
      createFeature({
        name: 'comments',
        enabled: false,
        dependencies: []
      })
    ];

    const WrappedComponent = createWrappedComponent();
    const Component = withFeatures({
      initialFeatures
    })(WrappedComponent);
    const $ = dom.load(render(<Component query={{ ft: 'game,comments' }} />));
    {
      const msg =
        'the react context features should have the correct enabled features';
      const actual = $('.context-features-string').text();
      const expected = 'game,comments';
      deepEqual(actual, expected, msg);
    }
    {
      const msg = 'the prop features should have the correct enabled features';
      const actual = $('.props-features-string').text();
      const expected = 'game,comments';
      deepEqual(actual, expected, msg);
    }

    end();
  });

  test('...received props', ({ end, deepEqual }) => {
    const msg =
      'it should pass through all received props to the wrapped component';

    const WrappedComponent = createWrappedComponent();
    const name = 'Joe Joe';
    const Component = withFeatures()(WrappedComponent);
    const $ = dom.load(render(<Component name={name} />));

    const actual = $('.props-name').text();
    const expected = name;
    deepEqual(actual, expected, msg);

    end();
  });
});
