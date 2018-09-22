import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import AddQuestionForm from './add-question-form';
//Style
import './new-quiz.css'
import styled from 'styled-components'
// Actions
import { postNewQuestionRequest } from '../ducks/actions';
import { selectQuiz } from '../ducks/actions'

const Container = styled.div`
  background-color: rgb(236, 236, 236);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
`

class AddQuestion extends Component {
  constructor() {
    super();
    this.state = {
      quizName: '',
      redirectTo: null,
      error: null,
      submitClicked: null,
    };
  }

  componentDidMount() {
    let quiz = this.props.location.state;
    const quiz_id = this.props.location.search.replace(/\?quiz_id=/, '')
    if (this.props.quiz === null) {
      // Otherwise find the quiz from the redux state
      this.props.quizzes.forEach((quiz, i) => {
        if (quiz.quiz_id === quiz_id) {
          quiz = quiz
        }
      })
    }
    console.log('*** selected quiz ***', quiz)
    this.props.selectQuiz(quiz);

  }

  submit = () => {
    console.log('new quiz form submit: ')
    this.props.postNewQuestionRequest();
    this.setState({
      submitClicked: true
    })
  }

  render() {
    // get selected quiz info from react router (in redirect from quiz-view.js)
    let quiz = null;
    let quiz_id = null;
    if (this.props.quiz.selectedQuiz) {
      quiz = this.props.quiz
      if (this.props.location.state) {
        quiz = this.props.location.state
      } 
      else {
        if (this.props.location.search) {
          quiz_id = this.props.location.search.replace(/\?quiz_id=/, '')
        }
      }
    }


    const quizViewRedirectObj = {
      pathname: '/view_quiz/?quiz_id=' + quiz_id,
      state: quiz
    }
    console.log('this.props', this.props)
    if (this.props.quiz.isLoading === false &&
      this.props.quiz.error === null &&
      this.state.submitClicked
      && 5 === 3) {
      return <Redirect to={quizViewRedirectObj} />
    } else {
      return (
        <Container>
          <h4>Add Question</h4>
          {this.props.quiz.error !== null &&
            <p>There was an error submitting your quiz.  Please try again.</p>
          }
          <AddQuestionForm
            onSubmit={this.submit.bind(this)} />
        </Container>
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
    postNewQuestionRequest: postNewQuestionRequest,
    selectQuiz: selectQuiz,

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);