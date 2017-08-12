import React, { Component } from "react";
import getEnabled from "../utils/get-enabled";
import updateFeaturesWithParams from "../utils/updateFeaturesWithParams";
import PropTypes from "prop-types";

const applyParamFeatureOverrides = features => {
  if (typeof window !== "undefined") {
    return updateFeaturesWithParams(features, window.location.search);
  }
  return features;
};

// withFeatures = initialFeatures => Component => Component
const withFeatures = initialFeatures => WrappedComponent => {
  class withFeaturesHOC extends Component {
    static childContextTypes = {
      features: PropTypes.array
    };
    getChildContext() {
      return {
        features: getEnabled(applyParamFeatureOverrides(initialFeatures))
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
