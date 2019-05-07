import React from 'react';
import './App.css';
import { Route, withRouter, Switch } from 'react-router-dom'

import Home from './components/Home'
import RecipeList from './containers/RecipeList'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Navbar from './components/Navbar'
import Profile from './components/Profile'

class App extends React.Component {
  state = {
    currentUser: null
  }

  componentDidMount(){
    if (this.state.currentUser === null && localStorage.getItem("token") !== null) {
      fetch("http://localhost:3005/api/v1/current_user", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
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

  handleLogin = (event, user) => {
    event.preventDefault()
    fetch("http://localhost:3005/api/v1/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({user})
    })
    .then(response => response.json())
    .then(userData => {
      console.log(userData)
      if (userData.message) {
        alert('Oops. invalid login')
      } else {
      localStorage.setItem('token', userData.jwt)
      this.setState({
        currentUser: userData.user
      }, () => this.props.history.push("/profile"))
    }
  })
  }

  handleSignup = (event, user) => {
    event.preventDefault()

      fetch("http://localhost:3005/api/v1/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({user
        })
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('token', data.jwt)
        this.setState({
            currentUser: data.user
          }, () => this.props.history.push("/recipes"))
        })
  }

  handleLogout = () => {
    localStorage.removeItem('token')
    this.setState({
      currentUser: null
    }, () => this.props.history.push("/"))
  }

  deleteUser = (user) => {
    fetch(`http://localhost:3005/api/v1/users/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(json => {
      localStorage.removeItem('token')
      this.setState({
        currentUser: null
      }, () => this.props.history.push("/"))
    })
  }

  render() {
  return (
    <div className="App">
      <Navbar currentUser={this.state.currentUser} logout={this.handleLogout} />
      <main>
        <Switch>
          <Route path="/login" render={(routerProps) => <Login handleLogin={this.handleLogin} />} />
          <Route path="/signup" render={(routerProps) => <Signup handleSignup={this.handleSignup} />} />
          <Route path="/recipes" render={(routerProps) => <RecipeList currentUser={this.state.currentUser} />} />
          <Route path="/profile" render={(routerProps) => <Profile currentUser={this.state.currentUser} deleteUser={this.deleteUser}/>} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </div>
  );
}
}

export default withRouter(App);
