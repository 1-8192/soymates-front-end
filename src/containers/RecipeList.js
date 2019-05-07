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
          </div>
        </div>
      </div>
    <div className="columns is-multiline is-3-mobile is-3-desktop">
      {this.state.displayRecipes.map(single_recipe=>
        <RecipeCard currentUser={this.props.currentUser} recipe={single_recipe} />
      )}
    </div>
      </div>
    )
  }
}
