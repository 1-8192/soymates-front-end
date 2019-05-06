import React from 'react'

const RecipeCard = (props) => {
  return (
    <div className="notification zoom">
          <h3 className="logo-font">{props.recipe.name}</h3>
          <img className="sushi-card" src={props.recipe.img} /><br/>
            <a className="button is-danger is-rounded is-hovered is-right">
              Fall in love
            </a>
          <p>type: {props.recipe.roll_type}</p>
          <p>preparation: {props.recipe.instructions}</p>
          </div>
  )
}

export default RecipeCard;
