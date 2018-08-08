import React, { Component } from 'react';
// Routing
import { Route } from 'react-router-dom'

// style
import './App.css';
// Components
import Home from './scenes/home';
import NewQuiz from './scenes/new-quiz';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route
          exact path="/"
          component={Home}
        />
        <Route
          path="/new-quiz"
          component={NewQuiz}
        />
      </div>
    );
  }
}

export default App;
