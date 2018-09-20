import React, { Component } from 'react';
// Routing
import { Route } from 'react-router-dom'

// style
import './App.css';
// Components
import Home from './scenes/Home/home';
import NewQuiz from './scenes/NewQuiz/new-quiz';
import QuizView from './scenes/QuizView/quiz-view'


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
        <Route
          path="/view_quiz"
          component={QuizView}
        />
      </div>
    );
  }
}

export default App;
