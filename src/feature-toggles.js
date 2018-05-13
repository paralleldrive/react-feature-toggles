import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from './context';

export const FeatureToggles = ({ features = [], children }) => (
  <Provider value={features}>{children}</Provider>
);

FeatureToggles.propTypes = {
  features: PropTypes.array
};
