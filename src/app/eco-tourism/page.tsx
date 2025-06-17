'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, Timestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Fallback eco-village image - using a simple placeholder
const defaultEcoImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOWNhM2FmIj5FY28gVmlsbGFnZTwvdGV4dD48L3N2Zz4=";

// Custom Image component with better error handling
const EcoImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if src is valid before setting it
    if (!src || src.trim() === '' || src === defaultEcoImage) {
      setImgSrc(defaultEcoImage);
      setHasError(true);
      setIsLoading(false);
    } else {
      setImgSrc(src);
      setIsLoading(true);
      setHasError(false);
    }
  }, [src]);

  const handleError = () => {
    // Silently handle the error to avoid console spam
    // console.error('Failed to load image:', src);
    setHasError(true);
    setImgSrc(defaultEcoImage);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      )}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className || ''}`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        onError={handleError}
        onLoad={handleLoad}
        priority={false}
      />
      {hasError && (
        <div className="absolute bottom-2 left-2 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded opacity-75">
          Default image
        </div>
      )}
    </div>
  );
};

interface EcovillagePhoto {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

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



export default function EcoTourismPage() {
  const [ecovillagePhotos, setEcovillagePhotos] = useState<EcovillagePhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroText, setHeroText] = useState<HeroText | null>(null);
  const [heroLoading, setHeroLoading] = useState(true);

  useEffect(() => {
    fetchEcovillagePhotos();
    fetchHeroText();
  }, []);

  const fetchHeroText = async () => {
    try {
      const heroTextDoc = doc(db, 'heroTexts', 'ecovillage');
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

  const fetchEcovillagePhotos = async () => {
    try {
      const ecovillageCollection = collection(db, 'ecovillage');
      const querySnapshot = await getDocs(ecovillageCollection);

      const photosData: EcovillagePhoto[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Validate that we have required fields
        if (data.name && data.imageUrl) {
          console.log('Eco-village photo data:', {
            id: doc.id,
            name: data.name,
            imageUrl: data.imageUrl
          });
          photosData.push({
            id: doc.id,
            name: data.name || 'Eco-Village Photo',
            imageUrl: data.imageUrl || defaultEcoImage,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        } else {
          console.warn('Skipping invalid photo data:', { id: doc.id, data });
        }
      });

      // Sort by creation date (newest first)
      photosData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        return 0;
      });

      setEcovillagePhotos(photosData);
    } catch (error) {
      console.error('Error fetching ecovillage photos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Rice Page Style */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/videoss.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Content - Rice Page Style */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-4xl lg:max-w-5xl text-center w-full mx-auto">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {heroLoading ? (
                <div className="animate-pulse">
                  <div className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 bg-white/20 rounded-lg"></div>
                </div>
              ) : heroText ? (
                <>
                  <motion.span
                    initial={{ letterSpacing: '0.05em' }}
                    animate={{ letterSpacing: ['0.05em', '0.15em', '0.05em'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                    className="hidden md:inline bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent"
                  >
                    {heroText.title}
                  </motion.span>
                  <span className="md:hidden bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent">
                    {heroText.title}
                  </span>
                </>
              ) : (
                <div className="text-white/50">
                  <span className="block">No hero text available</span>
                </div>
              )}
            </motion.h1>
            {heroLoading ? (
              <motion.div
                className="px-4 sm:px-0 mb-8 sm:mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="animate-pulse">
                  <div className="h-6 sm:h-8 bg-white/20 rounded-lg mb-2"></div>
                  <div className="h-6 sm:h-8 bg-white/10 rounded-lg"></div>
                </div>
              </motion.div>
            ) : heroText && heroText.subtitle ? (
              <motion.p
                className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 leading-relaxed drop-shadow-md px-4 sm:px-0 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {heroText.subtitle}
              </motion.p>
            ) : null}
          </div>
        </div>
      </section>

      {/* About Section - Ultra Awesome Style with Brand Colors */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/30 to-white overflow-hidden">
        {/* Ultra Enhanced Background elements with brand colors only */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(178,230,58,0.15),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(27,175,10,0.15),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(178,230,58,0.08),transparent_60%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_70%,rgba(27,175,10,0.08),transparent_70%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(178,230,58,0.05),transparent_80%)] pointer-events-none"></div>

        {/* Animated floating elements with brand colors */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-16 w-6 h-6 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-full opacity-50"
          animate={{
            y: [0, 30, 0],
            x: [0, -10, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-3 h-3 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] rounded-full opacity-70"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-60 left-1/2 w-2 h-2 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-full opacity-40"
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Single Column Layout */}
          <div className="max-w-4xl mx-auto">
            {/* Ultra Awesome Hero Image Section */}
            <motion.div
              className="relative mb-8 sm:mb-12 md:mb-16 lg:mb-20 group"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Glowing background effect with brand colors */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#b2e63a]/20 via-[#1baf0a]/20 to-[#b2e63a]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Main image container with enhanced effects */}
              <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white via-gray-50 to-white p-3 sm:p-4 md:p-6 lg:p-8 transform transition-transform duration-500 group-hover:scale-[1.02]">
                {/* Inner glow effect with brand colors */}
                <div className="absolute inset-3 sm:inset-4 md:inset-6 lg:inset-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#b2e63a]/10 to-[#1baf0a]/10 pointer-events-none"></div>

                <Image
                  src="https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/ecotourism//eco-park-land-all.jpeg"
                  alt="Eco Park Landscape"
                  fill
                  className="object-cover rounded-xl sm:rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 80vw"
                  priority
                />

                {/* Enhanced overlay gradients with brand colors */}
                <div className="absolute inset-3 sm:inset-4 md:inset-6 lg:inset-8 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl sm:rounded-2xl"></div>
                <div className="absolute inset-3 sm:inset-4 md:inset-6 lg:inset-8 bg-gradient-to-br from-[#b2e63a]/10 via-transparent to-[#1baf0a]/10 rounded-xl sm:rounded-2xl"></div>

                {/* Sparkle effects */}
                <motion.div
                  className="absolute top-8 right-8 w-2 h-2 bg-white rounded-full"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="absolute top-16 right-16 w-1.5 h-1.5 bg-yellow-300 rounded-full"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                />
                <motion.div
                  className="absolute bottom-12 left-12 w-2 h-2 bg-[#b2e63a] rounded-full"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
                />
              </div>

              {/* Ultra Enhanced Floating title badge */}
              <motion.div
                className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="bg-gradient-to-r from-white via-gray-50 to-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full shadow-2xl border border-gray-100 backdrop-blur-sm relative overflow-hidden">
                  {/* Animated background shimmer with brand colors */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b2e63a]/20 to-transparent"
                    animate={{ x: [-100, 200] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent whitespace-nowrap relative z-10">
                    Eco Park Landscape
                  </h3>
                </div>
              </motion.div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              className="text-center space-y-6 sm:space-y-8 md:space-y-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Ultra Awesome Main heading */}
              <motion.div
                className="relative mb-6 sm:mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.3 }}
              >
                {/* Glowing background for text with brand colors */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#b2e63a]/20 via-[#1baf0a]/20 to-[#b2e63a]/20 blur-3xl rounded-full"></div>

                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4 relative z-10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent drop-shadow-lg"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    Nurturing Nature,
                  </motion.span>
                  <br className="hidden sm:inline" />
                  <span className="sm:hidden"> </span>
                  <motion.span
                    className="bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] bg-clip-text text-transparent drop-shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    Sustainable Living
                  </motion.span>
                </motion.h2>
              </motion.div>

              {/* Ultra Enhanced Decorative line */}
              <motion.div
                className="flex justify-center mb-8 sm:mb-10 md:mb-12"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, type: "spring", bounce: 0.5 }}
              >
                <div className="relative">
                  {/* Glowing background with brand colors */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#b2e63a]/30 to-[#1baf0a]/30 blur-lg rounded-full"></div>

                  <motion.div
                    className="relative h-2 sm:h-3 rounded-full overflow-hidden bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-lg"
                    initial={{ width: 0 }}
                    whileInView={{ width: "12rem" }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="h-full w-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] relative overflow-hidden"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      style={{ backgroundSize: '200% 200%' }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: [-100, 200] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Decorative dots with brand colors */}
                  <motion.div
                    className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                </div>
              </motion.div>

              {/* Ultra Enhanced Content paragraphs */}
              <div className="space-y-8 sm:space-y-10 md:space-y-12 max-w-4xl mx-auto">
                <motion.div
                  className="group relative"
                  initial={{ opacity: 0, y: 30, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Glowing background effect with brand colors */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#b2e63a]/20 via-[#1baf0a]/20 to-[#b2e63a]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative bg-gradient-to-br from-white/80 via-gray-50/50 to-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-white/30 overflow-hidden">
                    {/* Animated background pattern with brand colors */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      animate={{
                        background: [
                          'radial-gradient(circle at 20% 20%, #b2e63a 0%, transparent 50%)',
                          'radial-gradient(circle at 80% 80%, #1baf0a 0%, transparent 50%)',
                          'radial-gradient(circle at 20% 20%, #b2e63a 0%, transparent 50%)'
                        ]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <motion.div
                        className="flex items-center mb-4 sm:mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] rounded-full flex items-center justify-center mr-3 sm:mr-4">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-sm"></div>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent">
                          Environmental Harmony
                        </h3>
                      </motion.div>

                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
                        Our village is designed to promote environmental awareness and provide a peaceful retreat from urban life. At the heart of our Eco-Village is an emphasis on
                        <motion.span
                          className="bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent font-bold px-1 py-0.5 rounded"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        > organic farming</motion.span>,
                        <motion.span
                          className="bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] bg-clip-text text-transparent font-bold px-1 py-0.5 rounded"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        > renewable energy</motion.span>, and
                        <motion.span
                          className="bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent font-bold px-1 py-0.5 rounded"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        > sustainable architecture</motion.span>.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="group relative"
                  initial={{ opacity: 0, y: 30, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Glowing background effect with brand colors */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#b2e63a]/20 via-[#1baf0a]/20 to-[#b2e63a]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative bg-gradient-to-br from-gray-50/80 via-white/50 to-gray-50/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-gray-200/30 overflow-hidden">
                    {/* Animated background pattern with brand colors */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      animate={{
                        background: [
                          'radial-gradient(circle at 80% 20%, #1baf0a 0%, transparent 50%)',
                          'radial-gradient(circle at 20% 80%, #b2e63a 0%, transparent 50%)',
                          'radial-gradient(circle at 80% 20%, #1baf0a 0%, transparent 50%)'
                        ]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <motion.div
                        className="flex items-center mb-4 sm:mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-full flex items-center justify-center mr-3 sm:mr-4">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full"></div>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] bg-clip-text text-transparent">
                          Sustainable Lifestyle
                        </h3>
                      </motion.div>

                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
                        Residents can enjoy
                        <motion.span
                          className="bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] bg-clip-text text-transparent font-bold px-1 py-0.5 rounded"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        > fresh, locally-grown produce</motion.span>,
                        <motion.span
                          className="bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent font-bold px-1 py-0.5 rounded"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        > solar-powered homes</motion.span>, and buildings constructed with
                        <motion.span
                          className="bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] bg-clip-text text-transparent font-bold px-1 py-0.5 rounded"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        > eco-friendly materials</motion.span>. Our community gardens, composting systems, and recycling initiatives foster a self-sustaining lifestyle.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Ultra Enhanced Call to action button */}
              <motion.div
                className="pt-8 sm:pt-10 md:pt-12"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.3, type: "spring", bounce: 0.4 }}
              >
                <div className="relative group">
                  {/* Glowing background effect with brand colors */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#b2e63a] via-[#1baf0a] to-[#b2e63a] rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                  <motion.button
                    className="relative bg-gradient-to-r from-[#b2e63a] via-[#22c55e] to-[#1baf0a] text-white px-8 sm:px-10 md:px-12 lg:px-16 py-4 sm:py-5 md:py-6 rounded-full font-bold text-sm sm:text-base md:text-lg lg:text-xl shadow-2xl overflow-hidden cursor-pointer"
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      const gallerySection = document.getElementById('gallery');
                      if (gallerySection) {
                        gallerySection.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }}
                  >
                    {/* Animated background shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: [-100, 300] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Button content */}
                    <span className="relative z-10 flex items-center justify-center">
                      <span>Discover Our Eco-Village</span>
                    </span>

                    {/* Sparkle effects */}
                    <motion.div
                      className="absolute top-2 right-4 w-1 h-1 bg-white rounded-full"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="absolute bottom-2 left-6 w-1 h-1 bg-white rounded-full"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute top-3 left-1/3 w-1 h-1 bg-white rounded-full"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eco-Village Photo Gallery Section - Ultra Awesome with Brand Colors */}
      <section id="gallery" className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/30 to-white overflow-hidden">
        {/* Enhanced Background elements with brand colors */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(178,230,58,0.08),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(27,175,10,0.08),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(178,230,58,0.05),transparent_60%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_90%,rgba(27,175,10,0.05),transparent_60%)] pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Ultra Awesome Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            {/* Main Title with Enhanced Effects */}
            <motion.div
              className="relative mb-6 sm:mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.3 }}
            >
              {/* Glowing background for text */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#b2e63a]/20 via-[#1baf0a]/20 to-[#b2e63a]/20 blur-3xl rounded-full"></div>

              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4 relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent drop-shadow-lg"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Our Eco-Village
                </motion.span>
                <br className="hidden sm:inline" />
                <span className="sm:hidden"> </span>
                <motion.span
                  className="bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] bg-clip-text text-transparent drop-shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Gallery
                </motion.span>
              </motion.h2>
            </motion.div>

            {/* Ultra Enhanced Decorative line */}
            <motion.div
              className="flex justify-center mb-8 sm:mb-10 md:mb-12"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.5 }}
            >
              <div className="relative">
                {/* Glowing background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#b2e63a]/30 to-[#1baf0a]/30 blur-lg rounded-full"></div>

                <motion.div
                  className="relative h-2 sm:h-3 rounded-full overflow-hidden bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-lg"
                  initial={{ width: 0 }}
                  whileInView={{ width: "12rem" }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="h-full w-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] relative overflow-hidden"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: [-100, 200] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </motion.div>

                {/* Decorative dots */}
                <motion.div
                  className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>
            </motion.div>

            {/* Enhanced Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base md:text-lg lg:text-xl bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] bg-clip-text text-transparent max-w-xs sm:max-w-md md:max-w-3xl mx-auto px-4 leading-relaxed font-medium"
            >
              Discover the beauty and serenity of our eco-village through these stunning photographs showcasing
              <motion.span
                className="bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent font-bold"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              > sustainable living</motion.span> in harmony with nature.
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-green-500 mx-auto mb-3 sm:mb-4"></div>
              <p className="text-gray-600 text-sm sm:text-base px-4">Loading our eco-village gallery...</p>
            </div>
          ) : ecovillagePhotos.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-600 text-base sm:text-lg px-4">No photos available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {ecovillagePhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  className="group relative w-full"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.3 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Enhanced Glowing background effect for all devices */}
                  <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-[#b2e63a]/15 via-[#1baf0a]/15 to-[#b2e63a]/15 rounded-2xl sm:rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative bg-white rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-100 transform transition-all duration-500">
                    {/* Responsive Image Container - Shorter Heights */}
                    <div className="relative w-full overflow-hidden">
                      {/* Optimized shorter height classes */}
                      <div className="h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 relative">
                        <EcoImage
                          src={photo.imageUrl || defaultEcoImage}
                          alt={photo.name}
                          className="transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Brand color overlay gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1baf0a]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#b2e63a]/8 via-transparent to-[#1baf0a]/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Responsive sparkle effects - hidden on mobile for performance */}
                        <div className="hidden sm:block">
                          <motion.div
                            className="absolute top-3 right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-0 group-hover:opacity-100"
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="absolute top-6 right-6 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#b2e63a] rounded-full opacity-0 group-hover:opacity-100"
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                          />
                          <motion.div
                            className="absolute bottom-4 left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1baf0a] rounded-full opacity-0 group-hover:opacity-100"
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Content Section - Compact & Responsive */}
                    <div className="p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 relative overflow-hidden">
                      {/* Subtle animated background pattern - reduced on mobile */}
                      <motion.div
                        className="absolute inset-0 opacity-3 sm:opacity-5"
                        animate={{
                          background: [
                            'radial-gradient(circle at 20% 20%, #b2e63a 0%, transparent 50%)',
                            'radial-gradient(circle at 80% 80%, #1baf0a 0%, transparent 50%)',
                            'radial-gradient(circle at 20% 20%, #b2e63a 0%, transparent 50%)'
                          ]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      />

                      <div className="relative z-10">
                        <motion.h3
                          className="text-sm xs:text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 md:mb-3 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent leading-tight"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          {photo.name}
                        </motion.h3>
                        <p className="bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] bg-clip-text text-transparent text-xs xs:text-sm leading-relaxed font-medium">
                          {photo.createdAt?.toDate ? new Date(photo.createdAt.toDate()).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'Eco-Village Experience'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>



      {/* Ultra Awesome Call to Action with Brand Colors */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-r from-[#1baf0a] to-[#b2e63a] text-white overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none"></div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-10 left-10 w-3 h-3 bg-white/30 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-4 h-4 bg-white/20 rounded-full"
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            className="relative mb-6 sm:mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.3 }}
          >
            {/* Glowing background for text */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 blur-3xl rounded-full"></div>

            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4 relative z-10 text-white"
              style={{
                color: 'white',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                WebkitTextFillColor: 'white',
                backgroundImage: 'none'
              }}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Experience Sustainable Living
            </motion.h2>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join us at Lakhicheera Eco-Village for an unforgettable journey into sustainable living and natural harmony.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="bg-white text-emerald-700 hover:bg-gray-100 py-2.5 px-6 sm:py-3 sm:px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-0.5 shadow-lg uppercase text-sm sm:text-base"
            >
              Contact Us
            </Link>
            <Link
              href="/products"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-2.5 px-6 sm:py-3 sm:px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-0.5 uppercase text-sm sm:text-base"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 