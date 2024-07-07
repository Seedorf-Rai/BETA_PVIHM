import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../conf/axios.js'


export const fetchDirector = createAsyncThunk('fetchDirector',async()=>{
    const response = await axiosApi.get('message-director')
    return response.data.director
})

export const directorSlice = createSlice({
  name: 'director',
  initialState: {
    director: null,
    loading : false,
    isError : false,
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchDirector.pending,(state,action)=>{
        state.loading = true
        });
    builder.addCase(fetchDirector.fulfilled,(state,action)=>{
        state.loading = false
        state.director = action.payload
        // console.log(state.company);
    })
    builder.addCase(fetchDirector.rejected,(state,action)=>{
        console.log("Error: ",action.payload);
        state.isError = true
    })
  }
})

export default directorSlice.reducer