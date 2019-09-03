import { combineReducers } from 'redux';
import orders from './orders'
import menus from './menus'
import addmenus from './addmenus'
const appReducer = combineReducers({
    menus,
    orders,
    addmenus
  })
  
  export default appReducer