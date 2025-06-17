'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { aboutImages, productImages, teamImages } from '@/lib/imageUrls';
import { collection, getDocs, Timestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// TypeScript interfaces
interface ParticleProps {
  image: {
    src: string;
    alt: string;
    id: number;
  };
  index: number;
  total: number;
  onHover: (index: number) => void;
  isHovered: boolean;
  hoveredIndex: number | null;
}

interface ValueCardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
}

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photoUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

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

// Array of images for particles
const particleImages = [
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

// Update the image imports to use Supabase URLs
const images = [
  {
    src: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/about/about/empowering%20local%20communities%20and%20products.jpg",
    alt: 'Empowering Local Communities and Products'
  },
  {
    src: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/about/about/MAKING%20OUR%20LOCAL%20AGRI-TREASURES%20GLOBAL.jpg",
    alt: 'Making Our Local Agri-Treasures Global'
  },
  {
    src: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/about/about/MOVING%20TOGETHER%20WITH%20ECOLOGY%20AND%20ECONOMY.png",
    alt: 'Moving Together with Ecology and Economy'
  }
];

// Particle component
const Particle = ({ image, index, total, onHover, isHovered, hoveredIndex }: ParticleProps) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 15 + Math.random() * 20;
  const randomSize = 30 + Math.random() * 40;
  const randomRotation = Math.random() * 360;
  
  return (
    <motion.div
      className="absolute opacity-30 rounded-full overflow-hidden"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        width: randomSize,
        height: randomSize,
      }}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1], 
        scale: [0.8, 1.2, 0.8],
        rotate: [randomRotation, randomRotation + 360, randomRotation],
        y: [0, -50, 0],
        x: [0, 30, 0]
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover rounded-full"
        sizes="(max-width: 768px) 50px, 80px"
      />
    </motion.div>
  );
};

