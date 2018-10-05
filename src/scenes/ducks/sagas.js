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
  updateQuestionSuccess,
  updateQuestionError,
} from './actions';

// Selectors
import { makeSelectNewQuiz, makeSelectNewQuestion, makeSelectQuizzes, } from './selectors';

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
  return axios.delete('/quiz', {
    params: data,
  })
}

const updateQuizAsync = (data) => {
  return axios.put('/quiz', {
    data,
  })
}

const updateQuestionAsync = (data) => {
  return axios.put('/quiz/updatequestion', {
    data,
  })
}

//Saga
function* postNewQuiz(action) {
  try {
    const data = yield select(makeSelectNewQuiz());
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
    const newQuestion = yield select(makeSelectNewQuestion());
    const selectedQuiz = { ...action.payload }
    newQuestion.quiz_id = selectedQuiz.quiz_id

    const formattedData = { ...selectedQuiz }
    formattedData.questions = [...formattedData.questions, newQuestion]

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

    yield call(updateQuizAsync, data)
    yield put(updateQuizSuccess(data))
  } catch (error) {
    yield put(updateQuizError({ ...error }))
  }
}

function* updateQuestion(action) {
  try {
    const quizzes = yield select(makeSelectQuizzes());
    const updatedQuestion = yield select(makeSelectNewQuestion());
    let selectedQuiz = null
    quizzes.forEach((quiz) => {
      if (quiz.quiz_id == updatedQuestion.quiz_id) {
        selectedQuiz = quiz
      }
    })
    updatedQuestion.id = action.payload;
    updatedQuestion.quiz_id = selectedQuiz.quiz_id

    const formattedData = { ...selectedQuiz }
    formattedData.questions = [...formattedData.questions, updatedQuestion]
    console.log('***** updated question *****')
    console.log(updatedQuestion)

    yield call(updateQuestionAsync, { ...updatedQuestion });
    yield put(updateQuestionSuccess({ ...formattedData }));
  } catch (error) {
    yield put(updateQuestionError({ ...error }))
  }
}

function* quizSaga() {
  yield takeLatest(types.POST_NEW_QUIZ_REQUEST, postNewQuiz);
  yield takeLatest(types.GET_QUIZZES_REQUEST, getQuizzes);
  yield takeLatest(types.POST_NEW_QUESTION_REQUEST, postNewQuestion);
  yield takeLatest(types.DELETE_QUIZ_REQUEST, deleteQuiz)
  yield takeLatest(types.UPDATE_QUIZ_REQUEST, updateQuiz)
  yield takeLatest(types.UPDATE_QUESTION_REQUEST, updateQuestion)
}

export default quizSaga;
