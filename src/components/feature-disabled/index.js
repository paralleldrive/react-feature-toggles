import React from "react";
import PropTypes from "prop-types";
import { getIsEnabled } from "../feature-toggles";
import invariant from "invariant";

//
// Renders children when a feature is disabled or not declared in context
// FeatureDisabled({name: String, children: Object}, context: Object) => Object | null
//

const FeatureDisabled = ({ name, children }, context) => {
  return getIsEnabled(context, name) ? null : children;
};

FeatureDisabled.contextTypes = { features: PropTypes.object };

FeatureDisabled.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default FeatureDisabled;
