import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import NewQuizForm from './new-quiz-form';
//Style
// import './new-quiz.css'
import styled from 'styled-components'
// Actions
import { postNewQuizRequest, resetQuiz, updateQuizRequest } from '../ducks/actions';

const Container = styled.div`
  background-color: rgb(236, 236, 236);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const NavBarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // height: 20px;
  flex-direction: row;
  background-color: rgba(0, 0, 0, .7);
  `

const NavBarItem = styled.div`
  color: white;
  padding: 10px;`

const CloseX = styled.div`
  color: white;
  padding: 10px;
  cursor: pointer;
  &:hover {
    opacity: .8;
    background-color:rgba(0, 0, 0, .6);
  }`

const NavBar = (props) => {
  const redirectQuizView = () => {
    props.redirectQuizView(props.quiz)
  }
  return (
    <NavBarContainer>
      <NavBarItem></NavBarItem>
      <NavBarItem>New Question</NavBarItem>
      <CloseX onClick={redirectQuizView}
      >&#x2716;</CloseX>
    </NavBarContainer>
  )
}

const NewQuizFormWrapper = (props) => {
  const submitEdit = () => {
    props.submitEdit(props.quiz.quiz_id)
  }
  const initialValue = {
    name: props.quiz.name
  }
  return (
    <NewQuizForm onSubmit={submitEdit}
      initialValues={initialValue}
      editMode="true" />
  )
}

class NewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      submitClicked: null,
    };
  }

  componentWillUnmount() {
    if (this.props.quiz.isLoading === false) this.props.resetQuiz();
  }

  getQuiz() {
    let quiz = null;
    if (this.props.selectedQuiz) {
      if (this.props.selectedQuiz.questions) {
        quiz = this.props.selectedQuiz
      }
    } else if (this.props.location.state) {
      quiz = this.props.location.state
    }
    return quiz
  }

  submitNew = () => {
    console.log('new quiz form submit: ')
    this.props.postNewQuizRequest();
    this.setState({
      submitClicked: true
    })
  }

  submitEdit = (quiz_id) => {
    this.props.updateQuizRequest(quiz_id);
    this.setState({
      submitClicked: true
    })
  }

  redirectQuizView = (quiz) => {
    this.setState({
      redirectTo: {
        pathname: '/view-quiz/?quiz_id=' + quiz.quiz_id,
        state: quiz
      }
    })
  }


  render() {
    const quiz = this.getQuiz()
    // https://redux-form.com/7.0.2/examples/initializefromstate/
    console.log('quiz', quiz)
    // let initialValue = null;
    // if (quiz) {
    // }
    const editMode = this.props.location.pathname.search(/edit/) !== -1;

    if (this.props.quiz.isLoading === false &&
      this.props.quiz.error === null &&
      this.state.submitClicked) {
      return <Redirect to={{ pathname: '/' }} />
    } else if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />
    } else {
      return (
        <Container>
          <NavBar
            redirectQuizView={this.redirectQuizView.bind(this)}
            quiz={quiz}>
          </NavBar>
          <h4>New Quiz</h4>
          {this.props.quiz.error !== null &&
            <p>There was an error submitting your quiz.  Please try again.</p>
          }
          {editMode ?
            (
              <NewQuizFormWrapper submitEdit={this.submitEdit.bind(this)}
                quiz={quiz} />
            )
            :
            (
              <NewQuizForm
                onSubmit={this.submitNew.bind(this)} />
            )
          }
        </Container>


      )
    }
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postNewQuizRequest: postNewQuizRequest,
    resetQuiz: resetQuiz,
    updateQuizRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuiz);