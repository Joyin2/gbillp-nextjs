'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface EcovillagePhoto {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const features = [
  {
    title: "Organic Farming",
    description: "Experience our sustainable farming practices and learn about organic cultivation methods. Our gardens are filled with fresh fruits and vegetables.",
    icon: "🌱"
  },
  {
    title: "Nature Walks",
    description: "Explore scenic trails through our pristine natural setting with stunning views of surrounding mountains, tea gardens, and forests.",
    icon: "🏃‍♂️"
  },
  {
    title: "Yoga & Meditation",
    description: "Find inner peace in our dedicated spaces for yoga and meditation practice, perfect for disconnecting from city life.",
    icon: "🧘‍♀️"
  },
  {
    title: "Natural Showers",
    description: "Experience refreshing showers in our natural fountain and rocky river areas, connecting with nature's elements.",
    icon: "💧"
  },
  {
    title: "Eco Accommodations",
    description: "Stay in our comfortable eco tents and huts designed with sustainability in mind, using locally sourced materials.",
    icon: "🏕️"
  },
  {
    title: "Tea Garden Views",
    description: "Enjoy panoramic views of our beautiful tea gardens and surrounding landscapes, perfect for nature photography.",
    icon: "🍃"
  }
];

export default function EcoTourismPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [ecovillagePhotos, setEcovillagePhotos] = useState<EcovillagePhoto[]>([]);
  const [photosLoading, setPhotosLoading] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    // Set videos as loaded after a short delay to ensure proper hydration
    const timer = setTimeout(() => {
      setVideosLoaded(true);
    }, 100);

    // Fetch ecovillage photos
    fetchEcovillagePhotos();

    return () => clearTimeout(timer);
  }, []);

  const fetchEcovillagePhotos = async () => {
    try {
      const ecovillageCollection = collection(db, 'ecovillage');
      const querySnapshot = await getDocs(ecovillageCollection);

      const photosData: EcovillagePhoto[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        photosData.push({
          id: doc.id,
          name: data.name,
          imageUrl: data.imageUrl,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
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
      setPhotosLoading(false);
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {videosLoaded && (
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
        )}
        
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to Lakhicheera Eco-Village
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A sustainable sanctuary nestled in nature's embrace
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="#features"
              className="inline-block button-gradient text-white-800 py-3 px-8 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/20 transform hover:-translate-y-1"
            >
              Discover More
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-green-800">Nurturing Nature, Sustainable Living</h2>
              <p className="text-lg text-gray-600 mb-6">
                Welcome to our Lakhicheera Eco-Village, where we harmonize modern living with eco-friendly practices, creating a haven for both residents and visitors. Our village is designed to promote environmental awareness and provide a peaceful retreat from urban life.
              </p>
              <p className="text-lg text-gray-600">
                At the heart of our Eco-Village is an emphasis on organic farming, renewable energy, and sustainable architecture. Residents can enjoy fresh, locally-grown produce, solar-powered homes, and buildings constructed with eco-friendly materials. Our community gardens, composting systems, and recycling initiatives foster a self-sustaining lifestyle.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image
                src="https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/ecotourism//eco-park-land-all.jpeg"
                alt="Eco Park Landscape"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-green-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-green-800">What Does It Entail?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Our eco-village is designed to minimize our impact on the environment while maximizing our quality of life. We use locally sourced materials for hospitality and practice organic farming in our gardens filled with fresh fruits and vegetables.
            </p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Join us for a unique and rewarding experience where you can explore the beauty of nature, connect with like-minded individuals, and learn about sustainable living practices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-green-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-green-800">Experience Sustainable Living</h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover the perfect blend of modern comfort and eco-conscious living at our Eco-Village. Designed to promote sustainability, our community features organic farming, renewable energy sources, and green architecture. Residents enjoy fresh, locally-grown produce and environmentally friendly homes.
            </p>
            <p className="text-xl text-gray-600">
              Visitors are welcome to join educational tours and participate in hands-on workshops, learning about sustainable practices and environmental stewardship. Our Eco-Village serves as a model for how communities can thrive while minimizing their environmental footprint.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Sections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center text-green-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            EXPLORE OUR LAKHICHEERA ECO-VILLAGE
          </motion.h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Here are some glimpses of what awaits you at our eco-village.
          </p>

          {/* First Video Section - Video Left, Text Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {videosLoaded && (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source 
                    src="https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/videoss.mp4" 
                    type="video/mp4" 
                  />
                </video>
              )}
            </motion.div>
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-green-800">Eco-Park Experience</h3>
              <p className="text-lg text-gray-600 mb-6">
                Immerse yourself in the natural beauty of our eco-park, where sustainable living meets breathtaking landscapes. Experience the perfect blend of modern comfort and environmental consciousness.
              </p>
              <p className="text-lg text-gray-600">
                Our eco-park features organic gardens, natural water bodies, and sustainable architecture, creating a harmonious environment for both visitors and nature.
              </p>
            </motion.div>
          </div>

          {/* Second Video Section - Video Right, Text Left */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              className="text-center md:text-left order-2 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-green-800">Natural Showers & Water Features</h3>
              <p className="text-lg text-gray-600 mb-6">
                Experience the refreshing embrace of our natural water features, including a beautiful fountain and rocky river areas. These natural elements provide a unique and sustainable way to connect with nature.
              </p>
              <p className="text-lg text-gray-600">
                Our water features are designed to blend seamlessly with the surrounding landscape while providing a serene environment for relaxation and rejuvenation.
              </p>
            </motion.div>
            <motion.div
              className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl order-1 md:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {videosLoaded && (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source 
                    src="https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/ecotourism/eco-village-2.mp4" 
                    type="video/mp4" 
                  />
                </video>
              )}
            </motion.div>
          </div>

          {/* Third Video Section - Video Left, Text Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {videosLoaded && (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source 
                    src="https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/ecotourism/eco-village-1.mp4" 
                    type="video/mp4" 
                  />
                </video>
              )}
            </motion.div>
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-green-800">Eco-Friendly Accommodations</h3>
              <p className="text-lg text-gray-600 mb-6">
                Stay in our comfortable eco tents and huts, designed with sustainability in mind. Each accommodation is constructed using locally sourced materials and eco-friendly practices.
              </p>
              <p className="text-lg text-gray-600">
                Enjoy the perfect blend of comfort and environmental consciousness, with stunning views of the surrounding tea gardens and natural landscapes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section - Firestore Data */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-green-800">Eco-Village Photo Gallery</h2>
            <motion.div
              className="w-24 h-1 bg-green-500 mx-auto rounded-full mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the beauty and serenity of our eco-village through these stunning photographs
            </p>
          </motion.div>

          {photosLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading photo gallery...</p>
            </div>
          ) : ecovillagePhotos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No photos available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ecovillagePhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        console.error('Photo failed to load:', photo.imageUrl);
                        e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOWNhM2FmIj5FY28tVmlsbGFnZTwvdGV4dD48L3N2Zz4=";
                      }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Photo Name */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold mb-2">{photo.name}</h3>
                      <p className="text-sm text-gray-200">
                        {photo.createdAt?.toDate ? new Date(photo.createdAt.toDate()).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Eco-Village'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-emerald-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Join Our Sustainable Community
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-100 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Come experience the joy of sustainable living and be part of our Eco-Village community. Contact us today to book your stay and start your journey towards a greener future.
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
              className="bg-white text-emerald-700 hover:bg-gray-100 py-3 px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              Book Your Stay
            </Link>
            <Link 
              href="/about"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-3 px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-1"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 