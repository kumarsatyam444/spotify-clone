export const formatTrackForPlayer = (track) => {
  return {
    id: track.id,
    name: track.name,
    artists: track.artists?.map(artist => artist.name).join(', ') || 'Unknown Artist',
    album: track.album?.name || 'Unknown Album',
    image: track.album?.images?.[0]?.url || '/default-album.png',
    duration: track.duration_ms,
    uri: track.uri,
    preview_url: track.preview_url,
    external_urls: track.external_urls,
    popularity: track.popularity,
    explicit: track.explicit,
  };
};

export const formatPlaylistForDisplay = (playlist) => {
  return {
    id: playlist.id,
    name: playlist.name,
    description: playlist.description,
    image: playlist.images?.[0]?.url || '/default-playlist.png',
    owner: playlist.owner?.display_name || 'Unknown',
    tracks: playlist.tracks?.total || 0,
    uri: playlist.uri,
    external_urls: playlist.external_urls,
    public: playlist.public,
    collaborative: playlist.collaborative,
  };
};

export const formatArtistForDisplay = (artist) => {
  return {
    id: artist.id,
    name: artist.name,
    image: artist.images?.[0]?.url || '/default-artist.png',
    followers: artist.followers?.total || 0,
    genres: artist.genres || [],
    popularity: artist.popularity,
    uri: artist.uri,
    external_urls: artist.external_urls,
  };
};

export const formatAlbumForDisplay = (album) => {
  return {
    id: album.id,
    name: album.name,
    artists: album.artists?.map(artist => artist.name).join(', ') || 'Unknown Artist',
    image: album.images?.[0]?.url || '/default-album.png',
    releaseDate: album.release_date,
    totalTracks: album.total_tracks,
    uri: album.uri,
    external_urls: album.external_urls,
    albumType: album.album_type,
  };
};

export const formatSearchResults = (results) => {
  return {
    tracks: results.tracks?.items?.map(formatTrackForPlayer) || [],
    artists: results.artists?.items?.map(formatArtistForDisplay) || [],
    albums: results.albums?.items?.map(formatAlbumForDisplay) || [],
    playlists: results.playlists?.items?.map(formatPlaylistForDisplay) || [],
  };
};
