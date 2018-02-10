import React, { Component } from 'react';
import getEnabled from './get-enabled';
import updateFeaturesWithQuery from './update-features-with-query';
import PropTypes from 'prop-types';

const getEnabledFeatures = (initialFeatures, query) =>
  getEnabled(updateFeaturesWithQuery(initialFeatures, query));

// withFeatures = (config?: { initialFeatures: Array }) => Component => Component
const withFeatures = ({
  initialFeatures = [],
  features = []
} = {}) => WrappedComponent => {
  class withFeaturesHOC extends Component {
    constructor(props, context) {
      super(props);

      const query = props.query || context.query;

      features = getEnabledFeatures(initialFeatures, query);
    }
    static contextTypes = {
      query: PropTypes.object
    };
    static childContextTypes = {
      features: PropTypes.array
    };
    static propTypes = {
      query: PropTypes.object
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
