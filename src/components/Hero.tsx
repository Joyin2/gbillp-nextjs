"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
// import herovideo from "../videos/herovideo.mp4";

const Hero = () => {
  const [videoError, setVideoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video loading error
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Video error occurred:", e);
    setVideoError(true);
  };

  useEffect(() => {
    setIsMounted(true);

    // Attempt to manually play the video after mounting
    const timer = setTimeout(() => {
      if (videoRef.current) {
        console.log("Attempting to load video");
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
              {/* Using the correct file path with space */}
              <source src="/videos/herovideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Removed the black overlay completely */}
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
      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            <span className="block mb-2">
              Green Business Initiative LLP
            </span>
            <span className="text-green-400 text-3xl md:text-4xl lg:text-5xl">
              Leap Towards Sustainability
            </span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed">
            GBI empowers rural communities, promoting a sustainable, nature-friendly world with reliable eco-products for a greener, higher quality of life.
          </p>
          <div>
            <Link href="/about" className="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/20 transform hover:-translate-y-1">
              Discover More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;