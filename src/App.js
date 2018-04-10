import React, { Component } from 'react';
import './App.css';
import FoodSearch from "./FoodSearch";

class App extends Component {


  render() {
    
    return (
      <div className="Nutrition">
          <FoodSearch />
      </div>
    );
  }
}

export default App;
