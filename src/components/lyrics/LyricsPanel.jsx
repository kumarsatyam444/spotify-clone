import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { fetchLyrics } from '../../store/slices/lyricsSlice';
import SyncedLyrics from './SyncedLyrics';
import LoadingSpinner from '../common/LoadingSpinner';

const LyricsPanel = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { currentTrack, currentTime } = useSelector((state) => state.player);
  const { lyrics, loading, error } = useSelector((state) => state.lyrics);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isOpen && currentTrack) {
      dispatch(fetchLyrics(currentTrack.id));
    }
  }, [isOpen, currentTrack, dispatch]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed bg-gray-900 text-white z-50 transition-all duration-300 ${
        isFullscreen
          ? 'inset-0'
          : 'right-0 top-0 bottom-0 w-96 border-l border-gray-800'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold">Lyrics</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {loading && (
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-64 px-4">
            <p className="text-gray-400 text-center mb-2">
              Lyrics not available for this song
            </p>
            <p className="text-sm text-gray-500 text-center">
              We couldn't find lyrics for "{currentTrack?.name}"
            </p>
          </div>
        )}

        {lyrics && !loading && !error && (
          <div className="h-full">
            {lyrics.synced ? (
              <SyncedLyrics
                lyrics={lyrics}
                currentTime={currentTime}
                isFullscreen={isFullscreen}
              />
            ) : (
              <div className="p-4 h-full overflow-y-auto">
                <div className="space-y-4">
                  {lyrics.text.split('\n').map((line, index) => (
                    <p
                      key={index}
                      className="text-lg leading-relaxed text-gray-300"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!currentTrack && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">No song playing</p>
          </div>
        )}
      </div>

      {/* Track Info */}
      {currentTrack && (
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <img
              src={currentTrack.image}
              alt={currentTrack.name}
              className="w-12 h-12 rounded"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{currentTrack.name}</p>
              <p className="text-sm text-gray-400 truncate">{currentTrack.artists}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LyricsPanel;
