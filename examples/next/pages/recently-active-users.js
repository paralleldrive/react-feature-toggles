import RecentlyActiveUsersPage from '../source/features/recently-active-users-page/recently-active-users-page-component'
import { RECENTLY_ACTIVE_USERS_PAGE } from '../source/features/recently-active-users-page/feature-toggles'
import withPageFeatureToggle from '../source/features/feature-toggles/with-page-feature-toggle'
import withFeatureToggles from '../source/features/feature-toggles/with-feature-toggles'
import withLayout from '../source/features/layout/with-layout'
import compose from 'lodash/fp/compose'

const page = compose(
  withFeatureToggles,
  withLayout,
  withPageFeatureToggle(RECENTLY_ACTIVE_USERS_PAGE),
)

export default page(RecentlyActiveUsersPage);