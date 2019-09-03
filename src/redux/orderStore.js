import { createStore, applyMiddleware } from 'redux';
import middlewares from './middlewares/middleware';
import appReducer from './reducers';

const OrderStore = createStore(appReducer, {}, applyMiddleware(...middlewares))

export { OrderStore };