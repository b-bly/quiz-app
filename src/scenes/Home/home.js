import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
// Style
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { colors } from '../Style/constants'

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { getQuizzesRequest, selectQuiz, deleteQuizRequest } from '../ducks/actions';

const Container = styled.div`
  background-color: rgb(236, 236, 236);
  width: 100%;
  height: 100vh;
`

const QuizContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 15px auto;
  width: 50%;
  box-shadow: 1px 1px 3px 1px darkgrey;
  background-color: white;
  text-align: left;
  padding: 10px;
  line-height: 1.4em;
  cursor: pointer;
  &:hover {
    background-color: rgb(236, 236, 236);
  }
`

const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  flex: 1 1 auto;`

const RightContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;`
// They should add how to do pseudo selectors to styled components
// to the documentation

const Name = styled.div`
  font-size: 18px;
  color: rgb(63, 63, 63);
`
const Questions = styled.div`
  font-size: 15px;
  color: rgb(63, 63, 63);
`
const Title = styled.div`
  padding: .5em;
`
const QuizButton = styled(FontAwesomeIcon)`
  color: ${props => props.color};
  margin: 'auto .5em';
  margin: 0 .5em;
  &:hover, .btn:focus {
    text-decoration: none;
    opacity: .75;
  }`

const Button = styled(Link)`
  background-color: ${props => props.color};
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: rgb(23, 112, 255);
  color: white;
  border-radius: 20px;
  outline:0;
  text-decoration: none;
  

&:hover, .btn:focus {
  text-decoration: none;
  opacity: .8;
}

&:focus, .btn.focus {
  outline: 0;
}
`

// regexp@^1.7.0 understands.<Redirect
//   to={{
//     pathname: "/login",
//     search: "?utm=your+face",
//     state: { referrer: currentLocation }
//   }}
// />

class QuizListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectTo: null,
    }
  }

  loadQuiz() {
    this.props.loadQuiz(this.props.quiz)
  }

  deleteQuiz(e) {
    e.stopPropagation();
    this.props.deleteQuiz(this.props.quiz.quiz_id);
  }

  editQuiz(e) {
    e.stopPropagation();
    const redirectObject = {
      pathname: '/view-quiz/?quiz_id=' + this.props.quiz_id,
      state: this.props.quiz
    }
    this.setState({
      redirectTo: redirectObject,
    })
  }

  start(e) {
    e.stopPropagation();
    const redirectObject = {
      pathname: '/start/?quiz_id=' + this.props.quiz_id,
      state: this.props.quiz
    }
    this.setState({
      redirectTo: redirectObject,
    })
  }

  render() {
    let numberOfQuestions = 0
    if (this.props.quiz.questions) {
      numberOfQuestions = this.props.quiz.questions.length
    }

    if (this.state.redirectTo) {
      return (
        <Redirect
          to={this.state.redirectTo}
        />
      )
    } else {
      return (

        <QuizContainer
          onClick={this.loadQuiz.bind(this)}>
          <Column>
            <Name>Quiz: {this.props.quiz.name}</Name>
            <Questions>Questions: {numberOfQuestions}</Questions>
          </Column>
          <RightContainer>
            <QuizButton icon="trash"
              color={colors.red}
              onClick={this.deleteQuiz.bind(this)}>
            </QuizButton>
            <QuizButton icon="edit"
              color={colors.blue}
              onClick={this.editQuiz.bind(this)}>
            </QuizButton>
            <QuizButton icon="external-link-alt"
              color={colors.green}
              onClick={this.start.bind(this)}>
            </QuizButton>
          </RightContainer>

        </QuizContainer>
      )
    }
  }
}

class Home extends Component {
  constructor() {
    super()
    this.state = {
      redirectTo: null
    }
  }
  componentDidMount() {
    this.props.getQuizzesRequest();
  }

  loadQuiz(quiz) {
    this.props.selectQuiz(quiz)

    this.setState({
      redirectTo: {
        pathname: '/view-quiz/?quiz_id=' + quiz.quiz_id,
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

  deleteQuiz(quiz_id) {
    this.props.deleteQuizRequest(quiz_id);
  }

  render() {
    console.log('******** props **********')
    console.log(this.props.quiz.quizzes)

    const listItems = this.props.quiz.quizzes.map((quiz, i) =>
      <QuizListItem
        loadQuiz={this.loadQuiz.bind(this)}
        key={i.toString()}
        quiz={quiz}
        deleteQuiz={this.deleteQuiz.bind(this)}
      />
    );

    if (this.state.redirectTo) {
      return (
        <Redirect
          to={this.state.redirectTo}
        />
      )
    } else {
      return (
        <Fragment>
          <Container>
            <Title>Quiz Wiz</Title>
            <Button to="/new-quiz" color={colors.blue}>
              New Quiz
            </Button>
            {listItems}
          </Container>
        </Fragment>
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
    getQuizzesRequest,
    selectQuiz,
    deleteQuizRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);