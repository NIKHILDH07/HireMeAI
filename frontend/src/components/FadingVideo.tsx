import React, { useRef, useEffect, useState } from 'react';

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  onError?: () => void;
}

export const FadingVideo: React.FC<FadingVideoProps> = ({
  src,
  className = '',
  style,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animFrameId: number;
    const fadeDuration = 0.55; // 0.55s fade out at end

    const handleLoadedData = () => {
      setIsLoaded(true);
      setOpacity(1);
    };

    const updateFade = () => {
      if (video && video.duration && !video.paused) {
        const timeLeft = video.duration - video.currentTime;
        if (timeLeft <= fadeDuration && timeLeft > 0) {
          // Fade out proportionally during the last 0.55 seconds
          const targetOpacity = Math.max(0, timeLeft / fadeDuration);
          setOpacity(targetOpacity);
        } else if (timeLeft > fadeDuration && opacity < 1 && isLoaded) {
          // Fade back in after loop restart
          setOpacity((prev) => Math.min(1, prev + 0.08));
        }
      }
      animFrameId = requestAnimationFrame(updateFade);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    animFrameId = requestAnimationFrame(updateFade);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      cancelAnimationFrame(animFrameId);
    };
  }, [opacity, isLoaded]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      onError={onError}
      className={`transition-opacity duration-300 pointer-events-none object-cover ${className}`}
      style={{
        opacity,
        ...style,
      }}
    />
  );
};
