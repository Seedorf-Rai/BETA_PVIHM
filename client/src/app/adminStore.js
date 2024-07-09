import { configureStore } from "@reduxjs/toolkit";
import settingReducer from '../slice/admin/settingSlice.js'
import carouselReducer from '../slice/admin/carouselSlice.js'


export const adminStore = configureStore({
 reducer : {
    setting: settingReducer,
    carousel: carouselReducer,
 }
})