'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // Test the connection by fetching the current user
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        // If we get here, the connection is working
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      }
    }

    testConnection();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
        {status === 'loading' && (
          <div className="text-blue-600">Testing connection...</div>
        )}
        {status === 'success' && (
          <div className="flex items-center text-green-600">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Connection successful!
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center text-red-600">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
            Connection failed: {error}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <div className="space-y-2">
          <p className="flex items-center">
            <strong className="w-64">NEXT_PUBLIC_SUPABASE_URL:</strong>
            <span className={`flex items-center ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'text-green-600' : 'text-red-600'}`}>
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                {process.env.NEXT_PUBLIC_SUPABASE_URL ? (
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                ) : (
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                )}
              </svg>
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set'}
            </span>
          </p>
          <p className="flex items-center">
            <strong className="w-64">NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>
            <span className={`flex items-center ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'text-green-600' : 'text-red-600'}`}>
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                ) : (
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                )}
              </svg>
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
} 