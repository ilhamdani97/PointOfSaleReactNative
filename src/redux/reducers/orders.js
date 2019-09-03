import * as types from '../types/type';
const initialState = {
  isLoading:true,
  data: [],
  error: null
}
const orders = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_DATA_ORDERS':
      return {
        ...state,
        isLoading:true,
      };
    case 'SHOW_DATA_ORDERS_FULFILLED':
      return {
        ...state,
        isLoading:false,
        data: action.payload.data.data
      };
    case 'SHOW_DATA_ORDERS_REJECTED':
      return {
        ...state,
        isLoading:false,
        error: payload.message
      };
    case "ADD_DATA_ORDERS":
      return {
        ...state,
        isLoading:false,
        data:state.data.concat(action.payload)
      }
    default:
      return state
  }
}
export default orders