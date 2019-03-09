import Layout from './layout-component'
import getComponentInitialProps from './get-component-initial-props'

const withLayout = (Component) => {
  const LayoutHOC = (props) => (
    <Layout Component={Component} {...props} />
  )

  LayoutHOC.getInitialProps = async (ctx) => {
    return {
      ...await getComponentInitialProps(Component, ctx)
    }
  }
  
  return LayoutHOC
}

export default withLayout