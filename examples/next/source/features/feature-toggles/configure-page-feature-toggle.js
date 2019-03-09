import React from 'react';
import PropTypes from 'prop-types';
import curry from 'lodash/fp/curry';
import {
  getCurrentActiveFeatureNames,
  isActiveFeatureName
} from '@paralleldrive/feature-toggles';
import { withRouter } from 'next/router';
import getComponentInitialProps from './get-component-initial-props';
import PageFeatureToggleComponent from './page-feature-toggle-component';

const configurePageFeatureToggle = (
  initialFeatures,
  featureName,
  Component
) => {

  const featureIsActive = query => isActiveFeatureName(
    featureName,
    getCurrentActiveFeatureNames({ initialFeatures, req: { query } })
  )

  const PageFeatureToggleHOC = ({ query, ...rest }) =>
    <PageFeatureToggleComponent {...rest} isActive={featureIsActive(query)} ActiveComponent={Component} />


  PageFeatureToggleHOC.getInitialProps = async (ctx) => {
    const { res, query } = ctx;

    if (res && !featureIsActive(query))
      res.statusCode = 404;

    return {
      ...await getComponentInitialProps(Component, ctx),
      query
    };
  };

  PageFeatureToggleHOC.propTypes = {
    query: PropTypes.object.isRequired,
  }
  
  return withRouter(PageFeatureToggleHOC);
};

export default curry(configurePageFeatureToggle);
