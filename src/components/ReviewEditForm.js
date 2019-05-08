import React from 'react'

class ReviewEditForm extends React.Component {
  state ={
    id: this.props.info.id,
    title: this.props.info.title,
    rating: this.props.info.rating,
    body: this.props.info.body,
    recipe_id: this.props.info.recipe_id,
    user_id: this.props.user_id
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmitLocally = (event) => {
    this.props.handleEditSubmit(event, this.state)
    this.props.showForm()
  }

  render() {
    return (
      <div>
        <h3><strong>Edit Your Review</strong></h3>
        <form onSubmit={this.handleSubmitLocally}>
        <label>Title</label>
        <input onChange={this.handleChange} type="text" name="title" value={this.state.title} /><br/>
        <label>Rating</label>
        <input onChange={this.handleChange}type="number" name="rating" value={this.state.rating} /><br/>
        <label>Review</label>
        <input onChange={this.handleChange}type="text" name="body" value={this.state.body} /><br/>
        <input type="submit"/ >
        </form>
      </div>
    )
  }
}

export default ReviewEditForm
