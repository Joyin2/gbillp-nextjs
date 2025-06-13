"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Array of images for the animation
const images = [
  { 
    src: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/pickle.png", 
    alt: "Pickle", 
    id: 1 
  },
  { 
    src: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/rice.png", 
    alt: "Rice", 
    id: 2 
  },
  { 
    src: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/dry%20beans.png", 
    alt: "Dry Bean", 
    id: 3 
  },
  { 
    src: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/orange.png", 
    alt: "Orange", 
    id: 4 
  },
  { 
    src: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/haatkora.png", 
    alt: "Dry Hathkora", 
    id: 5 
  },
  { 
    src: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/tezpatta.png", 
    alt: "Tez Patta", 
    id: 6 
  },
  { 
    src: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/art%20&%20craft.png", 
    alt: "Handicraft", 
    id: 7 
  },
];

// Animation variants for different effects
const imageVariants = [
  {
    hidden: { opacity: 0, scale: 0.8, rotate: -10, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      rotate: 10, 
      y: -50,
      transition: { 
        duration: 0.5, 
        ease: "easeIn" 
      }
    }
  },
  {
    hidden: { opacity: 0, x: -100, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      x: 100, 
      scale: 0.9,
      transition: { 
        duration: 0.5, 
        ease: "easeIn" 
      }
    }
  },
  {
    hidden: { opacity: 0, scale: 1.2, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.9, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.7, 
      filter: "blur(10px)",
      transition: { 
        duration: 0.6, 
        ease: "easeIn" 
      }
    }
  }
];

// Decorative elements variants
const decorVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { 
    opacity: [0.2, 0.4, 0.2], 
    scale: 1,
    transition: { 
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};

const AboutSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  
  // Auto-rotate images
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    
    return () => clearInterval(imageInterval);
  }, []);
  
  // Auto-rotate animation variants
  useEffect(() => {
    const variantInterval = setInterval(() => {
      setCurrentVariantIndex((prevIndex) => (prevIndex + 1) % imageVariants.length);
    }, 9000); // Change animation style every 9 seconds (after 3 image cycles)
    
    return () => clearInterval(variantInterval);
  }, []);

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4">Know Us Better</h2>
          <div className="h-1 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden bg-gray-200 w-16 sm:w-20 md:w-24">
            <div className="h-full w-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a]"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-8 xl:space-x-12 items-center gap-6 sm:gap-8 md:gap-10 lg:gap-0">
          {/* Image Section with Amazing Animation */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg h-64 sm:h-80 md:h-96 lg:h-80 xl:h-96 bg-gradient-to-br from-emerald-50 to-teal-50 relative mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none">
              {/* Responsive decorative elements */}
              <motion.div
                className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-emerald-500/10 z-0 hidden sm:block"
                variants={decorVariants}
                initial="initial"
                animate="animate"
              />
              <motion.div
                className="absolute bottom-4 sm:bottom-6 md:bottom-10 right-4 sm:right-6 md:right-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-teal-500/10 z-0 hidden sm:block"
                variants={decorVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 1 }}
              />
              <motion.div
                className="absolute top-1/2 right-4 sm:right-6 md:right-10 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-green-500/10 z-0 hidden md:block"
                variants={decorVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 2 }}
              />
              
              {/* Responsive main image carousel */}
              <div className="relative h-full w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 md:p-6"
                    variants={imageVariants[currentVariantIndex]}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="relative w-full h-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-md mx-auto">
                      <Image
                        src={images[currentImageIndex].src}
                        alt={images[currentImageIndex].alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 480px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 45vw, 40vw"
                        priority={currentImageIndex === 0}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Responsive animated indicator dots */}
              <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-0 right-0 flex justify-center space-x-1 sm:space-x-2">
                {images.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${
                      index === currentImageIndex ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                    animate={{
                      scale: index === currentImageIndex ? [1, 1.3, 1] : 1,
                      opacity: index === currentImageIndex ? 1 : 0.5,
                    }}
                    transition={{
                      duration: 1,
                      repeat: index === currentImageIndex ? Infinity : 0,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Responsive Text Section */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 md:mb-6 px-4 lg:px-0">Empowering Communities For A Greener Future</h3>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg mb-4 sm:mb-6 md:mb-8 leading-relaxed px-4 lg:px-0 max-w-2xl mx-auto lg:mx-0">
              Green Business Initiative LLP is committed to fostering sustainable agriculture, empowering local farmers, and promoting eco-friendly Products. Join us in shaping a greener, more prosperous future for all.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link
                href="/about"
                className="inline-block button-gradient text-white py-2.5 sm:py-3 md:py-3.5 px-6 sm:px-8 md:px-10 rounded-full font-medium text-sm sm:text-base hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="hidden sm:inline">Discover More</span>
                <span className="sm:hidden">Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;