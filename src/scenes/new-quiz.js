import React, { Component } from 'react'
// import axios from 'axios';
import {Redirect} from 'react-router-dom';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
//Style
import './new-quiz.css'
// Actions
import {postNewQuizRequest} from './ducks/actions';

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
    this.props.postNewQuizRequest({
      quizName: this.state.quizName
    });
    // if no error:
    this.setState({
      redirectTo: '/'
    })

  }

  render() {
      if (this.state.redirectTo) {
        return <Redirect to={{ pathname: this.state.redirectTo }} />
      } else {
        return (
          <div className="container">
            <h4>New Quiz</h4>
            <form 
              className="form-horizontal"
              onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <div className="column label">
                  <label className="form-label" htmlFor="quizName">Quiz name</label>
                </div>
                <div className="column input">
                  <input className="form-input quiz-name"
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
                <input
                  className="btn btn-primary"
                  
                  type="submit"
                  value="Submit" />
              </div>
            </form>
            
          </div>
        
      )
    }
  }
}

function mapStateToProps(state) {
    return {
        quizName: state.quizName
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postNewQuizRequest: postNewQuizRequest,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuiz);