import React, {Component} from 'react'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'
import ReviewEditForm from './ReviewEditForm'

class CardBack extends Component {

  state = {
    title: '',
    rating: '',
    body: '',
    recipe_id: this.props.sushi.id,
    user_id: null,
    reviews: []
  }

  handleChange = (event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event, review_contents) => {
    event.preventDefault()
    let crrntUser=this.props.user
    this.setState({
      title: review_contents.title,
      rating: review_contents.rating,
      body: review_contents.body,
    })
    let newReviewObj = {...this.state}
    newReviewObj.user_id = crrntUser.id
    delete newReviewObj.reviews
    let newReviewArr = [...this.state.reviews]
    newReviewArr.push(newReviewObj)
    fetch('http://localhost:3005/api/v1/reviews', {
      method: 'POST',
      headers: {
    		'Content-Type': 'application/json',
    		'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    	  },
      body: JSON.stringify(newReviewObj)
      }).then(response => {
        return response.json()
    }).then(rvwJSON=>{
      this.setState({
        reviews: newReviewArr,
        title: '',
        rating: '',
        body: ''
      })
    })

  }

  clickOpen = (event) => {
    event.target.nextElementSibling.style.display = 'block';
    fetch('http://localhost:3005/api/v1/reviews')
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

  handleDeleteClick = (review) => {
    fetch(`http://localhost:3005/api/v1/reviews/${review.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(json => {
        let newArray = this.state.reviews.filter(singleReview => review.id !== singleReview.id)
        this.setState({
          reviews: newArray
        })
      })
    }

    handleEditSubmit = (event, editedReview) => {
      event.preventDefault()
      fetch(`http://localhost:3005/api/v1/reviews/${editedReview.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: editedReview.title,
          rating: editedReview.rating,
          body: editedReview.body
        })
      })
      .then(response => response.json())
      .then(json => {
        let newReviewArr = this.state.reviews.filter(review => review.id !== json.id)
        newReviewArr.push(json)
        this.setState({
          reviews: newReviewArr
        })
      })
    }

  render() {
    return (
      <div className="card-face card-back" >
        <h3 className="logo-font">{this.props.sushi.name}</h3>
        <p>Type: {this.props.sushi.roll_type}</p>
        <p>Preparation: {this.props.sushi.instructions}</p>
        <button className="btn" onClick={this.clickOpen}>Reviews</button>
        <div className="reviews">
          <div className="review-content">
            <span class="close" onClick={this.clickClose}>&times;</span>
            <ReviewForm handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                reviewStuff={this.state}
            /><hr/>
          <h2>Roll Reviews</h2>
            {this.state.reviews.map(review=> <ReviewCard handleEditSubmit={this.handleEditSubmit} handleDeleteClick={this.handleDeleteClick} currentUser={this.props.user} review={review} />)}
          </div>
        </div>
      </div>
    )
  }
}

export default CardBack;
