import { configureStore } from '@reduxjs/toolkit'
import settingReducer from '../slice/settingSlice.js'

export const store = configureStore({
  reducer: {
    setting : settingReducer
  },
})