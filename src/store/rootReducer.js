import { combineReducers } from 'redux';
// reducers
import quiz from '../scenes/ducks/reducer';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    quiz,
    form: formReducer
});

export default rootReducer;