



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../../conf/axios.js'
import getCookie from '../../../utils/cookie.js'

export const fetchCeoMsg = createAsyncThunk('fetchCeoMsg', async () => {
  const response = await axiosApi.get('admin/message-ceo',{
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${getCookie('token')}`
    }
  })
  return response.data.ceo
})

export const patchCeoMsg = createAsyncThunk('patchCeoMsg', async ({id, data}) => {
  try {
    console.log(data);
    const response = await axiosApi.patch(`admin/message-ceo/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getCookie('token')}`
      }
    })
    return response.data.ceo

  }
  catch (err) {
    console.log(err);
  }
})

export const ceoMsgSlice = createSlice({
  name: 'ceoMsg',
  initialState: {
    ceoMsg: null,
    loading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCeoMsg.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(fetchCeoMsg.fulfilled, (state, action) => {
      state.loading = false
      state.ceoMsg = action.payload
    })
    builder.addCase(fetchCeoMsg.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true
    })
    builder.addCase(patchCeoMsg.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(patchCeoMsg.fulfilled, (state, action) => {
      state.loading = false;
      state.ceoMsg = action.payload;
    });
    builder.addCase(patchCeoMsg.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true;
      state.loading = false;
    });
  }
})

export default ceoMsgSlice.reducer