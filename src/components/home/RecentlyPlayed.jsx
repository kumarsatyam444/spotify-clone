import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { LoadingSkeleton } from '../common/LoadingSpinner';

const RecentlyPlayed = () => {
  const navigate = useNavigate();
  const { recentlyPlayed, loading } = useSelector((state) => state.home);

  if (loading) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4">
              <LoadingSkeleton className="w-16 h-16 rounded-lg" />
              <div className="flex-1 space-y-2">
                <LoadingSkeleton className="h-4 w-3/4" />
                <LoadingSkeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!recentlyPlayed.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Recently Played</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentlyPlayed.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg p-4 group cursor-pointer transition-colors"
            onClick={() => navigate(item.type === 'playlist' ? `/playlist/${item.id}` : `/album/${item.id}`)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{item.name}</h3>
              <p className="text-sm text-gray-400 truncate">
                {item.type === 'playlist' ? 'Playlist' : `Album • ${item.artist}`}
              </p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 bg-spotify-green text-black p-3 rounded-full transition-all duration-300">
              <Play className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyPlayed;
