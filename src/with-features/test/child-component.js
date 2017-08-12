import React from "react";
import PropTypes from "prop-types";

const ChildComponent = (props, context) => (
  <div className="child-component">{context.features.toString()}</div>
);
ChildComponent.contextTypes = { features: PropTypes.array };

export default ChildComponent;
