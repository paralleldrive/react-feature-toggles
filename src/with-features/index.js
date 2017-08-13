import React, { Component } from "react";
import getEnabled from "../utils/get-enabled";
import updateFeaturesWithParams from "../utils/updateFeaturesWithParams";
import PropTypes from "prop-types";

const getEnabledFeatures = (initialFeatures, windowLocationSearch) =>
  getEnabled(updateFeaturesWithParams(initialFeatures, windowLocationSearch));

// withFeatures = (config?: { initialFeatures: Object, windowLocation: Object }) => Component => Component
const withFeatures = (
  {
    initialFeatures = {},
    windowLocationSearch = typeof window !== "undefined"
      ? window.location.search
      : ""
  } = {}
) => WrappedComponent => {
  class withFeaturesHOC extends Component {
    static childContextTypes = {
      features: PropTypes.array
    };
    getChildContext() {
      return {
        features: getEnabledFeatures(initialFeatures, windowLocationSearch)
      };
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          features={getEnabledFeatures(initialFeatures, windowLocationSearch)}
        />
      );
    }
  }
  return withFeaturesHOC;
};

export default withFeatures;
