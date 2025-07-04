import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import playerSlice from './slices/playerSlice';
import playlistSlice from './slices/playlistSlice';
import searchSlice from './slices/searchSlice';




export const store = configureStore({
  reducer: {
    auth: authSlice,
    player: playerSlice,
    playlists: playlistSlice,
    search: searchSlice,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
