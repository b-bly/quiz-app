import * as types from './constants';

export const postNewQuizRequest = () => ({
  type: types.POST_NEW_QUIZ_REQUEST,
  payload: null
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

// getQuizzes
export const getQuizzesRequest = data => ({
  type: types.GET_QUIZZES_REQUEST,
  payload: data
});

export const getQuizzesSuccess = data => ({
  type: types.GET_QUIZZES_SUCCESS,
  payload: data
});

export const getQuizzesError = error => ({
  type: types.GET_QUIZZES_ERROR,
  error
});
