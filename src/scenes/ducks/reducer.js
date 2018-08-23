import * as types from './constants';

const INITIAL_STATE = {
  isLoading: true,
  quizzes: [],
  questions: null,
  error: null,
};

function quizReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.POST_NEW_QUIZ_REQUEST: {
      return {
        ...state,
        error: null,
      };
    }
    case types.POST_NEW_QUIZ_ERROR: {
      console.log('reducer postnewquizerror: ');
      console.log(action);
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    }
    case types.POST_NEW_QUIZ_SUCCESS: {
      return {
        ...action.payload,
        isLoading: false,
        error: null,
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default quizReducer;
