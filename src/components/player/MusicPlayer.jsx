import React from 'react';
import { useSelector } from 'react-redux';
import PlayerControls from './PlayerControls';
import VolumeControl from './VolumeControl';
import ProgressBar from './ProgressBar';
import { Heart, MoreHorizontal, PictureInPicture2 } from 'lucide-react';

const MusicPlayer = () => {
  const { currentTrack, isPlaying } = useSelector((state) => state.player);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-50">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <img
            src={currentTrack.image}
            alt={currentTrack.name}
            className="w-14 h-14 rounded-lg"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-white truncate">
              {currentTrack.name}
            </h4>
            <p className="text-sm text-gray-400 truncate">
              {currentTrack.artists}
            </p>
          </div>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Heart className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <PictureInPicture2 className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <PlayerControls />
          <ProgressBar />
        </div>

        {/* Volume and More */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
          <VolumeControl />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
