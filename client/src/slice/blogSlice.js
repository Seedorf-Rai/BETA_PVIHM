

import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../conf/axios.js'


export const fetchBlogs = createAsyncThunk('fetchBlogs',async()=>{
    const response = await axiosApi.get('blogs')
    return response.data.blogs
})

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    loading : false,
    isError : false,
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchBlogs.pending,(state,action)=>{
        state.loading = true
        });
    builder.addCase(fetchBlogs.fulfilled,(state,action)=>{
        state.loading = false
        state.blogs = action.payload
        // console.log(state.company);
    })
    builder.addCase(fetchBlogs.rejected,(state,action)=>{
        console.log("Error: ",action.payload);
        state.isError = true
    })
  }
})

export default blogSlice.reducer