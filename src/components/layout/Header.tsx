import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  currentPage: 'chat' | 'documents';
  toggleSidebar: () => void;
}

export function Header({ title, currentPage, toggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary">{title}</h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Navigation Links with modern styling */}
        <Link 
          href="/documents" 
          className={`px-3 py-2 ${currentPage === 'documents' 
            ? 'text-primary font-medium border-b-2 border-primary' 
            : 'text-gray-600 hover:text-primary border-b-2 border-transparent hover:border-gray-300'} transition-all duration-200`}
        >
          Documents
        </Link>
        <Link 
          href="/" 
          className={`px-3 py-2 ${currentPage === 'chat' 
            ? 'text-primary font-medium border-b-2 border-primary' 
            : 'text-gray-600 hover:text-primary border-b-2 border-transparent hover:border-gray-300'} transition-all duration-200`}
        >
          Chat
        </Link>
        
        {/* Profile Dropdown */}
        <div className="relative">
          <button className="flex items-center space-x-1 p-1 rounded-full border border-gray-300">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}