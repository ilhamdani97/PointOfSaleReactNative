import { createStore, applyMiddleware } from 'redux';
import middlewares from './middlewares/middleware';
import appReducer from './reducers';

const MenuStore = createStore(appReducer, {}, applyMiddleware(...middlewares))
const OrderStore = createStore(appReducer, {}, applyMiddleware(...middlewares))
export { MenuStore,OrderStore};