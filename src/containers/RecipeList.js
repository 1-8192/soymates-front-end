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
    fetch('http://localhost:3000/api/v1/recipes/')
    .then(res=>res.json())
    .then(recipeData=>{
      this.setState({
        recipes: recipeData,
        displayRecipes: recipeData
      })
    })
    // console.log(this.state.recipes)
  }

  handleSearch = (event) => {
    let newArray = this.state.recipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(event.target.value.toLowerCase()) || recipe.roll_type.toLowerCase().includes(event.target.value.toLowerCase())
    })
    this.setState({
      displayRecipes: newArray
    })
  }

  render() {
    return(
      <div>
      <Search handleSearch={this.handleSearch}/><br/>
      <NewSushiContainer />
        <div id="recipe-container">
          {this.state.displayRecipes.map(single_recipe=>
            <RecipeCard recipe={single_recipe} />
          )}
        </div>
      </div>
    )
  }
}
