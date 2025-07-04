import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

// Layout Components
import Layout from './components/common/Layout';

// Page Components
import HomePage from './components/home/HomePage';
import SearchPage from './components/search/SearchPage';
import LibraryPage from './components/library/LibraryPage';
import PlaylistPage from './components/playlist/PlaylistPage';
import AlbumPage from './components/album/AlbumPage';
import ProfilePage from './components/profile/ProfilePage';

// Common Components
import LoadingSpinner from './components/common/LoadingSpinner';

// Redux Actions
import { refreshToken } from './store/slices/authSlice';

// Styles
import './styles/globals.css';
import './styles/animations.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth || {});
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  // For demo purposes, always show content (remove this in production)
  return children;
};

function App() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, token } = useSelector((state) => state.auth || {});

  useEffect(() => {
    // Check if user has a token and refresh it on app start
    if (token && !isAuthenticated) {
      dispatch(refreshToken());
    }
  }, [dispatch, token, isAuthenticated]);

  useEffect(() => {
    // Set up token refresh interval
    if (isAuthenticated) {
      const interval = setInterval(() => {
        dispatch(refreshToken());
      }, 50 * 60 * 1000); // Refresh every 50 minutes

      return () => clearInterval(interval);
    }
  }, [dispatch, isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Router>
      <div className="App bg-black text-white min-h-screen">
        <Layout>
          <Routes>
            {/* Main Pages */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/search" 
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/library" 
              element={
                <ProtectedRoute>
                  <LibraryPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Content Pages */}
            <Route 
              path="/playlist/:id" 
              element={
                <ProtectedRoute>
                  <PlaylistPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/album/:id" 
              element={
                <ProtectedRoute>
                  <AlbumPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/artist/:id" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* User Pages */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/user/:userId" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Collection Pages */}
            <Route 
              path="/collection/tracks" 
              element={
                <ProtectedRoute>
                  <LibraryPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/liked" 
              element={
                <ProtectedRoute>
                  <LibraryPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Browse Pages */}
            <Route 
              path="/browse/featured" 
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/browse/new-releases" 
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Additional Routes */}
            <Route 
              path="/recent" 
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/charts" 
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-playlist" 
              element={
                <ProtectedRoute>
                  <LibraryPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/episodes" 
              element={
                <ProtectedRoute>
                  <LibraryPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/shows" 
              element={
                <ProtectedRoute>
                  <LibraryPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>

        {/* Toast Notifications */}
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #374151',
            },
            success: {
              iconTheme: {
                primary: '#1db954',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
