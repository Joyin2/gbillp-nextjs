"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { heroVideo } from '@/lib/imageUrls';

const Hero = () => {
  const [videoError, setVideoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video loading error
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = e.target as HTMLVideoElement;
    console.error("Video error occurred:", {
      error: videoElement.error,
      networkState: videoElement.networkState,
      readyState: videoElement.readyState,
      src: videoElement.currentSrc
    });
    setVideoError(true);
  };

  useEffect(() => {
    setIsMounted(true);

    // Attempt to manually play the video after mounting
    const timer = setTimeout(() => {
      if (videoRef.current) {
        console.log("Attempting to load video from URL:", heroVideo);
        // Force load before play
        videoRef.current.load();

        videoRef.current.play()
          .then(() => {
            console.log("Video playback started successfully");
            setIsLoaded(true);
          })
          .catch(err => {
            console.error("Error playing video:", err);
            setVideoError(true);
          });
      } else {
        console.error("Video ref is null");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {isMounted && !videoError ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onError={handleVideoError}
              onLoadedData={() => {
                console.log("Video data loaded successfully");
                setIsLoaded(true);
              }}
              className="absolute inset-0 min-w-full min-h-full object-cover w-full h-full z-0"
            >
              <source src={heroVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-700 w-full h-full z-0">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <p>Video is currently unavailable</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-4xl lg:max-w-5xl text-center w-full mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg">
            <span className="block sm:block md:inline mb-2 md:mb-0 md:mr-2">
              Transforming local agri-products
            </span>
            <br className="hidden sm:block" />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl" style={{
              background: "linear-gradient(45deg, #b2e63a, #31cc20, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
              for the global market.
            </span>
          </h1>
          <p className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 leading-relaxed drop-shadow-md px-4 sm:px-0">
            We brand premium agro products, crafted with care, into global market sensations.
            Sustainable, eco-friendly treasures enhance lives, empower rural communities, and nurture a greener future.
          </p>
        </div>

        {/* Explore Button positioned at bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        </div>
      </div>
    </section>
  );
};

export default Hero;