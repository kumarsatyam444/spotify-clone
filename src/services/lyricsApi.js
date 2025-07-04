import axios from 'axios';

class LyricsAPI {
  constructor() {
    this.baseURL = 'https://api.lyrics.ovh/v1';
    this.geniusBaseURL = 'https://api.genius.com';
    this.apiKey = process.env.REACT_APP_LYRICS_API_KEY;
  }

  async getLyrics(artist, title) {
    try {
      // Try Lyrics.ovh first (free)
      const response = await axios.get(`${this.baseURL}/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
      return {
        lyrics: response.data.lyrics,
        synced: false,
      };
    } catch (error) {
      console.error('Error fetching lyrics:', error);
      return null;
    }
  }

  async getSyncedLyrics(artist, title) {
    try {
      // This would require a paid service like Musixmatch or Genius
      // For demo purposes, we'll simulate synced lyrics
      const lyrics = await this.getLyrics(artist, title);
      if (lyrics) {
        return {
          ...lyrics,
          synced: true,
          syncedLyrics: this.parseLyrics(lyrics.lyrics),
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching synced lyrics:', error);
      return null;
    }
  }

  parseLyrics(lyricsText) {
    // Simple parser for demo - in real app, you'd get properly timed lyrics
    const lines = lyricsText.split('\n').filter(line => line.trim());
    return lines.map((line, index) => ({
      time: index * 3, // 3 seconds per line (demo)
      text: line.trim(),
    }));
  }

  async searchGenius(query) {
    try {
      const response = await axios.get(`${this.geniusBaseURL}/search`, {
        params: { q: query },
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      return response.data.response.hits;
    } catch (error) {
      console.error('Error searching Genius:', error);
      return [];
    }
  }
}

export const lyricsApi = new LyricsAPI();
