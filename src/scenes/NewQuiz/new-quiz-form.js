import React from 'react'
import { Field, reduxForm } from 'redux-form'
import renderField from './render-field'


const validate = values => {
  const errors = {}
  if (!values.quizName) {
    errors.quizName = 'Required'
  }
  return errors;
}

let NewQuizForm = props => {
  const { handleSubmit } = props

  return (

     <form 
        className="form-horizontal"
        onSubmit={handleSubmit}
        >
        <div className="form-group">
          <div className="column label">
            <label className="form-label" htmlFor="quizName">Quiz name</label>
          </div>
          <div className="column input">
            <Field className="form-input quiz-name"
              type="text"
              id="quizName"
              name="quizName"
              placeholder="Type your quizName"
              component={renderField}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="column button-container"></div>
          <input
            className="btn btn-primary"
            type="submit"
            value="Submit" />
        </div>
      </form>
  )
}


NewQuizForm = reduxForm({
  // a unique name for the form
  form: 'newQuiz',
  validate
})(NewQuizForm)

export default NewQuizForm;