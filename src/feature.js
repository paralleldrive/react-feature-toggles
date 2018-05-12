import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from './context';

const noop = () => null;

export const Feature = ({
  activeComponent,
  children,
  inactiveComponent = noop,
  name
}) => (
  <Consumer>
    {features => {
      const Component = features.includes(name)
        ? activeComponent
        : inactiveComponent;
      return activeComponent ? <Component /> : children({ features });
    }}
  </Consumer>
);

Feature.propTypes = {
  activeComponent: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  inactiveComponent: PropTypes.func,
  name: PropTypes.string
};
