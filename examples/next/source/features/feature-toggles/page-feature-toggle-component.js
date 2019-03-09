import React from 'react'
import PropTypes from 'prop-types'
import Error from 'next/error'

const PageFeatureToggleComponent = ({ isActive, ActiveComponent, ...rest }) => {
  return (
    isActive
      ? <ActiveComponent {...rest} />
      : <Error statusCode={404} />
  )
}

PageFeatureToggleComponent.propTypes = {
  isActive: PropTypes.bool.isRequired,
  ActiveComponent: PropTypes.func.isRequired
}

export default PageFeatureToggleComponent