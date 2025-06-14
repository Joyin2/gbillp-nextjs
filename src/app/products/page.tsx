'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { productImages, productCategoryImages } from '@/lib/imageUrls';

const products = [
  {
    id: 1,
    name: 'Pickle',
    description: 'Traditional pickles made with local ingredients',
    image: productImages.pickle,
    category: 'pickle',
    items: [
      {
        name: 'Bamboo Shoot Pickle',
        image: productCategoryImages.pickle.bambooShoot,
        description: 'Traditional bamboo shoot pickle'
      },
      {
        name: 'Boromar Pickle',
        image: productCategoryImages.pickle.boromar,
        description: 'Traditional boromar pickle'
      },
      {
        name: 'Fresh Garlic Pickle',
        image: productCategoryImages.pickle.freshGarlicPickle,
        description: 'Traditional fresh garlic pickle'
      },
      {
        name: 'Fresh Ginger Pickle',
        image: productCategoryImages.pickle.freshGinger,
        description: 'Traditional fresh ginger pickle'
      },
      {
        name: 'Indian Olive Pickles',
        image: productCategoryImages.pickle.indianOlivePickles,
        description: 'Traditional Indian olive pickles'
      }
    ]
  },
  {
    id: 2,
    name: 'Rice',
    description: 'Premium quality rice varieties',
    image: productImages.rice,
    category: 'rice',
    items: [
      {
        name: 'Basmati Golden Sella',
        image: productCategoryImages.rice.basmatiGoldenSella,
        description: 'Premium basmati golden sella rice'
      },
      {
        name: 'Basmati Raw',
        image: productCategoryImages.rice.basmatiRaw,
        description: 'Premium basmati raw rice'
      },
      {
        name: 'Basmati White Sella',
        image: productCategoryImages.rice.basmatiWhiteSella,
        description: 'Premium basmati white sella rice'
      },
      {
        name: 'Gobindobhog',
        image: productCategoryImages.rice.gobindobhog,
        description: 'Premium gobindobhog rice'
      },
      {
        name: 'Hari Narayan',
        image: productCategoryImages.rice.hariNarayan,
        description: 'Premium hari narayan rice'
      },
      {
        name: 'Kalijira',
        image: productCategoryImages.rice.kalijira,
        description: 'Premium kalijira rice'
      },
      {
        name: 'Pusa 1718',
        image: productCategoryImages.rice.pusa1718,
        description: 'Premium pusa 1718 rice'
      },
      {
        name: 'Red Rice Kali Mukri',
        image: productCategoryImages.rice.redRiceKaliMukri,
        description: 'Premium red rice kali mukri'
      },
      {
        name: 'Red Sticky Rice',
        image: productCategoryImages.rice.redStickyRice,
        description: 'Premium red sticky rice'
      },
      {
        name: 'Steam Rice',
        image: productCategoryImages.rice.steamRice,
        description: 'Premium steam rice'
      },
      {
        name: 'Sugandha Basmati',
        image: productCategoryImages.rice.sugandhaBasmati,
        description: 'Premium sugandha basmati rice'
      },
      {
        name: 'White Sticky Rice',
        image: productCategoryImages.rice.whiteStickyRice,
        description: 'Premium white sticky rice'
      }
    ]
  },
  {
    id: 3,
    name: 'Dry Bean',
    description: 'Premium quality dry beans',
    image: productImages.drybean,
    category: 'drybean',
    items: [
      {
        name: 'Dry Bean',
        image: productCategoryImages.dryBean.dryBean,
        description: 'Premium quality dry beans'
      }
    ]
  },
  {
    id: 4,
    name: 'Orange',
    description: 'Fresh and juicy oranges',
    image: productImages.orange,
    category: 'orange',
    items: [
      {
        name: 'Orange',
        image: productCategoryImages.plantation.orange,
        description: 'Fresh and juicy oranges'
      }
    ]
  },
  {
    id: 5,
    name: 'Dry Hathkora',
    description: 'Premium quality dry hathkora',
    image: productImages.dryhathkora,
    category: 'dryhathkora',
    items: [
      {
        name: 'Dry Hathkora',
        image: productCategoryImages.dryHathkora.dryHathkora,
        description: 'Premium quality dry hathkora'
      }
    ]
  },
  {
    id: 6,
    name: 'Tez Patta',
    description: 'Premium quality tez patta',
    image: productImages.tezpatta,
    category: 'tezpatta',
    items: [
      {
        name: 'Tez Patta',
        image: productImages.tezpatta,
        description: 'Premium quality tez patta'
      }
    ]
  },
  {
    id: 7,
    name: 'Art & Handicraft',
    description: 'Traditional art and handicraft items',
    image: productImages.handicraft,
    category: 'handicraft',
    items: [
      {
        name: 'Handicraft',
        image: productCategoryImages.artAndHandicraft.handicraft,
        description: 'Traditional handicraft items'
      },
      {
        name: 'Indigenous Text Pottery',
        image: productCategoryImages.artAndHandicraft.indigenousTextPottery,
        description: 'Traditional indigenous text pottery'
      },
      {
        name: 'Pottery',
        image: productCategoryImages.artAndHandicraft.pottery,
        description: 'Traditional pottery items'
      },
      {
        name: 'Teracotta',
        image: productCategoryImages.artAndHandicraft.teracotta,
        description: 'Traditional teracotta items'
      },
      {
        name: 'Terracotta',
        image: productCategoryImages.artAndHandicraft.terracotta,
        description: 'Traditional terracotta items'
      },
      {
        name: 'Visual Art',
        image: productCategoryImages.artAndHandicraft.visualArt,
        description: 'Traditional visual art items'
      },
      {
        name: 'Visual Art 2',
        image: productCategoryImages.artAndHandicraft.visualArt2,
        description: 'Traditional visual art items'
      },
      {
        name: 'Visual Art 3',
        image: productCategoryImages.artAndHandicraft.visualArt3,
        description: 'Traditional visual art items'
      }
    ]
  }
]; 

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState(products[0]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Responsive Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-green-900">
          <div className="absolute inset-0 bg-black/20 sm:bg-black/25 md:bg-black/30" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 px-4">
              Our Products
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 leading-relaxed">
              Discover our premium selection of organic products, carefully crafted with traditional methods
            </p>
          </motion.div>
        </div>
      </section>

      {/* Responsive Products Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Responsive Category Navigation */}
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center mb-8 sm:mb-10 md:mb-12 px-4">
            {products.map((product) => (
              <motion.button
                key={product.id}
                onClick={() => setSelectedCategory(product)}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 ${
                  selectedCategory.id === product.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-white text-gray-600 hover:bg-emerald-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {product.name}
              </motion.button>
            ))}
          </div>

          {/* Responsive Selected Category Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {selectedCategory.items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 sm:h-56 md:h-64">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 