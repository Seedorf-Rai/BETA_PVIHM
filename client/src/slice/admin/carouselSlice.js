import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../../conf/axios.js'
import getCookie from '../../../utils/cookie.js'



export const fetchCarousel = createAsyncThunk('fetchCarousel',async()=>{
    const response = await axiosApi.get('carousel')
    return response.data.carousels
})


export const postCarousel = createAsyncThunk('postCarousel', async ({data}) => {
    try {
      const response = await axiosApi.post(`admin/carousel`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getCookie('token')}`
        }
      })
      return response.data.carousel

    }
    catch (err) {
      console.log(err);
    }
  })

export const deleteCarousel = createAsyncThunk('deleteCarousel', async ({id}) => {
    try {
      const response = await axiosApi.delete(`admin/carousel/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getCookie('token')}`
        }
      })
      return id

    }
    catch (err) {
      console.log(err);
    }
  })

export const carouselSlice = createSlice({
  name: 'carousels',
  initialState: {
    carousels: [],
    msg: null,
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
    builder.addCase(postCarousel.pending,(state,action)=>{
        state.loading = true
        });
    builder.addCase(postCarousel.fulfilled,(state,action)=>{
        state.loading = false
        state.carousels.push(action.payload)
        // console.log(state.company);
    })
    builder.addCase(postCarousel.rejected,(state,action)=>{
        console.log("Error: ",action.payload);
        state.isError = true
    })
    builder.addCase(deleteCarousel.pending,(state,action)=>{
        state.loading = true
        });
    builder.addCase(deleteCarousel.fulfilled,(state,action)=>{
        state.loading = false
        state.carousels = state.carousels.filter((c)=>c._id !== action.payload)
        // console.log(state.company);
    })
    builder.addCase(deleteCarousel.rejected,(state,action)=>{
        console.log("Error: ",action.payload);
        state.isError = true
    })
  }
})

export default carouselSlice.reducer