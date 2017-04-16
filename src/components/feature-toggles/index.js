import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

class FeatureToggles extends React.Component {
  getChildContext() {
    return {
      features: this.props.features
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
