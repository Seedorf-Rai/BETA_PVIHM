import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../../conf/axios.js'


export const fetchSetting = createAsyncThunk('fetchSetting',async()=>{
    const response = await axiosApi.get('setting')
    return response.data.setting
})

export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    company : null,
    loading : false,
    isError : false,
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchSetting.pending,(state,action)=>{
        state.loading = true
        });
    builder.addCase(fetchSetting.fulfilled,(state,action)=>{
        state.loading = false
        state.company = action.payload
    })
    builder.addCase(fetchSetting.rejected,(state,action)=>{
        console.log("Error: ",action.payload);
        state.isError = true
    })
  }
})

export default settingSlice.reducer