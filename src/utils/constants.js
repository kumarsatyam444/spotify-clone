export const SPOTIFY_SCOPES = [
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
];

export const GENRES = [
  'pop', 'rock', 'hip-hop', 'jazz', 'classical', 'electronic', 'country',
  'r&b', 'indie', 'alternative', 'blues', 'reggae', 'folk', 'metal',
  'punk', 'disco', 'funk', 'soul', 'gospel', 'latin'
];

export const TIME_RANGES = {
  short_term: '4 weeks',
  medium_term: '6 months',
  long_term: 'All time'
};

export const REPEAT_MODES = {
  off: 'off',
  track: 'track',
  context: 'context'
};

export const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export const THEME_COLORS = [
  '#1DB954', // Spotify Green
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Mint
  '#FFEAA7', // Yellow
  '#DDA0DD', // Plum
  '#98D8C8', // Mint Green
];
