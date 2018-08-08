import React, { Component } from 'react'
// Style
import './add-question.css'

class AddQuestion extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      answer: '',
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

    // axios
    //   .post('/quiz/name', {
    //     quizName: this.state.quizName,
    //   })
    //   .then(response => {
    //     console.log('quizName response: ')
    //     console.log(response)
    //     if (response.status === 200) {
          
    //       // update the state to redirect to home
    //       this.setState({
    //         redirectTo: '/'
    //       })
    //     }
    //   }).catch(error => {
    //     console.log('new quiz error: ')
    //     console.log(error);

    //   })
  }

  render() {
    return (
      <div className="container">
        <h4>Add a Question</h4>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="column label">
              <label className="form-label" htmlFor="question">Question</label>
            </div>
            <div className="column input">
              <textarea className="form-input"
                type="text"
                name="question"
                placeholder="Type your question"
                value={this.state.question}
                onChange={this.handleChange.bind(this)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="column label">
              <label className="form-label" htmlFor="answer">Answer </label>
            </div>
            <div className="column input">
              <textarea className="form-input"
                placeholder="answer"
                type="text"
                name="answer"
                value={this.state.answer}
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

export default AddQuestion