import React, {Component} from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return(
      <div>
      <h1>Welcome to SoyMates</h1>
      <p> The app that helps match you to the perfect sushi for YOU. </p>
      <Link to="/login" > Log in </Link>
      <Link to="/signup">Sign up</Link>
      </div>
    )
  }
}

export default  Home
//scrolling sushi puns
