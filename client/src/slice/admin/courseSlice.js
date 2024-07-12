import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../../conf/axios.js'
import getCookie from '../../../utils/cookie.js'

export const fetchCourses = createAsyncThunk('fetchCourses', async () => {
  const response = await axiosApi.get('admin/courses',{
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${getCookie('token')}`
    }
  })
  return response.data.courses
})

export const postCourse = createAsyncThunk('postCourse', async ({data}) => {
    try {
      for (let pair of data.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      const response = await axiosApi.post(`admin/courses`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getCookie('token')}`
        }
      })
      return response.data.course

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

export const patchCourse = createAsyncThunk('patchCourse', async ({id, data}) => {
  try {
    console.log(data);
    console.log(id);
    const response = await axiosApi.patch(`admin/courses/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getCookie('token')}`
      }
    })
    return response.data.course

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
export const deleteCourse = createAsyncThunk('deleteCourse', async ({id}) => {
  try {
    const response = await axiosApi.delete(`admin/courses/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getCookie('token')}`
      }
    })
    return response.data.course

  }
  catch (err) {
    console.log(err);
  }
})

export const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    loading: false,
    isError: false,
    errorMessage : ''
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.loading = false
      state.courses = action.payload
    })
    builder.addCase(fetchCourses.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true
    })
    builder.addCase(patchCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(patchCourse.fulfilled, (state, action) => {
      state.loading = false;
      for(let i = 0 ; i < state.courses.length ; i++){
        if(state.courses[i]._id === action.payload._id){
            state.courses[i] = action.payload
        }
      }
    });
    builder.addCase(patchCourse.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true;
      state.loading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(postCourse.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(postCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(action.payload)
        state.errorMessage = '';
        state.isError = false;
      });
      builder.addCase(postCourse.rejected, (state, action) => {
        console.log("Error: ", action.payload);
        state.isError = true;
        state.loading = false;
        state.errorMessage = action.payload;
      });
      builder.addCase(deleteCourse.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter((course)=>course._id !== action.payload._id)
      });
      builder.addCase(deleteCourse.rejected, (state, action) => {
        console.log("Error: ", action.payload);
        state.isError = true;
        state.loading = false;
      });
  }
})

export default courseSlice.reducer