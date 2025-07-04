import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi } from '../../services/spotifyApi';

export const searchTracks = createAsyncThunk(
  'search/searchTracks',
  async ({ query, type = 'track,artist,album,playlist', limit = 20 }, { rejectWithValue }) => {
    try {
      const response = await spotifyApi.search(query, type, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSearchSuggestions = createAsyncThunk(
  'search/getSearchSuggestions',
  async (query, { rejectWithValue }) => {
    try {
      const response = await spotifyApi.search(query, 'track,artist', 5);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  query: '',
  results: {
    tracks: [],
    artists: [],
    albums: [],
    playlists: [],
  },
  suggestions: [],
  recentSearches: JSON.parse(localStorage.getItem('recentSearches') || '[]'),
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearResults: (state) => {
      state.results = {
        tracks: [],
        artists: [],
        albums: [],
        playlists: [],
      };
      state.suggestions = [];
    },
    addToRecentSearches: (state, action) => {
      const search = action.payload;
      state.recentSearches = [
        search,
        ...state.recentSearches.filter(s => s !== search)
      ].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(state.recentSearches));
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
      localStorage.removeItem('recentSearches');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTracks.fulfilled, (state, action) => {
        state.loading = false;
        state.results = {
          tracks: action.payload.tracks?.items || [],
          artists: action.payload.artists?.items || [],
          albums: action.payload.albums?.items || [],
          playlists: action.payload.playlists?.items || [],
        };
      })
      .addCase(searchTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSearchSuggestions.fulfilled, (state, action) => {
        state.suggestions = [
          ...(action.payload.tracks?.items || []),
          ...(action.payload.artists?.items || [])
        ].slice(0, 5);
      });
  },
});

export const { setQuery, clearResults, addToRecentSearches, clearRecentSearches } = searchSlice.actions;
export default searchSlice.reducer;
