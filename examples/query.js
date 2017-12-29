import React from 'react';
import { compose } from 'redux';
import { withFeatures } from '@paralleldrive/react-feature-toggles';
import parse from 'url-parse';

const Component = ({ query }) => (
  <pre>
    {JSON.stringify(query, null, 2)}
  </pre>
);

const withQuery = Component => () => {
  const query = parse('https://github.com/foo/bar', true);

  return (
    <Component query={query} />
  );
};

const WrappedComponent = compose(
  withQuery,
  withFeatures({ initialFeatures: [] })
)(Component);

export default WrappedComponent;
