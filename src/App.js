import React, { Component } from 'react';
// Routing
import { Route } from 'react-router-dom'
// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPencilAlt, faStroopwafel, faEdit } from '@fortawesome/free-solid-svg-icons'


// style
import './App.css'
// Components
import Home from './scenes/Home/home'
import NewQuiz from './scenes/NewQuiz/new-quiz'
import QuizView from './scenes/QuizView/quiz-view'
import AddQuestion from './scenes/NewQuiz/add-question.js'

library.add(faTrash, faPencilAlt, faStroopwafel, faEdit)


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route
          exact path="/"
          component={Home}
        />
        <Route
          path="/edit-quiz"
          component={NewQuiz}
        />
        <Route
          path="/new-quiz"
          component={NewQuiz}
        />
        <Route
          path="/view-quiz"
          component={QuizView}
        />
        <Route
          path="/add-question"
          component={AddQuestion}
        />
        
      </div>
    );
  }
}

export default App;
