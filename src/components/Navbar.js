import React, { Fragment } from 'react'
import { Route, Link} from 'react-router-dom'

const Navbar = (props) => {
  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <span className="logo-font-logo">SOYMATES</span>
      </div>
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">Home</Link>
          <Link className="navbar-item" to="/recipes">The Rolls</Link>
        </div>
        <div className="navbar-end">
          {props.currentUser ? (
            <div className="buttons">
              <Link className="button is-primary" to="/profile"><strong>My Profile</strong></Link>
              <Link className="button is-primary" to="/logout" onClick={props.logout}><strong>Logout</strong></Link>
            </div>
          ) : (
            <div className="buttons">
              <Link className="button is-primary" to="/signup"><strong>Sign up</strong></Link>
              <Link className="button is-light" to="/login">Login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
