import React, {Component} from 'react'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'

class CardBack extends Component {

  state = {
    title: '',
    rating: null,
    body: '',
    recipe_id: this.props.sushi.id,
    user_id: null,
    reviews: []
  }

  handleChange = (event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state.title, this.state.body)
  }

  handleSubmit = (event, review_contents) => {
    event.preventDefault()
    this.setState({
      title: review_contents.title,
      rating: review_contents.rating,
      body: review_contents.body,
    })
    let newReviewObj = {...this.state}
    delete newReviewObj.reviews
    fetch('http://localhost:3000/api/v1/reviews', {
      method: 'POST',
      headers: {
    		'Content-Type': 'application/json',
    		'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    	  },
      body: JSON.stringify(newReviewObj)
      }).then(response => {
        return response.json()
    })
  }

  clickOpen = (event) => {
    event.target.nextElementSibling.style.display = 'block';
    fetch('http://localhost:3000/api/v1/reviews')
    .then(res=>res.json())
    .then(reviewArr=>{
      let recipe_reviews = reviewArr.filter(review=>review.recipe_id===this.state.recipe_id)
      this.setState({
        reviews: recipe_reviews
      })
    })
  }

  clickClose = (event) => {
    event.target.parentElement.parentElement.style.display = 'none'
  }

  render() {
    return (
      <div className="card-face card-back" >
        <h3>{this.props.sushi.name}</h3>
        <p>{this.props.sushi.roll_type}</p>
        <p>{this.props.sushi.instructions}</p>
        <button className="btn" onClick={this.clickOpen}>Reviews</button>
        <div className="reviews">
          <div className="review-content">
            <span class="close" onClick={this.clickClose}>&times;</span>
            <ReviewForm handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                reviewStuff={this.state}
            /><hr/>
            {this.state.reviews.map(review=> <ReviewCard review={review} />)}
          </div>
        </div>
      </div>
    )
  }
}

export default CardBack;