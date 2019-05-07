import React, { Component } from 'react'

class Signup extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    password_confirmation: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <div className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <form onSubmit={(event) => this.props.handleSignup(event, this.state)}>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" placeholder="taro@sushilover.com" value={this.state.email} onChange={this.handleChange} /><br/>
              <label hmtlFor="username">User Name:</label>
              <input type="text" name="username" placeholder="They_see_me_rollin" value={this.state.username} onChange={this.handleChange} /><br />
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" placeholder="p@ssw0rd" value={this.state.password} onChange={this.handleChange} /><br />
              <label htmlFor="password_confirmation">Confirm Password:</label>
              <input type="password" name="password_confirmation" placeholder="p@ssw0rd" value={this.state.password_confirmation} onChange={this.handleChange} /><br />
              <input type="submit" value="Sign up" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup
