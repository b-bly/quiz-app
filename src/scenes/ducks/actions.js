import * as types from './constants';

export const postNewQuizRequest = data => ({
  type: types.POST_NEW_QUIZ_REQUEST,
  payload: data
});

export const postNewQuizSuccess = data => ({
  type: types.POST_NEW_QUIZ_SUCCESS,
  payload: data
});

export const postNewQuizError = error => ({
  type: types.POST_NEW_QUIZ_ERROR,
  error
});

export const resetQuiz = () => ({
  type: types.RESET_QUIZ
});