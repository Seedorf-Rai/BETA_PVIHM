

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../../conf/axios.js'
import getCookie from '../../../utils/cookie.js'

export const fetchAffiliation = createAsyncThunk('fetchAffiliation', async () => {
  const response = await axiosApi.get('admin/affiliation',{
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${getCookie('token')}`
    }
  })
  return response.data.affiliations
})

export const postAffiliation = createAsyncThunk('postAffiliation', async ({data}) => {
    try {
      for (let pair of data.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      const response = await axiosApi.post(`admin/affiliation`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getCookie('token')}`
        }
      })
      return response.data.affiliation

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

export const patchAffiliation = createAsyncThunk('patchAffiliation', async ({id, data}) => {
  try {
    console.log(data);
    console.log(id);
    const response = await axiosApi.patch(`admin/affiliation/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getCookie('token')}`
      }
    })
    return response.data.affiliation

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
export const deleteAffiliation = createAsyncThunk('deleteAffiliation', async ({id}) => {
  try {
    const response = await axiosApi.delete(`admin/affiliation/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getCookie('token')}`
      }
    })
    return response.data.affiliation

  }
  catch (err) {
    console.log(err);
  }
})

export const affiliationSlice = createSlice({
  name: 'affiliation',
  initialState: {
    affiliations: [],
    loading: false,
    isError: false,
    errorMessage : ''
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAffiliation.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(fetchAffiliation.fulfilled, (state, action) => {
      state.loading = false
      state.affiliations = action.payload
    })
    builder.addCase(fetchAffiliation.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true
    })
    builder.addCase(patchAffiliation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(patchAffiliation.fulfilled, (state, action) => {
      state.loading = false;
      for(let i = 0 ; i < state.affiliations.length ; i++){
        if(state.affiliations[i]._id === action.payload._id){
            state.affiliations[i] = action.payload
        }
      }
    });
    builder.addCase(patchAffiliation.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true;
      state.loading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(postAffiliation.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(postAffiliation.fulfilled, (state, action) => {
        state.loading = false;
        state.affiliations.push(action.payload)
        state.errorMessage = '';
        state.isError = false;
      });
      builder.addCase(postAffiliation.rejected, (state, action) => {
        console.log("Error: ", action.payload);
        state.isError = true;
        state.loading = false;
        state.errorMessage = action.payload;
      });
      builder.addCase(deleteAffiliation.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(deleteAffiliation.fulfilled, (state, action) => {
        state.loading = false;
        state.affiliations = state.affiliations.filter((aff)=>aff._id !== action.payload._id)
      });
      builder.addCase(deleteAffiliation.rejected, (state, action) => {
        console.log("Error: ", action.payload);
        state.isError = true;
        state.loading = false;
      });
  }
})

export default affiliationSlice.reducer