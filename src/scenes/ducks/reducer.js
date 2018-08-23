import * as types from './constants';

const INITIAL_STATE = {
  isLoading: true,
  quizzes: [],
  questions: null,
  error: null,
};

// state is only assigned INITIAL_STATE if it is undefined when quizReducer is called
function quizReducer(state = INITIAL_STATE, action) { 
  switch (action.type) {
    case types.POST_NEW_QUIZ_REQUEST: {
      return {
        ...state,
        error: null,
      };
    }
    case types.POST_NEW_QUIZ_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    }
    case types.POST_NEW_QUIZ_SUCCESS: {
      return {
        ...state,
        quizzes: [
          ...state.quizzes,
          action.payload.quizName
        ],
        isLoading: false,
        error: null,
      };
    }
    case types.RESET_QUIZ: {
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    }
    default: {
      return { ...state };
    }
  }
}

export default quizReducer;
