"use client";

import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 uppercase mb-2">KNOW US BETTER</h2>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-12 items-center">
          {/* Image Section */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="rounded-lg overflow-hidden shadow-lg h-96 bg-gray-300">
              {/* Replace with actual image when available */}
              {/* <img 
                src="/about-image.jpg" 
                alt="Green Business Initiative" 
                className="w-full h-full object-cover"
              /> */}
            </div>
          </div>

          {/* Text Section */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-green-600 mb-4">EMPOWERING COMMUNITIES FOR A GREENER FUTURE</h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Green Business Initiative LLP is committed to fostering sustainable agriculture, empowering local farmers, and promoting eco-friendly Products. Join us in shaping a greener, more prosperous future for all.
            </p>
            <Link 
              href="/about" 
              className="inline-block bg-green-600 text-white py-3 px-8 rounded-full font-medium hover:bg-green-700 transition duration-300"
            >
              Discover More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 