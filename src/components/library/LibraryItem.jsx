import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Heart, Music } from 'lucide-react';

const LibraryItem = ({ item, viewMode }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.type === 'liked') {
      navigate('/collection/tracks');
    } else if (item.type === 'playlist') {
      navigate(`/playlist/${item.id}`);
    } else if (item.type === 'album') {
      navigate(`/album/${item.id}`);
    } else if (item.type === 'artist') {
      navigate(`/artist/${item.id}`);
    }
  };

  const getIcon = () => {
    switch (item.type) {
      case 'liked':
        return <Heart className="w-8 h-8 text-white" fill="currentColor" />;
      case 'playlist':
        return <Music className="w-8 h-8 text-gray-400" />;
      default:
        return null;
    }
  };

  const getSubtitle = () => {
    if (item.type === 'liked') {
      return `${item.trackCount} liked songs`;
    }
    if (item.type === 'playlist') {
      return `By ${item.owner} • ${item.trackCount || 0} songs`;
    }
    if (item.type === 'album') {
      return `Album • ${item.artist}`;
    }
    if (item.type === 'artist') {
      return 'Artist';
    }
    return '';
  };

  if (viewMode === 'grid') {
    return (
      <div
        onClick={handleClick}
        className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
      >
        <div className="relative mb-4">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className={`w-full aspect-square object-cover ${
                item.type === 'artist' ? 'rounded-full' : 'rounded-lg'
              }`}
            />
          ) : (
            <div className={`w-full aspect-square bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center ${
              item.type === 'artist' ? 'rounded-full' : 'rounded-lg'
            }`}>
              {getIcon()}
            </div>
          )}
          <button className="absolute bottom-2 right-2 bg-spotify-green text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <Play className="w-5 h-5 ml-0.5" />
          </button>
        </div>
        <h3 className="font-semibold mb-2 truncate">{item.name}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{getSubtitle()}</p>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center space-x-4 p-3 hover:bg-gray-800/50 rounded-lg cursor-pointer group transition-colors"
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className={`w-12 h-12 object-cover ${
            item.type === 'artist' ? 'rounded-full' : 'rounded'
          }`}
        />
      ) : (
        <div className={`w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center ${
          item.type === 'artist' ? 'rounded-full' : 'rounded'
        }`}>
          {getIcon()}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{item.name}</h3>
        <p className="text-sm text-gray-400 truncate">{getSubtitle()}</p>
      </div>
      <button className="opacity-0 group-hover:opacity-100 bg-spotify-green text-black p-2 rounded-full transition-all">
        <Play className="w-4 h-4 ml-0.5" />
      </button>
    </div>
  );
};

export default LibraryItem;
