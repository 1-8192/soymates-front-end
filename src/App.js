import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import RecipeList from './containers/RecipeList'

function App() {
  return (
    <div className="App">
      <Home />
      <RecipeList />
    </div>
  );
}

export default App;
