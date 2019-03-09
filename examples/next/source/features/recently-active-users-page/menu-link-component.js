import React from 'react'
import Link from 'next/link'
import { Feature } from '@paralleldrive/react-feature-toggles'
import { RECENTLY_ACTIVE_USERS_PAGE } from './feature-toggles'

const MenuLink = () => (
  <Feature
    name={RECENTLY_ACTIVE_USERS_PAGE}
    inactiveComponent={() => null}
    activeComponent={
      () => 
        <li>
          {/*
            Eventually we may add a function that applies currently activated
            feature toggles so we don't need to hard code it in the link.
          */}
          <Link href="/recently-active-users?ft=recently-active-users-page">
            <a>Recently Active Users</a>
          </Link>
        </li>
    }
  />
)

export default MenuLink