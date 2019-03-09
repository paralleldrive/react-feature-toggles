import React from 'react';
import PropTypes from 'prop-types';
import curry from 'lodash/fp/curry';
import Error from 'next/error';
import {
  getCurrentActiveFeatureNames,
  isActiveFeatureName
} from '@paralleldrive/feature-toggles';

const configurePageFeatureToggle = (
  initialFeatures,
  featureName,
  ComposedComponent
) => {

  const PageFeatureToggle = ({ statusCode, ...rest }) => (
    statusCode === 200
      ? <ComposedComponent {...rest} />
      : <Error statusCode={statusCode} />
  );

  PageFeatureToggle.getInitialProps = async (ctx) => {
    const { res, query, err } = ctx;

    const activeFeaturesNames = getCurrentActiveFeatureNames({
      initialFeatures,
      req: { query }
    });

    if (res && !isActiveFeatureName(featureName, activeFeaturesNames))
      res.statusCode = 404;

    const statusCode = res ? res.statusCode : err ? err.statusCode : null;

    return {
      statusCode
    };
  };

  PageFeatureToggle.propTypes = {
    statusCode: PropTypes.number.isRequired
  };

  return PageFeatureToggle;
};

export default curry(configurePageFeatureToggle);
