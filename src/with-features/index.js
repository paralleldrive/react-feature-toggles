import React, { Component } from "react";
import getEnabled from "../utils/get-enabled";
import updateFeaturesWithParams from "../utils/updateFeaturesWithParams";
import PropTypes from "prop-types";

// withFeatures = (config?: { initialFeatures: Object, windowLocation: Object }) => Component => Component
const withFeatures = (
  {
    initialFeatures = {},
    windowLocation = typeof window !== "undefined" ? window.location : {}
  } = {}
) => WrappedComponent => {
  class withFeaturesHOC extends Component {
    static childContextTypes = {
      features: PropTypes.array
    };
    getChildContext() {
      return {
        features: getEnabled(
          updateFeaturesWithParams(initialFeatures, windowLocation.search)
        )
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
