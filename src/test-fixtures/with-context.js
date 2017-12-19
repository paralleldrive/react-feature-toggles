import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withContext = (enabledFeatures = []) => WrappedComponent => {
  class ContextHOC extends Component {
    static childContextTypes = {
      features: PropTypes.array
    };
    getChildContext() {
      return {
        features: enabledFeatures
      };
    }
    render() {
      return <WrappedComponent {...this.props} features={enabledFeatures} />;
    }
  }
  return ContextHOC;
};

export default withContext;
