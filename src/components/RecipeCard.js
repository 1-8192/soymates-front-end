import React from 'react'
import CardFront from './CardFront'
import CardBack from './CardBack'

const RecipeCard = (props) => {

  const handleClick = (event) => {
    let card = event.target.parentElement
    card.classList.toggle('is-flipped')
  }

  return (
    <div className="sushi-card" onClick={handleClick}>
      <CardFront sushi={props.recipe} />
      <CardBack sushi={props.recipe} />
    </div>
  )
}

export default RecipeCard;
