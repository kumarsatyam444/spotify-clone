import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FeaturedPlaylists from './FeaturedPlaylists';
import TrendingAlbums from './TrendingAlbums';
import RecentlyPlayed from './RecentlyPlayed';
import LoadingSpinner from '../common/LoadingSpinner';

const HomePage = () => {
  // Fix: Add fallback for user
  const { user } = useSelector((state) => state.auth || {});

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="p-6 space-y-8">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {getGreeting()}{user?.display_name && `, ${user.display_name}`}
        </h1>
        <p className="text-gray-400">
          Discover new music and enjoy your favorites
        </p>
      </div>

      {/* Recently Played */}
      <RecentlyPlayed />

      {/* Featured Playlists */}
      <FeaturedPlaylists />

      {/* Trending Albums */}
      <TrendingAlbums />
    </div>
  );
};

export default HomePage;
