import React, { Component } from 'react';
import getEnabled from './utils/get-enabled';
import updateFeaturesWithParams from './utils/updateFeaturesWithParams';
import PropTypes from 'prop-types';

const getEnabledFeatures = (initialFeatures, windowLocationSearch) =>
  getEnabled(updateFeaturesWithParams(initialFeatures, windowLocationSearch));

// withFeatures = (config?: { initialFeatures: Array, windowLocationSearch: String }) => Component => Component
const withFeatures = (
  {
    initialFeatures = [],
    windowLocationSearch = typeof window !== 'undefined'
      ? window.location.search
      : '',
    features = getEnabledFeatures(initialFeatures, windowLocationSearch)
  } = {}
) => WrappedComponent => {
  class withFeaturesHOC extends Component {
    static childContextTypes = {
      features: PropTypes.array
    };
    getChildContext() {
      return {
        features
      };
    }
    render() {
      return <WrappedComponent {...this.props} features={features} />;
    }
  }
  return withFeaturesHOC;
};

export default withFeatures;
