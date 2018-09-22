import { createSelector } from 'reselect';

const selectQuiz = state => state.quiz;

const selectFormState = state => state.form;

export const makeSelectNewQuiz = () =>
  createSelector(selectFormState, substate => {
    console.log('makeSelectNewQuiz');
    console.log(substate);
    console.log(selectFormState);
    if (substate) {
      if (substate.newQuiz) {
        if (substate.newQuiz.values) {
          return substate.newQuiz.values;
        }
      }
    }
  });

export const makeSelectNewQuestion = () =>
  createSelector(selectFormState, substate => {
    console.log('makeSelectNewQuiz');
    console.log(substate);
    console.log(selectFormState);
    if (substate) {
      if (substate.newQuestion) {
        if (substate.newQuestion.values) {
          return substate.newQuestion.values;
        }
      }
    }
  });

export const makeSelectQuizzes = () =>
  createSelector(selectQuiz, substate => {
    console.log('selectGlobalState');
    console.log(substate);
    console.log(selectQuiz);
    if (substate) {
        if (substate.quizzes) {
          return substate.quizzes
        }
      
    }
  });

  export const makeSelectQuiz = () =>
  createSelector(selectQuiz, substate => {
    console.log('substate');
    console.log(substate);
    if (substate) {
      if (substate.selectedQuiz) {
          return substate.selectedQuiz
      }
    }
  });