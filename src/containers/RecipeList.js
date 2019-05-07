import React, {Component} from 'react'
import RecipeCard from '../components/RecipeCard'
import Search from '../components/Search'
import NewSushiContainer from './NewSushiContainer'

export default class RecipeList extends Component {

  state = {
    recipes: [],
    displayRecipes: []
  }

  componentDidMount() {
    fetch('http://localhost:3005/api/v1/recipes/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res=>res.json())
    .then(recipeData=>{
      if (recipeData.message) {
        alert('Oops. you are not logged in')
      } else {
        this.setState({
        recipes: recipeData,
        displayRecipes: recipeData
      })
    }
    })
  }

  handleSearch = (event) => {
    let newArray = this.state.recipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(event.target.value.toLowerCase()) || recipe.roll_type.toLowerCase().includes(event.target.value.toLowerCase()) || recipe.instructions.toLowerCase().includes(event.target.value.toLowerCase())
    })
    this.setState({
      displayRecipes: newArray
    })
  }

  handleSubmit = (event, sushi) => {
    event.preventDefault()
    let newSushiObj = sushi
    fetch('http://localhost:3005/api/v1/recipes/', {
      method: 'POST',
      headers: {
  		'Content-Type': 'application/json',
  		'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
  	  },
      body: JSON.stringify(newSushiObj)
    }).then(res=>res.json(
    ))
    .then(newSushi => {
      let newDisplayArray = [...this.state.recipes]
      newDisplayArray.push(newSushi)
      this.setState({
        recipes: newDisplayArray
      })
    })
    event.target.parentElement.parentElement.style.display = 'none'
  }

  handleSearch = (event) => {
    let newArray = this.state.recipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(event.target.value.toLowerCase()) || recipe.roll_type.toLowerCase().includes(event.target.value.toLowerCase()) || recipe.instructions.toLowerCase().includes(event.target.value.toLowerCase())
    })
    this.setState({
      displayRecipes: newArray
    })
  }

  render() {

    return(
      <div>
      <div className="hero is-light">
        <div className="hero-body">
          <div className="container">
            know what you want?<Search handleSearch={this.handleSearch}/>
            <NewSushiContainer handleSubmit={this.handleSubmit} />
          </div>
        </div>
      </div>
    <div className="columns is-multiline is-3-mobile is-3-desktop">
      {this.state.displayRecipes.map(single_recipe=>
        <RecipeCard userReviews={this.props.userReviews} currentUser={this.props.currentUser} recipe={single_recipe} />
      )}
    </div>
      </div>
    )
  }

}


// <Search handleSearch={this.handleSearch}/><br/>
// <NewSushiContainer />
//   <div id="recipe-container">
//     {this.state.displayRecipes.map(single_recipe=>
//       <RecipeCard recipe={single_recipe} />
//     )}
//   </div>
