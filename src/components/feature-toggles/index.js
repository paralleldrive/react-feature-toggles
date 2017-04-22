import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";
import utils from "../../utils";

// Renders all children, and sets an array of enabled features into the React context.
// FeatureToggles({ features: Object, children: Object }) => Object
class FeatureToggles extends React.Component {
  getChildContext() {
    return {
      features: {
        enabled: utils.getEnabled(this.props.features)
      }
    };
  }
  componentWillMount() {
    const { children } = this.props;
    invariant(
      children === null || React.Children.count(children) === 1,
      "FeatureToggles can only have a single direct child element"
    );
  }
  render() {
    return this.props.children;
  }
}

FeatureToggles.propTypes = {
  features: PropTypes.object.isRequired,
  children: PropTypes.node
};

FeatureToggles.childContextTypes = {
  features: PropTypes.object
};

export default FeatureToggles;

export const getEnabled = (context = {}) => {
  const { features = {} } = context;
  return features.enabled ? features.enabled : [];
};

export const getIsEnabled = (context, featureName) =>
  getEnabled(context).includes(featureName);