// Mission statement items with animations
const missionItems = [
  {
    title: "Sustainable Agriculture",
    description: "Promoting eco-friendly farming practices that preserve natural resources and biodiversity while producing high-quality crops.",
    icon: (
      <svg className="w-8 h-8 premium-icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    title: "Community Empowerment",
    description: "Supporting local farmers with fair trade practices, education, and resources to build self-sustaining communities.",
    icon: (
      <svg className="w-8 h-8 premium-icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 7c0-2.21-1.79-4-4-4S8 4.79 8 7s1.79 4 4 4 4-1.79 4-4zm-4 6c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
  },
  {
    title: "Global Market Access",
    description: "Creating pathways for premium local products to reach international markets while maintaining authenticity and quality.",
    icon: (
      <svg className="w-8 h-8 premium-icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
  },
  {
    title: "Environmental Conservation",
    description: "Implementing practices that reduce carbon footprint, minimize waste, and protect natural ecosystems.",
    icon: "🌿",
  },
];

// Fallback team member image
const defaultTeamImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iNzAiIHI9IjMwIiBmaWxsPSIjOWNhM2FmIi8+PHBhdGggZD0iTTUwIDEzMGMwLTI3LjYxNCAyMi4zODYtNTAgNTAtNTBzNTAgMjIuMzg2IDUwIDUwdjcwSDUweiIgZmlsbD0iIzljYTNhZiIvPjwvc3ZnPg==";

// Update the authorized logos array
const authorisedLogos = {
  ashok: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/logos/authorised/ashok.jpeg",
  assamStartup: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/logos/authorised/assam%20startup.jpeg",
  fssai: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/logos/authorised/fssai.png",
  mca: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/logos/authorised/mca.jpg",
  msme: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/logos/authorised/msme.jpeg",
  startupIndia: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/logos/authorised/startup-india.jpeg"
};

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [heroText, setHeroText] = useState<HeroText | null>(null);
  const [heroLoading, setHeroLoading] = useState(true);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleParticleHover = (index: number) => {
    setHoveredIndex(index);
  };

  useEffect(() => {
    setIsLoaded(true);
    fetchTeamMembers();
    fetchHeroText();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const teamCollection = collection(db, 'team');
      const querySnapshot = await getDocs(teamCollection);

      const teamData: TeamMember[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Validate required fields
        if (data.name && data.designation) {
          teamData.push({
            id: doc.id,
            name: data.name || 'Unknown',
            designation: data.designation || 'Team Member',
            photoUrl: data.photoUrl || '',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        }
      });

      // Sort by creation date (newest first)
      teamData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        return 0;
      });

      setTeamMembers(teamData);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setTeamLoading(false);
    }
  };

  const fetchHeroText = async () => {
    try {
      const heroTextDoc = doc(db, 'heroTexts', 'about');
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

  return (
    <div className="min-h-screen">
      {/* Responsive Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-screen">
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-green-900"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          />
          <div className="absolute inset-0 bg-black/20 sm:bg-black/25 md:bg-black/30" />
        </div>

        {/* Particle effect */}
        {isLoaded && (
          <div className="absolute inset-0 z-10 overflow-hidden">
            {particleImages.map((image, index) => (
              <Particle 
                key={image.id} 
                image={image} 
                index={index}
                total={particleImages.length}
                onHover={handleParticleHover}
                isHovered={hoveredIndex === index}
                hoveredIndex={hoveredIndex}
              />
            ))}
          </div>
        )}

        {/* 3D Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            rotateX: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 text-white drop-shadow-lg px-4"
            animate={{
              textShadow: [
                "0 0 7px #fff",
                "0 0 10px #fff",
                "0 0 21px #fff",
                "0 0 42px #0fa",
                "0 0 82px #0fa",
                "0 0 92px #0fa",
                "0 0 102px #0fa",
                "0 0 151px #0fa"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {heroLoading ? (
              <div className="animate-pulse px-4">
                <div className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 bg-white/20 rounded-lg"></div>
              </div>
            ) : heroText ? (
              <span className="block mb-2 sm:mb-4">{heroText.title}</span>
            ) : (
              <div className="text-white/50 px-4">
                <span className="block">No hero text available</span>
              </div>
            )}
          </motion.h1>

          {heroLoading ? (
            <motion.div
              className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto mb-6 sm:mb-8 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="animate-pulse">
                <div className="h-6 sm:h-8 bg-white/20 rounded-lg mb-2"></div>
                <div className="h-6 sm:h-8 bg-white/10 rounded-lg"></div>
              </div>
            </motion.div>
          ) : heroText && heroText.subtitle ? (
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto mb-6 sm:mb-8 text-center px-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {heroText.subtitle}
            </motion.p>
          ) : null}
        </motion.div>

        {/* Responsive Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1.5 sm:mt-2"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        </motion.div>
      </section>
      
      {/* Responsive Mission Section */}
      <section id="mission" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Mission
            </motion.h2>
            <div className="h-1 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden bg-gray-200 w-16 sm:w-20 md:w-24">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Green Business Initiative LLP is committed to fostering sustainable agriculture, empowering local farmers, and promoting eco-friendly products. We aim to create a greener, more prosperous future for all.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-8 mt-8 sm:mt-12">
            {missionItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4 relative bg-gradient-to-br from-[#b2e63a]/10 via-[#b2e63a]/5 to-[#1baf0a]/10 border border-[#b2e63a]/20 hover:border-[#1baf0a]/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1baf0a]/20">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b2e63a]/5 to-[#1baf0a]/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 text-lg sm:text-xl md:text-2xl">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Responsive About Us Content Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:space-x-8 xl:space-x-12 items-center gap-8 sm:gap-10 md:gap-12 lg:gap-0">
            {/* Responsive Image Section */}
            <motion.div
              className="w-full lg:w-2/5 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] w-full rounded-lg sm:rounded-xl overflow-hidden shadow-xl mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none">
                {/* Removing the gradient overlay */}
                <AnimatePresence mode="wait">
                  {isLoaded && (
                    <motion.div
                      key="image-container"
                      className="absolute inset-0 flex items-center justify-center p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="relative w-full h-full">
                        <Image 
                          src={images[0].src}
                          alt={images[0].alt}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* Responsive Text Section */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
              <motion.h3
                className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6 px-4 lg:px-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Empowering Local Communities And Products
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed px-4 lg:px-0 max-w-2xl mx-auto lg:mx-0">
                  At Green Business Initiative LLP, we are dedicated to advancing sustainable agriculture and empowering local communities across India. Through strategic partnerships and innovative practices, we actively promote eco-friendly solutions and provide vital support to farmers' initiatives.
                </p>

                <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed px-4 lg:px-0 max-w-2xl mx-auto lg:mx-0">
                  Our initiatives aim to contribute to the local economy by producing high-quality agricultural products while preserving the environment and biodiversity. Additionally, we support the lifestyle, culture, and heritage of local and tribal communities, fostering a positive environment that enhances social harmony and peace.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Responsive Agri-Treasures Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse lg:space-x-8 lg:space-x-reverse xl:space-x-12 xl:space-x-reverse items-center gap-8 sm:gap-10 md:gap-12 lg:gap-0">
            {/* Responsive Image Section */}
            <motion.div
              className="w-full lg:w-2/5 order-2 lg:order-1"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] w-full rounded-lg sm:rounded-xl overflow-hidden shadow-xl mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none">
                {/* Removing the gradient overlay */}
                <AnimatePresence mode="wait">
                  {isLoaded && (
                    <motion.div
                      key="image-container-2"
                      className="absolute inset-0 flex items-center justify-center p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="relative w-full h-full">
                        <Image 
                          src={images[1].src}
                          alt={images[1].alt}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* Responsive Text Section */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
              <motion.h3
                className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6 px-4 lg:px-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Making Our Local Agri-Treasures Global
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed px-4 lg:px-0 max-w-2xl mx-auto lg:mx-0">
                  Green Business Initiative LLP is engaged in agri-based and related commercial activities, including farming, production, sales, distribution, branding, marketing, and supply of grains, fruits, homemade pickles, and handicraft products.
                </p>

                <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed px-4 lg:px-0 max-w-2xl mx-auto lg:mx-0">
                  We aim to transform these local agri-treasures into global commodities by leveraging branding, digital marketing, building robust networks and supply chains, and fostering local innovations. By partnering with individuals and initiatives, we seek to support and uplift local agro-based businesses and farmers, ensuring their products and innovations reach a global audience.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Responsive Ecology and Economy Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:space-x-8 xl:space-x-12 items-center gap-8 sm:gap-10 md:gap-12 lg:gap-0">
            {/* Responsive Image Section */}
            <motion.div
              className="w-full lg:w-2/5 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] w-full rounded-lg sm:rounded-xl overflow-hidden shadow-xl mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none">
                {/* Removing the gradient overlay */}
                <AnimatePresence mode="wait">
                  {isLoaded && (
                    <motion.div
                      key="image-container-3"
                      className="absolute inset-0 flex items-center justify-center p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="relative w-full h-full">
                        <Image 
                          src={images[2].src}
                          alt={images[2].alt}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* Responsive Text Section */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
              <motion.h3
                className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6 px-4 lg:px-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Moving Together With Ecology And Economy
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed px-4 lg:px-0 max-w-2xl mx-auto lg:mx-0">
                  Green Business Initiative LLP is committed to promoting sustainable and eco-friendly agricultural practices that balance economic growth with environmental preservation. Our products and services engage in activities supporting conservation efforts and biodiversity while promoting a greener future.
                </p>

                <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed px-4 lg:px-0 max-w-2xl mx-auto lg:mx-0">
                  By harmonizing ecological and economic progress, we strive to cultivate a sustainable model for long-term development, creating a meaningful impact one harvest at a time.
                </p>

                <div className="mt-6 sm:mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 lg:px-0"
                  >
                    <Link
                      href="/contact"
                      className="inline-block button-gradient text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-full font-medium hover:shadow-lg transition duration-300 transform hover:-translate-y-1 text-center text-sm sm:text-base"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/about#mission"
                      className="inline-block bg-transparent border-2 border-emerald-600 text-emerald-600 py-2.5 sm:py-3 px-6 sm:px-8 rounded-full font-medium hover:bg-emerald-50 transition duration-300 transform hover:-translate-y-1 text-center text-sm sm:text-base"
                    >
                      Discover More
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Responsive Ethics and Compliance Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4">Our Ethics And Compliances</h2>
            <div className="h-1 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden bg-gray-200 w-16 sm:w-20 md:w-24">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.div
            className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              We conduct our business by complying with applicable laws.
            </p>

            <ul className="space-y-3 sm:space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2 mt-1 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base leading-relaxed">Green Business Initiative LLP is incorporated as a partnership with the Ministry of Corporate Affairs, Government of India, and formed as a partnership business under the Limited Liability Partnership Act 2008.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2 mt-1 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base leading-relaxed">The Company is also registered with the Ministry of MSME.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2 mt-1 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base leading-relaxed">Licensed under the Assam Municipal Act 1956.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2 mt-1 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base leading-relaxed">Green Business Initiative LLP has also filed several Trademarks for operating its business.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

              {/* Ethics and Compliance Section */}

{/* Responsive Authorization Section */}
<section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-emerald-50">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      className="text-center mb-12 sm:mb-16 lg:mb-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4">Authorised By</h2>
      <div className="h-1 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden bg-gray-200 w-16 sm:w-20 md:w-24">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
    </motion.div>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
    {[
    { src: authorisedLogos.ashok, alt: 'Ashok Stambh' },
    { src: authorisedLogos.assamStartup, alt: 'Assam Startup' },
    { src: authorisedLogos.fssai, alt: 'FSSAI' },
    { src: authorisedLogos.mca, alt: 'Ministry of Corporate Affairs' },
    { src: authorisedLogos.msme, alt: 'MSME' },
    { src: authorisedLogos.startupIndia, alt: 'Startup India' }
  ].map((image, index) => (
        <motion.div
          key={image.alt}
          className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative w-full aspect-square">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      
      {/* Responsive Values Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4">Our Values</h2>
            <div className="h-1 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden bg-gray-200 w-16 sm:w-20 md:w-24">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6 xl:gap-8">
            <ValueCard 
              title="Sustainability" 
              description="We prioritize environmentally responsible practices in all aspects of our business, from farming to packaging."
              icon="♻️"
              delay={0.1}
            />
            <ValueCard 
              title="Community" 
              description="We believe in uplifting local communities through fair trade, education, and economic opportunities."
              icon="🤝"
              delay={0.2}
            />
            <ValueCard 
              title="Quality" 
              description="We maintain the highest standards in our products, ensuring premium quality from farm to table."
              icon="⭐"
              delay={0.3}
            />
            <ValueCard 
              title="Innovation" 
              description="We continuously explore new methods and technologies to improve our sustainable agricultural practices."
              icon="💡"
              delay={0.4}
            />
            <ValueCard 
              title="Transparency" 
              description="We believe in honest communication with our partners, customers, and communities about our practices and products."
              icon="👁️"
              delay={0.5}
            />
            <ValueCard 
              title="Global Vision" 
              description="We aim to connect local producers with global markets while preserving cultural heritage and traditional knowledge."
              icon="🌏"
              delay={0.6}
            />
          </div>
        </div>
      </section>
      
      {/* Responsive Team Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4">Meet Our Exceptional Team</h2>
            <div className="h-1 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden bg-gray-200 w-16 sm:w-20 md:w-24">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Excels Together
            </motion.p>
          </motion.div>

          {teamLoading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-green-500 mx-auto mb-3 sm:mb-4"></div>
              <p className="text-gray-600 text-sm sm:text-base px-4">Loading our exceptional team...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-600 text-base sm:text-lg px-4">No team members available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 xl:gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-48 sm:h-56 md:h-64 w-full">
                    {member.photoUrl && member.photoUrl.trim() !== '' ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        onError={(e) => {
                          console.error('Team photo failed to load:', member.photoUrl);
                          e.currentTarget.src = defaultTeamImage;
                        }}
                      />
                    ) : (
                      <div
                        className="w-full h-full bg-gray-200 flex items-center justify-center"
                        style={{
                          backgroundImage: `url("${defaultTeamImage}")`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <span className="text-gray-500 text-xs sm:text-sm">No Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-6 text-center">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{member.name}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{member.designation}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Responsive Join Our Mission Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-green-800 to-emerald-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Join Our Mission
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 px-4 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Whether you're a farmer, investor, or consumer, there are many ways to be part of our sustainable journey. Together, we can create a greener future.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="bg-white text-emerald-700 hover:bg-gray-100 py-2.5 sm:py-3 px-6 sm:px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-1 shadow-lg text-sm sm:text-base"
            >
              Contact Us
            </Link>
            <Link
              href="/investor"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-2.5 sm:py-3 px-6 sm:px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
            >
              Become an Investor
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Responsive Value Card Component
const ValueCard = ({ title, description, icon, delay }: ValueCardProps) => (
  <motion.div
    className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.03 }}
  >
    <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">{icon}</div>
    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{title}</h3>
    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{description}</p>
  </motion.div>
);