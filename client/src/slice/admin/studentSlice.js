import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../../conf/axios.js'
import getCookie from '../../../utils/cookie.js'

export const fetchStudent = createAsyncThunk('fetchStudent', async () => {
  const response = await axiosApi.get('admin/student',{
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${getCookie('token')}`
    }
  })
  return response.data.students
})

export const postStudent = createAsyncThunk('postStudent', async ({data}) => {
    try {
      for (let pair of data.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      const response = await axiosApi.post(`admin/student`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getCookie('token')}`
        }
      })
      return response.data.student

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

export const patchStudent = createAsyncThunk('patchStudent', async ({id, data}) => {
  try {
    const response = await axiosApi.patch(`admin/student/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getCookie('token')}`
      }
    })
    return response.data.student

  }
  catch (err) {
    console.log(err);
  }
})
export const deleteStudent = createAsyncThunk('deleteStudent', async ({id}) => {
  try {
    const response = await axiosApi.delete(`admin/student/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getCookie('token')}`
      }
    })
    return response.data.student

  }
  catch (err) {
    console.log(err);
  }
})

export const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
    loading: false,
    isError: false,
    errorMessage : ''
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudent.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(fetchStudent.fulfilled, (state, action) => {
      state.loading = false
      state.students = action.payload
    })
    builder.addCase(fetchStudent.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true
    })
    builder.addCase(patchStudent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(patchStudent.fulfilled, (state, action) => {
      state.loading = false;
      for(let i = 0 ; i < state.students.length ; i++){
        if(state.students[i]._id === action.payload._id){
            state.students[i] = action.payload
        }
      }
    });
    builder.addCase(patchStudent.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true;
      state.loading = false;
    });
    builder.addCase(postStudent.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(postStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload)
        state.errorMessage = '';
        state.isError = false;
      });
      builder.addCase(postStudent.rejected, (state, action) => {
        console.log("Error: ", action.payload);
        state.isError = true;
        state.loading = false;
        state.errorMessage = action.payload;
      });
      builder.addCase(deleteStudent.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter((student)=>student._id !== action.payload._id)
      });
      builder.addCase(deleteStudent.rejected, (state, action) => {
        console.log("Error: ", action.payload);
        state.isError = true;
        state.loading = false;
      });
  }
})

export default studentSlice.reducer