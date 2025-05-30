"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import pickle from "../images/products/pickle.png";
import rice from "../images/products/rice.png";
import drybean from "../images/products/dry beans.png";
import orange from "../images/products/orange.png";
import dryhathkora from "../images/products/haatkora.png";
import tezpatta from "../images/products/tezpatta.png";
import handicraft from "../images/products/art & craft.png";

// Array of images for the animation
const images = [
  { src: pickle, alt: "Organic Pickle", id: 1 },
  { src: rice, alt: "Premium Rice", id: 2 },
  { src: drybean, alt: "Dry Bean", id: 3 },
  { src: orange, alt: "Orange", id: 4 },
  { src: dryhathkora, alt: "Dry Hathkora", id: 5 },
  { src: tezpatta, alt: "Tezpatta", id: 6 },
  { src: handicraft, alt: "Handicraft", id: 7 },
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
      repeatType: "reverse"
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">KNOW US BETTER</h2>
          <div className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 w-24">
            <div className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-12 items-center">
          {/* Image Section with Amazing Animation */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="rounded-lg overflow-hidden shadow-lg h-96 bg-gradient-to-br from-emerald-50 to-teal-50 relative">
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-10 left-10 w-20 h-20 rounded-full bg-emerald-500/10 z-0"
                variants={decorVariants}
                initial="initial"
                animate="animate"
              />
              <motion.div 
                className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-teal-500/10 z-0"
                variants={decorVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 1 }}
              />
              <motion.div 
                className="absolute top-1/2 right-10 w-16 h-16 rounded-full bg-green-500/10 z-0"
                variants={decorVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 2 }}
              />
              
              {/* Main image carousel */}
              <div className="relative h-full w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    className="absolute inset-0 flex items-center justify-center p-6"
                    variants={imageVariants[currentVariantIndex]}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="relative w-full h-full max-w-sm mx-auto">
                      <Image 
                        src={images[currentImageIndex].src}
                        alt={images[currentImageIndex].alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={currentImageIndex === 0}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Animated indicator dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {images.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 w-2 rounded-full ${
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

          {/* Text Section */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">EMPOWERING COMMUNITIES FOR A GREENER FUTURE</h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Green Business Initiative LLP is committed to fostering sustainable agriculture, empowering local farmers, and promoting eco-friendly Products. Join us in shaping a greener, more prosperous future for all.
            </p>
            <Link 
              href="/about" 
              className="inline-block button-gradient text-white py-3 px-8 rounded-full font-medium hover:bg-green-700 transition duration-300"
            >
              Discover More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;