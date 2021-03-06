import React, { Component, Fragment } from 'react'
// import { Redirect } from 'react-router-dom';
// //REDUX
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Components
import Answer from './answer'

//Style
import styled from 'styled-components'
import { colors } from '../../Style/constants'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const AnswerRow = styled.div`
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
      redirectTo: null,
    }
  }

  createAnswerChoices() {
    const answerChoices = [];
    const alphabet = []
    for (let i = 0; i < 26; i++) {
      //97
      const letter = (String.fromCharCode(i + 97))
      alphabet.push(letter);
    }
    if (this.props.question) {
      for (let letter of alphabet) {
        if (this.props.question[letter] != undefined) {
          const answer = {}
          answer[letter] = this.props.question[letter]
          answerChoices.push(answer)
        } else {
          return answerChoices
        }
      }
    }
    return answerChoices
  }

  submit = (letter) => {
    console.log(letter)
    // submit only if not yet answered -- no changing
    if (this.props.selectedAnswer === null) {
      // update score
      const correct = (letter === this.props.question.correct_answer)
      this.props.submit(letter, correct)
    }
    // in next function in start, reset selected answer of question.js
  }

  render() {
    console.log('Question props');
    console.log(this.props)
    const answerChoicesArray = this.createAnswerChoices()
    const answerChoices = answerChoicesArray.map((answerObj, i) => {
      const letter = Object.keys(answerObj)[0]
      let color = colors.blue_50;
      // if already answered
      if (this.props.selectedAnswer !== null) {
        // green for the correct answer
        if (letter === this.props.question.correct_answer) {
          color = colors.green_50;
          // if it's not correct but it was selected, it's wrong
        } else if (this.props.selectedAnswer == letter) {
          color = colors.red_50;
        }
      }
      return (
        <Answer key={i.toString()}
          text={answerObj[letter]}
          letter={letter}
          submit={this.submit.bind(this)}
          correct_answer={this.props.correct_answer}
          color={color}
          selectedAnswer={this.props.selectedAnswer}

        />
      )
    })

    console.log('question')
    console.log(this.props)
    if (this.props.question) {
      return (
        <Fragment>
          {/* <h1>{this.props.question.text}</h1> */}
          <h1>{this.props.question.text}</h1>
          <AnswerRow>
            {answerChoices}
          </AnswerRow>
        </Fragment>
      )
    } else {
      return null
    }

  }
}

