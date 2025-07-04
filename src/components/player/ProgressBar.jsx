import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProgress } from '../../store/slices/playerSlice';
import { formatDuration } from '../../utils/helpers';

const ProgressBar = () => {
  const dispatch = useDispatch();
  const { progress, duration } = useSelector((state) => state.player);

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    dispatch(setProgress(newProgress));
  };

  const progressPercentage = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="flex items-center space-x-2 w-full">
      <span className="text-xs text-gray-400 w-10 text-right">
        {formatDuration(progress * 1000)}
      </span>
      
      <div className="flex-1 relative">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="1"
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${progressPercentage}%, #4B5563 ${progressPercentage}%, #4B5563 100%)`,
          }}
        />
      </div>
      
      <span className="text-xs text-gray-400 w-10">
        {formatDuration((duration || 0) * 1000)}
      </span>
    </div>
  );
};

export default ProgressBar;
