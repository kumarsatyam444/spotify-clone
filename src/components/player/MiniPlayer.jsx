import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Play, Pause, SkipForward, X } from 'lucide-react';
import { setIsPlaying, nextTrack, clearCurrentTrack } from '../../store/slices/playerSlice';

const MiniPlayer = ({ isVisible, onExpand }) => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector((state) => state.player);

  const handlePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const handleNext = () => {
    dispatch(nextTrack());
  };

  const handleClose = () => {
    dispatch(clearCurrentTrack());
  };

  if (!currentTrack || !isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 rounded-lg shadow-xl p-4 w-80 z-40 border border-gray-700">
      <div className="flex items-center space-x-3">
        <button onClick={onExpand} className="flex-shrink-0">
          <img
            src={currentTrack.image}
            alt={currentTrack.name}
            className="w-12 h-12 rounded-lg"
          />
        </button>
        
        <div className="flex-1 min-w-0" onClick={onExpand}>
          <p className="font-medium text-white truncate cursor-pointer">
            {currentTrack.name}
          </p>
          <p className="text-sm text-gray-400 truncate cursor-pointer">
            {currentTrack.artists}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePlayPause}
            className="p-2 bg-spotify-green text-black rounded-full hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>
          
          <button
            onClick={handleNext}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
