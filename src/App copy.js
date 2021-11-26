

import React, { Component } from 'react';
import axios from 'axios';



class App extends Component {
  state = {
    movies: null,
    loading: false,
    value: ''
  };

  search = async val => {
    this.setState({ loading: true });
    const res = await axios(
      `https://api.jsonbin.io/b/61a010d962ed886f9154be7e`
    );
    const movies = await res.data.results;
  
    this.setState({ movies, loading: false });
  };

  onChangeHandler = async e => {
    e.preventDefault();
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  get renderMovies() {
    let movies = <h1>There's no movies</h1>;
    if (this.state.movies) {
      movies = <h1>esta e suna prueba {movies}</h1>;
    }

    return movies;
  }

  render() {
    return (
      <div>
        <input
          value={this.state.value}
          onChange={e => this.onChangeHandler(e)}
          placeholder="Type something to search"
        />
        {this.renderMovies}
      </div>
      );
  }
}

export default App;