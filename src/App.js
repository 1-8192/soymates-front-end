import React from 'react';
import './App.css';
import { Route, withRouter, Switch } from 'react-router-dom'

import Home from './components/Home'
import RecipeList from './containers/RecipeList'
import Login from './containers/Login'
import Signup from './containers/Signup'

class App extends React.Component {
  state = {
    currentUser: null
  }

  componentDidMount(){
    if (this.state.currentUser === null && localStorage.getItem !== null) {
      fetch("http://localhost:3005/current_user", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => response.json())
      .then(user => {
        this.setState({
          currentUser: user
        })
      })
    }
  }

  handleLogin = (event, credentials) => {
    event.preventDefault()

    fetch("http://localhost:3005/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(response => response.json())
    .then(userData => {
      localStorage.setItem('token', userData.jwt)
      this.setState({
        currentUser: userData.user
      }, () => this.props.history.push("/recipes"))
    })
  }

  handleSignup = (event, credentials) => {
    event.preventDefault()

    if (credentials.password !== credentials.password_confirmation) {
      alert("Oops, your passwords do not match!")
    } else {
      let newUser = {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password
      }

      fetch("http://localhost:3005/api/v1/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({newUser})
      })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert(data.message)
        } else {
          localStorage.setItem('token', data.jwt)
          this.setState({
            currentUser: data.user
          }, () => this.props.history.push("/recipes"))
        }
      })

    }
  }

  handleLogout = () => {
    localStorage.removeItem('token')
    this.setState({
      currentUser: null
    })
  }

  render() {
  return (
    <div className="App">
      <main>
        <Switch>
          <Route path="/login" render={(routerProps) => <Login handleLogin={this.handleLogin} />} />
          <Route path="/signup" render={(routerProps) => <Signup handleSignup={this.handleSignup} />} />
          <Route path="/" component={Home} />
          <Route path="/recipes" component={RecipeList} />
        </Switch>
      </main>
    </div>
  );
}
}

export default withRouter(App);
