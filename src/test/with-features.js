import { describe } from 'riteway';
import withFeatures from '../with-features';
import dom from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import createWrappedComponent from '../test-fixtures/create-wrapped-component';
import createFeature from '../test-fixtures/create-feature';

const render = ReactDOMServer.renderToStaticMarkup;

describe('withFeatures()', async should => {
  const { assert } = should();
  const WrappedComponent = createWrappedComponent();
  const Component = withFeatures()(WrappedComponent);
  const $ = dom.load(render(<Component />));

  assert({
    given: 'the react context features',
    should: 'have no enabled features',
    actual: $('.context-features-string').text(),
    expected: ''
  });

  assert({
    given: 'the prop features',
    should: 'have no enabled features',
    actual: $('.props-features-string').text(),
    expected: ''
  });
});

describe('withFeatures({})', async should => {
  const { assert } = should();
  const WrappedComponent = createWrappedComponent();
  const Component = withFeatures({})(WrappedComponent);
  const $ = dom.load(render(<Component />));

  assert({
    given: 'the react context features',
    should: 'have no enabled features',
    actual: $('.context-features-string').text(),
    expected: ''
  });

  assert({
    given: 'the prop features',
    should: 'have no enabled features',
    actual: $('.props-features-string').text(),
    expected: ''
  });
});

describe('withFeatures({ initialFeatures: [...Features] })', async should => {
  const { assert } = should();
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

  assert({
    given: 'initial features',
    should: 'set the correct react context correct enabled features',
    actual: $('.context-features-string').text(),
    expected: 'help,comments'
  });

  assert({
    given: 'initial features',
    should: 'should the correct enabled features to the features props',
    actual: $('.props-features-string').text(),
    expected: 'help,comments'
  });
});

describe('withFeatures({ initialFeatures: [...Features] })({ query: {} })', async should => {
  const { assert } = should();
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

  assert({
    given: 'initial features and a query',
    should: 'the react context should have the correct enabled features',
    actual: $('.context-features-string').text(),
    expected: 'game,comments'
  });

  assert({
    given: 'initial features and a query',
    should: 'the correct enabled features to the features props',
    actual: $('.props-features-string').text(),
    expected: 'game,comments'
  });
});

describe('withFeatures()({ ...props })', async should => {
  const { assert } = should();
  {
    const WrappedComponent = createWrappedComponent();
    const name = 'Joe Joe';
    const Component = withFeatures()(WrappedComponent);
    const $ = dom.load(render(<Component name={name} />));

    assert({
      given: 'props',
      should: 'pass through props',
      actual: $('.props-name').text(),
      expected: name
    });
  }
});
