import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosApi from '../../conf/axios.js'
import getCookie from '../../../utils/cookie.js'

export const fetchBlogs = createAsyncThunk('fetchBlogs', async () => {
  const response = await axiosApi.get('admin/blog',{
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${getCookie('token')}`
    }
  })
  return response.data.blogs
})

export const postBlog = createAsyncThunk('postBlog', async ({data}) => {
    try {
      for (let pair of data.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      const response = await axiosApi.post(`admin/blog`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getCookie('token')}`
        }
      })
      return response.data.blog

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

export const patchBlog = createAsyncThunk('patchBlog', async ({id, data}) => {
  try {
    console.log(data);
    console.log(id);
    const response = await axiosApi.patch(`admin/blog/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getCookie('token')}`
      }
    })
    return response.data.blog

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
export const deleteBlog = createAsyncThunk('deleteBlog', async ({id}) => {
  try {
    const response = await axiosApi.delete(`admin/blog/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getCookie('token')}`
      }
    })
    return response.data.blog

  }
  catch (err) {
    console.log(err);
  }
})

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    loading: false,
    isError: false,
    errorMessage : ''
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.loading = false
      state.blogs = action.payload
    })
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true
    })
    builder.addCase(patchBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(patchBlog.fulfilled, (state, action) => {
      state.loading = false;
      for(let i = 0 ; i < state.blogs.length ; i++){
        if(state.blogs[i]._id === action.payload._id){
            state.blogs[i] = action.payload
        }
      }
    });
    builder.addCase(patchBlog.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true;
      state.loading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(postBlog.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(postBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload)
        state.errorMessage = '';
        state.isError = false;
      });
      builder.addCase(postBlog.rejected, (state, action) => {
        console.log("Error: ", action.payload);
        state.isError = true;
        state.loading = false;
        state.errorMessage = action.payload;
      });
      builder.addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog)=>blog._id !== action.payload._id)
      });
      builder.addCase(deleteBlog.rejected, (state, action) => {
        console.log("Error: ", action.payload);
        state.isError = true;
        state.loading = false;
      });
  }
})

export default blogSlice.reducer