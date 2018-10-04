import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import AddQuestionForm from './add-question-form';
//Style
import styled from 'styled-components'

// Actions
import { selectQuiz, resetQuestionForm, postNewQuestionRequest, getQuizzesError } from '../ducks/actions'

const Background = styled.div`
  background-color: rgb(236, 236, 236);
  width: 100%;
  height: 100vh;
`
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
`
const NavBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // height: 20px;
  flex-direction: row;
  background-color: rgba(0, 0, 0, .7);
  `
const NavBarItem = styled.div`
  color: white;
  padding: 10px;`

const CloseX = styled.div`
  color: white;
  padding: 10px;
  cursor: pointer;
  &:hover {
    opacity: .8;
    background-color:rgba(0, 0, 0, .6);
  }`

class AddQuestion extends Component {
  constructor() {
    super();
    this.state = {
      submitClicked: null,
    };
  }

  componentWillUnmount() {
    this.props.resetQuestionForm();
  }

  submit() {
    console.log('new quiz form submit: ')
    this.props.postNewQuestionRequest();
    this.setState({
      submitClicked: true
    })
  }

  close() {
    this.props.resetQuestionForm();
    const quiz = this.getQuiz();
    const quiz_id = this.getQuizId();
    this.setState({
      redirectTo: {
        pathname: '/view-quiz/?quiz_id=' + quiz_id,
        state: quiz
      }
    })
  }

  getQuiz() {
    let quiz = null;
    if (this.props.quiz.selectedQuiz) {
      quiz = this.props.quiz
      if (this.props.location.state) {
        quiz = this.props.location.state
      }
    }
    return quiz
  }

  getQuizId() {
    let quiz_id = null
    if (this.props.quiz.selectedQuiz) {
      quiz_id = this.props.quiz.selectedQuiz.quiz_id
    } else if (this.props.location.search) {
      quiz_id = this.props.location.search.replace(/\?quiz_id=/, '')
    }
    return quiz_id
  }

  getQuestion() {
    let question = null;
    if (this.props.location.state) {
      question = this.props.location.state
    }
    console.log('************ question ************')
    console.log(question);
    //     a: "fdsa"
    // correct_answer: "a"
    // text: "fdsa"
    return question
  }

  render() {
    // get selected quiz info from react router (in redirect from quiz-view.js)

    const quiz = this.getQuiz()
    const quiz_id = this.getQuizId()
    const question = this.getQuestion()
    const quizViewRedirectObj = {
      pathname: '/view-quiz/?quiz_id=' + quiz_id,
      state: quiz
    }
    console.log('this.props', this.props)
    if (this.props.quiz.isLoading === false &&
      this.props.quiz.error === null &&
      this.state.submitClicked) {
      return <Redirect to={quizViewRedirectObj} />
    } else if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />
    } else {
      return (
        <Background>
          <NavBar>
            <NavBarItem></NavBarItem>
            <NavBarItem>New Question</NavBarItem>
            <CloseX onClick={this.close.bind(this)}
            >&#x2716;</CloseX>
          </NavBar>
          <Container>
            {this.props.quiz.error !== null &&
              <p>There was an error submitting your quiz.  Please try again.</p>
            }
            <AddQuestionForm
              initialValues={question}
              MCInitialValues={question}
              onSubmit={this.submit.bind(this)} />
          </Container>
        </Background>
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
    resetQuestionForm: resetQuestionForm,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);