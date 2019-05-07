import React from 'react'

const ReviewCard = (props) => {
    return (
      <div>
        <h3><strong>{props.review.title}, <em>Rating: {props.review.rating}</em></strong></h3>
        <p>{props.review.body}</p><hr/>
      </div>
    )
  }

export default ReviewCard;
