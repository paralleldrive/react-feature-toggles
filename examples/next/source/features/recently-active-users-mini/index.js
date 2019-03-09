import React, { Fragment } from 'react'
import Link from 'next/link'

const RecentlyActiveUsersMini = () => (
  <Fragment>
    <h4>Recently Active Users</h4>
    <ul>
      <li>Jenny - 4 mins ago</li>
      <li>Steve - 10 mins ago</li>
      <li>Jon - 1 hour ago</li>
    </ul>
    <Link href="/recently-active-users">More</Link>
  </Fragment>
  
)

export default RecentlyActiveUsersMini