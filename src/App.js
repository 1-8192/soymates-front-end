import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import RecipeList from './containers/RecipeList'
import { Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route exact path="/recipes" component={RecipeList} />
    </div>
  );
}

export default App;
