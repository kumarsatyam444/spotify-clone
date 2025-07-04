import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
} from 'lucide-react';
import {
  setIsPlaying,
  nextTrack,
  previousTrack,
  toggleShuffle,
  setRepeat,
} from '../../store/slices/playerSlice';

const PlayerControls = () => {
  const dispatch = useDispatch();
  const { isPlaying, shuffle, repeat } = useSelector((state) => state.player);

  const handlePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const handleNext = () => {
    dispatch(nextTrack());
  };

  const handlePrevious = () => {
    dispatch(previousTrack());
  };

  const handleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const handleRepeat = () => {
    const repeatModes = ['off', 'context', 'track'];
    const currentIndex = repeatModes.indexOf(repeat);
    const nextIndex = (currentIndex + 1) % repeatModes.length;
    dispatch(setRepeat(repeatModes[nextIndex]));
  };

  const getRepeatIcon = () => {
    switch (repeat) {
      case 'track':
        return Repeat1;
      case 'context':
        return Repeat;
      default:
        return Repeat;
    }
  };

  const RepeatIcon = getRepeatIcon();

  return (
    <div className="flex items-center space-x-4">
      {/* Shuffle */}
      <button
        onClick={handleShuffle}
        className={`p-2 rounded-full transition-colors ${
          shuffle
            ? 'text-spotify-green hover:text-green-400'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <Shuffle className="w-4 h-4" />
      </button>

      {/* Previous */}
      <button
        onClick={handlePrevious}
        className="p-2 text-gray-400 hover:text-white transition-colors"
      >
        <SkipBack className="w-5 h-5" />
      </button>

      {/* Play/Pause */}
      <button
        onClick={handlePlayPause}
        className="p-3 bg-white text-black rounded-full hover:scale-105 transition-transform"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" />
        )}
      </button>

      {/* Next */}
      <button
        onClick={handleNext}
        className="p-2 text-gray-400 hover:text-white transition-colors"
      >
        <SkipForward className="w-5 h-5" />
      </button>

      {/* Repeat */}
      <button
        onClick={handleRepeat}
        className={`p-2 rounded-full transition-colors ${
          repeat !== 'off'
            ? 'text-spotify-green hover:text-green-400'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <RepeatIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PlayerControls;
