import withFeatureToggles from '../source/features/feature-toggles/with-feature-toggles'
import HomePage from '../source/features/home-page/home-page-component'
import withLayout from '../source/features/layout/with-layout'
import compose from 'lodash/fp/compose'

const page = compose(
  withFeatureToggles,
  withLayout
)

export default page(HomePage);