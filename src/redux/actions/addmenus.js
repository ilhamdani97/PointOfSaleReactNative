
import * as types from '../types/type'
import { URLAPI } from 'react-native-dotenv'
export const addMenus = value => ({
    type: types.ADD_DATA_MENUS,
    payload:value
})
export const removeMenu = id => ({
    type: types.DELETE_DATA_MENUS,
    payload: id
  })
export const updateQty = value =>({
    type: types.UPDATE_QTY,
    payload: value
})
export const addOrder = value => ({
    type: types.ADD_DATA_ORDER,
    payload:axios({
        method: 'POST',
        url: `${URLAPI}order`
    })
})