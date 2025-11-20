import React from 'react';
import { StatusChecker } from './components/StatusChecker';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 font-sans">
      
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <nav className="max-w-7xl mx-auto flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg transform -rotate-3">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">DownCheck</span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-3xl space-y-8">
          
          <div className="text-center space-y-2 mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Website Down Checker
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
              Instant, reliable website status checking. Just enter the URL below to see if a site is online for everyone or just you.
            </p>
          </div>

          <StatusChecker />
          
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Website Down Checker. Powered by Cloudflare Pages.</p>
      </footer>
    </div>
  );
};

export default App;