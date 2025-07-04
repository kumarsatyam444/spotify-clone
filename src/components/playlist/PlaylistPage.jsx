import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Play, Pause, Heart, MoreHorizontal, Clock, Download } from 'lucide-react';
import { setCurrentPlaylist } from '../../store/slices/playlistSlice';
import { setCurrentTrack, setIsPlaying } from '../../store/slices/playerSlice';
import { formatDuration, formatDate } from '../../utils/helpers';
import LoadingSpinner, { PlaylistSkeleton } from '../common/LoadingSpinner';

const PlaylistPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPlaylist } = useSelector((state) => state.playlists);
  const { currentTrack, isPlaying } = useSelector((state) => state.player);
  const [loading, setLoading] = useState(true);
  const [hoveredTrack, setHoveredTrack] = useState(null);

  useEffect(() => {
    // Mock playlist data
    const mockPlaylist = {
      id,
      name: 'My Awesome Playlist',
      description: 'A collection of my favorite songs',
      image: 'https://via.placeholder.com/300',
      owner: 'You',
      tracks: [
        {
          id: '1',
          name: 'Song 1',
          artists: 'Artist 1',
          album: 'Album 1',
          duration: 180000,
          image: 'https://via.placeholder.com/300',
          addedAt: '2023-01-01'
        },
        {
          id: '2',
          name: 'Song 2',
          artists: 'Artist 2',
          album: 'Album 2',
          duration: 210000,
          image: 'https://via.placeholder.com/300',
          addedAt: '2023-01-02'
        }
      ]
    };
    dispatch(setCurrentPlaylist(mockPlaylist));
    setLoading(false);
  }, [id, dispatch]);

  const handlePlayPlaylist = () => {
    if (currentPlaylist?.tracks?.length > 0) {
      dispatch(setCurrentTrack(currentPlaylist.tracks[0]));
      dispatch(setIsPlaying(true));
    }
  };

  const handlePlayTrack = (track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
  };

  const handlePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  if (loading) {
    return (
      <div className="p-6">
        <PlaylistSkeleton />
      </div>
    );
  }

  if (!currentPlaylist) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl text-gray-400">Playlist not found</p>
      </div>
    );
  }

  const totalDuration = currentPlaylist.tracks?.reduce((acc, track) => acc + track.duration, 0) || 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-800 to-gray-900 p-6">
        <div className="flex items-end space-x-6">
          <img
            src={currentPlaylist.image}
            alt={currentPlaylist.name}
            className="w-48 h-48 rounded-lg shadow-2xl"
          />
          <div className="flex-1">
            <p className="text-sm font-medium uppercase tracking-wider">Playlist</p>
            <h1 className="text-4xl md:text-6xl font-bold my-4">
              {currentPlaylist.name}
            </h1>
            <p className="text-gray-300 mb-4">{currentPlaylist.description}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="font-medium">{currentPlaylist.owner}</span>
              <span>•</span>
              <span>{currentPlaylist.tracks?.length || 0} songs</span>
              <span>•</span>
              <span>{formatDuration(totalDuration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-b from-gray-900/60 to-gray-900 p-6">
        <div className="flex items-center space-x-6">
          <button
            onClick={handlePlayPlaylist}
            className="bg-spotify-green text-black p-4 rounded-full hover:scale-105 transition-transform"
          >
            <Play className="w-6 h-6 ml-1" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Heart className="w-8 h-8 text-gray-400 hover:text-white" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Download className="w-8 h-8 text-gray-400 hover:text-white" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <MoreHorizontal className="w-8 h-8 text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>

      {/* Track List */}
      <div className="p-6">
        <div className="grid grid-cols-[16px_1fr_1fr_1fr_60px] gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800 mb-4">
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <Clock className="w-4 h-4 justify-self-center" />
        </div>

        <div className="space-y-1">
          {currentPlaylist.tracks?.map((track, index) => (
            <div
              key={track.id}
              className="grid grid-cols-[16px_1fr_1fr_1fr_60px] gap-4 px-4 py-3 hover:bg-gray-800/50 rounded-lg group transition-colors cursor-pointer"
              onMouseEnter={() => setHoveredTrack(track.id)}
              onMouseLeave={() => setHoveredTrack(null)}
              onClick={() => handlePlayTrack(track)}
            >
              <div className="flex items-center justify-center">
                {currentTrack?.id === track.id && isPlaying ? (
                  <div className="flex space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-spotify-green rounded-full animate-pulse"
                        style={{
                          height: Math.random() * 12 + 4,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                ) : hoveredTrack === track.id ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <span className="text-gray-400">{index + 1}</span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <img
                  src={track.image}
                  alt={track.name}
                  className="w-10 h-10 rounded"
                />
                <div>
                  <p className={`font-medium ${currentTrack?.id === track.id ? 'text-spotify-green' : 'text-white'}`}>
                    {track.name}
                  </p>
                  <p className="text-sm text-gray-400">{track.artists}</p>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-gray-400 hover:text-white cursor-pointer">
                  {track.album}
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-400">{formatDate(track.addedAt)}</span>
              </div>

              <div className="flex items-center justify-center">
                <span className="text-gray-400">{formatDuration(track.duration)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
