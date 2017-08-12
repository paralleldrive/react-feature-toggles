import React, { Component } from "react";
import getEnabled from "../utils/get-enabled";
import PropTypes from "prop-types";

// withFeatures = initialFeatures => Component => Component
const withFeatures = initialFeatures => WrappedComponent => {
  class withFeaturesHOC extends Component {
    static childContextTypes = {
      features: PropTypes.array
    };
    getChildContext() {
      return {
        features: getEnabled(initialFeatures)
      };
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          features={getEnabled(initialFeatures)}
        />
      );
    }
  }
  return withFeaturesHOC;
};

export default withFeatures;
