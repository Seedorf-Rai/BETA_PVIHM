import { configureStore } from '@reduxjs/toolkit'
import settingReducer from  '../slice/student/settingSlice'
import blogReducer from '../slice/student/blogSlice.js'


export const studentStore = configureStore({
  reducer: {
   setting : settingReducer,
   blogs : blogReducer
  },
})