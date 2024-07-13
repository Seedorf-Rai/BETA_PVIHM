

import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../../conf/axios.js'
import getCookie from '../../../utils/cookie.js'



export const fetchCredits = createAsyncThunk('fetchCredits',async()=>{
    const response = await axiosApi.get('admin/credit-transfers',{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getCookie('token')}`
        }
      })
    return response.data.credits
})


export const postCredits = createAsyncThunk('postCredits', async ({data}) => {
    try {
      const response = await axiosApi.post(`admin/credit-transfers`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getCookie('token')}`
        }
      })
      return response.data.credit

    }
    catch (err) {
      console.log(err);
      if(err.response && err.response.data){

        return rejectWithValue(err.response.data.msg)
      }
      else{
        return rejectWithValue('An error occurred')
      }
    }
  })

export const deleteCredits = createAsyncThunk('deleteCredits', async ({id}) => {
    try {
      const response = await axiosApi.delete(`admin/credit-transfers/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getCookie('token')}`
        }
      })
      return response.data.credit

    }
    catch (err) {
        console.log(err);
        if(err.response && err.response.data){

          return rejectWithValue(err.response.data.msg)
        }
        else{
          return rejectWithValue('An error occurred')
        }
    }
  })

export const creditsSlice = createSlice({
  name: 'credits',
  initialState: {
    credits: [],
    errorMessage: null,
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
        state.errorMessage = action.payload
    })
    builder.addCase(postCredits.pending,(state,action)=>{
        state.loading = true
        });
    builder.addCase(postCredits.fulfilled,(state,action)=>{
        state.loading = false
        state.credits.push(action.payload)
        // console.log(state.company);
    })
    builder.addCase(postCredits.rejected,(state,action)=>{
        console.log("Error: ",action.payload);
        state.isError = true
        state.errorMessage = action.payload
    })
    builder.addCase(deleteCredits.pending,(state,action)=>{
        state.loading = true
        });
    builder.addCase(deleteCredits.fulfilled,(state,action)=>{
        state.loading = false
        state.credits = state.credits.filter((c)=>c._id !== action.payload._id)
        // console.log(state.company);
    })
    builder.addCase(deleteCredits.rejected,(state,action)=>{
        console.log("Error: ",action.payload);
        state.isError = true
        state.errorMessage = action.payload
    })
  }
})

export default creditsSlice.reducer