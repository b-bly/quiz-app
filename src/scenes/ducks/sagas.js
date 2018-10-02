import { put, call, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
//constants
import * as types from './constants';
//selectors

//actions
import {
  postNewQuizSuccess,
  postNewQuizError,
  getQuizzesSuccess,
  getQuizzesError,
  postNewQuestionSuccess,
  postNewQuestionError,
  deleteQuizSuccess,
  deleteQuizError,
  updateQuizSuccess,
  updateQuizError,
} from './actions';

// Selectors
import { makeSelectNewQuiz, makeSelectNewQuestion, makeSelectQuiz } from './selectors';

// async data
const postNewQuizAsync = (data) => {
  return axios.post('/quiz', {
    data,
  });
}

const postNewQuestionAsync = (data) => {
  return axios.post('/quiz/question', {
    data,
  });
}

const getQuizzesAsync = () => {
  return axios.get('/quiz');
}

const deleteQuizAsync = (data) => {
  return axios.delete('/quiz/', {
    params: data,
  })
}

const updateQuizAsync = (data) => {
  return axios.put('/quiz', {
    data,
  })
}

//Saga
function* postNewQuiz(action) {
  try {

    // to do use selectors to get data
    const data = yield select(makeSelectNewQuiz());
    console.log(data);
    // Sample quiz data
    // name:"Ma ma mia"



    // redux state sample
    // {
    //   quizzes: [
    //     {
    //        id: '',
    //       name: '',
    //       type: '',
    //       questions: [
    //         {
    //           text: '',
    //           correct_answer: '',
    //           a: ''
    //         }
    //       ]
    //     }
    //   ]
    // }

    const formattedData = {
      name: data.name,
      type: 'multiple choice'
    }
    console.log('formatted data')
    console.log(formattedData);

    yield call(postNewQuizAsync, { ...formattedData });

    yield put(postNewQuizSuccess({ ...formattedData }));
  } catch (error) {
    console.log(error);
    yield put(postNewQuizError({ ...error }));
  }
}

function* postNewQuestion(action) {
  try {

    // to do use selectors to get data
    const newQuestion = yield select(makeSelectNewQuestion());
    const selectedQuiz = yield select(makeSelectQuiz())
    newQuestion.quiz_id = selectedQuiz.quiz_id
    // Sample question data
    // a: "fdsa"
    // correct_answer: "a"
    // text: "fdsa"


    // redux state sample
    // {
    //   quizzes: [
    //     {
    //        id: '',
    //       name: '',
    //       type: '',
    //       questions: [
    //         {
    //           text: '',
    //           correct_answer: '',
    //           a: ''
    //         }
    //       ]
    //     }
    //   ]
    // }

    const formattedData = { ...selectedQuiz }
    formattedData.questions = [...formattedData.questions, newQuestion]
    
    // const alphabet = []
    // for (let i = 97; i < 97 + 26; i++) {
    //   const nextLetter = String.fromCharCode(i)
    //   alphabet.push(nextLetter)
    // }
    // // handle all answers a, b, c etc
    // for (let key in data) {
    //   for (let letter of alphabet) {
    //     if (key === letter) {
    //       formattedData.questions[0][letter] = data[letter]
    //     }
    //   }
    // }
    console.log('formatted data')
    console.log(formattedData);

    yield call(postNewQuestionAsync, { ...newQuestion });

    yield put(postNewQuestionSuccess({ ...formattedData }));
  } catch (error) {
    console.log(error);
    yield put(postNewQuestionError({ ...error }));
  }
}

function* getQuizzes() {
  try {
    const data = yield call(getQuizzesAsync);
    yield put(getQuizzesSuccess([...data.data]))
  } catch (error) {
    yield put(getQuizzesError({ ...error }));
  }
}

function* deleteQuiz(action) {
  try {
    // to do use selectors to get data
    console.log('*** action.payload ***')
    console.log(action.payload);
    const data = { quiz_id: action.payload };
    yield call(deleteQuizAsync, data);
    yield put(deleteQuizSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(deleteQuizError({ ...error }));
  }
}

function* updateQuiz(action) {
  try {
    const quizName = yield select(makeSelectNewQuiz());
    const data = {
      name: quizName.name,
      quiz_id: action.payload,
    }
    console.log('*** data ***')
    console.log(data);
    yield call(updateQuizAsync, data)
    yield put(updateQuizSuccess(data))
  } catch (error) {
    yield put(updateQuizError({ ...error }))
  }
}

function* quizSaga() {
  yield takeLatest(types.POST_NEW_QUIZ_REQUEST, postNewQuiz);
  yield takeLatest(types.GET_QUIZZES_REQUEST, getQuizzes);
  yield takeLatest(types.POST_NEW_QUESTION_REQUEST, postNewQuestion);
  yield takeLatest(types.DELETE_QUIZ_REQUEST, deleteQuiz)
  yield takeLatest(types.UPDATE_QUIZ_REQUEST, updateQuiz)
}

export default quizSaga;
