import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../../conf/axios.js'
import getCookie from '../../../utils/cookie.js'

export const fetchWelcome = createAsyncThunk('fetchWelcome', async () => {
  const response = await axiosApi.get('admin/welcome',{
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${getCookie('token')}`
    }
  })
  return response.data.welcome
})

export const patchWelcome = createAsyncThunk('patchWelcome', async ({id, data}) => {
  try {
    console.log(data);
    const response = await axiosApi.patch(`admin/welcome/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getCookie('token')}`
      }
    })
    return response.data.welcome

  }
  catch (err) {
    console.log(err);
  }
})

export const welcomeSlice = createSlice({
  name: 'welcome',
  initialState: {
    welcome: null,
    loading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWelcome.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(fetchWelcome.fulfilled, (state, action) => {
      state.loading = false
      state.welcome = action.payload
    })
    builder.addCase(fetchWelcome.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true
    })
    builder.addCase(patchWelcome.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(patchWelcome.fulfilled, (state, action) => {
      state.loading = false;
      state.welcome = action.payload;
    });
    builder.addCase(patchWelcome.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true;
      state.loading = false;
    });
  }
})

export default welcomeSlice.reducer