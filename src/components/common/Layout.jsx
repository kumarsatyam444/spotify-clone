import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';
import MusicPlayer from '../player/MusicPlayer';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentTrack } = useSelector((state) => state.player);
  
  useKeyboardShortcuts();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <div className="min-h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* Music Player */}
      {currentTrack && <MusicPlayer />}
    </div>
  );
};

export default Layout;
