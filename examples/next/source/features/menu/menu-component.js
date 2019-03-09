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
    <style jsx>{`
      ul {
        list-style-type: none;
        margin: 1rem 0;
        padding: 0;

      }
      ul :global(li) {
        display: inline-block;
      }
      ul :global(li a) {
        display: inline-block;
        padding: 0.5rem 0.75rem;
      }
    `}</style>
  </Fragment>
)

export default Menu