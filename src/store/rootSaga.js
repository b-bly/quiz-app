import { fork } from 'redux-saga/effects';
import quizSaga from '../scenes/ducks/sagas';


// Here, we register our watcher saga(s) and export as a single generator 
// function (startForeman) as our root Saga.
export default function* startForman() {
  yield fork(quizSaga); // replace fork with 'all' when more than one? see rentMindR app
}

