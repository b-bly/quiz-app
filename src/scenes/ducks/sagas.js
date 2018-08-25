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
} from './actions';

// Selectors
import {makeSelectNewQuiz} from './selectors';

// async data
const postNewQuizAsync = (data) => {
  return axios.post('/quiz', {
    data,
  });
}

const getQuizzesAsync = () => {
  return axios.get('/quiz');
}

//Saga
function* postNewQuiz(action) {
  try {

    // to do use selectors to get data
    const data = yield select(makeSelectNewQuiz());
    console.log(data);
    yield call(postNewQuizAsync, {...data});

    yield put(postNewQuizSuccess({ ...data }));
  } catch (error) {
    yield put(postNewQuizError({...error}));
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

function* quizSaga() {
  yield takeLatest(types.POST_NEW_QUIZ_REQUEST, postNewQuiz);
  yield takeLatest(types.GET_QUIZZES_REQUEST, getQuizzes);
}

export default quizSaga;
