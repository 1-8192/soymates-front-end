import React from 'react'

class RecipeCard extends React.Component {
  state = {
    matched: false,
    matchId: null
  }

  handleClick = () => {
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
      <div className="notification">
          <h3 className="logo-font">{this.props.recipe.name}</h3>
          <img className="sushi-card" src={this.props.recipe.img} /><br/>
            { this.state.matched === false ?
              <a onClick={this.handleClick} className="button is-danger is-rounded is-hovered is-right">
              Fall in love
            </a> : <a onClick={this.handleClick} className="button is-danger is-rounded is-hovered is-right">
            unmatch
          </a>  }
          <p>type: {this.props.recipe.roll_type}</p>
          <p>preparation: {this.props.recipe.instructions}</p>
        </div>
    </div>
  )
}
}

export default RecipeCard;
