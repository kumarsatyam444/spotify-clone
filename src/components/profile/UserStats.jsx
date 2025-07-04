import React from 'react';
import { useSelector } from 'react-redux';
import { TrendingUp, Clock, Heart, Music } from 'lucide-react';

const UserStats = () => {
  const { currentUser } = useSelector((state) => state.profile);
  const { listeningHistory } = useSelector((state) => state.player);

  const stats = [
    {
      icon: Music,
      label: 'Songs Played',
      value: listeningHistory?.totalTracks || 0,
      change: '+12%',
      changeType: 'positive',
    },
    {
      icon: Clock,
      label: 'Hours Listened',
      value: Math.round((listeningHistory?.totalTime || 0) / 3600),
      change: '+8%',
      changeType: 'positive',
    },
    {
      icon: Heart,
      label: 'Liked Songs',
      value: currentUser?.likedSongs?.length || 0,
      change: '+5%',
      changeType: 'positive',
    },
    {
      icon: TrendingUp,
      label: 'Top Genre',
      value: listeningHistory?.topGenre || 'Pop',
      change: 'This month',
      changeType: 'neutral',
    },
  ];

  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-bold mb-4">Your Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <IconComponent className="w-5 h-5 text-spotify-green" />
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    stat.changeType === 'positive'
                      ? 'bg-green-900/50 text-green-400'
                      : stat.changeType === 'negative'
                      ? 'bg-red-900/50 text-red-400'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserStats;
