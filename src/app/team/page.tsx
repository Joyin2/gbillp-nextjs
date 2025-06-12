'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { teamImages } from '@/lib/imageUrls';

const teamMembers = [
  {
    id: 1,
    name: 'Joyin',
    role: 'Founder & CEO',
    image: teamImages.joyin,
    description: 'Passionate about sustainable agriculture and community development.'
  },
  {
    id: 2,
    name: 'Mehboob',
    role: 'Co-Founder & CTO',
    image: teamImages.mehboob,
    description: 'Expert in technology and innovation.'
  },
  {
    id: 3,
    name: 'Adnan',
    role: 'Head of Operations',
    image: teamImages.adnan,
    description: 'Experienced in managing complex operations.'
  },
  {
    id: 4,
    name: 'Reema',
    role: 'Head of Marketing',
    image: teamImages.reema,
    description: 'Creative marketing strategist with a passion for brand building.'
  },
  {
    id: 5,
    name: 'Sudipta',
    role: 'Head of Sales',
    image: teamImages.sudipta,
    description: 'Skilled in building strong customer relationships.'
  },
  {
    id: 6,
    name: 'Saiyra',
    role: 'Head of HR',
    image: teamImages.saiyra,
    description: 'Dedicated to fostering a positive work environment.'
  },
  {
    id: 7,
    name: 'Tooba',
    role: 'Head of Finance',
    image: teamImages.tooba,
    description: 'Expert in financial management and strategy.'
  },
  {
    id: 8,
    name: 'Chatterjee',
    role: 'Head of R&D',
    image: teamImages.chatterjee,
    description: 'Innovative researcher focused on product development.'
  }
];

export default function TeamPage() {
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
              Our Team
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Meet the passionate individuals driving our mission forward
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-80">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.description}
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