import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import RoundButton from '../../Components/round-button'
import QuestionList from './question-list'
import { ActionButton } from '../../Components/action-button'

//Style
import { colors } from '../../Style/constants'
import {
  NavBar, NavBarLink, Container, CenteredColumn, AddQuestionCard, Row
} from './quiz-view-style'

// Actions
import {
  getQuizzesRequest, selectQuiz, deleteQuestionRequest
} from '../ducks/actions'

class QuizView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quiz: null,
      redirectTo: null,
    }
  }
  componentDidMount() {
    this.props.getQuizzesRequest();
  }

  // on mount, get quizzes if selected quiz not available
  showAddNewQuestionForm() {
    const quiz = this.getQuiz()
    const quiz_id = this.getQuizId()
    const redirectObj = {
      pathname: '/add-question/?quiz_id=' + quiz_id,
      state: {
        question: null,
        quiz: quiz
      },
    }
    this.setState({
      redirectTo: redirectObj
    })
  }

  redirectHome() {
    console.log('redirecting home');
    this.setState({
      redirectTo: { pathname: '/' }
    }, function () {
      // this.props.selectQuiz({})
    })
  }

  getQuiz() {
    let selectedQuiz = null;
    if (this.props.selectedQuiz !== null) {
      return this.props.selectedQuiz
    } else if (this.props.location.state) {
      return this.props.location.state
    }
    const quiz_id = this.props.location.search.replace(/\?quiz_id=/, '')
    this.props.quizzes.forEach((quiz) => {
      if (quiz_id == quiz.quiz_id) selectedQuiz = { ...quiz }
    })

    console.log('*** get quiz ***');
    console.log(selectedQuiz)
    return selectedQuiz
  }

  getQuizId() {
    let quiz_id = null
    if (this.props.selectedQuiz) {
      quiz_id = this.props.selectedQuiz.quiz_id
    } else if (this.props.location.search) {
      quiz_id = this.props.location.search.replace(/\?quiz_id=/, '')
    }
    return quiz_id
  }

  editQuiz(quiz) {
    console.log(quiz);
    const redirectObj = {
      pathname: '/edit-quiz/?quiz_id=' + quiz.quiz_id,
      state: quiz
    }
    this.setState({
      redirectTo: redirectObj
    })
  }

  render() {
    // const quiz_id = this.getQuizId();
    let quiz = this.getQuiz()
    console.log('***** quiz ******')
    console.log(quiz)
    console.log('props');
    console.log(this.props)
    // if quiz is passed from home.js through redirect object

    if (this.state.redirectTo) {
      return (
        <Redirect to={this.state.redirectTo} />
      )
    } else if (quiz) {
      return (

        <Container>
          <NavBar>
            <NavBarLink
              onClick={this.redirectHome.bind(this)}
            >Quizzes</NavBarLink>
            <div></div>
          </NavBar>
          <Row>
            <h1 style={{ display: 'inline-block' }}>{quiz.name}</h1>

            <ActionButton
              color={colors.blue}
              icon="edit"
              data={quiz}
              action={this.editQuiz.bind(this)}
            >
            </ActionButton>

          </Row>
          <AddQuestionCard>
            <CenteredColumn>
              <p style={{ color: colors.gray700, margin: '10px 0' }}>Add a question</p>
              <RoundButton
                text="+"
                ariaLabel="Add a question"
                color={colors.blue}
                action={this.showAddNewQuestionForm.bind(this)}
              />
            </CenteredColumn>
          </AddQuestionCard>
          {this.props.isLoading === false && (
            <QuestionList
              {...this.props}
              selectedQuiz={quiz}
            />)
          }
        </Container>
      )
    } else {
      return (null)
    }
  }
}

function mapStateToProps(state) {
  return {
    ...state.quiz
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getQuizzesRequest,
    selectQuiz,
    deleteQuestionRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);