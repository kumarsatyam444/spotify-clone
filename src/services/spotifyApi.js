import axios from 'axios';

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token';

class SpotifyAPI {
  constructor() {
    this.accessToken = localStorage.getItem('spotify_access_token');
    this.refreshToken = localStorage.getItem('spotify_refresh_token');
    
    this.api = axios.create({
      baseURL: SPOTIFY_BASE_URL,
    });

    this.api.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        if (error.response?.status === 401 && this.refreshToken) {
          try {
            await this.refreshAccessToken(this.refreshToken);
            error.config.headers.Authorization = `Bearer ${this.accessToken}`;
            return this.api.request(error.config);
          } catch (refreshError) {
            this.logout();
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication
  getAuthUrl() {
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-top-read',
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-modify-private',
      'user-follow-read',
      'user-follow-modify',
      'user-library-read',
      'user-library-modify',
      'streaming'
    ].join(' ');

    const params = new URLSearchParams({
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      scope: scopes,
      show_dialog: 'true'
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  async getAccessToken(code) {
    const response = await axios.post(SPOTIFY_AUTH_URL, {
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    this.accessToken = response.data.access_token;
    this.refreshToken = response.data.refresh_token;
    return response.data;
  }

  async refreshAccessToken(refreshToken) {
    const response = await axios.post(SPOTIFY_AUTH_URL, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    this.accessToken = response.data.access_token;
    localStorage.setItem('spotify_access_token', this.accessToken);
    return response.data;
  }

  logout() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
  }

  // User Profile
  async getCurrentUser() {
    return this.api.get('/me');
  }

  async getUserProfile(userId) {
    return this.api.get(`/users/${userId}`);
  }

  async getUserTopTracks(timeRange = 'medium_term', limit = 20) {
    return this.api.get(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`);
  }

  async getUserTopArtists(timeRange = 'medium_term', limit = 20) {
    return this.api.get(`/me/top/artists?time_range=${timeRange}&limit=${limit}`);
  }

  // Search
  async search(query, type = 'track,artist,album,playlist', limit = 20) {
    return this.api.get(`/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`);
  }

  // Playlists
  async getUserPlaylists(limit = 50) {
    return this.api.get(`/me/playlists?limit=${limit}`);
  }

  async getPlaylist(playlistId) {
    return this.api.get(`/playlists/${playlistId}`);
  }

  async getPlaylistTracks(playlistId, limit = 100) {
    return this.api.get(`/playlists/${playlistId}/tracks?limit=${limit}`);
  }

  async getFeaturedPlaylists(limit = 20) {
    return this.api.get(`/browse/featured-playlists?limit=${limit}`);
  }

  async createPlaylist(name, description = '', isPublic = true) {
    const user = await this.getCurrentUser();
    return this.api.post(`/users/${user.id}/playlists`, {
      name,
      description,
      public: isPublic,
    });
  }

  async addTrackToPlaylist(playlistId, trackUri) {
    return this.api.post(`/playlists/${playlistId}/tracks`, {
      uris: [trackUri],
    });
  }

  async removeTrackFromPlaylist(playlistId, trackUri) {
    return this.api.delete(`/playlists/${playlistId}/tracks`, {
      data: {
        tracks: [{ uri: trackUri }],
      },
    });
  }

  // Albums
  async getAlbum(albumId) {
    return this.api.get(`/albums/${albumId}`);
  }

  async getAlbumTracks(albumId, limit = 50) {
    return this.api.get(`/albums/${albumId}/tracks?limit=${limit}`);
  }

  async getNewReleases(limit = 20) {
    return this.api.get(`/browse/new-releases?limit=${limit}`);
  }

  // Artists
  async getArtist(artistId) {
    return this.api.get(`/artists/${artistId}`);
  }

  async getArtistTopTracks(artistId, country = 'US') {
    return this.api.get(`/artists/${artistId}/top-tracks?market=${country}`);
  }

  async getArtistAlbums(artistId, limit = 20) {
    return this.api.get(`/artists/${artistId}/albums?limit=${limit}`);
  }

  // Browse
  async getCategories(limit = 20) {
    return this.api.get(`/browse/categories?limit=${limit}`);
  }

  async getCategoryPlaylists(categoryId, limit = 20) {
    return this.api.get(`/browse/categories/${categoryId}/playlists?limit=${limit}`);
  }

  async getRecommendations(seedTracks = [], seedArtists = [], seedGenres = [], limit = 20) {
    const params = new URLSearchParams({
      limit: limit.toString(),
    });

    if (seedTracks.length > 0) params.append('seed_tracks', seedTracks.join(','));
    if (seedArtists.length > 0) params.append('seed_artists', seedArtists.join(','));
    if (seedGenres.length > 0) params.append('seed_genres', seedGenres.join(','));

    return this.api.get(`/recommendations?${params.toString()}`);
  }

  // Recently Played
  async getRecentlyPlayed(limit = 20) {
    return this.api.get(`/me/player/recently-played?limit=${limit}`);
  }

  // Playback
  async getCurrentPlayback() {
    return this.api.get('/me/player');
  }

  async play(contextUri = null, uris = null, offset = null) {
    const body = {};
    if (contextUri) body.context_uri = contextUri;
    if (uris) body.uris = uris;
    if (offset) body.offset = offset;

    return this.api.put('/me/player/play', body);
  }

  async pause() {
    return this.api.put('/me/player/pause');
  }

  async next() {
    return this.api.post('/me/player/next');
  }

  async previous() {
    return this.api.post('/me/player/previous');
  }

  async seek(positionMs) {
    return this.api.put(`/me/player/seek?position_ms=${positionMs}`);
  }

  async setVolume(volumePercent) {
    return this.api.put(`/me/player/volume?volume_percent=${volumePercent}`);
  }

  async setShuffle(state) {
    return this.api.put(`/me/player/shuffle?state=${state}`);
  }

  async setRepeat(state) {
    return this.api.put(`/me/player/repeat?state=${state}`);
  }

  // Library
  async getSavedTracks(limit = 20) {
    return this.api.get(`/me/tracks?limit=${limit}`);
  }

  async saveTrack(trackId) {
    return this.api.put(`/me/tracks?ids=${trackId}`);
  }

  async removeSavedTrack(trackId) {
    return this.api.delete(`/me/tracks?ids=${trackId}`);
  }

  async checkSavedTracks(trackIds) {
    return this.api.get(`/me/tracks/contains?ids=${trackIds.join(',')}`);
  }
}

export const spotifyApi = new SpotifyAPI();
