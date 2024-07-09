import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../../conf/axios.js'
import getCookie from '../../../utils/cookie.js'

export const fetchSetting = createAsyncThunk('fetchSetting', async () => {
  const response = await axiosApi.get('admin/setting',{
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${getCookie('token')}`
    }
  })
  return response.data.setting
})

export const patchSetting = createAsyncThunk('patchSetting', async ({id, data}) => {
  try {
    const response = await axiosApi.patch(`admin/setting/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getCookie('token')}`
      }
    })
    return response.data.setting

  }
  catch (err) {
    console.log(err);
  }
})

export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    company: null,
    loading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSetting.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(fetchSetting.fulfilled, (state, action) => {
      state.loading = false
      state.company = action.payload
    })
    builder.addCase(fetchSetting.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true
    })
    builder.addCase(patchSetting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(patchSetting.fulfilled, (state, action) => {
      state.loading = false;
      state.company = action.payload;
    });
    builder.addCase(patchSetting.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true;
      state.loading = false;
    });
  }
})

export default settingSlice.reducer