import React from 'react'

const RecipeCard = (props) => {
  return (
    <div>
          <h3>{props.recipe.name}</h3>
          <img className="sushi-card zoom" src={props.recipe.img} />
          <p>{props.recipe.roll_type}</p>
          <p>{props.recipe.instructions}</p>
          </div>
  )
}

export default RecipeCard;
