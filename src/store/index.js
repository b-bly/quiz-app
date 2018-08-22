
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';
import { createLogger } from 'redux-logger'

// Saga middleware
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// Add redux logger
if (process.env.NODE_ENV !== 'production') {
	middlewares.push(createLogger())
}

const enhancers = applyMiddleware(...middlewares);

const configureStore = () => {
  return {
    ...createStore(rootReducer,
      enhancers),
    runSaga: sagaMiddleware.run(rootSaga)
  };
};

export default configureStore;