import React from 'react';

interface CinematicBackgroundProps {
  className?: string;
  overlayOpacity?: string;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({
  className = '',
  overlayOpacity = 'bg-black/35',
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}>
      {/* Fullscreen Moving Atmospheric Video */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute left-1/2 top-0 h-[120%] w-[120%] -translate-x-1/2 object-cover object-top pointer-events-none"
        onError={(e) => {
          console.error("Cinematic background video failed to load", e);
        }}
      />

      {/* Subtle Transparent Overlay for Readability */}
      <div className={`absolute inset-0 ${overlayOpacity} pointer-events-none`} />
    </div>
  );
};
