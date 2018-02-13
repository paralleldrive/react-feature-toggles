import React, { Component } from 'react';
import getEnabled from './get-enabled';
import updateFeaturesWithQuery from './update-features-with-query';
import PropTypes from 'prop-types';

const getEnabledFeatures = (initialFeatures, query) =>
  getEnabled(updateFeaturesWithQuery(initialFeatures, query));

class Features extends Component {
  state = {}
  static contextTypes = {
    query: PropTypes.object
  };
  static childContextTypes = {
    hasFeature: PropTypes.func
  };
  hasFeature = () => {
    
  }
  getChildContext() {
    return {
      hasFeature: this.hasFeature
    };
  }
  render () {
    const { children } = this.props;
    return children({ hasFeature: this.hasFeature });
  }
}

export default Features;

// withFeatures = (config?: { initialFeatures: Array }) => Component => Component

  // class withFeaturesHOC extends Component {
  //   constructor(props, context) {
  //     super(props);

  //     const query = props.query || context.query;

  //     features = getEnabledFeatures(initialFeatures, query);
  //   }


  //   static propTypes = {
  //     query: PropTypes.object
  //   };

  //   render() {
  //     return <WrappedComponent {...this.props} features={features} />;
  //   }
  // }

