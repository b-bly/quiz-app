import React from 'react'
import {QuizButton} from '../scenes/QuizView/quiz-view-style'

export const ActionButton = (props) => {
  const action = () => {
    props.action(props.data);
  }
  return (
    <QuizButton icon={props.icon}
      color={props.color}
      onClick={action}
      style={props.style}>
    </QuizButton>
  )
}
