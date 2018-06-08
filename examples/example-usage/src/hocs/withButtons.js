import React from 'react';
import Toggle from '../widgets/Switch';
export const withButtons = Component => features => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = features.reduce(
        (a, c) => Object.assign(a, { [c]: { checked: true } }),
        {}
      );
      this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(feature) {
      this.setState(
        prevState => (prevState[feature].checked = !prevState[feature].checked)
      );
    }

    render() {
      return (
        <div>
          {features.map((feature, i) => (
            <div key={i}>
              <Toggle
                onToggle={this.handleToggle}
                feature={feature}
                status={this.state[feature].checked}
              />
            </div>
          ))}
          <Component
            {...this.state}
            features={Object.keys(this.state).filter(
              key => this.state[key].checked
            )}
          />
        </div>
      );
    }
  };
};
