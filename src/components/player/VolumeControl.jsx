import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { setVolume } from '../../store/slices/playerSlice';

const VolumeControl = () => {
  const dispatch = useDispatch();
  const { volume } = useSelector((state) => state.player);
  const [muted, setMuted] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
    if (muted && newVolume > 0) {
      setMuted(false);
    }
  };

  const handleMuteToggle = () => {
    setMuted(!muted);
  };

  const getVolumeIcon = () => {
    if (muted || volume === 0) return VolumeX;
    if (volume < 0.5) return Volume1;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleMuteToggle}
        onMouseEnter={() => setShowSlider(true)}
        className="p-2 text-gray-400 hover:text-white transition-colors"
      >
        <VolumeIcon className="w-5 h-5" />
      </button>

      <div
        className={`transition-all duration-300 ${
          showSlider ? 'w-24 opacity-100' : 'w-0 opacity-0'
        }`}
        onMouseEnter={() => setShowSlider(true)}
        onMouseLeave={() => setShowSlider(false)}
      >
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={muted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
    </div>
  );
};

export default VolumeControl;
