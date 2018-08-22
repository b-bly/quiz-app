import { put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
//constants
import * as types from './constants';
//selectors

//actions
import { postNewQuizSuccess, postNewQuizError } from './actions';

// async data
const postNewQuizAsync = (data) => {
  axios.post('/', {
      data,
    })
    .then(response => {
      console.log('new quiz response: ')
      console.log(response)
      if (response.status === 200) {
        // update the state to redirect to home

      }
    }).catch(error => {
      console.log('new quiz error: ')
      console.log(error);
      return { error }
  })
}
//Saga
function* postNewQuiz(action) {
  try {
    //const formData = yield select(makeSelectCreateWorkOrderFormData());
    console.log('********** postNewQuiz data');
    console.log(action.payload);

    // to do use selectors to get data
    const data = action.payload;

    yield postNewQuizAsync({
      ...data
    });

    yield put(postNewQuizSuccess({ ...data }));
  } catch (error) {
    console.log('Error postNewQuiz saga');
    yield put(postNewQuizError(error));
  }
}

function* quizSaga() {
  console.log('quiz saga');
  yield takeLatest(types.POST_NEW_QUIZ_REQUEST, postNewQuiz);
}

export default quizSaga;
