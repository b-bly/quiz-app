import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom';

//Style
import { colors } from '../../Style/constants'
import { CenteredContainer, QuestionContainer, QuizButton } from './quiz-view-style'

// Components
import {ActionButton} from '../../Components/action-button'

export default class QuestionList extends Component {
  constructor() {
    super()
    this.state = {
      redirectTo: null
    }
  }

  editQuestion(question) {
    const redirectObj = {
      pathname: '/edit-question/?quiz_id=' + this.props.selectedQuiz.quiz_id,
      state: {
        question: question,
        quiz: this.props.selectedQuiz
      }
    }
    this.setState({
      redirectTo: redirectObj
    })
  }

  deleteQuestion(question) {
    const data = {
      id: question.id,
      quiz_id: question.quiz_id
    }
    this.props.deleteQuestionRequest(data);
  }


  render() {
    console.log('this.props.location')
    console.log(this.props.location)
    console.log('quiz.questions')
    console.log(this.props.selectedQuiz.questions)
    let questions = null
    if (this.props.selectedQuiz) {
      if (this.props.selectedQuiz.questions) {
        questions = this.props.selectedQuiz.questions.length < 1 ? null : this.props.selectedQuiz.questions.map((question, i) =>
          <QuestionContainer key={i.toString()}>
            <CenteredContainer>
              <h1 style={{ color: colors.gray700 }}>{i + 1}</h1>
            </CenteredContainer>
            <CenteredContainer>
              <p style={{ color: colors.gray700 }}>{question.text}</p>
            </CenteredContainer>
            <CenteredContainer style={{ width: '100%' }}>
              <ActionButton icon="trash"
                color={colors.red}
                data={question}
                action={this.deleteQuestion.bind(this)}
                style={{ display: 'inline-block', marginLeft: 'auto' }}
              >
              </ActionButton>
              <ActionButton
                style={{ display: 'inline-block' }}
                color={colors.blue}
                icon="edit"
                data={question}
                action={this.editQuestion.bind(this)}
              >
              </ActionButton>
            </CenteredContainer>
          </QuestionContainer>
        )
      }
    }
    console.log('questions:');
    console.log(questions);
    if (this.state.redirectTo) {
      return (
        <Redirect to={this.state.redirectTo} />
      )
    } else {
      return (
        <Fragment>
          {questions ?
            <Fragment>
              {questions}
            </Fragment>
            :
            <div>This quiz has no questions</div>
          }
        </Fragment>
      )
    }
  }
}