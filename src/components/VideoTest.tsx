"use client";

import { useState, useEffect, useRef } from 'react';

const VideoTest = () => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Log when component mounts
    console.log("VideoTest component mounted");
    
    // Attempt to play the video
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          console.log("Video started playing successfully");
          setLoaded(true);
        })
        .catch(err => {
          console.error("Error playing video:", err);
          setError(true);
        });
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      <h1 className="text-2xl font-bold p-4 bg-white text-black relative z-10">
        Video Test Component
      </h1>
      
      <div className="absolute inset-0">
        {error ? (
          <div className="w-full h-full bg-red-500 flex items-center justify-center">
            <p className="text-white text-xl">Error loading video</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            controls
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Video error:", e);
              setError(true);
            }}
            onLoadedData={() => {
              console.log("Video data loaded");
              setLoaded(true);
            }}
          >
            <source src="/videos/hero video.mp4" type="video/mp4" />
            Your browser does not support video playback.
          </video>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 p-4 bg-white text-black z-10">
        Status: {error ? 'Error' : loaded ? 'Loaded' : 'Loading...'}
      </div>
    </div>
  );
};

export default VideoTest; 