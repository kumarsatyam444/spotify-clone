import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeft, ChevronRight, User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Fix: Add fallback for user
  const { user } = useSelector((state) => state.auth || {});
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate(1)}
          className="p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
          >
            {user?.images?.[0]?.url ? (
              <img
                src={user.images[0].url}
                alt={user.display_name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <User className="w-5 h-5" />
            )}
            <span className="text-sm font-medium hidden md:block">
              {user?.display_name || 'User'}
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50">
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <hr className="border-gray-700 my-2" />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
