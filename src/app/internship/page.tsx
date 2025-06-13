'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Internship {
  id: string;
  title: string;
  description: string;
  applyLink: string;
  active: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const internshipDetails = {
  title: "Green Business Initiative Remote Internship Program 2025",
  description: "We are thrilled to launch our Remote Internship Program under Green Business Initiative (GBI) for UG and PG students across India. Dive into market research, product analysis, and professional report writing while contributing to sustainable rural development.",
  tasks: [
    "Analyzing market demand and value",
    "Conducting competitive analysis",
    "Studying consumer preferences and views",
    "Identifying regional specialties and unique selling points",
    "Exploring business strategies and innovative marketing domains",
    "Investigating export-import market opportunities"
  ],
  benefits: [
    "Enhance your research, analytical, and report-writing skills",
    "Work under experienced supervisors",
    "Earn a valuable experience certificate from GBI",
    "Strengthen your resume with real-world project contributions",
    "Contribute to rural development and sustainability"
  ],
  timeline: [
    {
      title: "Orientation & Topic Selection",
      date: "First week of May 2025"
    },
    {
      title: "Internship Start Date",
      date: "15th May 2025"
    },
    {
      title: "Permission Letter Deadline",
      date: "25th May 2025"
    }
  ]
};

export default function InternshipPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const internshipsCollection = collection(db, 'internships');
        const querySnapshot = await getDocs(internshipsCollection);

        const internshipsData: Internship[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Filter active internships on the client side
          if (data.active === true) {
            internshipsData.push({
              id: doc.id,
              title: data.title,
              description: data.description,
              applyLink: data.applyLink,
              active: data.active,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            });
          }
        });

        // Sort by creation date on the client side
        internshipsData.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
          }
          return 0;
        });

        setInternships(internshipsData);
      } catch (error) {
        console.error('Error fetching internships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
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
          className="container mx-auto px-6 relative z-20 text-center"
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
            Green Business Initiative Remote Internship Program 2025
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We are thrilled to launch our Remote Internship Program under Green Business Initiative (GBI) for UG and PG students across India. Dive into market research, product analysis, and professional report writing while contributing to sustainable rural development.
          </motion.p>


          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-0 -mb-20 left-1/2 transform -translate-x-1/2"
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
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.h2 
                className="text-4xl font-bold mb-4 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                About the Internship
              </motion.h2>
              <motion.div 
                className="w-24 h-1 bg-green-500 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Market Research</h3>
                <p className="text-gray-600">Conduct in-depth research on rural organic products, analyzing market trends and consumer behavior to drive sustainable business growth.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Product Analysis</h3>
                <p className="text-gray-600">Evaluate unique traditional goods, identifying their competitive edge and potential in local and global markets.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Report Writing</h3>
                <p className="text-gray-600">Craft professional reports that will be published on GBI's platform, showcasing your analytical and communication skills.</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Your Tasks</h3>
              <ul className="space-y-4">
                {internshipDetails.tasks.map((task, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <svg
                      className="w-6 h-6 premium-icon mr-3 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">{task}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Internship Details Section - Firestore Data */}
      {!loading && internships.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <motion.h2
                className="text-4xl font-bold mb-4 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Current Internship Opportunities
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-green-500 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {internships.map((internship, index) => (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-sm font-medium text-green-600 uppercase tracking-wide">
                          Active Position
                        </span>
                        <span className="ml-4 text-sm text-gray-500">
                          Posted: {internship.createdAt?.toDate ? new Date(internship.createdAt.toDate()).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'N/A'}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                        {internship.title}
                      </h3>
                    </div>
                  </div>

                  <div
                    className="text-gray-700 leading-relaxed mb-6 internship-content text-lg"
                    dangerouslySetInnerHTML={{ __html: internship.description }}
                  />

                  <div className="flex items-center justify-between pt-6 border-t border-green-200">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-5 h-5 mr-2 premium-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Remote Position
                    </div>
                    <motion.a
                      href={internship.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Apply Now
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.h2 
                className="text-4xl font-bold mb-4 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Why Join Us?
              </motion.h2>
              <motion.div 
                className="w-24 h-1 bg-green-500 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {internshipDetails.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 relative bg-gradient-to-br from-[#b2e63a]/85 via-[#b2e63a]/90 to-[#1baf0a]/85 shadow-md shadow-[#1baf0a]/20 hover:shadow-lg hover:shadow-[#1baf0a]/30 hover:scale-105 transition-all duration-300 group">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b2e63a] to-[#1baf0a] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      <svg
                        className="w-6 h-6 text-white relative z-10 transition-transform duration-300 group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600">{benefit}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 