import React from 'react';
import PropTypes from 'prop-types';
import { createStore, compose } from 'redux';
import { combineReducers } from 'redux';
import { withFeatures } from '@paralleldrive/react-feature-toggles';
import withRedux from 'next-redux-wrapper';

const Component = ({ query }) => <pre>{query}</pre>;

// ****************************************************************************
// `withRedux` Example
// ****************************************************************************

const store = createStore(
  combineReducers({
    identity: state => state
  })
);

const Page1 = compose(
  withRedux(store),
  withFeatures({ initialFeatures: [] }),
)(Component);

// ****************************************************************************
// Next.js Page Level HOC Example (what `withRedux` is doing)
// ****************************************************************************

const withInitialProps = Component => {
  const InitialPropsWrapper = props => (
    <Component {...props} />
  );

  InitialPropsWrapper.propTypes = {
    asPath: PropTypes.string,
    err: PropTypes.object,
    jsonPageRes: PropTypes.object,
    pathname: PropTypes.string,
    query: PropTypes.object,
    req: PropTypes.object,
    res: PropTypes.object
  };

  InitialPropsWrapper.getInitialProps = async ({
    asPath,
    err,
    jsonPageRes,
    pathname,
    query,
    req,
    res,
  }) => ({
    pathname,
    query,
    asPath,
    req,
    res,
    jsonPageRes,
    err
  });

  return InitialPropsWrapper;
};

const Page2 = compose(
  withInitialProps,
  withFeatures({ initialFeatures: [] })
)(Component);

export { Page1, Page2 };
