import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../conf/axios.js'


export const fetchCEOMsg = createAsyncThunk('fetchCEOMsg',async()=>{
    const response = await axiosApi.get('message-ceo')
    return response.data.ceo
})

export const ceoMsgSlice = createSlice({
  name: 'ceoMsg',
  initialState: {
    msg: null,
    loading : false,
    isError : false,
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchCEOMsg.pending,(state,action)=>{
        state.loading = true
        });
    builder.addCase(fetchCEOMsg.fulfilled,(state,action)=>{
        state.loading = false
        state.msg = action.payload
        console.log(state.courses);
        // console.log(state.company);
    })
    builder.addCase(fetchCEOMsg.rejected,(state,action)=>{
        console.log("Error: ",action.payload);
        state.isError = true
    })
  }
})

export default ceoMsgSlice.reducer