import React, {Component} from 'react'

export default class NewSushiContainer extends Component {

  state = {
    name: '',
    img: '',
    roll_type: '',
    instructions: ''
  }

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
  }

  clickBuild = (event) => {
    if (event.target.nextElementSibling.className === 'new-sushi') {
      event.target.nextElementSibling.style.display = 'block'
    } else {
      event.target.parentElement.parentElement.style.display = 'none'
    }
  }

  render() {
    return (
      <div>
        <button className="new-btn" onClick={this.clickBuild}>Build Your Own Sushi</button>
        <div className="new-sushi">
          <div className="new-sushi-content">
            <span class="close" onClick={this.clickBuild}>&times;</span>
            <form onChange={this.handleChange} onSubmit={event=>this.props.handleSubmit(event, this.state)} >
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
