import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../NewQuiz/new-quiz.css'

// Actions
import {getQuizzesRequest} from '../ducks/actions';
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


class Home extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getQuizzesRequest();
  }
  render() {
    console.log('******** props **********')
    console.log(this.props.quiz.quizzes)
    console.log(typeof this.props.quiz.quizzes)
    
    const listItems = this.props.quiz.quizzes.map((quiz, i) =>
    <QuizContainer key={i.toString()}>
      <Name>Quiz: {quiz.name}</Name>
      <Questions>Questions: 0</Questions>
    </QuizContainer>
    );
    return (
      <Fragment>
        <Container>
          <Title>It's good to be home</Title>
          <Link to="/new-quiz" className="btn text-secondary">
            <span>New Quiz</span>
          </Link>
          {listItems}
        </Container>
      
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
    return {
        ...state
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getQuizzesRequest: getQuizzesRequest,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);