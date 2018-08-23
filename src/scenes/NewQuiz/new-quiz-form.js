import React from 'react'
import { Field, reduxForm } from 'redux-form'

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
              component="input"
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

    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label htmlFor="firstName">First Name</label>
    //     <Field name="firstName" component="input" type="text" />
    //   </div>
    //   <div>
    //     <label htmlFor="lastName">Last Name</label>
    //     <Field name="lastName" component="input" type="text" />
    //   </div>
    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <Field name="email" component="input" type="email" />
    //   </div>
    //   <button type="submit">Submit</button>
    // </form>
  )
}

NewQuizForm = reduxForm({
  // a unique name for the form
  form: 'newQuiz'
})(NewQuizForm)

export default NewQuizForm;