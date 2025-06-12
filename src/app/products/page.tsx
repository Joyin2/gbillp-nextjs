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
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-emerald-800 to-green-900">
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="container mx-auto px-6 h-full flex items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Products
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover our premium selection of organic products, carefully crafted with traditional methods
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Category Navigation */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {products.map((product) => (
              <motion.button
                key={product.id}
                onClick={() => setSelectedCategory(product)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
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

          {/* Selected Category Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {selectedCategory.items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">
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