import axios from 'axios'
import * as types from '../types/type'
import { URLSTORE } from 'react-native-dotenv'
export const getData = () => ({
    type: "SHOW_DATA_MENUS",
    payload: axios({
        method: 'GET',
        url: `${URLSTORE}menus`
    })
})