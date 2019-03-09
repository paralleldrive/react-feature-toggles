import React from 'react'
import Link from 'next/link'
import { Feature } from '@paralleldrive/react-feature-toggles'
import { RECENTLY_ACTIVE_USERS_PAGE } from '../recently-active-users-page/feature-toggles'

const HomePage = () => (
  <div>
    <h1>Hello World!</h1>
    <p>
      <b>I am the <i>home page</i>!!!</b>
    </p>
    <p>
      Try enabling/disabling the recently active users page by adding/removing
      the query <code>{`/?ft=${RECENTLY_ACTIVE_USERS_PAGE}`}</code>
    </p>
    <p>
      Or you can click this fancy button to do it for you: 
      <Feature
        name={RECENTLY_ACTIVE_USERS_PAGE}
        inactiveComponent={
          () =>
            <Link href={`/?ft=${RECENTLY_ACTIVE_USERS_PAGE}`}>
              <button>Enable</button>
            </Link>
        }
        activeComponent={() => <Link href="/"><button>Disable</button></Link>}
      />
    </p>
  </div>
)

export default HomePage
