import React, { Component } from 'react'
// Redux form
import { Field, reduxForm } from 'redux-form'
import renderField from './render-field'
// import renderTextArea from './renderTextArea'
// import renderMarkCorrectField from './render-mark-correct-field'
// Style
import styled from 'styled-components'
import { colors } from '../Style/constants';
// import { colors } from '../Style/constants'


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
  cursor: pointer;

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

class NewQuizForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('props');
    console.log('this.props');
    
    const { handleSubmit } = this.props
    return (
      <Form
        onSubmit={handleSubmit}>
        <FormGroup>
          <Column>
            <FormLabel htmlFor="name">Quiz name</FormLabel>
          </Column>

          <Column>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Quiz name"
              component={renderField}
            />
          </Column>
        </FormGroup>
       
        <FormGroup>
          <Column></Column>
          <SubmitButton
            className="btn btn-primary"
            type="submit"
            value="Submit"
            color={colors.green}
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