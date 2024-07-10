import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../../conf/axios.js'
import getCookie from '../../../utils/cookie.js'

export const fetchDirector = createAsyncThunk('fetchDirector', async () => {
  const response = await axiosApi.get('admin/message-director',{
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${getCookie('token')}`
    }
  })
  return response.data.director
})

export const patchDirector = createAsyncThunk('patchDirector', async ({id, data}) => {
  try {
    console.log(data);
    const response = await axiosApi.patch(`admin/message-director/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getCookie('token')}`
      }
    })
    return response.data.director

  }
  catch (err) {
    console.log(err);
  }
})

export const directorSlice = createSlice({
  name: 'director',
  initialState: {
    director: null,
    loading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDirector.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(fetchDirector.fulfilled, (state, action) => {
      state.loading = false
      state.director = action.payload
    })
    builder.addCase(fetchDirector.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true
    })
    builder.addCase(patchDirector.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(patchDirector.fulfilled, (state, action) => {
      state.loading = false;
      state.director = action.payload;
    });
    builder.addCase(patchDirector.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true;
      state.loading = false;
    });
  }
})

export default directorSlice.reducer