import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom';

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../NewQuiz/new-quiz.css'

// Actions
import { getQuizzesRequest, selectQuiz } from '../ducks/actions';
const Container = styled.div`
  background-color: rgb(236, 236, 236);
  width: 100%;
  height: 100vh;
`

const QuizContainer = styled.div`
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
  }

  loadQuiz() {
    this.props.loadQuiz(this.props.quiz)
  }
  render() {
    let numberOfQuestions = 0
    if (this.props.quiz.questions) {
      numberOfQuestions = this.props.quiz.questions.length
    }
    return (

      <QuizContainer
        onClick={this.loadQuiz.bind(this)}
        >
        <Name>Quiz: {this.props.quiz.name}</Name>
        <Questions>Questions: {this.props.quiz.questions.length}</Questions>
      </QuizContainer>
    )
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
        pathname: '/view_quiz/?quiz_id=' + quiz.quiz_id,
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


  render() {
    console.log('******** props **********')
    console.log(this.props.quiz.quizzes)

    const listItems = this.props.quiz.quizzes.map((quiz, i) =>
      <QuizListItem
        loadQuiz={this.loadQuiz.bind(this)}
        key={i.toString()}
        quiz={quiz}
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
            <Link to="/new-quiz" className="btn text-secondary">
              <span>New Quiz</span>
            </Link>
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);