const getComponentInitialProps = (component, ctx) =>
  component.getInitialProps ? component.getInitialProps(ctx) : {}

export default getComponentInitialProps;