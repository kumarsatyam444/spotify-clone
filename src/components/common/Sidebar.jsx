import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Home,
  Search,
  Library,
  Plus,
  Heart,
  Music,
  Radio,
  Mic2,
  TrendingUp,
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Fix: Add fallback for playlists
  const { playlists = [] } = useSelector((state) => state.playlists || {});

  const mainNavItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Your Library', path: '/library' },
  ];

  const libraryItems = [
    { icon: Plus, label: 'Create Playlist', path: '/create-playlist' },
    { icon: Heart, label: 'Liked Songs', path: '/liked' },
    { icon: Music, label: 'Your Episodes', path: '/episodes' },
    { icon: Radio, label: 'Recently Played', path: '/recent' },
    { icon: Mic2, label: 'Your Shows', path: '/shows' },
    { icon: TrendingUp, label: 'Charts', path: '/charts' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 w-64 bg-black transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center">
                <Music className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold">Spotify</span>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="px-6 space-y-2">
            {mainNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                className={`
                  flex items-center space-x-3 w-full p-3 rounded-lg transition-colors
                  ${
                    isActive(item.path)
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Library Section */}
          <div className="mt-8 px-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Library
            </h3>
            <nav className="space-y-2">
              {libraryItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  className={`
                    flex items-center space-x-3 w-full p-2 rounded-lg transition-colors
                    ${
                      isActive(item.path)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }
                  `}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Playlists */}
          <div className="mt-8 px-6 flex-1 overflow-y-auto">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Playlists
            </h3>
            <div className="space-y-2">
              {playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => {
                      navigate(`/playlist/${playlist.id}`);
                      onClose();
                    }}
                    className="flex items-center space-x-3 w-full p-2 rounded-lg text-left text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                  >
                    <img
                      src={playlist.image || '/default-playlist.png'}
                      alt={playlist.name}
                      className="w-8 h-8 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{playlist.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {playlist.tracks || 0} songs
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500">No playlists yet</p>
              )}
            </div>
          </div>

          {/* Install App */}
          <div className="p-6 border-t border-gray-800">
            <button className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
              <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center">
                <Plus className="w-3 h-3" />
              </div>
              <span className="text-sm font-medium">Install App</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
