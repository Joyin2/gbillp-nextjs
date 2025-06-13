'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    const scrolled = document.documentElement.scrollTop;
    const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrolled / maxHeight) * 100;
    
    setScrollProgress(progress);
    
    if (scrolled > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ 
            duration: 0.3, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50"
        >
          <motion.button
            onClick={scrollToTop}
            className="relative group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            {/* Main button container */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#b2e63a] via-[#1baf0a] to-[#0d5c04]"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              />
              
              {/* Progress ring */}
              <svg 
                className="absolute inset-0 w-full h-full transform -rotate-90" 
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="2"
                  fill="none"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: scrollProgress / 100 }}
                  transition={{ duration: 0.1 }}
                  style={{
                    strokeDasharray: "283", // 2 * π * 45
                    strokeDashoffset: 283 - (283 * scrollProgress) / 100,
                  }}
                />
              </svg>
              
              {/* Arrow icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  initial={{ y: 0 }}
                  animate={{ y: [-2, 2, -2] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </motion.svg>
              </div>
              
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b2e63a] to-[#1baf0a] opacity-0 blur-md"
                whileHover={{ opacity: 0.4 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0"
                whileHover={{
                  opacity: 1,
                  x: ['100%', '-100%'],
                  transition: { duration: 0.6, ease: 'easeInOut' }
                }}
              />
            </div>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.8 }}
              whileHover={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap pointer-events-none hidden sm:block"
            >
              Back to Top
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
