import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, MoreHorizontal, Users, Music } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('playlists');
  const [profile, setProfile] = useState(null);

  const isOwnProfile = !userId;

  useEffect(() => {
    // Mock profile data
    const mockProfile = {
      id: userId || 'current-user',
      displayName: 'Your Name',
      image: 'https://via.placeholder.com/300',
      publicPlaylists: [
        {
          id: '1',
          name: 'My Public Playlist',
          image: 'https://via.placeholder.com/300'
        }
      ],
      followers: [],
      following: []
    };
    setProfile(mockProfile);
  }, [userId]);

  const tabs = [
    { id: 'playlists', label: 'Public Playlists', icon: Music },
    { id: 'following', label: 'Following', icon: Users },
    { id: 'followers', label: 'Followers', icon: Users },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl text-gray-400">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-800 to-gray-900 p-6">
        <div className="flex items-end space-x-6">
          <div className="relative">
            <img
              src={profile.image || '/default-avatar.png'}
              alt={profile.displayName}
              className="w-48 h-48 rounded-full shadow-2xl"
            />
            {isOwnProfile && (
              <button className="absolute bottom-4 right-4 bg-black/60 p-2 rounded-full hover:bg-black/80 transition-colors">
                <Edit className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium uppercase tracking-wider">Profile</p>
            <h1 className="text-4xl md:text-6xl font-bold my-4">
              {profile.displayName}
            </h1>
            <div className="flex items-center space-x-4 text-sm">
              <span>{profile.publicPlaylists?.length || 0} Public Playlists</span>
              <span>•</span>
              <span>{profile.followers?.length || 0} Followers</span>
              <span>•</span>
              <span>{profile.following?.length || 0} Following</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-b from-gray-900/60 to-gray-900 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {!isOwnProfile && (
              <button className="bg-spotify-green text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform">
                Follow
              </button>
            )}
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <MoreHorizontal className="w-8 h-8 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <div className="flex space-x-8 border-b border-gray-800">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-spotify-green text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'playlists' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {profile.publicPlaylists?.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              >
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="w-full aspect-square object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold truncate">{playlist.name}</h3>
                <p className="text-sm text-gray-400">Playlist</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'following' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {profile.following?.map((user) => (
              <div
                              key={user.id}
                className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => navigate(`/user/${user.id}`)}
              >
                <img
                  src={user.image || '/default-avatar.png'}
                  alt={user.displayName}
                  className="w-full aspect-square object-cover rounded-full mb-4"
                />
                <h3 className="font-semibold truncate">{user.displayName}</h3>
                <p className="text-sm text-gray-400">Profile</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'followers' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {profile.followers?.map((user) => (
              <div
                key={user.id}
                className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => navigate(`/user/${user.id}`)}
              >
                <img
                  src={user.image || '/default-avatar.png'}
                  alt={user.displayName}
                  className="w-full aspect-square object-cover rounded-full mb-4"
                />
                <h3 className="font-semibold truncate">{user.displayName}</h3>
                <p className="text-sm text-gray-400">Profile</p>
              </div>
            ))}
          </div>
        )}

        {((activeTab === 'playlists' && !profile.publicPlaylists?.length) ||
          (activeTab === 'following' && !profile.following?.length) ||
          (activeTab === 'followers' && !profile.followers?.length)) && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400 mb-2">Nothing to show</p>
            <p className="text-gray-500">
              {activeTab === 'playlists' && 'No public playlists yet.'}
              {activeTab === 'following' && 'Not following anyone yet.'}
              {activeTab === 'followers' && 'No followers yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
