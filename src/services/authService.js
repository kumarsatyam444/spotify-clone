import { spotifyApi } from './spotifyApi';

class AuthService {
  constructor() {
    this.checkTokenExpiry();
  }

  checkTokenExpiry() {
    const tokenTimestamp = localStorage.getItem('spotify_token_timestamp');
    const expiresIn = localStorage.getItem('spotify_expires_in');
    
    if (tokenTimestamp && expiresIn) {
      const now = Date.now();
      const tokenAge = now - parseInt(tokenTimestamp);
      const expiryTime = parseInt(expiresIn) * 1000;
      
      if (tokenAge >= expiryTime - 300000) { // Refresh 5 minutes before expiry
        this.refreshToken();
      }
    }
  }

  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('spotify_refresh_token');
      if (refreshToken) {
        const response = await spotifyApi.refreshAccessToken(refreshToken);
        localStorage.setItem('spotify_token_timestamp', Date.now().toString());
        localStorage.setItem('spotify_expires_in', response.expires_in.toString());
        return response;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_timestamp');
    localStorage.removeItem('spotify_expires_in');
    window.location.href = '/login';
  }

  isAuthenticated() {
    return !!localStorage.getItem('spotify_access_token');
  }

  getAuthUrl() {
    return spotifyApi.getAuthUrl();
  }

  async handleCallback(code) {
    try {
      const response = await spotifyApi.getAccessToken(code);
      localStorage.setItem('spotify_token_timestamp', Date.now().toString());
      localStorage.setItem('spotify_expires_in', response.expires_in.toString());
      return response;
    } catch (error) {
      console.error('Error handling callback:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
