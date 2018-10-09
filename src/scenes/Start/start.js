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
  display: inline-block;`


class Start extends Component {
  constructor() {
    super()
    this.state = {
      redirectTo: null,
      questionIndex: 0
    }
  }
  componentDidMount() {
    // if (this.props.quizzes.length < 1) {
      this.props.getQuizzesRequest();
    // }
  }

  redirectHome() {
    console.log('redirecting home');
    this.setState({
      redirectTo: { pathname: '/' }
    }, function () {
      // this.props.selectQuiz({})
    })
  }

  render() {
    console.log('this.props')
    console.log(this.props)
    const quiz_id = this.props.match.params.id
    let quiz = null
    if (this.props.quizzes.length > 0) {
      this.props.quizzes.forEach((quizObj) => {        
        if (quizObj.quiz_id == quiz_id) {
          console.log('found quiz');
          
          quiz = quizObj
        }
      })
    }
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
          <Row>
            <h1 style={{ display: 'inline-block' }}>Quiz Start</h1>
          </Row>
            {quiz !== null && (
              <QuestionContainer>
                <span>{quiz.name}</span>
                {quiz.questions.length > 0 ? (
                   <Question 
                   question={quiz.questions[this.state.questionIndex]}
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