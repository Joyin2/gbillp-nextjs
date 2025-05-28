'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Filter out extension-related errors
    if (error.stack?.includes('chrome-extension://')) {
      console.warn('Browser extension error caught:', error);
      this.setState({ hasError: false }); // Don't show error UI for extension errors
      return;
    }
    
    console.error('Application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && !this.state.error?.stack?.includes('chrome-extension://')) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}