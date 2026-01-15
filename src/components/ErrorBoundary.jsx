import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
    // In production, you could log to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-[#0f1012]">
          <div className="max-w-xl px-6 py-12 text-center">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer font-semibold text-zinc-900 dark:text-white mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="overflow-auto rounded-lg bg-zinc-100 dark:bg-zinc-800 p-4 text-sm text-zinc-800 dark:text-zinc-200">
                  {this.state.error.toString()}
                  {this.state.error.stack && `\n\n${this.state.error.stack}`}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-8 rounded-md bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
