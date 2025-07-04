import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Play, MoreHorizontal } from 'lucide-react';
import { removeFromQueue, playTrack } from '../../store/slices/playerSlice';
import { formatDuration } from '../../utils/helpers';

const Queue = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { queue, currentTrack } = useSelector((state) => state.player);

  const handlePlayTrack = (track) => {
    dispatch(playTrack(track));
  };

  const handleRemoveFromQueue = (trackId) => {
    dispatch(removeFromQueue(trackId));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="w-96 bg-gray-900 h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold">Queue</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Now Playing */}
          {currentTrack && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Now Playing
              </h3>
              <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                <img
                  src={currentTrack.image}
                  alt={currentTrack.name}
                  className="w-12 h-12 rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-spotify-green truncate">
                    {currentTrack.name}
                  </p>
                  <p className="text-sm text-gray-400 truncate">
                    {currentTrack.artists}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-spotify-green rounded-full animate-pulse"
                        style={{
                          height: Math.random() * 16 + 8,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next Up */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Next Up
            </h3>
            {queue.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No songs in queue
              </p>
            ) : (
              <div className="space-y-2">
                {queue.map((track, index) => (
                  <div
                    key={`${track.id}-${index}`}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg group transition-colors"
                  >
                    <button
                      onClick={() => handlePlayTrack(track)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                    <img
                      src={track.image}
                      alt={track.name}
                      className="w-10 h-10 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{track.name}</p>
                      <p className="text-sm text-gray-400 truncate">
                        {track.artists}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {formatDuration(track.duration)}
                    </span>
                    <button
                      onClick={() => handleRemoveFromQueue(track.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;
