import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsPlaying,
  nextTrack,
  previousTrack,
  setVolume,
  toggleShuffle,
  toggleQueue,
  toggleLyrics,
} from '../store/slices/playerSlice';

export const useKeyboardShortcuts = () => {
  const dispatch = useDispatch();
  const { isPlaying, volume } = useSelector((state) => state.player);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Prevent shortcuts when typing in input fields
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.code) {
        case 'Space':
          event.preventDefault();
          dispatch(setIsPlaying(!isPlaying));
          break;
        case 'ArrowRight':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            dispatch(nextTrack());
          }
          break;
        case 'ArrowLeft':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            dispatch(previousTrack());
          }
          break;
        case 'ArrowUp':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            const newVolume = Math.min(1, volume + 0.1);
            dispatch(setVolume(newVolume));
          }
          break;
        case 'ArrowDown':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            const newVolume = Math.max(0, volume - 0.1);
            dispatch(setVolume(newVolume));
          }
          break;
        case 'KeyS':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            dispatch(toggleShuffle());
          }
          break;
        case 'KeyQ':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            dispatch(toggleQueue());
          }
          break;
        case 'KeyL':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            dispatch(toggleLyrics());
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [dispatch, isPlaying, volume]);
};
