import React from "react";
import PropTypes from "prop-types";
import { getIsEnabled } from "../feature-toggles";
import invariant from "invariant";

const FeatureDisabled = ({ children, name }, context) => {
  return getIsEnabled(context, name) ? null : children;
};

FeatureDisabled.contextTypes = { features: PropTypes.object };

FeatureDisabled.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default FeatureDisabled;
