import React from 'react'
import Link from 'next/link'
import { Feature } from '@paralleldrive/react-feature-toggles'
import RecentlyActiveUsersMini from '../recently-active-users-mini';

const HomePage = () => (
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
)

export default HomePage
