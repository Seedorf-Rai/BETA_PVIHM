

import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../conf/axios.js'


export const fetchAffiliation = createAsyncThunk('fetchAffiliation',async()=>{
    const response = await axiosApi.get('affiliation')
    return response.data.affiliations
})

export const affiliationSlice = createSlice({
  name: 'affiliations',
  initialState: {
    affiliations: [],
    loading : false,
    isError : false,
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchAffiliation.pending,(state,action)=>{
        state.loading = true
        });
    builder.addCase(fetchAffiliation.fulfilled,(state,action)=>{
        state.loading = false
        state.affiliations = action.payload
        // console.log(state.company);
    })
    builder.addCase(fetchAffiliation.rejected,(state,action)=>{
        console.log("Error: ",action.payload);
        state.isError = true
    })
  }
})

export default affiliationSlice.reducer