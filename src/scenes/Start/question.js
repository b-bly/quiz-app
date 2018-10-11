import React, { Component, Fragment } from 'react'
// import { Redirect } from 'react-router-dom';
// //REDUX
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// // Components

// //Style
import styled from 'styled-components'
import { colors } from '../Style/constants'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Answer = styled.div`
  background-color: ${props => props.color};
  margin: .5em;
  flex: 1;
  padding: .2em .5em;
  border-radius: .2em;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    opacity: .8;
  }
`

const AnswerRow = styled.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  `


export default class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectTo: null
    }
  }

  createAnswerChoices () {
    const answerChoices = [];
    const alphabet = []
    for (let i = 0; i < 26; i++) {
      //97
      const letter = (String.fromCharCode(i + 97))
      alphabet.push(letter);
    }
    for (let letter of alphabet) {
      if (this.props.question[letter] != undefined) {
        const answer = {}
        answer[letter] = this.props.question[letter]
        answerChoices.push(answer)
      } else {
        return answerChoices
      }
    }
    return answerChoices
  }

  render () {
    const answerChoicesArray = this.createAnswerChoices()
    const answerChoices = answerChoicesArray.map((answerObj, i) => {
      const letter = Object.keys(answerObj)[0]
      return (
      <Answer key={i.toString()}
        color={colors.blue_50}>
        <span style={{opacity: '1'}}>{letter}.</span>
        &nbsp;
        <span>{answerObj[letter]}</span>
      </Answer>
      )
    })
    
    console.log('question')
    console.log(this.props)
    return (
      <Fragment>
        {/* <h1>{this.props.question.text}</h1> */}
        <h1>{this.props.question.text}</h1>
        <AnswerRow>
          {answerChoices}
        </AnswerRow>
      </Fragment>
    )
    
  }
}

