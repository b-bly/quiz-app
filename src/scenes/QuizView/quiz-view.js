import React, { Component, Fragment } from 'react'
// import { Redirect } from 'react-router-dom';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
//Style
import styled from 'styled-components'
import { colors } from '../Style/constants'
// Actions
import { getQuizzesRequest } from '../ducks/actions';

// import { postNewQuizRequest, resetQuiz } from '../ducks/actions';

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
  margin: 15px auto;
  width: 80%;
  box-shadow: 1px 1px 3px 1px darkgrey;
  background-color: white;
  text-align: left;
  padding: 10px;
  line-height: 1.4em;
  border-radius: 1em;
`

const AddQuestionCard = styled.div`
  display: flex;
  margin: 15px auto;
  width: 80%;
  text-align: left;
  padding: 10px;
  line-height: 1.4em;
  border-radius: 1em;
  border: 5px dashed darkgray;
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
  padding: 0;
  font-size: 2rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: ${props => props.color};
  color: white;
  border-radius: 50%;
  outline:0;
  text-decoration: none;
  width: 50px;

&:hover, .btn:focus {
  text-decoration: none;
  opacity: .8;
}

&:focus, .btn.focus {
  outline: 0;
}
`

class QuestionList extends Component {
  constructor() {
    super()

  }
  render() {
    console.log('this.props.location')
    console.log(this.props.location)
    console.log('quiz.questions');
    console.log(this.props.selectedQuiz.questions)
    let questions = this.props.selectedQuiz.questions.length < 1 ? null : this.props.selectedQuiz.questions.map((question, i) =>
      <QuestionContainer key={i.toString()}>
        <CenteredContainer>
          <h1 style={{ color: colors.gray700 }}>{i + 1}</h1>
        </CenteredContainer>
        <CenteredContainer>
          <p style={{ color: colors.gray700 }}>{question.text}</p>
        </CenteredContainer>
      </QuestionContainer>
    )
    console.log('questions:');
    console.log(questions);
    return (
      <Fragment>
        {this.props.selectedQuiz.questions.length > 0 ?
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

class QuizView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quiz: null
    }
  }
  componentDidMount() {
    this.props.getQuizzesRequest();
  }
  // on mount, get quizzes if selected quiz not available
  render() {
    const quiz_id = this.props.location.search.replace(/\?quiz_id=/, '')
    let quiz = null
    // if quiz is passed from home.js through redirect object
    if (this.props.location.state) {
      quiz = this.props.location.state
    } else {
      // Otherwise find the quiz from the redux state
      this.props.quizzes.forEach((quiz, i) => {
        if (quiz.quiz_id === quiz_id) {
          quiz = quiz
        }
      })
    }
    return (
      <Container>
        <h1>{quiz.name}</h1>
        <AddQuestionCard>
          <CenteredColumn>
            <p style={{ color: colors.gray700, margin: '10px 0' }}>Add a question</p>
            <Button style={{ marginBottom: '10px' }}
              aria-label="Add a question"
              color={colors.blue}
            >+
              {/* <small style={{fontSize: '25px', fontSize: '25px', height: '15px', marginTop: '-20px'}}>
                +
              </small> */}
            </Button>
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
  }
}

function mapStateToProps(state) {
  return {
    ...state.quiz
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getQuizzesRequest

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);