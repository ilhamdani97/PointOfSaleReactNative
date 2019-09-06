import * as types from '../types/type';
const initialState = {
  isLoading:true,
  data: [],
  error: null
}
const addmenus = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_DATA_MENUS:
      return {
        ...state,
        isLoading:false,
        data:state.data.concat(action.payload)
    }
    case types.DELETE_DATA_MENUS:
      const removeMenu = state.data.filter(item => item.id !== action.payload)
      return {
        ...state,
        data: removeMenu
    }
    case types.UPDATE_QTY: 
    return {
      ...state,
       isLoading:false,
        data:action.payload
    };
    case types.ADD_DATA_ORDER:
      return {
        ...state,
        isLoading:false,
        data:state.data.concat(action.payload)
    }
    default:
      return state
  
  }
}
export default addmenus