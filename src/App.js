import React, { Component } from 'react';

import RecipeBox from './components/RecipeBox/RecipeBox';
import Title from './components/Title/Title';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title />
        <RecipeBox />
      </div>
    );
  }
}

export default App;
