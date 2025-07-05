🎵 Spotify Clone

A modern, feature-rich Spotify clone built with React, Redux Toolkit, and Tailwind CSS. This project replicates the core functionality and design of Spotify's web application with a focus on user experience and performance.


🌟 Features

🎶 Core Music Features

Music Player: Full-featured player with play/pause, skip, shuffle, and repeat
Queue Management: Add, remove, and reorder tracks in the queue
Volume Control: Adjustable volume with mute functionality
Progress Control: Seek to any position in the track
Crossfade: Smooth transitions between tracks

🔍 Discovery & Search

Advanced Search: Search for tracks, artists, albums, and playlists
Real-time Results: Instant search results as you type
Search Filters: Filter results by type, genre, and more
Browse Categories: Explore music by mood, genre, and activity
Trending Content: Discover what's popular right now

📚 Library Management

Personal Library: Organize your saved music and playlists
Playlist Creation: Create and customize your own playlists
Liked Songs: Save your favorite tracks
Recently Played: Quick access to your listening history
Library Filters: Sort and filter your collection

👤 User Experience

User Profiles: Personalized user profiles with stats
Social Features: Follow artists and friends
Responsive Design: Optimized for desktop, tablet, and mobile
Dark/Light Theme: Toggle between themes
Keyboard Shortcuts: Navigate efficiently with hotkeys

🎨 UI/UX Features

Modern Interface: Clean, intuitive design inspired by Spotify
Smooth Animations: Fluid transitions and micro-interactions
Loading States: Skeleton screens and loading indicators
Error Handling: Graceful error boundaries and user feedback
Accessibility: WCAG compliant with screen reader support

🛠️ Tech Stack

Frontend
React 19.1.0 - UI library with latest features
Redux Toolkit - State management
React Router DOM - Client-side routing
Tailwind CSS - Utility-first CSS framework
Framer Motion - Animation library
Lucide React - Beautiful icons

Development Tools

Create React App - Build toolchain
PostCSS - CSS processing
Autoprefixer - CSS vendor prefixes

Additional Libraries

React Hot Toast - Toast notifications
React Beautiful DnD - Drag and drop functionality
Axios - HTTP client


## Keyboard Shortcuts

- `Space` - Play/Pause
- `Ctrl/Cmd + →` - Next track
- `Ctrl/Cmd + ←` - Previous track
- `Ctrl/Cmd + ↑` - Volume up
- `Ctrl/Cmd + ↓` - Volume down
- `Ctrl/Cmd + K` - Focus search

Features Guide

Creating Playlists

Navigate to "Your Library"
Click "Create Playlist"
Add a name and description
Start adding songs!

Using Search

Click the search bar or press Ctrl/Cmd + K
Type your query
Use filters to narrow results
Click on any result to play or view details

Managing Queue

Click the queue icon in the player
Drag and drop to reorder
Remove tracks with the X button
Add tracks from any page using the "+" button

🔧 Configuration

Spotify API Setup
Create a Spotify App

Go to Spotify Developer Dashboard
Create a new app
Note your Client ID and Client Secret
Configure Redirect URIs

Add http://localhost:3000/callback for development
Add your production URL for deployment

Set Environment Variables

REACT_APP_SPOTIFY_CLIENT_ID=your_client_id_here

REACT_APP_SPOTIFY_CLIENT_SECRET=your_client_secret_here

REACT_APP_REDIRECT_URI=http://localhost:3000/callback

🙏 Acknowledgments

Spotify for the amazing design inspiration
React Team for the incredible framework
Redux Team for excellent state management
Tailwind CSS for the utility-first approach
Open Source Community for the amazing libraries
Contributors who help improve this project


Made with ❤️ by Kumar Satyam

If you found this project helpful, please consider giving it a ⭐!