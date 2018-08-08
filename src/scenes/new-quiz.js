import React, { Component } from 'react'
import axios from 'axios';
// Components
import AddQuestion from './add-question'
//Style
import './new-quiz.css'

class NewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      quizName: '',
    };
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('handleSubmit')

    axios.post('/', {
        quizName: this.state.quizName,
      })
      .then(response => {
        console.log('new quiz response: ')
        console.log(response)
        if (response.status === 200) {
          // update App.js state
          // this.props.updateQuiz({
          //   loggedIn: true,
          //   username: response.data.username
          // })
          // update the state to redirect to home
          this.setState({
            redirectTo: '/'
          })
        }
      }).catch(error => {
        console.log('new quiz error: ')
        console.log(error);

    })
  }

  render() {
    return (
      <div className="container">
        <h4>New Quiz</h4>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="column label">
              <label className="form-label" htmlFor="quizName">Quiz name</label>
            </div>
            <div className="column input">
              <input className="form-input"
                type="text"
                id="quizName"
                name="quizName"
                placeholder="Type your quizName"
                value={this.state.quizName}
                onChange={this.handleChange.bind(this)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="column button-container"></div>
            <button
              className="btn btn-primary"
              onClick={this.handleSubmit.bind(this)}
              type="submit">Submit</button>
          </div>
        </form>
        
      </div>
    )
  }
}

export default NewQuiz