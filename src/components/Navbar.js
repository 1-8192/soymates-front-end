import React, { Fragment } from 'react'
import { Route, Link} from 'react-router-dom'

const Navbar = (props) => {
  return (
    <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      {props.currentUser ? (
        <Fragment>
          <li><Link to="/logout" onClick={props.logout}>Logout</Link></li>
        </Fragment>
        ) : (
        <Fragment>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </Fragment>
      )}
      </ul>
    </nav>
  )
}

export default Navbar
