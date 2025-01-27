import { configureStore } from '@reduxjs/toolkit'
import settingReducer from '../slice/settingSlice.js'
import carouselReducer from '../slice/carouselSlice.js'
import welcomeReducer from '../slice/welcomeSlice.js'
import courseReducer from '../slice/courseSlice.js'
import ceoMsgReducer from '../slice/ceoMsgSlice.js'
import directorReducer from '../slice/directorSlice.js'
import affiliationsReducer from '../slice/affiliationSlice.js'
import blogReducer from '../slice/blogSlice.js'
import creditsReducer from '../slice/creditSlice.js'

export const store = configureStore({
  reducer: {
    setting : settingReducer,
    carousel : carouselReducer,
    welcome : welcomeReducer,
    courses : courseReducer,
    ceoMsg : ceoMsgReducer,
    director : directorReducer,
    affiliations : affiliationsReducer,
    blogs : blogReducer,
    credits : creditsReducer
  },
})