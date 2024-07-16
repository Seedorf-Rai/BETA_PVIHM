

import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../conf/axios.js'


export const fetchCredits = createAsyncThunk('fetchCredits',async()=>{
    const response = await axiosApi.get('credit-transfers')
    return response.data.creditTransfers
})

export const creditSlice = createSlice({
  name: 'credits',
  initialState: {
    credits: [],
    loading : false,
    isError : false,
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchCredits.pending,(state,action)=>{
        state.loading = true
        });
    builder.addCase(fetchCredits.fulfilled,(state,action)=>{
        state.loading = false
        state.credits = action.payload
        // console.log(state.company);
    })
    builder.addCase(fetchCredits.rejected,(state,action)=>{
        console.log("Error: ",action.payload);
        state.isError = true
    })
  }
})

export default creditSlice.reducer