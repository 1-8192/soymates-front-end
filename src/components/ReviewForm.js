import React, {Component} from 'react'

export default class ReviewForm extends Component {
  render() {
    return (
      <div>
        <h3><strong>New Review</strong></h3>
        <form onChange={this.props.handleChange} onSubmit={event=>this.props.handleSubmit(event, this.props.reviewStuff)}>
          <label>Title</label>
          <input type="text" name="title" placeholder="Review Title" value={this.props.reviewStuff.title} /><br/>
          <label>Rating</label>
          <input type="number" name="rating" placeholder="Rate 1-5" value={this.props.reviewStuff.rating} /><br/>
          <label>Review</label>
          <input type="text" name="body" placeholder="Review Content" value={this.props.reviewStuff.body} /><br/>
          <input type="submit"/ >
        </form>
      </div>
    )
  }
}
