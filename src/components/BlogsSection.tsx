"use client";

import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "Startup Expo 2025 as part of UDGAM'25",
    image: "/blog1.jpg",
    link: "/blogs/startup-expo-2025"
  },
  {
    id: 2,
    title: "Green Business Initiative LLP Partners with MAROLAHY MAZAVALOHA Madagascar",
    image: "/blog2.jpg",
    link: "/blogs/partnership-marolahy-mazavaloha"
  },
  {
    id: 3,
    title: "Meet Mr. Chatterjee: A Visionary Leader",
    image: "/blog3.jpg",
    link: "/blogs/mr-chatterjee-visionary-leader"
  },
  {
    id: 4,
    title: "Green Business Initiative LLP Named EarthON Climate Champion, Joins Pioneering Sustainability Workshop",
    image: "/blog4.jpg",
    link: "/blogs/earthon-climate-champion"
  }
];

const BlogsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Latest Blogs</h2>
          <div className="h-1 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 w-24">
            <div className="h-full w-full bg-gradient-to-r from-[#b2e63a] to-[#1baf0a]"></div>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover our curated collection of innovative and sustainable design ideas. From eco-friendly crafts to inspiring creations, explore how Green Business Initiative blends creativity with sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-gray-300"></div>
                {/* Replace with actual images when available */}
                {/* <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                /> */}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 h-14">{post.title}</h3>
                <Link 
                  href={post.link}
                  className="inline-block mt-2 text-green-600 hover:text-green-800 font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/blogs"
            className="inline-block button-gradient text-white py-3 px-8 rounded-full font-medium hover:bg-green-700 transition duration-300"
          >
            Explore More Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;