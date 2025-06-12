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
      <div className="container mx-auto px-4 relative z-10 flex justify-center items-center">
        <div className="max-w-4xl lg:max-w-5xl text-center w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            <span className="block md:inline mb-2 md:mb-0 md:mr-2">
            Transforming local agri-products
            </span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl" style={{
              background: "linear-gradient(45deg, #d6ff76, #31cc20, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
             for the global market.
            </span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed drop-shadow-md">
          We brand premium agro products, crafted with care, into global market sensations.
          Sustainable, eco-friendly treasures enhance lives, empower rural communities, and nurture a greener future.
          </p>
          <div className="flex justify-center">
            <Link href="/about" className="inline-block button-gradient text-white py-3 px-8 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/20 transform hover:-translate-y-1">
              Discover More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;