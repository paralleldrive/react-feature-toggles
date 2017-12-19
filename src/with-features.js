import React, { Component } from 'react';
import getEnabled from './get-enabled';
import updateFeaturesWithQuery from './update-features-with-query';
import PropTypes from 'prop-types';

const getEnabledFeatures = (initialFeatures, query) =>
  getEnabled(updateFeaturesWithQuery(initialFeatures, query));

// withFeatures = (config?: { initialFeatures: Array, windowLocationSearch: String }) => Component => Component
const withFeatures = (
  {
    initialFeatures = [],
    features = []
  } = {}
) => WrappedComponent => {
  class withFeaturesHOC extends Component {
    constructor(props) {
      super(props);
      const { query } = props;
      features = getEnabledFeatures(initialFeatures, query);
    }
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
