'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { aboutImages, productImages, teamImages } from '@/lib/imageUrls';

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
  name: string;
  role: string;
  image: string;
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
    icon: "🌱",
  },
  {
    title: "Community Empowerment",
    description: "Supporting local farmers with fair trade practices, education, and resources to build self-sustaining communities.",
    icon: "👨‍🌾",
  },
  {
    title: "Global Market Access",
    description: "Creating pathways for premium local products to reach international markets while maintaining authenticity and quality.",
    icon: "🌎",
  },
  {
    title: "Environmental Conservation",
    description: "Implementing practices that reduce carbon footprint, minimize waste, and protect natural ecosystems.",
    icon: "🌿",
  },
];

// Update the team members array to use Supabase URLs
const teamMembers = [
  {
    name: "Dwijadas Chatterjee",
    role: "Finance and Business Advisor",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/team/team%20member/Chatterje%20.jpeg"
  },
  {
    name: "Tooba Ahmed Laskar",
    role: "Co-ordinator, Arts and Crafts Unit",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/team/team%20member/tooba.jpg"
  },
  {
    name: "Saiyra Begom",
    role: "Unit Head, Pickle Production & Development",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/team/team%20member/saiyra.jpg"
  },
  {
    name: "Sudipta Dawn",
    role: "Advisor, Pickle Marketing & Business Development",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/team/team%20member/sudipta.jpg"
  },
  {
    name: "Reema Pathomi",
    role: "Manager, Lekhicheera Eco-Village",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/team/team%20member/reema.jpg"
  },
  {
    name: "Ch. Adnan Alig",
    role: "Business Coordinator/ Analyst",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/team/team%20member/adnan.jpeg"
  },
  {
    name: "Joyin Mahmmad Aslam Laskar",
    role: "IT Advisor",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/team/team%20member/joyin.jpg"
  },
  {
    name: "Mehboob Hasan Barbhuiya",
    role: "Advisor, Finance",
    image: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/team/team%20member/mehboob.jpg"
  }
];

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
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-900 via-emerald-800 to-green-900"
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
          <div className="absolute inset-0 bg-black/30" />
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
          className="container mx-auto px-6 relative z-20 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
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
            <span className="block mb-4">GREEN BUSINESS</span>
            <span className="text-5xl md:text-7xl">INITIATIVE LLP</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transforming local agri-products for the global market while empowering communities and fostering sustainable practices.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-18 left-1/2 transform -translate-x-1/2 z-20"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
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
      
      {/* Mission Section */}
      <section id="mission" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              OUR MISSION
            </motion.h2>
            <div className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 w-24">
              <motion.div 
                className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Green Business Initiative LLP is committed to fostering sustainable agriculture, empowering local farmers, and promoting eco-friendly products. We aim to create a greener, more prosperous future for all.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {missionItems.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Us Content Section */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:space-x-12 items-center">
            {/* Image Section */}
            <motion.div 
              className="md:w-2/5 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
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
            
            {/* Text Section */}
            <div className="md:w-1/2">
              <motion.h3 
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                EMPOWERING LOCAL COMMUNITIES AND PRODUCTS
              </motion.h3>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  At Green Business Initiative LLP, we are dedicated to advancing sustainable agriculture and empowering local communities across India. Through strategic partnerships and innovative practices, we actively promote eco-friendly solutions and provide vital support to farmers' initiatives.
                </p>
                
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Our initiatives aim to contribute to the local economy by producing high-quality agricultural products while preserving the environment and biodiversity. Additionally, we support the lifestyle, culture, and heritage of local and tribal communities, fostering a positive environment that enhances social harmony and peace.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Agri-Treasures Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row-reverse md:space-x-12 md:space-x-reverse items-center">
            {/* Image Section */}
            <motion.div 
              className="md:w-2/5 mb-12 md:mb-0"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
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
            
            {/* Text Section */}
            <div className="md:w-1/2">
              <motion.h3 
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                MAKING OUR LOCAL AGRI-TREASURES GLOBAL
              </motion.h3>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Green Business Initiative LLP is engaged in agri-based and related commercial activities, including farming, production, sales, distribution, branding, marketing, and supply of grains, fruits, homemade pickles, and handicraft products.
                </p>
                
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  We aim to transform these local agri-treasures into global commodities by leveraging branding, digital marketing, building robust networks and supply chains, and fostering local innovations. By partnering with individuals and initiatives, we seek to support and uplift local agro-based businesses and farmers, ensuring their products and innovations reach a global audience.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ecology and Economy Section */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:space-x-12 items-center">
            {/* Image Section */}
            <motion.div 
              className="md:w-2/5 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
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
            
            {/* Text Section */}
            <div className="md:w-1/2">
              <motion.h3 
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                MOVING TOGETHER WITH ECOLOGY AND ECONOMY
              </motion.h3>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Green Business Initiative LLP is committed to promoting sustainable and eco-friendly agricultural practices that balance economic growth with environmental preservation. Our products and services engage in activities supporting conservation efforts and biodiversity while promoting a greener future.
                </p>
                
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  By harmonizing ecological and economic progress, we strive to cultivate a sustainable model for long-term development, creating a meaningful impact one harvest at a time.
                </p>
                
                <div className="mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link 
                      href="/contact" 
                      className="inline-block button-gradient text-white py-3 px-8 rounded-full font-medium hover:shadow-lg transition duration-300 transform hover:-translate-y-1 text-center"
                    >
                      Contact Us
                    </Link>
                    <Link 
                      href="/about#mission" 
                      className="inline-block bg-transparent border-2 border-emerald-600 text-emerald-600 py-3 px-8 rounded-full font-medium hover:bg-emerald-50 transition duration-300 transform hover:-translate-y-1 text-center"
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
      
      {/* Career and Partnership Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">OUR CAREER AND PARTNERSHIP OPPORTUNITIES</h2>
            <div className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 w-24">
              <motion.div 
                className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Green Business Initiative LLP offers diverse career and partnership avenues. Join our mission of sustainability and community support.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Explore opportunities to contribute to our eco-friendly initiatives or collaborate with us for mutual growth. Contact us today to learn more about joining our team or partnering to promote environmental stewardship and sustainable practices in communities worldwide. Together, we can make a significant impact by fostering innovation, supporting local artisans, and enhancing our product offerings. Whether you're looking to build a career or establish a business relationship, we welcome you to be part of our green journey.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center"
            >
              <Link 
                href="/contact"
                className="inline-block button-gradient text-white py-3 px-8 rounded-full font-medium hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
              >
                Discover More
              </Link>
            </motion.div>
          </motion.div>
          
          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-10 text-center">OPEN POSITIONS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl font-bold text-emerald-700 mb-4">01</div>
                <h4 className="text-2xl font-bold mb-3">MARKETING</h4>
                <p className="text-gray-600">Join our marketing team and help amplify our message of sustainability to a global audience.</p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl font-bold text-emerald-700 mb-4">02</div>
                <h4 className="text-2xl font-bold mb-3">FRANCHISE OPPORTUNITIES</h4>
                <p className="text-gray-600">Explore franchise opportunities and expand your business with us.</p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl font-bold text-emerald-700 mb-4">03</div>
                <h4 className="text-2xl font-bold mb-3">BUSINESS OPPORTUNITIES</h4>
                <p className="text-gray-600">Collaborate with us to create impactful business partnerships.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ethics and Compliance Section */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">OUR ETHICS AND COMPLIANCES</h2>
            <div className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 w-24">
              <motion.div 
                className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>
          
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We conduct our business by complying with applicable laws.
            </p>
            
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Green Business Initiative LLP is incorporated as a partnership with the Ministry of Corporate Affairs, Government of India, and formed as a partnership business under the Limited Liability Partnership Act 2008.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>The Company is also registered with the Ministry of MSME.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Licensed under the Assam Municipal Act 1956.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Green Business Initiative LLP has also filed several Trademarks for operating its business.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

              {/* Ethics and Compliance Section */}

{/* Authorization Section */}
<section className="py-20 bg-emerald-50">
  <div className="container mx-auto px-6">
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">AUTHORISED BY</h2>
      <div className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 w-24">
        <motion.div 
          className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
    </motion.div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      
      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">OUR VALUES</h2>
            <div className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 w-24">
              <motion.div 
                className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      
      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">MEET OUR EXCEPTIONAL TEAM</h2>
            <div className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 w-24">
              <motion.div 
                className="h-full w-full bg-gradient-to-r from-green-800 to-emerald-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              EXCELS TOGETHER
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-800 to-emerald-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            JOIN OUR MISSION
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-100 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Whether you're a farmer, investor, or consumer, there are many ways to be part of our sustainable journey. Together, we can create a greener future.
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
              Contact Us
            </Link>
            <Link 
              href="/investor"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-3 px-8 rounded-full font-medium transition duration-300 transform hover:-translate-y-1"
            >
              Become an Investor
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Value Card Component
const ValueCard = ({ title, description, icon, delay }: ValueCardProps) => (
  <motion.div 
    className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.03 }}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);