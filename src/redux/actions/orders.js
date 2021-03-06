import axios from 'axios'
import * as types from '../types/type'
import { URLAPI } from 'react-native-dotenv'
export const getData = () => ({
    type: "SHOW_DATA_ORDERS",
    payload: axios({
        method: 'GET',
        url: `${URLAPI}orders`
    })
})

export const addOrders = value => ({
    type: types.SHOW_DATA_ORDER,
    payload: value
})