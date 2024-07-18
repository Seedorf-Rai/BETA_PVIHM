import { configureStore } from "@reduxjs/toolkit";
import settingReducer from '../slice/admin/settingSlice.js'
import carouselReducer from '../slice/admin/carouselSlice.js'
import welcomeReducer from '../slice/admin/welcomeSlice.js'
import ceoMsgReducer from '../slice/admin/ceoSlice.js'
import directorReducer from '../slice/admin/directorSlice.js'
import studentReducer from '../slice/admin/studentSlice.js'
import coursesReducer from '../slice/admin/courseSlice.js'
import affiliationReducer from '../slice/admin/affiliationSlice.js'
import creditsReducer from '../slice/admin/creditSlice.js'
import blogReducer from '../slice/admin/blogSlice.js'
import formReducer from '../slice/admin/formSlice.js'

export const adminStore = configureStore({
 reducer : {
    setting: settingReducer,
    carousel: carouselReducer,
    welcome : welcomeReducer,
    ceoMsg : ceoMsgReducer,
    director : directorReducer,
    student : studentReducer,
    courses : coursesReducer,
    affiliation : affiliationReducer,
    credits : creditsReducer,
    blogs : blogReducer,
    forms : formReducer,
 }
})