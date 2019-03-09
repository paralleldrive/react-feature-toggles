import React, { Fragment } from 'react'
import RecentlyActiveUsersMenuLink from '../recently-active-users-page/menu-link-component'
import HomePageMenuLink from '../home-page/menu-link-component'

const Menu = () => (
  <Fragment>
    <nav>
      <ul>
        <HomePageMenuLink />
        <RecentlyActiveUsersMenuLink />
      </ul>
    </nav>
  </Fragment>
)

export default Menu