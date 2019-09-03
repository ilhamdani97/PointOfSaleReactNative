import { createStore, applyMiddleware } from 'redux';
import middlewares from './middlewares/middleware';
import appReducer from './reducers';

const Dormstore = createStore(appReducer, {}, applyMiddleware(...middlewares))

export { Dormstore };