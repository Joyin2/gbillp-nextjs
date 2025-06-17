'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, Timestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Fallback handicraft image
const defaultHandicraftImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOWNhM2FmIj5IYW5kaWNyYWZ0IEFydDwvdGV4dD48L3N2Zz4=";

interface HandicraftProduct {
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
      "Handcrafted with care",
      "Unique artistic design",
      "Cultural heritage piece",
      "Perfect for decoration",
      "Traditional craftsmanship"
    ];
  }

  return features;
};

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

export default function HandicraftPage() {
  const [handicraftProducts, setHandicraftProducts] = useState<HandicraftProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroText, setHeroText] = useState<HeroText | null>(null);
  const [heroLoading, setHeroLoading] = useState(true);

  useEffect(() => {
    fetchHandicraftProducts();
    fetchHeroText();
  }, []);

  const fetchHeroText = async () => {
    try {
      const heroTextDoc = doc(db, 'heroTexts', 'products-handicraft');
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

  const fetchHandicraftProducts = async () => {
    try {
      const handicraftProductsCollection = collection(db, 'handicraftProducts');
      const querySnapshot = await getDocs(handicraftProductsCollection);

      const handicraftProductsData: HandicraftProduct[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Handicraft product data:', {
          id: doc.id,
          name: data.name,
          imageUrl: data.imageUrl,
          featured: data.featured
        });
        handicraftProductsData.push({
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
      handicraftProductsData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        return 0;
      });

      setHandicraftProducts(handicraftProductsData);
    } catch (error) {
      console.error('Error fetching handicraft products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Rice Page Style */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        {/* Animated colorful artisan gradient background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ background: 'linear-gradient(135deg, #f7cac9 0%, #92a8d1 50%, #f9f871 100%)' }}
          animate={{ background: [
            'linear-gradient(135deg, #f7cac9 0%, #92a8d1 50%, #f9f871 100%)',
            'linear-gradient(135deg, #f9f871 0%, #f7cac9 50%, #92a8d1 100%)',
            'linear-gradient(135deg, #92a8d1 0%, #f9f871 50%, #f7cac9 100%)',
            'linear-gradient(135deg, #f7cac9 0%, #92a8d1 50%, #f9f871 100%)'
          ] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Responsive Animated falling art elements and sparkles */}
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
          >🎨</motion.div>
          <motion.div
            className="absolute right-1/4 top-1/4 text-5xl"
            animate={{ y: [0, 80, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >✨</motion.div>
          <motion.div
            className="absolute left-1/3 bottom-1/4 text-7xl"
            animate={{ y: [0, 100, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >🏺</motion.div>
          <motion.div
            className="absolute right-1/2 bottom-1/3 text-6xl"
            animate={{ y: [0, 90, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >✨</motion.div>
        </motion.div>

        {/* Hero Content - Rice Page Style */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-4xl lg:max-w-5xl text-center w-full mx-auto">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg"
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
                    className="hidden md:inline"
                  >{heroText.title}</motion.span>
                  <span className="md:hidden">{heroText.title}</span>
                </>
              ) : null}
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

      {/* Vision Section - Rice Page Style */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/30 to-emerald-50/50 overflow-hidden">
        {/* Background elements like rice page */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(178,230,58,0.05),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(27,175,10,0.05),transparent_50%)] pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with rice page animations */}
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
              Our Vision
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
              className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-md md:max-w-4xl mx-auto px-4 leading-relaxed"
            >
              Our vision is to inspire and nurture creativity by providing unique, handcrafted art pieces that celebrate cultural heritage and foster a connection to artistry and craftsmanship, creating lasting value for our community and future generations. We aim to promote environmentally friendly practices by using sustainable materials and processes in all our creations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Products Section - Rice Page Style */}
      <section id="products" className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50/30 to-emerald-50/50 overflow-hidden">
        {/* Background elements like rice page */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(178,230,58,0.05),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(27,175,10,0.05),transparent_50%)] pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with rice page animations */}
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
              Our Handcrafted Treasures
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
              Discover our collection of unique, handcrafted treasures that celebrate traditional artistry and cultural heritage.
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-3"></div>
              <p className="text-gray-600 text-sm">Loading our handcrafted treasures...</p>
            </div>
          ) : handicraftProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No handicraft products available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-8 sm:space-y-12 md:space-y-16">
              {handicraftProducts.map((product, index) => {
                const features = extractFeaturesFromDescription(product.description);

                return (
                  <motion.div
                    key={product.id}
                    className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-4 sm:gap-6 md:gap-8 lg:gap-12`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {/* Responsive Image Section - Rice Page Style */}
                    <div className="w-full lg:w-2/5">
                      <motion.div
                        className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] w-full rounded-lg sm:rounded-xl overflow-hidden shadow-xl mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none bg-white p-3 sm:p-4 md:p-6"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={product.imageUrl || defaultHandicraftImage}
                          alt={product.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 480px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 45vw, 40vw"
                          priority={index === 0}
                          onError={(e) => {
                            console.error('Image failed to load:', product.imageUrl);
                            e.currentTarget.src = defaultHandicraftImage;
                          }}
                        />
                        {product.featured && (
                          <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4">
                            <span className="bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                              Featured
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Responsive Content Section - Rice Page Style */}
                    <div className="w-full lg:w-3/5 flex flex-col justify-center">
                      <motion.div
                        className="bg-white p-6 sm:p-8 md:p-10 lg:p-8 xl:p-10 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: index * 0.1 }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-2">
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold leading-tight px-4 lg:px-0">{product.name}</h3>
                          {product.featured && (
                            <span className="bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] text-white text-xs font-medium px-3 py-1 rounded-full self-start">
                              Featured
                            </span>
                          )}
                        </div>

                        <div
                          className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg mb-4 sm:mb-6 leading-relaxed product-description px-4 lg:px-0 max-w-2xl mx-auto lg:mx-0"
                          dangerouslySetInnerHTML={{
                            __html: product.description.replace(/<ul[\s\S]*?<\/ul>/g, '')
                          }}
                        />

                        {features.length > 0 && (
                          <ul className="space-y-3 sm:space-y-4 px-4 lg:px-0">
                            {features.slice(0, 4).map((feature, i) => (
                              <motion.li
                                key={i}
                                className="flex items-start"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                              >
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] mr-3 mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg leading-relaxed">{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action - Rice Page Style */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-green-800 to-emerald-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Join Us in Preserving Heritage
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Support our artisans and help preserve traditional craftsmanship while bringing unique, handcrafted pieces to your space.
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