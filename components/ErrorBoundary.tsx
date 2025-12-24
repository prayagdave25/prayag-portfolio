'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary component to catch and handle React component errors
 * Prevents a single component failure from crashing the entire page
 * 
 * Usage:
 * <ErrorBoundary fallback={<div>Error loading section</div>}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details to console for debugging
    console.error('ErrorBoundary caught an error:', {
      component: this.props.componentName || 'Unknown',
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });

    // In production, you could send this to an error tracking service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI if provided, otherwise show default error message
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="p-8 text-center bg-background-secondary border border-border rounded-lg"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-md mx-auto">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-accent-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Something went wrong
            </h2>
            <p className="text-text-secondary mb-4">
              {this.props.componentName 
                ? `There was an error loading the ${this.props.componentName} section.`
                : 'There was an error loading this section.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-accent-primary text-text-primary rounded-lg hover:bg-accent-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
