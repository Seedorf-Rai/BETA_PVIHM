import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../conf/axios.js'


export const fetchCarousel = createAsyncThunk('fetchCarousel',async()=>{
    const response = await axiosApi.get('carousel')
    return response.data.carousels
})

export const carouselSlice = createSlice({
  name: 'carousels',
  initialState: {
    carousels: [],
    loading : false,
    isError : false,
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchCarousel.pending,(state,action)=>{
        state.loading = true
        });
    builder.addCase(fetchCarousel.fulfilled,(state,action)=>{
        state.loading = false
        state.carousels = action.payload
        // console.log(state.company);
    })
    builder.addCase(fetchCarousel.rejected,(state,action)=>{
        console.log("Error: ",action.payload);
        state.isError = true
    })
  }
})

export default carouselSlice.reducer