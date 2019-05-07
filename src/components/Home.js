import React, {Component} from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return(
      <div className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Welcome to SOYMATES</h1>
            <h3 className="subtitle"> The app that helps match you to the perfect sushi for YOU. </h3>
          </div>
        </div>
      </div>
    )
  }
}

export default  Home
//scrolling sushi puns
