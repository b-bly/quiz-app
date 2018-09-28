import * as types from './constants';

const INITIAL_STATE = {
  isLoading: true,
  quizzes: [],
  questions: null,
  error: null,
  selectedQuiz: null,
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
      // {
      //   quizzes: [
      //     {
      //        id: '',
      //       name: '',
      //       type: '',
      //       questions: [
      //         {
      //           label: '',
      //           correctAnswer: ''
      //         }
      //       ]
      //     }
      //   ]
      // }
      return {
        ...state,
        quizzes: [
          ...state.quizzes,
          action.payload
        ],
        isLoading: false,
        error: null,
      };
    }
    case types.POST_NEW_QUESTION_REQUEST: {
      return {
        ...state,
        error: null,
      };
    }
    case types.POST_NEW_QUESTION_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    }
    case types.POST_NEW_QUESTION_SUCCESS: {
      // {
      //   quizzes: [
      //     {
      //        id: '',
      //       name: '',
      //       type: '',
      //       questions: [
      //         {
      //           label: '',
      //           correctAnswer: ''
      //         }
      //       ]
      //     }
      //   ]
      // }
      return {
        ...state,
        quizzes: [
          ...Object.assign([], state.quizzes).map((quiz, i) => {
            if (action.payload.quiz_id === quiz.quiz_id) {
              const updatedQuiz = { ...quiz }
              updatedQuiz.questions = action.payload.questions
              return updatedQuiz
            } else {
              return quiz
            }
          })
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
    case types.RESET_QUESTION_FORM: {
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    }
    // Get quizzes
    case types.GET_QUIZZES_REQUEST: {
      return {
        ...state
      }
    }
    case types.GET_QUIZZES_SUCCESS: {
      return {
        ...state, 
        isLoading: false,
        quizzes: action.payload,
        error: null,
      }
    }
    case types.GET_QUIZZES_ERROR: {
      return {
        ...state,
        error: action.error
      }
    }
    case types.SELECT_QUIZ: {
      return {
        ...state,
        selectedQuiz: action.payload
      }
    }
    case types.DELETE_QUIZ_REQUEST: {
      return {
        ...state,
      }
    }
    case types.DELETE_QUIZ_SUCCESS: {
      return {
        ...state,
        quizzes: [
          ...Object.assign([], state.quizzes).filter((quiz, i) => {
            if (action.payload.quiz_id === quiz.quiz_id) {
              return false;
            } else {
              return true;
            }
          })
        ],
      }
    }
    case types.DELETE_QUIZ_ERROR: {
      return {
        ...state,
        error: action.error
      }
    }
    default: {
      return { ...state };
    }
  }
}

export default quizReducer;
