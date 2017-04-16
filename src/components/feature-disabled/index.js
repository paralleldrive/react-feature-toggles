import React from "react";
import PropTypes from "prop-types";
import utils from "../../utils";
import invariant from "invariant";
const { getIsEnabled } = utils;

const FeatureDisabled = ({ children, name }, context) => {
  return getIsEnabled(name, context.features) ? null : children;
};

FeatureDisabled.contextTypes = { features: PropTypes.object };

FeatureDisabled.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default FeatureDisabled;
