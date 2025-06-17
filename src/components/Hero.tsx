"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { heroVideo } from '@/lib/imageUrls';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface HeroText {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  pageName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const Hero = () => {
  const [videoError, setVideoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroText, setHeroText] = useState<HeroText | null>(null);
  const [heroLoading, setHeroLoading] = useState(true);

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
    fetchHeroText();
  }, []);

  const fetchHeroText = async () => {
    try {
      const heroTextDoc = doc(db, 'heroTexts', 'home');
      const docSnap = await getDoc(heroTextDoc);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setHeroText({
          id: docSnap.id,
          title: data.title || '',
          subtitle: data.subtitle || '',
          description: data.description || '',
          buttonText: data.buttonText || '',
          buttonLink: data.buttonLink || '',
          pageName: data.pageName || '',
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      }
    } catch (error) {
      console.error('Error fetching hero text:', error);
    } finally {
      setHeroLoading(false);
    }
  };

  // Separate effect for video handling after mounting
  useEffect(() => {
    if (!isMounted || videoError) return;

    // Attempt to manually play the video after mounting and DOM is ready
    const timer = setTimeout(() => {
      if (videoRef.current) {
        console.log("Attempting to load video from URL:", heroVideo);

        // Check if video source is valid
        if (!heroVideo) {
          console.error("Video URL is not available");
          setVideoError(true);
          return;
        }

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
        // Video ref is null, but don't log error immediately as DOM might still be rendering
        console.warn("Video element not yet available, will retry...");

        // Retry after a longer delay
        const retryTimer = setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play()
              .then(() => {
                console.log("Video playback started successfully on retry");
                setIsLoaded(true);
              })
              .catch(err => {
                console.error("Error playing video on retry:", err);
                setVideoError(true);
              });
          } else {
            console.error("Video ref is still null after retry, falling back to fallback content");
            setVideoError(true);
          }
        }, 1000);

        return () => clearTimeout(retryTimer);
      }
    }, 500); // Increased delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, [isMounted, videoError, heroVideo]);

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
              onCanPlay={() => {
                console.log("Video can start playing");
                if (videoRef.current) {
                  videoRef.current.play().catch(err => {
                    console.error("Error in onCanPlay:", err);
                    setVideoError(true);
                  });
                }
              }}
              onLoadStart={() => {
                console.log("Video loading started");
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
              {!isMounted ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  <p>Loading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p>Video is currently unavailable</p>
                  <p className="text-sm text-gray-300">Displaying fallback content</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-4xl lg:max-w-5xl text-center w-full mx-auto">
          {heroLoading ? (
            <div className="animate-pulse mb-4 sm:mb-6">
              <div className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 bg-white/20 rounded-lg mb-4"></div>
              <div className="h-6 sm:h-8 bg-white/10 rounded-lg mb-2"></div>
              <div className="h-6 sm:h-8 bg-white/10 rounded-lg"></div>
            </div>
          ) : heroText ? (
            <>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg">
                <span className="block sm:block md:inline mb-2 md:mb-0 md:mr-2">
                  {heroText.title}
                </span>
              </h1>
              {heroText.subtitle && (
                <p className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 leading-relaxed drop-shadow-md px-4 sm:px-0">
                  {heroText.subtitle}
                </p>
              )}
            </>
          ) : null}
        </div>

        {/* Explore Button positioned at bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        </div>
      </div>
    </section>
  );
};

export default Hero;