import { configureStore } from '@reduxjs/toolkit'
import settingReducer from '../slice/settingSlice.js'
import carouselReducer from '../slice/carouselSlice.js'
import welcomeReducer from '../slice/welcomeSlice.js'
import courseReducer from '../slice/courseSlice.js'

export const store = configureStore({
  reducer: {
    setting : settingReducer,
    carousel : carouselReducer,
    welcome : welcomeReducer,
    courses : courseReducer
  },
})