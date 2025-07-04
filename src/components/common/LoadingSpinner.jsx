import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizeClasses[size]} 
          border-4 border-gray-300 border-t-spotify-green 
          rounded-full animate-spin
        `}
      />
    </div>
  );
};

export const LoadingSkeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-700 rounded ${className}`} />
);

export const TrackSkeleton = () => (
  <div className="flex items-center space-x-4 p-4">
    <LoadingSkeleton className="w-12 h-12 rounded" />
    <div className="flex-1 space-y-2">
      <LoadingSkeleton className="h-4 w-3/4" />
      <LoadingSkeleton className="h-3 w-1/2" />
    </div>
    <LoadingSkeleton className="h-4 w-12" />
  </div>
);

export const PlaylistSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-center space-x-4">
      <LoadingSkeleton className="w-48 h-48 rounded-lg" />
      <div className="space-y-4">
        <LoadingSkeleton className="h-8 w-64" />
        <LoadingSkeleton className="h-4 w-32" />
        <LoadingSkeleton className="h-4 w-48" />
      </div>
    </div>
    <div className="space-y-2">
      {[...Array(10)].map((_, i) => (
        <TrackSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default LoadingSpinner;
