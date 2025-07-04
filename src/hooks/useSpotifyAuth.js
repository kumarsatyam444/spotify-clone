import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithSpotify, fetchUserProfile } from '../store/slices/authSlice';
import { authService } from '../services/authService';

export const useSpotifyAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      if (isAuthenticated && !user) {
        try {
          await dispatch(fetchUserProfile()).unwrap();
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, [isAuthenticated, user, dispatch]);

  const login = () => {
    window.location.href = authService.getAuthUrl();
  };

  const logout = () => {
    authService.logout();
  };

  const handleCallback = async (code) => {
    try {
      await dispatch(loginWithSpotify(code)).unwrap();
      await dispatch(fetchUserProfile()).unwrap();
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    isInitialized,
    login,
    logout,
    handleCallback,
  };
};
