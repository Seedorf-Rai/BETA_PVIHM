import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../conf/axios.js'


export const fetchCourses = createAsyncThunk('fetchCourses',async()=>{
    const response = await axiosApi.get('courses')
    return response.data.courses
})

export const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    loading : false,
    isError : false,
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchCourses.pending,(state,action)=>{
        state.loading = true
        });
    builder.addCase(fetchCourses.fulfilled,(state,action)=>{
        state.loading = false
        state.courses = action.payload
        console.log(state.courses);
        // console.log(state.company);
    })
    builder.addCase(fetchCourses.rejected,(state,action)=>{
        console.log("Error: ",action.payload);
        state.isError = true
    })
  }
})

export default courseSlice.reducer