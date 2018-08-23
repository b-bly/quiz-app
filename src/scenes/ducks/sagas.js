import { put, call, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
//constants
import * as types from './constants';
//selectors

//actions
import { postNewQuizSuccess, postNewQuizError } from './actions';

// async data
const postNewQuizAsync = (data) => {
  return axios.post('/quiz', {
    data,
  });
  // .then(response => {
  //   console.log('new quiz response: ')
  //   console.log(response)
  //   return response;
  //   if (response.status === 200) {

  //   } // Can't catch error here or it won't get reported to redux?
  // }).catch(error => {
  //   console.log('new quiz error: ')
  //   console.log({error});
  //   return { error }
  // })
}
//Saga
function* postNewQuiz(action) {
  try {
    //const formData = yield select(makeSelectCreateWorkOrderFormData());
    console.log('********** postNewQuiz data');
    console.log(action.payload);

    // to do use selectors to get data
    const data = action.payload;
    yield call(postNewQuizAsync, {...data});

    yield put(postNewQuizSuccess({ ...data }));
  } catch (error) {
    console.log('Error postNewQuiz saga');
    yield put(postNewQuizError({...error}));
  }
}

function* quizSaga() {
  console.log('quiz saga');
  yield takeLatest(types.POST_NEW_QUIZ_REQUEST, postNewQuiz);
}

export default quizSaga;
