'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogs: 0
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const blogsSnapshot = await getDocs(collection(db, 'blogs'));
        setStats({
          blogs: blogsSnapshot.size
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-emerald-500 rounded-lg p-6 text-white shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Blogs</h2>
          <p className="text-3xl font-bold">{stats.blogs}</p>
        </div>
      </div>
    </div>
  );
} 