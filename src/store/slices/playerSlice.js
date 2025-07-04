import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.5,
  progress: 0,
  duration: 0,
  queue: [],
  currentIndex: 0,
  shuffle: false,
  repeat: 'off', // 'off', 'track', 'context'
  playbackSpeed: 1,
  crossfade: 0,
  isMiniPlayer: false,
  showQueue: false,
  showLyrics: false,
  lyrics: null,
  currentLyricIndex: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
    },
    addToQueue: (state, action) => {
      state.queue.push(action.payload);
    },
    removeFromQueue: (state, action) => {
      state.queue = state.queue.filter((_, index) => index !== action.payload);
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    nextTrack: (state) => {
      if (state.shuffle) {
        state.currentIndex = Math.floor(Math.random() * state.queue.length);
      } else {
        state.currentIndex = (state.currentIndex + 1) % state.queue.length;
      }
      state.currentTrack = state.queue[state.currentIndex];
    },
    previousTrack: (state) => {
      if (state.shuffle) {
        state.currentIndex = Math.floor(Math.random() * state.queue.length);
      } else {
        state.currentIndex = state.currentIndex === 0 
          ? state.queue.length - 1 
          : state.currentIndex - 1;
      }
      state.currentTrack = state.queue[state.currentIndex];
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    setRepeat: (state, action) => {
      state.repeat = action.payload;
    },
    setPlaybackSpeed: (state, action) => {
      state.playbackSpeed = action.payload;
    },
    setCrossfade: (state, action) => {
      state.crossfade = action.payload;
    },
    toggleMiniPlayer: (state) => {
      state.isMiniPlayer = !state.isMiniPlayer;
    },
    toggleQueue: (state) => {
      state.showQueue = !state.showQueue;
    },
    toggleLyrics: (state) => {
      state.showLyrics = !state.showLyrics;
    },
    setLyrics: (state, action) => {
      state.lyrics = action.payload;
    },
    setCurrentLyricIndex: (state, action) => {
      state.currentLyricIndex = action.payload;
    },
    reorderQueue: (state, action) => {
      const { startIndex, endIndex } = action.payload;
      const result = Array.from(state.queue);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      state.queue = result;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  setVolume,
  setProgress,
  setDuration,
  setQueue,
  addToQueue,
  removeFromQueue,
  setCurrentIndex,
  nextTrack,
  previousTrack,
  toggleShuffle,
  setRepeat,
  setPlaybackSpeed,
  setCrossfade,
  toggleMiniPlayer,
  toggleQueue,
  toggleLyrics,
  setLyrics,
  setCurrentLyricIndex,
  reorderQueue,
} = playerSlice.actions;

export default playerSlice.reducer;
