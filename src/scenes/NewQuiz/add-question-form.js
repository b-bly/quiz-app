import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// components
import RoundButton from '../../Components/round-button'

// Redux form
import { Field, reduxForm } from 'redux-form'
import renderField from '../../forms/render-field'
import renderTextArea from './renderTextArea'
import renderMarkCorrectField from '../../forms/render-mark-correct-field'
import invisibleField from '../../forms/invisible-field'
// Style
import styled from 'styled-components'
import { colors } from '../../Style/constants'

const validate = values => {
  const errors = {}
  if (!values.text) {
    errors.text = 'Required'
  }
  if (!values.a) {
    errors.a = 'At least one answer is required'
  }
  if (!values.correct_answer) {
    errors.correct_answer = 'Please mark one answer correct'
  }
  return errors;
}

const Form = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Ariel", Helvetica, sans-serif;
  color: rgb(65, 65, 65);
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin: 5px 0;
  width: 100%;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const FormContainer = styled.div`
  margin: auto 10px;
  &:last-of-type {
    margin-right: 0;
  }
  &:first-of-type {
    margin-right: 10px;
  }
`

const FormLabel = styled.label`
  font-size: 20px;
  text-align: left;
`

const QuestionContainer = styled.div`
  margin: 15px auto;
  width: 100%;
  box-shadow: 1px 1px 3px 1px darkgrey;
  background-color: white;
  text-align: left;
  padding: 10px;
  line-height: 1.4em;
  border-radius: 1em;
  // &:hover {
  //   background-color: rgb(236, 236, 236);
  // }
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
  border: 2px solid transparent;
  margin-right: 10px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: ${props => props.color};
  color: white;
  border-radius: 20px;
  outline:0;
  text-decoration: none;
  width: ${props => props.minus ? '38px' : 'auto'};
  cursor: pointer;

&:hover, .btn:focus {
  text-decoration: none;
  opacity: .8;
}

&:focus, .btn.focus {
  outline: 0;
}
`

const SubmitButton = styled.input`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 3px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: ${props => props.color};
  color: white;
  border-radius: 20px;
  outline:0;
  text-decoration: none;
  width: ${props => props.minus ? '38px' : 'auto'};

&:hover, .btn:focus {
  text-decoration: none;
  opacity: .8;
}

&:focus, .btn.focus {
  outline: 0;
}
`

const ButtonContainer = styled.div`
  width: 100%;
  text-align:right;
  display: flex;
  justify-content: flex-end;
`

const MultipleChoiceAnswer = (props) => {
  const { answerLetter, correctAnswer } = props
  const name = answerLetter;
  const isCorrect = name === correctAnswer;

  return (
    <Row>
      <FormGroup>
        {/* make this button a separate component */}
        <FormContainer>
          <Field
            type="button"
            name="correct_answer"
            markCorrect={props.markCorrect}
            answerLetter={answerLetter}
            color={isCorrect ? colors.green : colors.gray200}
            component={renderMarkCorrectField}
          />
        </FormContainer>
        <FormContainer>
          <FormLabel htmlFor={name} >{answerLetter}</FormLabel>
        </FormContainer>
        <FormContainer style={{ flex: '1' }}>
          <Field
            type="text"
            name={name}
            placeholder="Type the answer"
            component={renderField}
          />
        </FormContainer>
        {props.removeButton &&
          <RoundButton
            text="-"
            action={props.removeAnswer}
            color={colors.orange}
            ariaLabel="remove answer blank"
          />
        }
      </FormGroup>
    </Row>

  )
}

class AddQuestionForm extends Component {
  constructor() {
    super()
    this.numberOfAnswerBlanks = 1;
    this.state = {
      answerLetters: ['A', 'B', 'C', 'D'],
      correctAnswer: '',
    }
    this.answerLettersMap = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialValues) {
      if (nextProps.initialValues.correct_answer) {
        this.setState({
          correctAnswer: nextProps.initialValues.correct_answer
        })
      }
    }
  }

  addAnswerBlank() {
    this.numberOfAnswerBlanks++
    const newLetter = this.answerLettersMap[this.numberOfAnswerBlanks - 1]
    const answerLetterCopy = this.state.answerLetters.slice();
    answerLetterCopy.push(newLetter)
    this.setState({
      answerLetters: answerLetterCopy
    })

    console.log(this.state.answerLetters)
  }

  removeAnswer() {
    console.log('removeAnswer')
    this.numberOfAnswerBlanks--
    const answerLetterCopy = this.state.answerLetters.slice()
    answerLetterCopy.pop()
    this.setState({
      answerLetters: answerLetterCopy
    })
  }

  markCorrect(correctAnswer) {
    console.log('markCorrect');
    console.log(correctAnswer);
    this.setState({
      correctAnswer: correctAnswer
    })
  }

  cancel(e) {
    e.stopPropagation();
    const redirectObject = {
      pathname: '/view-quiz/?quiz_id=' + this.props.quiz.quiz_id,
      state: this.props.quiz
    }
    this.setState({
      redirectTo: redirectObject,
    })
  }

  render() {
    // ***************************
    // handleSubmit is automatically passed down as props.  Is this a react thing?  A redux form thing?
    console.log('props');
    console.log(this.props);

    const { handleSubmit } = this.props
    if (this.state.redirectTo) {
      return (
        <Redirect
          to={this.state.redirectTo}
        />
      )
    }
    return (
      <Form onSubmit={handleSubmit}>
        <Field type="text"
          name="id"
          component={invisibleField}
          style={{ display: 'none' }}
        >
        </Field>
        <QuestionContainer>
          <FormGroup>
            <Column>
              <FormContainer>
                <FormLabel htmlFor="text">Question Text</FormLabel>
              </FormContainer>
            </Column>
          </FormGroup>
          <FormGroup>
            <Column>
              <FormContainer>
                <Field
                  type="text"
                  name="text"
                  placeholder="Type your question"
                  component={renderTextArea}
                />
              </FormContainer>
            </Column>
          </FormGroup>

          {this.state.answerLetters.map((letter, i) =>
            <MultipleChoiceAnswer
              initialValues={this.props.MCInitialValues}
              key={i.toString()}
              answerLetter={letter.toLowerCase()}
              answerNumber="1"
              removeButton={this.state.answerLetters.length === i + 1 &&
                this.state.answerLetters.length > 1}
              removeAnswer={this.removeAnswer.bind(this)}
              correctAnswer={this.state.correctAnswer}
              markCorrect={this.markCorrect.bind(this)}
            />
          )}

          <ButtonContainer>
            <RoundButton
              text="+"
              action={this.addAnswerBlank.bind(this)}
              color={colors.blue}
              ariaLabel="add answer blank"
            />
          </ButtonContainer>
        </QuestionContainer>
        <FormGroup>
          <Column></Column>
          <FormContainer>
            <Button
              type="button"
              color="gray"
              onClick={this.cancel.bind(this)}> Cancel
          </Button>
          </FormContainer>
          <FormContainer>
            <SubmitButton
              type="submit"
              value="Submit"
              color={colors.green}
            />
          </FormContainer>

        </FormGroup>
      </Form>
    )
  }
}

AddQuestionForm = reduxForm({
  // a unique name for the form
  form: 'newQuestion',

})(AddQuestionForm)

export default AddQuestionForm;