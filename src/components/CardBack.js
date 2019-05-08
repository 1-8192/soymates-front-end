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
    reviews: [],
    name: this.props.sushi.name,
    img: this.props.sushi.img,
    roll_type: this.props.sushi.roll_type,
    instructions: this.props.sushi.instructions
  }

  handleChange = (event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleReviewSubmit = (event, review_contents) => {
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

  handleEditSushi = (event, data) => {
    // event.preventDefault()
    let sushi_id = this.props.sushi.id
    let sushi = {
      name: data.name,
      img: data.img,
      roll_type: data.roll_type,
      instructions: data.instructions
    }
    fetch(`http://localhost:3005/api/v1/recipes/${sushi_id}`, {
      method: 'PATCH',
      headers: {
  		'Content-Type': 'application/json',
  		'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
  	  },
      body: JSON.stringify(sushi)
    }).then(res=>res.json())
    event.target.parentElement.parentElement.style.display = 'none'
  }

  getReviews = () => {
    fetch('http://localhost:3005/api/v1/reviews')
    .then(res=>res.json())
    .then(reviewArr=>{
      let recipe_reviews = reviewArr.filter(review=>review.recipe_id===this.state.recipe_id)
      this.setState({
        reviews: recipe_reviews
      })
    })
  }

  clickHandler = (event) => {
    if(event.target.className === 'review-btn') {
      event.target.nextElementSibling.style.display = 'block';
      this.getReviews()
    } else if(event.target.className === 'close') {
      event.target.parentElement.parentElement.style.display = 'none'
    } else if(event.target.className === 'edit-btn') {
      event.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'block';
    } else if(event.target.className === 'delete-btn') {
      this.props.handleDelete(event, this.state.recipe_id)
    }
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
        <button className="edit-btn" onClick={this.clickHandler}>Edit Sushi</button>
        <button className="delete-btn" onClick={this.clickHandler}>Delete Sushi</button>
        <button className="review-btn" onClick={this.clickHandler}>Reviews</button>
        <div className="reviews">
          <div className="review-content">
            <span className="close" onClick={this.clickHandler}>&times;</span>
            <ReviewForm handleSubmit={this.handleReviewSubmit}
                handleChange={this.handleChange}
<<<<<<< HEAD
                reviewStuff={this.state} /><hr/>

            {this.state.reviews.map(review=> <ReviewCard currentUser={this.props.user} review={review} />)}
=======
                reviewStuff={this.state}
            /><hr/>
          <h2>Roll Reviews</h2>
            {this.state.reviews.map(review=> <ReviewCard handleEditSubmit={this.handleEditSubmit} handleDeleteClick={this.handleDeleteClick} currentUser={this.props.user} review={review} />)}
>>>>>>> master
          </div>
        </div>
        <div className="edit-sushi">
          <div className="edit-sushi-content">
            <span class="close" onClick={this.clickHandler}>&times;</span>
            <form onChange={this.handleChange} onSubmit={event=>this.handleEditSushi(event, this.state)} >
              <label>Sushi Name</label>
              <input type="text" name="name" value={this.state.name} /><br/>
              <label>Sushi Image</label>
              <input type="text" name="img" value={this.state.img} /><br/>
              <label>Sushi Roll Type</label>
              <input type="text" name="roll_type" value={this.state.roll_type} /><br/>
              <label>Sushi Instructions</label>
              <input type="text" name="instructions" value={this.state.instructions} />
              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CardBack;

// <h2>Roll Reviews</h2>
