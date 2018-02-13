import { Component } from 'react';
import getEnabled from './get-enabled';
import updateFeaturesWithQuery from './update-features-with-query';
import PropTypes from 'prop-types';

const getEnabledFeatures = (props, context) =>
  getEnabled(
    updateFeaturesWithQuery(props.initialFeatures, props.query || context.query)
  );

class Features extends Component {
  state = {
    features: []
  };
  constructor(props, context) {
    super(props);
    this.state = {
      features: getEnabledFeatures(props, context)
    };
  }
  static contextTypes = {
    query: PropTypes.object
  };
  static childContextTypes = {
    hasFeature: PropTypes.func
  };
  componentWillReceiveProps(props, context) {
    this.setState(() => ({
      features: getEnabledFeatures(props, context)
    }));
  }
  hasFeature = featureName => {
    return this.state.features.includes(featureName);
  };
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
