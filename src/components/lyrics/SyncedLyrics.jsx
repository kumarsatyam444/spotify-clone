import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { seekTo } from '../../store/slices/playerSlice';

const SyncedLyrics = ({ lyrics, currentTime, isFullscreen }) => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    if (!lyrics?.lines) return;

    const currentLineIndex = lyrics.lines.findIndex((line, index) => {
      const nextLine = lyrics.lines[index + 1];
      return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
    });

    if (currentLineIndex !== -1 && currentLineIndex !== activeLine) {
      setActiveLine(currentLineIndex);
      
      // Auto-scroll to active line
      const container = containerRef.current;
      const activeLyricElement = container?.querySelector(`[data-line="${currentLineIndex}"]`);
      
      if (activeLyricElement && container) {
        const containerHeight = container.clientHeight;
        const elementTop = activeLyricElement.offsetTop;
        const elementHeight = activeLyricElement.clientHeight;
        
        container.scrollTo({
          top: elementTop - containerHeight / 2 + elementHeight / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [currentTime, lyrics, activeLine]);

  const handleLineClick = (time) => {
    dispatch(seekTo(time));
  };

  if (!lyrics?.lines) return null;

  return (
    <div
      ref={containerRef}
      className={`h-full overflow-y-auto px-4 py-8 ${
        isFullscreen ? 'px-8 py-12' : ''
      }`}
    >
      <div className="space-y-4">
        {lyrics.lines.map((line, index) => (
          <div
            key={index}
            data-line={index}
            onClick={() => handleLineClick(line.time)}
            className={`cursor-pointer transition-all duration-300 ${
              index === activeLine
                ? 'text-white text-xl font-semibold scale-105'
                : 'text-gray-400 hover:text-gray-300'
            } ${isFullscreen ? 'text-2xl py-2' : 'text-lg py-1'}`}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyncedLyrics;
