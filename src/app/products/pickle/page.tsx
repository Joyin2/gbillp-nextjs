'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Import pickle images from Supabase (fallback images)
const boromar = "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/gbi//boromar.png";

interface Product {
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

// Helper function to extract features from HTML description
const extractFeaturesFromDescription = (htmlDescription: string): string[] => {
  // Extract list items from HTML
  const listItemRegex = /<li><p>(.*?)<\/p><\/li>/g;
  const features: string[] = [];
  let match;

  while ((match = listItemRegex.exec(htmlDescription)) !== null) {
    features.push(match[1]);
  }

  // If no list items found, return some default features
  if (features.length === 0) {
    return [
      "Made with finest ingredients",
      "Traditional preparation methods",
      "Authentic taste and quality",
      "Perfect for any meal",
      "Natural and preservative-free"
    ];
  }

  return features;
};

export default function PicklesPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const querySnapshot = await getDocs(productsCollection);

      const productsData: Product[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        productsData.push({
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
      productsData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        return 0;
      });

      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Fully Responsive Hero Section - Home Page Style */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        {/* Animated pickle gradient background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ background: 'linear-gradient(135deg, #b2f7ef 0%, #f7d6e0 50%, #ffe066 100%)' }}
          animate={{ background: [
            'linear-gradient(135deg, #b2f7ef 0%, #f7d6e0 50%, #ffe066 100%)',
            'linear-gradient(135deg, #ffe066 0%, #b2f7ef 50%, #f7d6e0 100%)',
            'linear-gradient(135deg, #f7d6e0 0%, #ffe066 50%, #b2f7ef 100%)',
            'linear-gradient(135deg, #b2f7ef 0%, #f7d6e0 50%, #ffe066 100%)'
          ] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Responsive Animated elements - Hidden on mobile and tablet for better performance */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none hidden xl:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute left-1/4 top-1/4 w-14 h-14 xl:w-16 xl:h-16 bg-amber-500/25 rounded-full flex items-center justify-center"
            animate={{ y: [0, -25, 0, 25, 0], rotate: [0, 8, -8, 0, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-7 h-7 xl:w-8 xl:h-8 premium-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </motion.div>
          <motion.div
            className="absolute right-1/4 top-1/3 w-12 h-12 xl:w-14 xl:h-14 bg-red-500/25 rounded-full flex items-center justify-center"
            animate={{ rotate: [0, 270, 0], y: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            <svg className="w-6 h-6 xl:w-7 xl:h-7 premium-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </motion.div>
          <motion.div
            className="absolute left-1/3 bottom-1/4 w-16 h-16 xl:w-18 xl:h-18 bg-green-500/25 rounded-full flex items-center justify-center"
            animate={{ y: [0, 30, 0], rotate: [0, 12, -12, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <svg className="w-8 h-8 xl:w-9 xl:h-9 premium-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Responsive Overlay */}
        <div className="absolute inset-0 bg-black/30 sm:bg-black/35 md:bg-black/40" />

        {/* Hero Content - Home Page Style */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-4xl lg:max-w-5xl text-center w-full mx-auto -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 xl:-mt-24">
            {/* Hero Media Section - Supports both Images and Videos */}
            <motion.div
              className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-gray-100">
                {/* Check if the hero image is a video file */}
                {boromar.match(/\.(mp4|webm|ogg|avi|mov)(\?.*)?$/i) ? (
                  <video
                    src={boromar}
                    className="object-contain w-full h-auto"
                    controls
                    preload="metadata"
                    onError={() => {
                      console.log('Hero video failed to load:', boromar);
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={boromar}
                    alt="Premium Pickles"
                    width={800}
                    height={600}
                    className="object-contain w-full h-auto"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
                    priority
                    onError={() => {
                      console.log('Hero image failed to load:', boromar);
                    }}
                  />
                )}
              </div>
            </motion.div>

            {/* Content Section - Moved Further Upwards */}
            <motion.div
              className="space-y-4 sm:space-y-6 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 xl:-mt-24"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="space-y-4 sm:space-y-6">
                <p className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-md px-4 sm:px-0">
                  Our range of products embodies the essence of freshness and authenticity. From our tangy and flavorful pickles made with hand-picked ingredients to our crisp and aromatic fresh ginger and garlic, each item is carefully selected and crafted to deliver unparalleled taste and quality.
                </p>
                <p className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-md px-4 sm:px-0">
                  With a commitment to sourcing the finest ingredients and maintaining traditional methods of preparation, our products promise to elevate your culinary experience and bring a touch of gourmet excellence to every meal.
                </p>
              </div>


            </motion.div>
          </div>
        </div>
      </section>



      {/* Varieties Section - Home Page Style */}
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
              Tangy Bliss in Jars
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
              Discover our premium selection of handcrafted pickles
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading our delicious pickles...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No pickles available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-16 sm:space-y-20">
              {products.map((product, index) => {
                const features = extractFeaturesFromDescription(product.description);

                return (
                  <motion.div
                    key={product.id}
                    className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 sm:gap-12 md:gap-16`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Media Section - Supports both Images and Videos */}
                    <div className="w-full md:w-1/2">
                      <motion.div
                        className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-xl bg-gray-100"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Check if the URL is a video file */}
                        {(product.imageUrl && product.imageUrl.match(/\.(mp4|webm|ogg|avi|mov)(\?.*)?$/i)) ? (
                          <video
                            src={product.imageUrl}
                            className="w-full h-full object-cover"
                            controls
                            preload="metadata"
                            onError={() => {
                              console.log('Video failed to load:', product.imageUrl);
                            }}
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <Image
                            src={product.imageUrl || boromar}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onError={() => {
                              console.log('Image failed to load:', product.imageUrl);
                            }}
                          />
                        )}
                      </motion.div>
                    </div>

                    {/* Content Section - Home Page Style */}
                    <div className="w-full md:w-1/2">
                      <motion.div
                        className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg"
                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl sm:text-3xl font-bold text-emerald-800">{product.name}</h3>
                          {product.featured && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>

                        <div
                          className="text-gray-600 text-lg mb-6 leading-relaxed product-description"
                          dangerouslySetInnerHTML={{
                            __html: product.description.replace(/<ul[\s\S]*?<\/ul>/g, '')
                          }}
                        />

                        <ul className="space-y-3">
                          {features.map((feature, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              <span className="text-emerald-600 mr-2 text-xl">•</span>
                              <span className="text-gray-600">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action - Home Page Style */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-emerald-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience the Authentic Taste
          </motion.h2>

          <motion.p
            className="text-xl text-gray-100 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Indulge in the rich heritage and culinary traditions of Northeast India with our premium pickles.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="bg-white text-emerald-700 hover:bg-gray-100 py-3 px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-1 shadow-lg uppercase"
            >
              Contact Us
            </Link>
            <Link
              href="/products"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-3 px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-1 uppercase"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 