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
import { selectQuiz, resetQuestionForm, postNewQuestionRequest, updateQuestionRequest } from '../ducks/actions'

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
    console.log('******* new question form submit: *******')
    const quiz = this.getQuiz()
    this.props.postNewQuestionRequest(quiz);
    this.setState({
      submitClicked: true
    })
  }

  submitEdit() {
    console.log('update question form submit: ')
    const quiz = this.getQuiz()
    this.props.updateQuestionRequest(quiz);
    this.setState({
      submitClicked: true
    })
  }

  close() {
    this.props.resetQuestionForm();
    const quiz = this.getQuiz()
    const quiz_id = quiz.quiz_id
    this.setState({
      redirectTo: {
        pathname: '/view-quiz/?quiz_id=' + quiz_id,
        state: quiz
      }
    })
  }

  getQuiz() {
    let selectedQuiz = null;
    if (this.props.location.state) {
      selectedQuiz = this.props.location.state.quiz
    } else {
      const quiz_id = this.props.location.search.replace(/\?quiz_id=/, '')
      this.props.quiz.quizzes.forEach((quiz) => {
        console.log(quiz)
        if (quiz_id == quiz.quiz_id) selectedQuiz = { ...quiz }
      })
    }
    return selectedQuiz
  }

  getQuestion() {
    let question = null;
    if (this.props.location.state) {
      question = this.props.location.state.question
    }

    // a: "fdsa"
    // correct_answer: "a"
    // text: "fdsa"
    return question
  }

  render() {
    // get selected quiz info from react router (in redirect from quiz-view.js)
    console.log('************ props ************')
    console.log(this.props.location);
    const question = this.getQuestion()
    const quiz_id = this.props.location.search.replace(/\?quiz_id=/, '')
    const quiz = this.getQuiz();

    const quizViewRedirectObj = {
      pathname: '/view-quiz/?quiz_id=' + quiz_id,
      state: quiz
    }
    const mode = this.props.location.pathname.search(/edit/) === -1 ? 'add' : 'edit';
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
            {mode === 'edit' ? (
              <AddQuestionForm
                initialValues={question}
                onSubmit={this.submitEdit.bind(this)}
                quiz={quiz} />
            ) : (
                <AddQuestionForm
                  onSubmit={this.submit.bind(this)}
                  quiz={quiz} />
              )}
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
    updateQuestionRequest: updateQuestionRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);