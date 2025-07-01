
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors in component tree and displays fallback UI
 * Essential for production applications to prevent white screen errors
 */
export class SimilarProductsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SimilarProducts Error:', error, errorInfo);
    
    // Here you could send error to monitoring service
    // Example: sendErrorToMonitoring(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="py-20 bg-gradient-to-br from-brand-sage-50 to-brand-camel-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-playfair font-bold text-brand-darkGreen-500 mb-4">
                  Oops! Quelque chose s&apos;est mal passé
                </h3>
                <p className="text-brand-darkGreen-400 mb-6">
                  Nous rencontrons des difficultés pour charger les produits similaires.
                </p>
                <button
                  className="px-6 py-3 bg-brand-camel-500 hover:bg-brand-camel-600 text-white font-semibold rounded-xl transition-colors duration-300"
                  onClick={() => window.location.reload()}
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

