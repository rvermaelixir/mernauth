import {configureStore} from '@reduxjs/toolkit'
import reducer from './reducers'
const initialState = {}

const store = configureStore({reducer, initialState})

export default store;