import Menu from '../menu/menu-component'
import PropTypes from 'prop-types'

const Layout = ({ Component, ...rest }) => (
  <div>
    <Menu />
    <Component {...rest} />
  </div>
)

Layout.propTypes = {
  Component: PropTypes.func.isRequired,
}

export default Layout