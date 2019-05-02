import React, { Component } from 'react'

class Search extends Component {
  state={
    searchTerm: ""
  }

  handleSearchLocally = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
    this.props.handleSearch(event)
  }

  render() {
    return <input onChange={this.handleSearchLocally} type="text" name="searchTerm" placeholder="search your soymates" value={this.state.searchTerm} />
  }
}

export default Search
