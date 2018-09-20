import React, { Component } from 'react'
// Redux form
import { Field, reduxForm } from 'redux-form'
import renderField from './render-field'
import renderTextArea from './renderTextArea'
import renderMarkCorrectField from './render-mark-correct-field'
// Style
import styled from 'styled-components'
import { colors } from '../Style/constants'


const validate = values => {
  const errors = {}
  if (!values.quizName) {
    errors.quizName = 'Required'
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
  border: 1px solid transparent;
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

const MinusOffset = styled.div`
  
`

const ButtonContainer = styled.div`
  width: 100%;
  text-align:right;
`

const MultipleChoiceAnswer = (props) => {
  const { answerLetter, answerNumber, correctAnswer } = props
  const name = answerLetter;
  const isCorrect = name === correctAnswer;

  return (
    <Row>
      <FormGroup>
        {/* make this button a separate component */}
        <Field
          type="button"
          name="correct_answer"
          markCorrect={props.markCorrect}
          answerLetter={answerLetter}
          color={isCorrect ? colors.green : colors.gray200}
          component={renderMarkCorrectField}
        />
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
          <Button
            color="orange"
            type="button"
            onClick={props.removeAnswer}
          >-</Button>
        }
      </FormGroup>
    </Row>

  )
}

class NewQuizForm extends Component {
  constructor(props) {
    super(props)
    this.numberOfAnswerBlanks = 1;
    this.state = {
      answerLetters: ['A', 'B', 'C', 'D'],
      correctAnswer: '',
    }
    this.answerLettersMap = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  }

  addAnswerBlank() {
    console.log('clicked');
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
    });

  }

  render() {
    const { handleSubmit } = this.props

    // let answerBlanks = this.answerLetters.map((letter, i) =>
    //   <MultipleChoiceAnswer 
    //     key={i.toString()}
    //     answerLetter={letter}
    //     answerNumber="1"
    //   />
    // )

    //   CREATE TABLE quiz(
    // 	id SERIAL PRIMARY KEY,
    // 	name VARCHAR(80) NOT NULL,
    // 	questions json
    // );

    // questions: [{ questionText: '', anwers: [{letter: '', correct: bool, text: ''}]}]


    return (
      <Form
        onSubmit={handleSubmit}
      >
        <FormGroup>
          <Column>
            <FormLabel htmlFor="quizName">Quiz name</FormLabel>
          </Column>

          <Column>
            <Field
              type="text"
              id="quizName"
              name="quizName"
              placeholder="Quiz name"
              component={renderField}
            />
          </Column>

        </FormGroup>
        <QuestionContainer>
          <FormGroup>
            <Column>
              <FormLabel htmlFor="text">Question Text</FormLabel>
            </Column>
          </FormGroup>
          <FormGroup>
            <Column>
              <Field
                type="text"
                name="text"
                placeholder="Type your question"
                component={renderTextArea}
              />
            </Column>
          </FormGroup>


          {this.state.answerLetters.map((letter, i) =>
            <MultipleChoiceAnswer
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
            <Button
              type="button"
              onClick={this.addAnswerBlank.bind(this)}
              color={colors.blue}
            >+</Button>
          </ButtonContainer>
        </QuestionContainer>
        <FormGroup>
          <Column></Column>
          <input
            className="btn btn-primary"
            type="submit"
            value="Submit"
          />
        </FormGroup>
      </Form>
    )

  }

}


NewQuizForm = reduxForm({
  // a unique name for the form
  form: 'newQuiz',
  validate
})(NewQuizForm)

export default NewQuizForm;