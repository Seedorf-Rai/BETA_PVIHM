

import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../conf/axios.js'


export const fetchWelcome = createAsyncThunk('fetchWelcome',async()=>{
    const response = await axiosApi.get('welcome')
    return response.data.welcome
})

export const welcomeSlice = createSlice({
  name: 'welcome',
  initialState: {
    welcome : null,
    loading : false,
    isError : false,
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchWelcome.pending,(state,action)=>{
        state.loading = true
        });
    builder.addCase(fetchWelcome.fulfilled,(state,action)=>{
        state.loading = false
        state.welcome = action.payload
    })
    builder.addCase(fetchWelcome.rejected,(state,action)=>{
        console.log("Error: ",action.payload);
        state.isError = true
    })
  }
})

export default welcomeSlice.reducer