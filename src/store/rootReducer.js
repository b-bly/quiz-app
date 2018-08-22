import { combineReducers } from 'redux';
// reducers
import quiz from '../scenes/ducks/reducer';

const rootReducer = combineReducers({
    quiz
});

export default rootReducer;