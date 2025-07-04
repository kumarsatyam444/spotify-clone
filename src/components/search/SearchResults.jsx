import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Heart, MoreHorizontal } from 'lucide-react';
import { setCurrentTrack, addToQueue } from '../../store/slices/playerSlice';
import { formatDuration } from '../../utils/helpers';
import LoadingSpinner, { TrackSkeleton } from '../common/LoadingSpinner';

const SearchResults = ({ results, loading, query }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'tracks', label: 'Songs' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' },
    { id: 'playlists', label: 'Playlists' },
  ];

  const handlePlayTrack = (track) => {
    dispatch(setCurrentTrack(track));
  };

  const handleAddToQueue = (track) => {
    dispatch(addToQueue(track));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <div key={tab.id} className="px-4 py-2 bg-gray-700 rounded-full animate-pulse h-10 w-20" />
          ))}
        </div>
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <TrackSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const renderTopResult = () => {
    if (!results.tracks?.length) return null;
    
    const topTrack = results.tracks[0];
    return (
      <div className="bg-gray-800/50 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Top result
        </h3>
        <div className="flex items-center space-x-4">
          <img
            src={topTrack.image}
            alt={topTrack.name}
            className="w-20 h-20 rounded-lg"
          />
          <div className="flex-1">
            <h4 className="text-2xl font-bold mb-2">{topTrack.name}</h4>
            <p className="text-gray-400 mb-4">{topTrack.artists}</p>
            <button
              onClick={() => handlePlayTrack(topTrack)}
              className="bg-spotify-green text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Play
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTracks = (tracks, showAll = false) => {
    const displayTracks = showAll ? tracks : tracks?.slice(0, 4) || [];
    
    return (
      <div className="space-y-2">
        {displayTracks.map((track, index) => (
          <div
            key={track.id}
            className="flex items-center space-x-4 p-3 hover:bg-gray-800/50 rounded-lg group transition-colors"
          >
            <div className="relative">
              <img
                src={track.image}
                alt={track.name}
                className="w-12 h-12 rounded"
              />
              <button
                onClick={() => handlePlayTrack(track)}
                className="absolute inset-0 bg-black/60 rounded opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <Play className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{track.name}</p>
              <p className="text-sm text-gray-400 truncate">{track.artists}</p>
            </div>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleAddToQueue(track)}
                className="p-2 hover:bg-gray-700 rounded-full"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-full">
                <Heart className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-full">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-gray-400">
              {formatDuration(track.duration)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderArtists = (artists) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {artists?.slice(0, 5).map((artist) => (
          <div
            key={artist.id}
            className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => navigate(`/artist/${artist.id}`)}
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full aspect-square object-cover rounded-full mb-4"
            />
            <h3 className="font-semibold truncate">{artist.name}</h3>
            <p className="text-sm text-gray-400">Artist</p>
          </div>
        ))}
      </div>
    );
  };

  const renderAlbums = (albums) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {albums?.slice(0, 5).map((album) => (
          <div
            key={album.id}
            className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => navigate(`/album/${album.id}`)}
          >
            <img
              src={album.image}
              alt={album.name}
              className="w-full aspect-square object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold truncate">{album.name}</h3>
            <p className="text-sm text-gray-400 truncate">{album.artist}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderAllResults = () => {
    return (
      <div className="space-y-8">
        {results.tracks?.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>{renderTopResult()}</div>
            <div>
              <h3 className="text-xl font-bold mb-4">Songs</h3>
              {renderTracks(results.tracks)}
            </div>
          </div>
        )}

        {results.artists?.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Artists</h3>
            {renderArtists(results.artists)}
          </div>
        )}

        {results.albums?.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Albums</h3>
            {renderAlbums(results.albums)}
          </div>
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tracks':
        return renderTracks(results.tracks, true);
      case 'artists':
        return renderArtists(results.artists);
      case 'albums':
        return renderAlbums(results.albums);
      case 'playlists':
        return renderAlbums(results.playlists); // Similar structure
      default:
        return renderAllResults();
    }
  };

  if (!results || (!results.tracks?.length && !results.artists?.length && !results.albums?.length)) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-400 mb-2">No results found for "{query}"</p>
        <p className="text-gray-500">Please make sure your words are spelled correctly or use less or different keywords.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {renderTabContent()}
    </div>
  );
};

export default SearchResults;
