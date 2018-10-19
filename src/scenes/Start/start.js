import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import Question from './question'

//Style
import styled from 'styled-components'
import { colors } from '../Style/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Actions
import { getQuizzesRequest } from '../ducks/actions';

const NavBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // height: 20px;
  flex-direction: row;
  background-color: rgba(0, 0, 0, .7);
  `
const NavBarLink = styled.div`
  color: white;
  padding: 10px;
  cursor: pointer;
  &:hover {
    opacity: .8;
    background-color:rgba(0, 0, 0, .6);
  }`

const Container = styled.div`
  background-color: rgb(236, 236, 236);
  width: 100%;
  height: 100vh;
  display: inline-block;`

const CenteredContainer = styled.div`
  margin: auto 1em;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  `
const CenteredColumn = styled.div`
  margin: auto;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-around;
  `

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px auto;
  width: 80%;
  box-shadow: 1px 1px 3px 1px darkgrey;
  background-color: white;
  text-align: left;
  padding: 10px;
  line-height: 1.4em;
  border-radius: 1em;
`

const Button = styled.button`
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
  padding: 5px 20px;
  font-size: 1em;
  // line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: ${props => props.color};
  color: white;
  border-radius: 1em;
  outline:0;
  text-decoration: none;
  cursor: pointer;
  

&:hover, .btn:focus {
  text-decoration: none;
  opacity: .8;
}

&:focus, .btn.focus {
  outline: 0;
}
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin: auto;
  `

const CenteredItem = styled.div`
  
  `
const NextContainer = styled.div`
  position: relative;
`

const NextButton = styled(Button)`
  position: absolute;
  bottom:0;
  right:0;
`

class Start extends Component {
  constructor() {
    super()
    this.state = {
      redirectTo: null,
      questionIndex: 0,
      quiz: null,
      done: false,
      score: 0,
      selectedAnswer: null,
    }
  }
  componentDidMount() {
    // if (this.props.quizzes.length < 1) {
    this.props.getQuizzesRequest();
    // }
  }

  componentWillReceiveProps(nextProps) {
    const quiz_id = nextProps.match.params.id
    let quiz = null
    if (nextProps.quizzes.length > 0) {
      nextProps.quizzes.forEach((quizObj) => {
        if (quizObj.quiz_id == quiz_id) {
          console.log('found quiz');

          quiz = quizObj
        }
      })
    }
    this.setState({
      quiz: quiz
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

  nextQuestion = () => {
    console.log('next question')
    const questionIndex = parseInt(this.state.questionIndex) + 1
    if (questionIndex <= (this.state.quiz.questions.length - 1)) {
      this.setState({
        questionIndex: questionIndex,
        selectedAnswer: null,
      })
    } else {
      this.setState({
        done: true,
      })
    }
  }

  endQuiz = () => {
    // if last question, show done screen
    this.setState({
      done: true
    })
    console.log('quiz done')
  }

  submit = (letter, correct) => {
    let score = this.state.score
    if (correct) score += 1
    this.setState({
      score: score,
      selectedAnswer: letter,
    })
  }

  render() {
    console.log('this.props')
    console.log(this.props)
    const quiz_id = this.props.match.params.id
    let quiz = this.state.quiz
    // if (this.props.quizzes.length > 0) {
    //   this.props.quizzes.forEach((quizObj) => {
    //     if (quizObj.quiz_id == quiz_id) {
    //       console.log('found quiz');

    //       quiz = quizObj
    //     }
    //   })
    // }

    console.log('quiz');
    console.log(quiz)


    if (this.state.redirectTo) {
      return (
        <Redirect to={this.state.redirectTo} />
      )
    } else {
      return (
        <Container>
          <NavBar>
            <NavBarLink
              onClick={this.redirectHome.bind(this)}
            >Quiz Home</NavBarLink>
            <div></div>
          </NavBar>
          {this.state.done === true && (
            <div>
              <div>All done</div>
              <div>Score: {this.state.score}/{quiz.questions.length}</div>
            </div>
          )}

          {quiz !== null && this.state.done === false && (
            <Row>
              <div></div>
              <CenteredItem><h1 style={{ display: 'inline-block' }}>{quiz.name}</h1></CenteredItem>
              <NextContainer><NextButton
                color={colors.green}
                onClick={this.nextQuestion.bind(this)}
              >Next</NextButton></NextContainer>
            </Row>
          )}
          {quiz !== null && this.state.done === false && (
            <QuestionContainer>
              {quiz.questions.length > 0 ? (
                <Question
                  question={quiz.questions[this.state.questionIndex]}
                  endQuiz={this.endQuiz.bind(this)}
                  questionIndex={this.state.questionIndex}
                  numberOfQuestions={quiz.questions.length}
                  submit={this.submit.bind(this)}
                  selectedAnswer={this.state.selectedAnswer}
                />
              ) : (
                  <p>This quiz has no questions.</p>
                )}

            </QuestionContainer>
          )}




        </Container>

      )
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Start);