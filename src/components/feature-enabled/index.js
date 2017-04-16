import React from "react";
import PropTypes from "prop-types";
import { getIsEnabled } from "../feature-toggles";
import invariant from "invariant";

const FeatureEnabled = ({ children, name }, context) => {
  return getIsEnabled(context, name) ? children : null;
};

FeatureEnabled.contextTypes = { features: PropTypes.object };

FeatureEnabled.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default FeatureEnabled;
