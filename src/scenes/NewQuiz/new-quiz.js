import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import NewQuizForm from './new-quiz-form';
//Style
// import './new-quiz.css'
import styled from 'styled-components'
// Actions
import { postNewQuizRequest, resetQuiz } from '../ducks/actions';

const Container = styled.div`
  background-color: rgb(236, 236, 236);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
`

class NewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      quizName: '',
      submitClicked: null,
    };
  }

  componentWillUnmount() {
    if (this.props.quiz.isLoading === false) this.props.resetQuiz();
  }

  getQuiz() {
    let quiz = null;
    if (this.props.selectedQuiz) {
      if (this.props.selectedQuiz.questions) {
        quiz = this.props.selectedQuiz
      }
    } else if (this.props.location.state) {
      quiz = this.props.location.state
    }
    return quiz
  }

  submit = () => {
    console.log('new quiz form submit: ')
    this.props.postNewQuizRequest();
    this.setState({
      submitClicked: true
    })
  }

  render() {
    const quiz = this.getQuiz()
    // https://redux-form.com/7.0.2/examples/initializefromstate/
    console.log('quiz', quiz)
    const initialValue = {
      quizName: quiz.name
    }

    if (this.props.quiz.isLoading === false &&
      this.props.quiz.error === null &&
      this.state.submitClicked) {
      return <Redirect to={{ pathname: '/' }} />
    } else {
      return (
        <Container>
          <h4>New Quiz</h4>
          {this.props.quiz.error !== null &&
            <p>There was an error submitting your quiz.  Please try again.</p>
          }
          {quiz ?
            (
              <NewQuizForm onSubmit={this.submit.bind(this)} 
              initialValues={initialValue}/>
            )
            :
            (
              <NewQuizForm onSubmit={this.submit.bind(this)} />
            )
          }
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
    postNewQuizRequest: postNewQuizRequest,
    resetQuiz: resetQuiz,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuiz);