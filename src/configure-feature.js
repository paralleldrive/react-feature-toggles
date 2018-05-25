import React from 'react';
import { curry } from 'ramda';
import PropTypes from 'prop-types';
import { isActive } from './is-active';

export const configureFeature = (Default, feature, Feature) => {
  const ConfigureFeatureHOC = (props, context) => {
    const isEnabled = isActive(feature, context.features);
    return isEnabled ? <Feature {...props} /> : <Default {...props} />;
  };
  ConfigureFeatureHOC.contextTypes = {
    features: PropTypes.array
  };
  return ConfigureFeatureHOC;
};

export default curry(configureFeature);
