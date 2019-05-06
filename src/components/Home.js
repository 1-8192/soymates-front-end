import React, {Component} from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return(
      <div className="container">
      <div className="notification">
      <h1>Welcome to SoyMates</h1>
      <p> The app that helps match you to the perfect sushi for YOU. </p>
      <div className="buttons is-centered">
      <Link className="button is-primary" to="/login" > Log in </Link>
      <Link className="button is-primary"  to="/signup">Sign up</Link>
      </div>
      </div>
      </div>
    )
  }
}

export default  Home
//scrolling sushi puns
