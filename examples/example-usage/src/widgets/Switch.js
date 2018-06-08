import React, { Component } from 'react';
import Switch from 'react-switch';

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onToggle(this.props.feature);
  }

  render() {
    return (
      <label htmlFor={this.props.feature}>
        <span>{this.props.feature}</span>
        <Switch
          onChange={this.handleChange}
          checked={this.props.status}
          id="normal-switch"
        />
      </label>
    );
  }
}

export default Toggle;
