import React from 'react'
import PropTypes from 'prop-types'
import initialFeatures from '../feature-toggles/initial-features'
import { getCurrentActiveFeatureNames } from '@paralleldrive/feature-toggles'
import { FeatureToggles } from '@paralleldrive/react-feature-toggles'
import { withRouter } from 'next/router'

const withFeatureToggles = Component => {
  const withFeatureTogglesHOC = ({ query, ...rest }) => (
    <FeatureToggles features={
      getCurrentActiveFeatureNames({
        initialFeatures,
        req: { query }
      })
    }>
      <Component {...rest} />
    </FeatureToggles>
  )

  withFeatureTogglesHOC.getInitialProps = (ctx) => {
    const { query } = ctx;
    return { query }
  }

  withFeatureTogglesHOC.propTypes = {
    query: PropTypes.object.isRequired
  }

  return withRouter(withFeatureTogglesHOC)
}

export default withFeatureToggles
