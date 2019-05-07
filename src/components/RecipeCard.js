import React from 'react'
import CardFront from './CardFront'
import CardBack from './CardBack'

// const RecipeCard = (props) => {
//
//   const handleClick = (event) => {
//     let card = event.target.parentElement
//     card.classList.toggle('is-flipped')
//   }
//
//   return (
//     <div className="sushi-card" onClick={handleClick}>
//       <CardFront sushi={props.recipe} />
//       <CardBack sushi={props.recipe} />


class RecipeCard extends React.Component {
  state = {
    matched: false,
    matchId: null
  }

  handleClick = (event) => {
      let card = event.target.parentElement
      card.classList.toggle('is-flipped')
    }

  handleLikeClick = () => {
    if (this.state.matched === true) {
      fetch(`http://localhost:3005/api/v1/matches/${this.state.matchId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          matched: false,
          matchId: null
        })
      })
    } else {
      let match = {user_id: this.props.currentUser.id, recipe_id: this.props.recipe.id}
      fetch("http://localhost:3005/api/v1/matches/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({match
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log(data.message)
        } else {
          this.setState({
            matched: true,
            matchId: data.id
          })
        }
      })
    }
  }

render() {
  return (
    <div className="column is-one-third zoom">
      <div className="notification sushi-card">

          <CardFront sushi={this.props.recipe} />
          <CardBack sushi={this.props.recipe} />
      </div>
    </div>
  )
}
}

export default RecipeCard;
