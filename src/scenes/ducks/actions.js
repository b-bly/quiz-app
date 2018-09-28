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
// New Question

export const postNewQuestionRequest = () => ({
  type: types.POST_NEW_QUESTION_REQUEST,
  payload: null
});

export const postNewQuestionSuccess = data => ({
  type: types.POST_NEW_QUESTION_SUCCESS,
  payload: data
});

export const postNewQuestionError = error => ({
  type: types.POST_NEW_QUESTION_ERROR,
  error
});

export const selectQuiz = data => ({
  type: types.SELECT_QUIZ,
  payload: data
})

export const resetQuestionForm = () => ({
  type: types.RESET_QUESTION_FORM
})

export const deleteQuizRequest = (quiz_id) => ({
  type: types.DELETE_QUIZ_REQUEST,
  payload: quiz_id
});

export const deleteQuizSuccess = data => ({
  type: types.DELETE_QUIZ_SUCCESS,
  payload: data
});

export const deleteQuizError = error => ({
  type: types.DELETE_QUIZ_ERROR,
  error
});