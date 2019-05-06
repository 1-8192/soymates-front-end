import React, {Component} from 'react'
import RecipeCard from '../components/RecipeCard'
import Search from '../components/Search'

export default class RecipeList extends Component {

  state = {
    recipes: [],
    displayRecipes: []
  }

  componentDidMount() {
    fetch('http://localhost:3005/api/v1/recipes/')
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
      <div className="container">
      <Search handleSearch={this.handleSearch}/>
      {this.state.displayRecipes.map(single_recipe=>
        <RecipeCard recipe={single_recipe} />
      )}
      </div>
    )
  }
}
