import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

const AlbumCard = ({ album, size = 'md' }) => {
  const navigate = useNavigate();

  const sizeClasses = {
    sm: 'w-32',
    md: 'w-48',
    lg: 'w-64',
  };

  const handleClick = () => {
    navigate(`/album/${album.id}`);
  };

  const handleArtistClick = (e) => {
    e.stopPropagation();
    navigate(`/artist/${album.artistId}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`${sizeClasses[size]} bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group`}
    >
      <div className="relative mb-4">
        <img
          src={album.image}
          alt={album.name}
          className="w-full aspect-square object-cover rounded-lg"
        />
        <button className="absolute bottom-2 right-2 bg-spotify-green text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Play className="w-5 h-5 ml-0.5" />
        </button>
      </div>
      
      <div>
        <h3 className="font-semibold mb-1 truncate" title={album.name}>
          {album.name}
        </h3>
        <button
          onClick={handleArtistClick}
          className="text-sm text-gray-400 hover:text-white hover:underline truncate block"
          title={album.artist}
        >
          {album.artist}
        </button>
        {album.releaseDate && (
          <p className="text-xs text-gray-500 mt-1">
            {new Date(album.releaseDate).getFullYear()}
          </p>
        )}
      </div>
    </div>
  );
};

export default AlbumCard;
