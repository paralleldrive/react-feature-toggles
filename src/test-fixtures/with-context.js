import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withContext = (enabledFeatures = [], query) => WrappedComponent => {
  class ContextHOC extends Component {
    static childContextTypes = {
      features: PropTypes.array,
      query: PropTypes.object
    };
    getChildContext() {
      return {
        features: enabledFeatures,
        query
      };
    }
    render() {
      return <WrappedComponent {...this.props} features={enabledFeatures} />;
    }
  }
  return ContextHOC;
};

export default withContext;
