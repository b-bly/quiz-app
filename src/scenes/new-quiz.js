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
      redirectTo: null,
      error: null,
    };
  }
  componentDidUpdate () { // prevProps, prevState, snapshot
    // *** problems with re-rendering too many times with setState ***
    // console.log('component did update')
    // console.log(this.props);
    // if (this.props.quiz.isLoading === false) {
    //   console.log('this.props.isLoading === false')
    //   if (this.props.quiz.error === null && this.state.redirictTo === null) {
    //     this.setState({
    //       redirectTo: '/'
    //     })
    //   } else if (this.state.error === null) {
    //     this.setState({
    //       error: this.props.quiz.error
    //     })
    //   }
    // }
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
    // error handling in componentDidUpdate
  }

  render() {
      if (this.props.quiz.isLoading === false && this.props.quiz.error === null) {
        return <Redirect to={{ pathname: '/' }} />
      } else {
        return (
          <div className="container">
            <h4>New Quiz</h4>
            { this.props.quiz.error !== null && 
              <p>There was an error submitting your quiz.  Please try again.</p>
            }
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
        ...state
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postNewQuizRequest: postNewQuizRequest,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuiz);