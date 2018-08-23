import React, { Component } from 'react'
// import axios from 'axios';
import {Redirect} from 'react-router-dom';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import NewQuizForm from './new-quiz-form';
//Style
import './new-quiz.css'
// Actions
import { postNewQuizRequest, resetQuiz } from '../ducks/actions';

class NewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      quizName: '',
      redirectTo: null,
      error: null,
    };
  }

  componentWillUnmount () {
    if (this.props.quiz.isLoading === false) this.props.resetQuiz();
  }

  submit = name => {
    console.log('new quiz form submit: ')
    console.log(name);
    
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
            <NewQuizForm onSubmit={this.submit.bind(this)} />
            
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
        resetQuiz: resetQuiz,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuiz);