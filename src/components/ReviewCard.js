import React from 'react'
import ReviewEditForm from './ReviewEditForm'

class ReviewCard extends React.Component {
  state = {
    editHidden: true
  }

  showForm = () => {
    this.setState({
      editHidden: !this.state.editHidden
    })
  }


  render () {
    return (
      <div>
        <h3><strong>{this.props.review.title}, <em>Rating: {this.props.review.rating}</em></strong></h3>
        <p>{this.props.review.body}</p><hr/>
        {this.props.currentUser.id === this.props.review.user_id ?
          <div>
            <button onClick={() => {this.props.handleDeleteClick(this.props.review)}}> Delete </button>
            <button onClick={this.showForm}> Edit</button>
          </div>: null}
          {this.state.editHidden === false ?
          <ReviewEditForm showForm={this.showForm} handleEditSubmit={this.props.handleEditSubmit} info={this.props.review}/> : null}
      </div>
    )
  }
  }

export default ReviewCard;
