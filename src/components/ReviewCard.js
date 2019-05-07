import React from 'react'

const ReviewCard = (props) => {
    return (
      <div>
        <h3>{props.review.title}, <em>Rating: {props.review.rating}</em></h3>
        <p>{props.review.body}</p>
      </div>
    )
  }

export default ReviewCard;
