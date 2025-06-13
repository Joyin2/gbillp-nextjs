"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const products = [
  {
    id: 1,
    name: "Pickle",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/pickle.png",
    description: "Traditional and authentic pickles made with local ingredients.",
    link: "/products/pickle"
  },
  {
    id: 2,
    name: "Rice",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/rice.png",
    description: "Premium quality rice varieties from local farmers.",
    link: "/products/rice"
  },
  {
    id: 3,
    name: "Dry Bean (Forash)",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/dry%20beans.png",
    description: "High-quality dried beans for various culinary uses.",
    link: "/products/dry-bean"
  },
  {
    id: 4,
    name: "Dry Hathkora",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/haatkora.png",
    description: "Traditional dried hathkora for authentic flavors.",
    link: "/products/dry-hathkora"
  },
  {
    id: 5,
    name: "Tezpatta",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/tezpatta.png",
    description: "Premium quality tezpatta for enhanced flavors.",
    link: "/products/tezpatta"
  },
  {
    id: 6,
    name: "Decorative Handicraft",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/art%20&%20craft.png",
    description: "Beautiful handcrafted decorative items.",
    link: "/products/handicraft"
  },
  {
    id: 7,
    name: "Lemon & Orange Plantation",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/orange.png",
    description: "Fresh, sustainably grown citrus fruits from our local plantations, cultivated with care and expertise.",
    link: "/products/plantation"
  }
];

const ProductsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12
      }
    }
  };

  // Enhanced hover animation for product cards
  const cardHoverVariants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: "0px 8px 25px rgba(27, 175, 10, 0.08)",
      borderColor: "rgba(178, 230, 58, 0.1)"
    },
    hover: {
      scale: 1.02,
      y: -8,
      boxShadow: "0px 20px 40px rgba(27, 175, 10, 0.15)",
      borderColor: "rgba(178, 230, 58, 0.3)",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Enhanced image hover animation
  const imageHoverVariants = {
    rest: {
      scale: 1,
      filter: "brightness(1) saturate(1)"
    },
    hover: {
      scale: 1.1,
      filter: "brightness(1.1) saturate(1.2)",
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // New overlay animation
  const overlayVariants = {
    rest: {
      opacity: 0,
      background: "linear-gradient(135deg, rgba(178, 230, 58, 0.1), rgba(27, 175, 10, 0.1))"
    },
    hover: {
      opacity: 1,
      background: "linear-gradient(135deg, rgba(178, 230, 58, 0.2), rgba(27, 175, 10, 0.2))",
      transition: { duration: 0.3 }
    }
  };

  // Enhanced button hover animation
  const buttonHoverVariants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: "0px 4px 15px rgba(27, 175, 10, 0.2)",
      background: "linear-gradient(135deg, #b2e63a, #1baf0a)"
    },
    hover: {
      scale: 1.08,
      y: -2,
      boxShadow: "0px 8px 25px rgba(27, 175, 10, 0.4)",
      background: "linear-gradient(135deg, #1baf0a, #0d5c04)",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Button icon animation
  const iconVariants = {
    rest: { x: 0, rotate: 0 },
    hover: {
      x: 3,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/30 to-emerald-50/50 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(178,230,58,0.05),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(27,175,10,0.05),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        {/* Header with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4"
          >
            We Brought To You
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="h-1 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden bg-gray-200"
          >
            <div className="h-full w-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a]"></div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4"
          >
            Discover our range of sustainable, eco-friendly products crafted with care for both you and the environment.
          </motion.p>
        </motion.div>

        {/* Enhanced product grid with awesome responsive design */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-8 xl:gap-10 auto-rows-fr"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="relative w-full group"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <Link href={product.link} className="block h-full">
                <motion.div
                  variants={cardHoverVariants}
                  className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100/50 h-full flex flex-col transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))"
                  }}
                >
                  {/* Animated border gradient */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-br from-[#b2e63a]/20 via-transparent to-[#1baf0a]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="h-full w-full rounded-2xl sm:rounded-3xl bg-white/90"></div>
                  </div>

                  {/* Product image with optimized height and enhanced hover animation */}
                  <div className="relative aspect-[4/3] sm:aspect-[5/4] md:aspect-[4/3] lg:aspect-[5/4] xl:aspect-[4/3] w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                    <motion.div
                      variants={imageHoverVariants}
                      className="h-full w-full relative"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 33vw, 25vw"
                        className="object-cover transition-all duration-500"
                        priority={index < 4}
                      />

                      {/* Gradient overlay */}
                      <motion.div
                        variants={overlayVariants}
                        className="absolute inset-0 rounded-t-2xl sm:rounded-t-3xl"
                      />

                      {/* Floating badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                        className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 shadow-lg"
                      >
                        <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent">
                          Premium
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Enhanced content section */}
                  <div className="relative p-4 sm:p-5 md:p-6 lg:p-7 flex-1 flex flex-col z-10">
                    {/* Title with permanent gradient effect */}
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold mb-3 line-clamp-2 bg-gradient-to-r from-[#1baf0a] to-[#0d5c04] bg-clip-text text-transparent"
                    >
                      {product.name}
                    </motion.h3>

                    {/* Description with enhanced styling */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="text-gray-600 group-hover:text-gray-700 mb-4 sm:mb-5 text-sm sm:text-base md:text-base line-clamp-2 sm:line-clamp-3 flex-1 leading-relaxed transition-colors duration-300"
                    >
                      {product.description}
                    </motion.p>

                    {/* Super attractive action button */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex justify-start items-center mt-auto pt-2"
                    >
                      {/* Ultra attractive gradient button */}
                      <motion.button
                        variants={buttonHoverVariants}
                        className="relative overflow-hidden rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 text-white font-bold text-sm sm:text-base shadow-lg cursor-pointer border-0 outline-none"
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                        initial="rest"
                      >
                        {/* Animated background gradient */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#b2e63a] via-[#1baf0a] to-[#0d5c04] opacity-100"
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

                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                          initial={{ x: '-100%' }}
                          whileHover={{
                            x: '100%',
                            transition: { duration: 0.6, ease: 'easeInOut' }
                          }}
                        />

                        {/* Button content */}
                        <motion.div
                          className="relative z-10 flex items-center space-x-2"
                        >
                          <span className="hidden sm:inline font-semibold tracking-wide">EXPLORE NOW</span>
                          <span className="sm:hidden font-semibold tracking-wide">VIEW</span>

                          {/* Animated icon */}
                          <motion.div
                            variants={iconVariants}
                            className="flex items-center justify-center"
                          >
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </motion.div>
                        </motion.div>

                        {/* Glow effect */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] opacity-0 blur-md"
                          whileHover={{ opacity: 0.4 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced floating decorative elements */}
        <motion.div
          className="absolute -z-10 top-10 sm:top-20 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-[#b2e63a]/10 to-[#1baf0a]/5 hidden sm:block blur-3xl"
          initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
          animate={{
            scale: [0.8, 1.2, 1],
            opacity: [0, 0.7, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -z-10 bottom-10 sm:bottom-20 left-2 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#1baf0a]/8 to-[#b2e63a]/5 hidden sm:block blur-2xl"
          initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
          animate={{
            scale: [0.8, 1.1, 0.9, 1],
            opacity: [0, 0.6, 0.4, 0.5],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        />

        {/* Additional floating particles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#b2e63a] rounded-full hidden lg:block"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-[#1baf0a] rounded-full hidden lg:block"
          animate={{
            y: [0, 15, 0],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </section>
  );
};

export default ProductsSection;