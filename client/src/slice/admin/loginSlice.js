import { createSlice } from "@reduxjs/toolkit";



export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isAuth : false,
        status : null
    }
})