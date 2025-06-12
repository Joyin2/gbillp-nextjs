'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function TestPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClientComponentClient();
        
        // Test the connection by fetching blogs
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .limit(1);

        if (error) {
          throw error;
        }

        setBlogs(data || []);
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
        {status === 'loading' && (
          <div className="text-blue-600">Testing connection...</div>
        )}
        {status === 'success' && (
          <div className="text-green-600">✅ Connection successful!</div>
        )}
        {status === 'error' && (
          <div className="text-red-600">
            ❌ Connection failed: {error}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <div className="space-y-2">
          <p className="flex items-center">
            <strong className="w-64">NEXT_PUBLIC_SUPABASE_URL:</strong>
            <span className={process.env.NEXT_PUBLIC_SUPABASE_URL ? 'text-green-600' : 'text-red-600'}>
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Not set'}
            </span>
          </p>
          <p className="flex items-center">
            <strong className="w-64">NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>
            <span className={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'text-green-600' : 'text-red-600'}>
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set'}
            </span>
          </p>
        </div>
      </div>

      {blogs.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Sample Blog Data</h2>
          <pre className="bg-gray-50 p-4 rounded overflow-auto">
            {JSON.stringify(blogs[0], null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 