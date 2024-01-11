import React from 'react';
import { useSpring, animated } from '@react-spring/web';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const props = useSpring({ height: `${progress}%`, from: { height: '0%' } });

  return (
    <div style={{
        width: '30px',
        height: '100%',
        backgroundColor: '#ddd',
        borderRadius: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        position: 'relative' // To position text inside
      }}>
      <animated.div
        style={{
          ...props,
          width: '30px',
          background: 'linear-gradient(to top, #957DAD, #D291BC)', // Lavender gradient
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column-reverse',
          alignItems: 'center',
          color: 'white'
        }}
      ></animated.div>
      {/* Text positioned at the top of the bar */}
      <div style={{
          position: 'absolute',
          top: '5px', // Slight offset from top
          width: '100%',
          textAlign: 'center',
          fontSize: '12px', // Smaller text size
        }}>
        {progress.toFixed(0)}%
      </div>
    </div>
  );
}

export default ProgressBar;
