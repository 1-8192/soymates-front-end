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
      <form onSubmit={(event) => this.props.handleLogin(event, this.state)} >
        <label htmlFor="email"> Email </label>
        <input type="email" name="email" placeholder="taro@sushilover.com" value={this.state.email} onChange={this.handleChange} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="p@ssw0rd" value={this.state.password} onChange={this.handleChange} />
        <input type="submit" value="Login" />
      </form>
    )
    }
  }


export default Login
