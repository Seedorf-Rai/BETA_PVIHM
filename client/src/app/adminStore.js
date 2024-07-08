import { configureStore } from "@reduxjs/toolkit";
import settingReducer from '../slice/admin/settingSlice.js'



export const adminStore = configureStore({
 reducer : {
    setting: settingReducer,
 }
})