'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import { collection, addDoc, Timestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Contact form interface
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
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

interface ContactSettings {
  address: string;
  email: string;
  phone: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
}

// Import images for particles
const productImages = {
  pickle: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/pickle.png",
  rice: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/rice.png",
  drybean: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/dry%20beans.png",
  orange: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/orange.png",
  dryhathkora: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/haatkora.png",
  tezpatta: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/tezpatta.png",
  handicraft: "https://uufjafllhnhjzqvasyxj.supabase.co/storage/v1/object/public/products/products/art%20&%20craft.png"
};

// Array of images for particles
const particleImages = [
  { src: productImages.pickle, alt: "Organic Pickle", id: 1 },
  { src: productImages.rice, alt: "Premium Rice", id: 2 },
  { src: productImages.drybean, alt: "Dry Bean", id: 3 },
  { src: productImages.orange, alt: "Orange", id: 4 },
  { src: productImages.dryhathkora, alt: "Dry Hathkora", id: 5 },
  { src: productImages.tezpatta, alt: "Tezpatta", id: 6 },
  { src: productImages.handicraft, alt: "Handicraft", id: 7 },
];

// Particle component
const Particle = ({ image }: { image: any; index: number }) => {
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

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isMobile, setIsMobile] = useState(false);
  const [heroText, setHeroText] = useState<HeroText | null>(null);
  const [heroLoading, setHeroLoading] = useState(true);
  const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null);
  const [contactLoading, setContactLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    fetchHeroText();
    fetchContactSettings();
  }, []);

  const fetchHeroText = async () => {
    try {
      const heroTextDoc = doc(db, 'heroTexts', 'contact');
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

  const fetchContactSettings = async () => {
    try {
      const contactDoc = doc(db, 'contactSettings', 'fXZoUuc38Jm3OTcuqOUn');
      const docSnap = await getDoc(contactDoc);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setContactSettings({
          address: data.address || 'Paikan, Gumra, Assam 788815',
          email: data.email || 'info@gbillp.com',
          phone: data.phone || '+91 99571 16126',
          socialLinks: {
            facebook: data.socialLinks?.facebook || '',
            instagram: data.socialLinks?.instagram || '',
            linkedin: data.socialLinks?.linkedin || '',
            twitter: data.socialLinks?.twitter || '',
          }
        });
      } else {
        // Fallback to default values
        setContactSettings({
          address: 'Paikan, Gumra, Assam 788815',
          email: 'info@gbillp.com',
          phone: '+91 99571 16126',
          socialLinks: {
            facebook: '',
            instagram: '',
            linkedin: '',
            twitter: '',
          }
        });
      }
    } catch (error) {
      console.error('Error fetching contact settings:', error);
      // Fallback to default values on error
      setContactSettings({
        address: 'Paikan, Gumra, Assam 788815',
        email: 'info@gbillp.com',
        phone: '+91 99571 16126',
        socialLinks: {
          facebook: '',
          instagram: '',
          linkedin: '',
          twitter: '',
        }
      });
    } finally {
      setContactLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all fields');
      }

      // Add to Firestore
      const contactsCollection = collection(db, 'contacts');
      await addDoc(contactsCollection, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        createdAt: Timestamp.now(),
        status: 'new', // For tracking purposes
        read: false // For admin dashboard
      });

      // Reset form and show success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitStatus('success');

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');

      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-emerald-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Enhanced Responsive Hero Section */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#1baf0a] via-[#b2e63a] to-[#1baf0a]"
            animate={!isMobile ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            transition={!isMobile ? {
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            } : {}}
            style={{
              backgroundSize: '200% 200%',
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Responsive Particle effect - Hidden on mobile for better performance */}
        {isLoaded && !isMobile && (
          <div className="absolute inset-0 z-10 overflow-hidden">
            {particleImages.map((image, index) => (
              <Particle key={image.id} image={image} index={index} />
            ))}
          </div>
        )}

        {/* Responsive 3D Floating Elements - Hidden on mobile for better performance */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-green-500/20 rounded-full blur-3xl"
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
              className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-emerald-500/20 rounded-full blur-3xl"
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
          </>
        )}

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
                    animate={!isMobile ? { letterSpacing: ['0.05em', '0.15em', '0.05em'] } : {}}
                    transition={!isMobile ? { duration: 2, repeat: Infinity, repeatType: 'reverse' } : {}}
                    className="hidden md:inline bg-gradient-to-r from-[#b2e63a] to-[#ffffff] bg-clip-text text-transparent"
                  >
                    {heroText.title}
                  </motion.span>
                  <span className="md:hidden">{heroText.title}</span>
                </>
              ) : (
                <div className="text-white/50">
                  <span className="block">No hero text available</span>
                </div>
              )}
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
                className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 leading-relaxed drop-shadow-md px-4 sm:px-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {heroText.subtitle}
              </motion.p>
            ) : null}
          </div>
        </div>

        {/* Responsive Scroll Indicator - Hidden on mobile */}
        {!isMobile && (
          <motion.div
            className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-20"
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
                className="w-0.5 h-2 sm:w-1 sm:h-3 bg-white rounded-full mt-1.5 sm:mt-2"
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
        )}
      </section>

      {/* Responsive Contact Information Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Background elements like rice page */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-emerald-50/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(178,230,58,0.05),transparent_50%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(27,175,10,0.05),transparent_50%)] pointer-events-none"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Ccircle cx='30' cy='30' r='3' fill='%2310B981' fill-opacity='0.1'/%3E%3C/svg%3E")`
            }}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
              {/* Responsive Contact Form */}
              <motion.div
                className="relative bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl border border-emerald-100/50"
                initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
              >
                <motion.div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10"
                  animate={!isMobile ? { opacity: [0.5, 1, 0.5] } : {}}
                  transition={!isMobile ? { duration: 5, repeat: Infinity, repeatType: 'reverse' } : {}}
                />
                <motion.h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent text-center"
                  initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Connect With Us
                </motion.h2>
                <p className="text-gray-600 mb-4 sm:mb-6 md:mb-8 text-center text-sm sm:text-base md:text-lg font-medium px-2 sm:px-0">
                  Drop us a message, and let's start a conversation.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: isMobile ? 0 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Name</label>
                      <div className="relative group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg text-sm sm:text-base"
                          placeholder="Your name"
                        />
                        <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Email</label>
                      <div className="relative group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg text-sm sm:text-base"
                          placeholder="Your email"
                        />
                        <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <label htmlFor="subject" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Subject</label>
                    <div className="relative group">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg text-sm sm:text-base"
                        placeholder="Message subject"
                      />
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Message</label>
                    <div className="relative group">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={isMobile ? 4 : 6}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg resize-none text-sm sm:text-base"
                        placeholder="Your message"
                      />
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#b2e63a]/20 to-[#1baf0a]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="pt-3 sm:pt-4"
                    initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full sm:w-full md:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base ${
                        isSubmitting ? 'animate-pulse' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl"
                      >
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <p className="text-green-700 font-medium">Message sent successfully! We'll get back to you soon.</p>
                        </div>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl"
                      >
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <p className="text-red-700 font-medium">Failed to send message. Please try again.</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </form>
              </motion.div>

              {/* Responsive Contact Info */}
              <motion.div
                className="space-y-4 sm:space-y-6"
                initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
              >
                <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-emerald-100/50">
                  <motion.h3
                    className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent text-center"
                    initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Contact Details
                  </motion.h3>
                  <div className="space-y-4 sm:space-y-6">
                    {/* Responsive Email Card */}
                    <motion.div
                      className="group relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                      whileHover={!isMobile ? { scale: 1.02 } : {}}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#b2e63a]/5 to-[#1baf0a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-start space-x-3 sm:space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300 relative bg-gradient-to-br from-[#b2e63a]/90 via-[#b2e63a]/95 to-[#1baf0a]/90 shadow-lg shadow-[#1baf0a]/25 hover:shadow-xl hover:shadow-[#1baf0a]/35 group-hover:scale-105">
                          <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#b2e63a] to-[#1baf0a] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Email</h4>
                          {contactLoading ? (
                            <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                          ) : (
                            <a
                              href={`mailto:${contactSettings?.email}`}
                              className="text-sm sm:text-base md:text-lg font-medium text-emerald-700 hover:text-teal-600 transition-colors duration-200 group-hover:translate-x-1 inline-block break-all"
                            >
                              {contactSettings?.email}
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Responsive Phone Card */}
                    <motion.div
                      className="group relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                      whileHover={!isMobile ? { scale: 1.02 } : {}}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-start space-x-3 sm:space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300 relative bg-gradient-to-br from-[#b2e63a]/90 via-[#b2e63a]/95 to-[#1baf0a]/90 shadow-lg shadow-[#1baf0a]/25 hover:shadow-xl hover:shadow-[#1baf0a]/35 group-hover:scale-105">
                          <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#b2e63a] to-[#1baf0a] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Phone</h4>
                          {contactLoading ? (
                            <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                          ) : (
                            <a
                              href={`tel:${contactSettings?.phone?.replace(/\s+/g, '')}`}
                              className="text-sm sm:text-base md:text-lg font-medium text-emerald-700 hover:text-teal-600 transition-colors duration-200 group-hover:translate-x-1 inline-block"
                            >
                              {contactSettings?.phone}
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Responsive Address Card */}
                    <motion.div
                      className="group relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                      whileHover={!isMobile ? { scale: 1.02 } : {}}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-start space-x-3 sm:space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300 relative bg-gradient-to-br from-[#b2e63a]/90 via-[#b2e63a]/95 to-[#1baf0a]/90 shadow-lg shadow-[#1baf0a]/25 hover:shadow-xl hover:shadow-[#1baf0a]/35 group-hover:scale-105">
                          <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#b2e63a] to-[#1baf0a] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Address</h4>
                          {contactLoading ? (
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                            </div>
                          ) : (
                            <p className="text-sm sm:text-base md:text-lg font-medium text-emerald-700 leading-relaxed group-hover:translate-x-1 transition-transform duration-200">
                              {contactSettings?.address?.split(',').map((part, index, array) => (
                                <span key={index}>
                                  {part.trim()}
                                  {index < array.length - 1 && <br />}
                                </span>
                              ))}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Map Section */}
      <section className="relative py-6 sm:py-8 md:py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 to-white" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-emerald-100/50"
            initial={{ opacity: 0, scale: isMobile ? 0.98 : 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.1234567890123!2d92.12345678901234!3d24.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA3JzI0LjQiTiA5MsKwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>


        </div>
      </section>

      {/* Location Card Below Map - Only visible on mobile and tablet */}
      <section className="block md:hidden py-6 sm:py-8 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-emerald-100/50">
              <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#b2e63a] to-[#1baf0a] flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-extrabold mb-2 sm:mb-3 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] bg-clip-text text-transparent">
                    Our Location
                  </h3>
                </div>
              </div>

              <div className="mb-4 sm:mb-5">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  <span className="font-semibold text-gray-800">Gumra Bazar</span><br />
                  <span className="text-xs sm:text-sm text-gray-500">Khelma Pt VII, Paikan</span><br />
                  <span className="text-xs sm:text-sm text-gray-500">Assam 788815, India</span>
                </p>
              </div>

              <motion.a
                href="https://maps.google.com/?q=Gumra+Bazar+Paikan+Assam+788815"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-[#b2e63a] to-[#1baf0a] text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transition-all duration-300 active:scale-95 text-sm sm:text-base"
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Get Directions
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}