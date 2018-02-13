import { Component } from 'react';
import getEnabled from './get-enabled';
import updateFeaturesWithQuery from './update-features-with-query';
import PropTypes from 'prop-types';

class Features extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      features: this.getEnabledFeatures(props, context)
    };
  }
  static contextTypes = {
    query: PropTypes.object
  };
  static childContextTypes = {
    hasFeature: PropTypes.func
  };
  static propTypes = {
    initialFeatures: PropTypes.array
  };
  componentWillReceiveProps(props, context) {
    this.setState(() => ({
      features: this.getEnabledFeatures(props, context)
    }));
  }
  hasFeature = featureName => {
    return this.state.features.includes(featureName);
  };
  getEnabledFeatures(props, context) {
    return getEnabled(
      updateFeaturesWithQuery(
        props.initialFeatures,
        props.query || context.query
      )
    );
  }
  getChildContext() {
    return {
      hasFeature: this.hasFeature
    };
  }
  render() {
    const { children } = this.props;
    return children({ hasFeature: this.hasFeature });
  }
}

export default Features;
