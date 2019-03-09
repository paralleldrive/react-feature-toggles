import React from 'react';
import PropTypes from 'prop-types';
import curry from 'lodash/fp/curry';
import Error from 'next/error';
import {
  getCurrentActiveFeatureNames,
  isActiveFeatureName
} from '@paralleldrive/feature-toggles';
import { withRouter } from 'next/router';

const PageFeatureToggle = ({ isActive, ActiveComponent, ...rest }) => {
  return (
    isActive
      ? <ActiveComponent {...rest} />
      : <Error statusCode={404} />
  )
}

PageFeatureToggle.propTypes = {
  isActive: PropTypes.bool.isRequired,
  ActiveComponent: PropTypes.func.isRequired
};

const configurePageFeatureToggle = (
  initialFeatures,
  featureName,
  ComposedComponent
) => {

  const featureIsActive = query => isActiveFeatureName(
    featureName,
    getCurrentActiveFeatureNames({ initialFeatures, req: { query } })
  )

  const PageFeatureToggleHOC = ({ query, ...rest }) =>
    <PageFeatureToggle {...rest} isActive={featureIsActive(query)} ActiveComponent={ComposedComponent} />


  PageFeatureToggleHOC.getInitialProps = async (ctx) => {
    const { res, query } = ctx;

    if (res && !featureIsActive(query))
      res.statusCode = 404;

    return {
      query
    };
  };

  PageFeatureToggleHOC.propTypes = {
    query: PropTypes.object.isRequired,
  }
  
  return withRouter(PageFeatureToggleHOC);
};

export default curry(configurePageFeatureToggle);
