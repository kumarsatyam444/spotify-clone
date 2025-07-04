import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Play, Pause, Heart, MoreHorizontal, Clock } from 'lucide-react';
import { setCurrentTrack, setIsPlaying } from '../../store/slices/playerSlice';
import { formatDuration, formatDate } from '../../utils/helpers';
import LoadingSpinner, { PlaylistSkeleton } from '../common/LoadingSpinner';

const AlbumPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector((state) => state.player);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredTrack, setHoveredTrack] = useState(null);

  useEffect(() => {
    // Mock album data for demo
    const mockAlbum = {
      id,
      name: 'Sample Album',
      artist: 'Sample Artist',
      artistId: '1',
      image: 'https://via.placeholder.com/300',
      releaseDate: '2023-01-01',
      tracks: [
        {
          id: '1',
          name: 'Track 1',
          artists: 'Sample Artist',
          duration: 180000,
          image: 'https://via.placeholder.com/300'
        },
        {
          id: '2',
          name: 'Track 2',
          artists: 'Sample Artist',
          duration: 210000,
          image: 'https://via.placeholder.com/300'
        }
      ]
    };
    setCurrentAlbum(mockAlbum);
    setLoading(false);
  }, [id]);

  const handlePlayAlbum = () => {
    if (currentAlbum?.tracks?.length > 0) {
      dispatch(setCurrentTrack(currentAlbum.tracks[0]));
      dispatch(setIsPlaying(true));
    }
  };

  const handlePlayTrack = (track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
  };

  const handleArtistClick = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  if (loading) {
    return (
      <div className="p-6">
        <PlaylistSkeleton />
      </div>
    );
  }

  if (!currentAlbum) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl text-gray-400">Album not found</p>
      </div>
    );
  }

  const totalDuration = currentAlbum.tracks?.reduce((acc, track) => acc + track.duration, 0) || 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-800 to-gray-900 p-6">
        <div className="flex items-end space-x-6">
          <img
            src={currentAlbum.image}
            alt={currentAlbum.name}
            className="w-48 h-48 rounded-lg shadow-2xl"
          />
          <div className="flex-1">
            <p className="text-sm font-medium uppercase tracking-wider">Album</p>
            <h1 className="text-4xl md:text-6xl font-bold my-4">
              {currentAlbum.name}
            </h1>
            <div className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => handleArtistClick(currentAlbum.artistId)}
                className="font-medium hover:underline"
              >
                {currentAlbum.artist}
              </button>
              <span>•</span>
              <span>{formatDate(currentAlbum.releaseDate)}</span>
              <span>•</span>
              <span>{currentAlbum.tracks?.length || 0} songs</span>
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
            onClick={handlePlayAlbum}
            className="bg-spotify-green text-black p-4 rounded-full hover:scale-105 transition-transform"
          >
            <Play className="w-6 h-6 ml-1" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Heart className="w-8 h-8 text-gray-400 hover:text-white" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <MoreHorizontal className="w-8 h-8 text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>

      {/* Track List */}
      <div className="p-6">
        <div className="grid grid-cols-[16px_1fr_60px] gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800 mb-4">
          <span>#</span>
          <span>Title</span>
          <Clock className="w-4 h-4 justify-self-center" />
        </div>

        <div className="space-y-1">
          {currentAlbum.tracks?.map((track, index) => (
            <div
              key={track.id}
              className="grid grid-cols-[16px_1fr_60px] gap-4 px-4 py-3 hover:bg-gray-800/50 rounded-lg group transition-colors cursor-pointer"
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

              <div className="flex items-center">
                <div>
                  <p className={`font-medium ${currentTrack?.id === track.id ? 'text-spotify-green' : 'text-white'}`}>
                    {track.name}
                  </p>
                  <p className="text-sm text-gray-400">{track.artists}</p>
                </div>
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

export default AlbumPage;
