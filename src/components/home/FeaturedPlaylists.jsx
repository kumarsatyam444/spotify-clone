import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { LoadingSkeleton } from '../common/LoadingSpinner';

const FeaturedPlaylists = () => {
  const navigate = useNavigate();
  const { featuredPlaylists, loading } = useSelector((state) => state.home);

  if (loading) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="space-y-3">
              <LoadingSkeleton className="aspect-square rounded-lg" />
              <LoadingSkeleton className="h-4 w-3/4" />
              <LoadingSkeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Playlists</h2>
        <button
          onClick={() => navigate('/browse/featured')}
          className="text-gray-400 hover:text-white text-sm font-medium"
        >
          Show all
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {featuredPlaylists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors group cursor-pointer"
            onClick={() => navigate(`/playlist/${playlist.id}`)}
          >
            <div className="relative mb-4">
              <img
                src={playlist.image}
                alt={playlist.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <button className="absolute bottom-2 right-2 bg-spotify-green text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <Play className="w-5 h-5 ml-0.5" />
              </button>
            </div>
            <h3 className="font-semibold mb-2 truncate">{playlist.name}</h3>
            <p className="text-sm text-gray-400 line-clamp-2">
              {playlist.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPlaylists;
