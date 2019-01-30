import React, { Component, Fragment } from 'react'
// import { Redirect } from 'react-router-dom';
// //REDUX
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// // Components

// //Style
import styled from 'styled-components'
import { colors } from '../../Style/constants'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AnswerDiv = styled.div`
  background-color: ${props => props.color};
  margin: .5em;
  flex: 1;
  padding: .2em .5em;
  border-radius: .2em;
  cursor: pointer;
  width: calc(50% - 2em);
  flex: 1 0 auto;
  &:hover {
    text-decoration: none;
    opacity: .8;
  }
`

export default class Answer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectTo: null
    }
  }

  submit = () => {
    if (this.props.selectedAnswer === null) {
      this.props.submit(this.props.letter);
    }
  }

  render() {
    console.log('props')
    console.log(this.props)
    return (
      <AnswerDiv color={this.props.color}
        onClick={this.submit.bind(this)}>
        <span style={{ opacity: '1' }}>{this.props.letter}.</span>
        &nbsp;
        <span>{this.props.text}</span>
      </AnswerDiv>
    )
  }
}
