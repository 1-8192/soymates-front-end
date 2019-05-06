import React, { Component } from 'react'

class Login extends Component {
  state = {
    email: "",
    password: "",
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <form onSubmit={(event) => this.props.handleLogin(event, this.state)} >
              <label htmlFor="email"> Email:</label>
              <input type="email" name="email" placeholder="taro@sushilover.com" value={this.state.email} onChange={this.handleChange} /><br/>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" placeholder="p@ssw0rd" value={this.state.password} onChange={this.handleChange} /><br/>
              <input type="submit" value="Login" />
            </form>
          </div>
        </div>
      </div>
    )
    }
  }


export default Login
