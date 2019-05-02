import React, {Component} from 'react'
import RecipeCard from '../components/RecipeCard'

export default class RecipeList extends Component {

  state = {
    recipes: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/recipes/')
    .then(res=>res.json())
    .then(recipeData=>{
      this.setState({
        recipes: recipeData
      })
    })
    // console.log(this.state.recipes)
  }

  render() {
    return(
      <div>
      {this.state.recipes.map(single_recipe=>
        <RecipeCard recipe={single_recipe} />
      )}
      </div>
    )
  }
}
