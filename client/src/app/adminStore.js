import { configureStore } from "@reduxjs/toolkit";
import settingReducer from '../slice/admin/settingSlice.js'
import carouselReducer from '../slice/admin/carouselSlice.js'
import welcomeReducer from '../slice/admin/welcomeSlice.js'


export const adminStore = configureStore({
 reducer : {
    setting: settingReducer,
    carousel: carouselReducer,
    welcome : welcomeReducer,
 }
})