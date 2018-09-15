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
import { makeSelectNewQuiz } from './selectors';

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
    // Sample quiz data
    // A:    "bla"
    // B:"bla bla"
    // C:"something"
    // D: "puppies"
    // text:"what?"
    // name:"Ma ma mia"
    // correct_answer: 'A'


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
      name: data.quizName,
      type: 'multiple choice', // change when this is dynamic
      questions: [
        {
          correct_answer: data.correct_answer,
          text: data.text
        }
      ]
    }
    const alphabet = []
    for (let i = 97; i < 97 + 26; i++) {
      const nextLetter = String.fromCharCode(i)
      alphabet.push(nextLetter)
    }
    // handle all answers a, b, c etc
    for (let key in data) {
      for (let letter of alphabet) {
        if (key === letter) {
          formattedData.questions[0][letter] = data[letter]
        }
      }
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
