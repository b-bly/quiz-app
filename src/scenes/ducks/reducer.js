import * as types from './constants';

const INITIAL_STATE = {
  quizName: '',
  questions: null,
};

function quizReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.POST_NEW_QUIZ_REQUEST: {
      return {
        ...state
      };
    }
    case types.POST_NEW_QUIZ_ERROR: {
      return {
        ...state,
        error: action.error
      };
    }
    case types.POST_NEW_QUIZ_SUCCESS: {
      return {
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export default quizReducer;
