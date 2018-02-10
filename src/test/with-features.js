import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { describe } from 'riteway';
import dom from 'cheerio';
import { compose } from 'ramda';

import withFeatures from '../with-features';
import withContext from '../test-fixtures/with-context';
import createWrappedComponent from '../test-fixtures/create-wrapped-component';
import createFeature from '../test-fixtures/create-feature';

const render = ReactDOMServer.renderToStaticMarkup;

describe('withFeatures()', async should => {
  const { assert } = should();
  const WrappedComponent = createWrappedComponent();
  const Component = withFeatures()(WrappedComponent);
  const $ = dom.load(render(<Component />));

  assert({
    given: 'no configuration or query prop',
    should: 'set the react context to have no enabled features',
    actual: $('.context-features-string').text(),
    expected: ''
  });

  assert({
    given: 'no configuration or query prop',
    should: 'pass the correct features prop to the wrapped component',
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
    given: 'empty configuration and no query prop',
    should: 'set the react context to have no enabled features',
    actual: $('.context-features-string').text(),
    expected: ''
  });

  assert({
    given: 'empty configuration and no query prop',
    should: 'pass the correct features prop to the wrapped component',
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
    given: 'initial features and no query prop',
    should: 'set the correct features in react context',
    actual: $('.context-features-string').text(),
    expected: 'help,comments'
  });

  assert({
    given: 'initial features and no query prop',
    should: 'pass the correct features prop to the wrapped component',
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
    should:
      'update enabled features and set the correct features in react context',
    actual: $('.context-features-string').text(),
    expected: 'game,comments'
  });

  assert({
    given: 'initial features and a query',
    should:
      'update enabled features and pass the correct features prop to the wrapped component',
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
      given: 'other props',
      should: 'pass through other props to the wrapped component',
      actual: $('.props-name').text(),
      expected: name
    });
  }
});

describe('withFeatures()', async should => {
  {
    const { assert } = should('get query from context');

    const feature = 'test-feature';
    const initialFeatures = [
      {
        name: feature,
        enabled: false
      }
    ];
    const WrappedComponent = createWrappedComponent();
    const Component = compose(
      withContext(undefined, { ft: feature }),
      withFeatures({ initialFeatures })
    )(WrappedComponent);

    const $ = dom.load(render(<Component />));

    assert({
      given: 'no query prop, and query in context',
      actual: $('.props-features-string').text(),
      expected: feature
    });
  }
});
