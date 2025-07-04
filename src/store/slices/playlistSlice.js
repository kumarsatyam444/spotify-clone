import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../../services/spotifyApi';

export const fetchUserPlaylists = createAsyncThunk(
  'playlist/fetchUserPlaylists',
  async (_, { rejectWithValue }) => {
    try {
      const response = await spotifyApi.getUserPlaylists();
      return response.items;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFeaturedPlaylists = createAsyncThunk(
  'playlist/fetchFeaturedPlaylists',
  async (_, { rejectWithValue }) => {
    try {
      const response = await spotifyApi.getFeaturedPlaylists();
      return response.playlists.items;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPlaylistTracks = createAsyncThunk(
  'playlist/fetchPlaylistTracks',
  async (playlistId, { rejectWithValue }) => {
    try {
      const response = await spotifyApi.getPlaylistTracks(playlistId);
      return response.items;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPlaylist = createAsyncThunk(
  'playlist/createPlaylist',
  async ({ name, description, isPublic }, { rejectWithValue }) => {
    try {
      const response = await spotifyApi.createPlaylist(name, description, isPublic);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTrackToPlaylist = createAsyncThunk(
  'playlist/addTrackToPlaylist',
  async ({ playlistId, trackUri }, { rejectWithValue }) => {
    try {
      await spotifyApi.addTrackToPlaylist(playlistId, trackUri);
      return { playlistId, trackUri };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeTrackFromPlaylist = createAsyncThunk(
  'playlist/removeTrackFromPlaylist',
  async ({ playlistId, trackUri }, { rejectWithValue }) => {
    try {
      await spotifyApi.removeTrackFromPlaylist(playlistId, trackUri);
      return { playlistId, trackUri };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  userPlaylists: [],
  featuredPlaylists: [],
  currentPlaylist: null,
  currentPlaylistTracks: [],
  loading: false,
  error: null,
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setCurrentPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
    clearCurrentPlaylist: (state) => {
      state.currentPlaylist = null;
      state.currentPlaylistTracks = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPlaylists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.userPlaylists = action.payload;
      })
      .addCase(fetchUserPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeaturedPlaylists.fulfilled, (state, action) => {
        state.featuredPlaylists = action.payload;
      })
      .addCase(fetchPlaylistTracks.fulfilled, (state, action) => {
        state.currentPlaylistTracks = action.payload;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.userPlaylists.push(action.payload);
      });
  },
});

export const { setCurrentPlaylist, clearCurrentPlaylist, clearError } = playlistSlice.actions;
export default playlistSlice.reducer;
