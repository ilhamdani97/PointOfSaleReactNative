import * as types from '../types/type';
const initialState = {
  isLoading:true,
  data: [],
  error: null
}
const menus = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_DATA_MENUS':
      return {
        ...state,
        isLoading:true,
      };
    case 'SHOW_DATA_MENUS_FULFILLED':
      return {
        ...state,
        isLoading:false,
        data: action.payload.data.data
      };
    case 'SHOW_DATA_MENUS_REJECTED':
      return {
        ...state,
        isLoading:false,
        error: payload.message
      };
    default:
      return state
  }
}
export default menus