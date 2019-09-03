
import * as types from '../types/type'

export const addMenus = value => ({
    type: types.ADD_DATA_MENUS,
    payload:value
})
export const removeMenu = id => ({
    type: types.DELETE_DATA_MENUS,
    payload: id
  })
export const addOrder = value => ({
    type: types.ADD_DATA_ORDER,
    payload:axios({
        method: 'POST',
        url: `${URLSTORE}order`
    })
})