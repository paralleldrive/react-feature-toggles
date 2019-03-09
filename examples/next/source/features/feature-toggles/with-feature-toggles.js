import React from 'react'
import PropTypes from 'prop-types'
import initialFeatures from '../feature-toggles/initial-features'
import { getCurrentActiveFeatureNames } from '@paralleldrive/feature-toggles'
import { FeatureToggles } from '@paralleldrive/react-feature-toggles'
import { withRouter } from 'next/router'
import getComponentInitialProps from './get-component-initial-props'

const withFeatureToggles = Component => {
  const withFeatureTogglesHOC = (props) => (
    <FeatureToggles features={
      getCurrentActiveFeatureNames({
        initialFeatures,
        req: { query: props.query }
      })
    }>
      <Component {...props} />
    </FeatureToggles>
  )

  withFeatureTogglesHOC.getInitialProps = async (ctx) => {
    const { query } = ctx
    return {
      ...await getComponentInitialProps(Component, ctx),
      query
    }
  }

  withFeatureTogglesHOC.propTypes = {
    query: PropTypes.object.isRequired
  }

  return withRouter(withFeatureTogglesHOC)
}

export default withFeatureToggles
