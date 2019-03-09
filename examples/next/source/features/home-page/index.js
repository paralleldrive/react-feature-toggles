import Link from 'next/link'
import initialFeatures from '../feature-toggles/initial-features'
import { getCurrentActiveFeatureNames } from '@paralleldrive/feature-toggles'
import { FeatureToggles, Feature } from '@paralleldrive/react-feature-toggles'
import RecentlyActiveUsersMini from '../recently-active-users-mini';

const HomePage = () => (
  <FeatureToggles features={getCurrentActiveFeatureNames({ initialFeatures })}>
    <div>
      Hello World!
      <ul>
        <li>
          <Link href="/?ft=recently-active-users-mini">
            <a>Enable Recently Active Users Mini Widget</a>
          </Link>
        </li>
        <li>
          <Link href="/"><a>Disable Recently Active Users Mini Widget</a></Link>
        </li>
      </ul>
      <Feature
        name="recently-active-users-mini"
        inactiveComponent={() => null}
        activeComponent={RecentlyActiveUsersMini}
      />
    </div>
  </FeatureToggles>
)

export default HomePage
