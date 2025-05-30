"use client";

import Link from 'next/link';

const CtaSection = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 light-gradient-text">
          Embrace <span className="italic">sustainability,</span> cultivate change.
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link 
            href="/about"
            className="inline-block bg-white text-green-600 py-3 px-8 rounded-full font-medium hover:bg-gray-100 transition duration-300"
          >
            Discover More
          </Link>
          <Link 
            href="/contact"
            className="inline-block bg-transparent border-2 border-white text-white py-3 px-8 rounded-full font-medium hover:bg-white hover:text-green-600 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;