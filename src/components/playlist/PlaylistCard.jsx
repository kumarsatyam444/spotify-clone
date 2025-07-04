import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Play, Pause, Heart, MoreHorizontal, Music, Users, Clock } from 'lucide-react';
import { playTrack, setIsPlaying } from '../../store/slices/playerSlice';
import { addToLikedSongs, removeFromLikedSongs } from '../../store/slices/librarySlice';
import ContextMenu from '../common/ContextMenu';
import { formatNumber, formatDuration } from '../../utils/formatters';

const PlaylistCard = ({ 
  playlist, 
  size = 'medium', 
  showDescription = true,
  showPlayButton = true,
  className = '',
  layout = 'card' // 'card' or 'list'
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector((state) => state.player);
  const { likedSongs } = useSelector((state) => state.library);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const isCurrentPlaylist = currentTrack?.playlistId === playlist.id;
  const isLiked = likedSongs.some(song => song.playlistId === playlist.id);

  const handleClick = () => {
    navigate(`/playlist/${playlist.id}`);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    
    if (isCurrentPlaylist) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      // Play first track of the playlist
      if (playlist.tracks && playlist.tracks.length > 0) {
        dispatch(playTrack({
          ...playlist.tracks[0],
          playlistId: playlist.id,
          playlistName: playlist.name
        }));
      }
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    
    if (isLiked) {
      dispatch(removeFromLikedSongs(playlist.id));
    } else {
      dispatch(addToLikedSongs({
        id: playlist.id,
        name: playlist.name,
        type: 'playlist',
        image: playlist.image,
        playlistId: playlist.id
      }));
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const contextMenuItems = [
    {
      label: 'Add to queue',
      onClick: () => {
        console.log('Add to queue:', playlist.name);
      }
    },
    {
      label: 'Go to playlist radio',
      onClick: () => {
        navigate(`/playlist/${playlist.id}/radio`);
      }
    },
    {
      label: isLiked ? 'Remove from Your Library' : 'Save to Your Library',
      onClick: handleLikeClick
    },
    {
      label: 'Create folder',
      onClick: () => {
        console.log('Create folder');
      }
    },
    {
      label: 'Download',
      onClick: () => {
        console.log('Download playlist');
      }
    },
    {
      label: 'Share',
      onClick: () => {
        navigator.clipboard.writeText(`${window.location.origin}/playlist/${playlist.id}`);
      },
      submenu: [
        {
          label: 'Copy playlist link',
          onClick: () => {
            navigator.clipboard.writeText(`${window.location.origin}/playlist/${playlist.id}`);
          }
        },
        {
          label: 'Embed playlist',
          onClick: () => {
            const embedCode = `<iframe src="${window.location.origin}/embed/playlist/${playlist.id}" width="300" height="380"></iframe>`;
            navigator.clipboard.writeText(embedCode);
          }
        }
      ]
    },
    {
      label: 'Open in Desktop app',
      onClick: () => {
        window.open(`spotify:playlist:${playlist.id}`, '_blank');
      }
    }
  ];

  // Card Layout
  if (layout === 'card') {
    const getSizeClasses = () => {
      switch (size) {
        case 'small':
          return 'w-40';
        case 'large':
          return 'w-72';
        default:
          return 'w-48';
      }
    };

    const getImageSize = () => {
      switch (size) {
        case 'small':
          return 'w-32 h-32';
        case 'large':
          return 'w-64 h-64';
        default:
          return 'w-40 h-40';
      }
    };

    return (
      <>
        <div
          className={`bg-gray-900/40 hover:bg-gray-800/60 p-4 rounded-lg transition-all duration-300 cursor-pointer group ${getSizeClasses()} ${className}`}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Playlist Image */}
          <div className="relative mb-4">
            {playlist.images && playlist.images.length > 0 ? (
              <img
                src={playlist.images[0]?.url || playlist.image}
                alt={playlist.name}
                className={`${getImageSize()} object-cover rounded-lg shadow-lg`}
                loading="lazy"
              />
            ) : (
              <div className={`${getImageSize()} bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center`}>
                <Music className="w-12 h-12 text-gray-400" />
              </div>
            )}

            {/* Play Button Overlay */}
            {showPlayButton && (
              <button
                onClick={handlePlayClick}
                className={`absolute bottom-2 right-2 bg-spotify-green text-black p-3 rounded-full shadow-lg transform transition-all duration-300 ${
                  isHovered || isCurrentPlaylist 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-2'
                } hover:scale-105 hover:bg-green-400`}
              >
                {isCurrentPlaylist && isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>
            )}

            {/* More Options Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleContextMenu(e);
              }}
              className={`absolute top-2 right-2 p-2 rounded-full bg-black/50 text-gray-300 hover:text-white transition-all duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Playlist Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-white truncate group-hover:text-spotify-green transition-colors">
              {playlist.name}
            </h3>
            
            {showDescription && playlist.description && (
              <p className="text-sm text-gray-400 line-clamp-2">
                {playlist.description}
              </p>
            )}

            <div className="flex items-center space-x-2 text-xs text-gray-500">
              {playlist.owner?.display_name && (
                <span className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{playlist.owner.display_name}</span>
                </span>
              )}
              
              {playlist.tracks?.total && (
                <>
                  {playlist.owner?.display_name && <span>•</span>}
                  <span>{formatNumber(playlist.tracks.total)} songs</span>
                </>
              )}

              {playlist.followers?.total && (
                <>
                  <span>•</span>
                  <span>{formatNumber(playlist.followers.total)} likes</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Context Menu */}
        <ContextMenu
          isOpen={showContextMenu}
          onClose={() => setShowContextMenu(false)}
          position={contextMenuPosition}
          items={contextMenuItems}
        />
      </>
    );
  }

  // List Layout
  return (
    <>
      <div
        className={`flex items-center space-x-4 p-3 hover:bg-gray-800/50 rounded-lg cursor-pointer group transition-colors ${className}`}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Playlist Image */}
        <div className="relative">
          {playlist.images && playlist.images.length > 0 ? (
            <img
              src={playlist.images[0]?.url || playlist.image}
              alt={playlist.name}
              className="w-12 h-12 object-cover rounded"
              loading="lazy"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded flex items-center justify-center">
              <Music className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>

        {/* Playlist Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white truncate group-hover:text-spotify-green transition-colors">
            {playlist.name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Playlist</span>
            {playlist.owner?.display_name && (
              <>
                <span>•</span>
                <span>{playlist.owner.display_name}</span>
              </>
            )}
          </div>
        </div>

        {/* Track Count */}
        {playlist.tracks?.total && (
          <div className="text-sm text-gray-400">
            {formatNumber(playlist.tracks.total)} songs
          </div>
        )}

        {/* Duration */}
        {playlist.duration && (
          <div className="text-sm text-gray-400 flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(playlist.duration)}</span>
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className={`p-2 rounded-full transition-all duration-300 ${
            isLiked 
              ? 'text-spotify-green' 
              : 'text-gray-400 hover:text-white'
          } ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Play Button */}
        {showPlayButton && (
          <button
            onClick={handlePlayClick}
            className={`p-2 rounded-full transition-all duration-300 text-gray-400 hover:text-white ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {isCurrentPlaylist && isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
        )}

        {/* More Options */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleContextMenu(e);
          }}
          className={`p-2 rounded-full transition-all duration-300 text-gray-400 hover:text-white ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Context Menu */}
      <ContextMenu
        isOpen={showContextMenu}
        onClose={() => setShowContextMenu(false)}
        position={contextMenuPosition}
        items={contextMenuItems}
      />
    </>
  );
};

export default PlaylistCard;
