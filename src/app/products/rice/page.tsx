'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Fallback rice image - using a simple placeholder
const defaultRiceImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOWNhM2FmIj5SaWNlIFByb2R1Y3Q8L3RleHQ+PC9zdmc+";

// Custom Image component with better error handling
const RiceImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    console.error('Failed to load image:', src);
    setHasError(true);
    setImgSrc(defaultRiceImage);
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
        <div className="absolute bottom-2 left-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
          Image failed to load
        </div>
      )}
    </div>
  );
};

interface RiceProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  featured: boolean;
  price: number | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  createdByEmail: string;
}



export default function RicePage() {
  const [riceProducts, setRiceProducts] = useState<RiceProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiceProducts();
  }, []);

  const fetchRiceProducts = async () => {
    try {
      const riceProductsCollection = collection(db, 'riceProducts');
      const querySnapshot = await getDocs(riceProductsCollection);

      const riceProductsData: RiceProduct[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Rice product data:', {
          id: doc.id,
          name: data.name,
          imageUrl: data.imageUrl,
          featured: data.featured
        });
        riceProductsData.push({
          id: doc.id,
          name: data.name,
          description: data.description,
          imageUrl: data.imageUrl,
          featured: data.featured,
          price: data.price,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          createdBy: data.createdBy,
          createdByEmail: data.createdByEmail,
        });
      });

      // Sort by creation date (newest first)
      riceProductsData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        return 0;
      });

      setRiceProducts(riceProductsData);
    } catch (error) {
      console.error('Error fetching rice products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Home Page Style */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        {/* Animated rice/sparkle gradient background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ background: 'linear-gradient(135deg, #fffbe6 0%, #ffe066 100%)' }}
          animate={{ background: [
            'linear-gradient(135deg, #fffbe6 0%, #ffe066 100%)',
            'linear-gradient(135deg, #ffe066 0%, #fffbe6 100%)',
            'linear-gradient(135deg, #fffbe6 0%, #ffe066 100%)'
          ] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Responsive Animated falling rice and sparkles */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute left-1/4 top-1/3 text-6xl"
            animate={{ y: [0, 60, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          >🍚</motion.div>
          <motion.div
            className="absolute right-1/4 top-1/4 text-5xl"
            animate={{ y: [0, 80, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >✨</motion.div>
          <motion.div
            className="absolute left-1/3 bottom-1/4 text-7xl"
            animate={{ y: [0, 100, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >🍚</motion.div>
          <motion.div
            className="absolute right-1/2 bottom-1/3 text-6xl"
            animate={{ y: [0, 90, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >✨</motion.div>
        </motion.div>

        {/* Hero Content - Home Page Style */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-4xl lg:max-w-5xl text-center w-full mx-auto">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-yellow-800 drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                initial={{ letterSpacing: '0.05em' }}
                animate={{ letterSpacing: ['0.05em', '0.15em', '0.05em'] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                className="hidden md:inline"
              >Aromatic Rice</motion.span>
              <span className="md:hidden">Aromatic Rice</span>
            </motion.h1>
            <motion.p
              className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 leading-relaxed drop-shadow-md px-4 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A Collection of Premium Aromatic Rice Varieties
            </motion.p>
          </div>
        </div>
      </section>

      {/* Rice Varieties Section - Home Page Style */}
      <section id="varieties" className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/30 to-emerald-50/50 overflow-hidden">
        {/* Background elements like home page */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(178,230,58,0.05),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(27,175,10,0.05),transparent_50%)] pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with home page animations */}
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
              Our Premium Rice Collection
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
              From aromatic basmati to traditional sticky rice, each variety in our collection brings its unique character to your table.
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-green-500 mx-auto mb-3 sm:mb-4"></div>
              <p className="text-gray-600 text-sm sm:text-base px-4">Loading our premium rice collection...</p>
            </div>
          ) : riceProducts.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-600 text-base sm:text-lg px-4">No rice products available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {riceProducts.map((rice, index) => (
                <motion.div
                  key={rice.id}
                  className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[400px] w-full">
                    <RiceImage
                      src={rice.imageUrl || defaultRiceImage}
                      alt={rice.name}
                    />
                    {rice.featured && (
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{rice.name}</h3>
                    <div
                      className="text-gray-600 product-description text-sm sm:text-base leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: rice.description }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mobile-Optimized Call to Action */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-green-800 to-emerald-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Experience Premium Quality
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Elevate your culinary experience with our premium selection of aromatic rice varieties, each bringing its unique character to your table.
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