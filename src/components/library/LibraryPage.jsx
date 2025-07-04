import React, { useState, useEffect } from 'react';
import { Plus, Search, List, Grid3X3 } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const LibraryPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [filter, setFilter] = useState('all');
  const [playlists, setPlaylists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' },
  ];

  useEffect(() => {
    // Mock data
    setPlaylists([
      {
        id: '1',
        name: 'My Playlist #1',
        type: 'playlist',
        image: 'https://via.placeholder.com/300',
        trackCount: 25,
        owner: 'You',
      },
      {
        id: '2',
        name: 'My Playlist #2',
        type: 'playlist',
        image: 'https://via.placeholder.com/300',
        trackCount: 15,
        owner: 'You',
      }
    ]);
    setLikedSongs([{ id: 'liked', name: 'Liked Songs' }]);
  }, []);

  const filteredItems = React.useMemo(() => {
    let items = [...playlists];
    
    if (likedSongs.length > 0) {
      items.unshift({
        id: 'liked-songs',
        name: 'Liked Songs',
        type: 'liked',
        image: '/liked-songs-cover.png',
        trackCount: likedSongs.length,
        owner: 'You',
      });
    }

    if (filter !== 'all') {
      items = items.filter(item => item.type === filter.slice(0, -1));
    }

    if (searchQuery) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.owner?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return items;
  }, [playlists, likedSongs, filter, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Library</h1>
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          {filters.map((filterItem) => (
            <button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                filter === filterItem.id
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {filterItem.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search in Your Library"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm focus:outline-none focus:border-white"
            />
          </div>
          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            {viewMode === 'list' ? <Grid3X3 className="w-5 h-5" /> : <List className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : 'space-y-2'}>
        {filteredItems.map((item) => (
          <div key={item.id} className="p-4 hover:bg-gray-800 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded"
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.owner}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400 mb-2">No items found</p>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
