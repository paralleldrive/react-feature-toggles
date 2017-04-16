import React from "react";
import PropTypes from "prop-types";
import utils from "../../utils";
import invariant from "invariant";
const { getIsEnabled } = utils;

const FeatureEnabled = ({ children, name }, context) => {
  return getIsEnabled(name, context.features) ? children : null;
};

FeatureEnabled.contextTypes = { features: PropTypes.object };

FeatureEnabled.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default FeatureEnabled;
