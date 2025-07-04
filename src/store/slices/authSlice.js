import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../../services/spotifyApi';

// Async thunks
export const loginWithSpotify = createAsyncThunk(
  'auth/loginWithSpotify',
  async (code, { rejectWithValue }) => {
    try {
      const response = await spotifyApi.getAccessToken(code);
      localStorage.setItem('spotify_access_token', response.access_token);
      localStorage.setItem('spotify_refresh_token', response.refresh_token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('spotify_refresh_token');
      const response = await spotifyApi.refreshAccessToken(refreshToken);
      localStorage.setItem('spotify_access_token', response.access_token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await spotifyApi.getCurrentUser();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  accessToken: localStorage.getItem('spotify_access_token'),
  refreshToken: localStorage.getItem('spotify_refresh_token'),
  isAuthenticated: !!localStorage.getItem('spotify_access_token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('spotify_access_token');
      localStorage.removeItem('spotify_refresh_token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithSpotify.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithSpotify.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isAuthenticated = true;
      })
      .addCase(loginWithSpotify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
