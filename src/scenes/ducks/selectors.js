import { createSelector } from 'reselect';

const selectInvoicesState = state => state.invoicesState;

const selectGlobalState = state => state.globalState;

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