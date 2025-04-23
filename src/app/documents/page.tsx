'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'

interface Document {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
}

// Static document data
const staticDocuments: Document[] = [
  {
    id: "17391eab-516e-48ab-a147-f1706b96d7d6",
    name: "ID 348-356.pdf",
    size: "2.5 MB",
    uploadedAt: "April 20, 2025"
  },
  {
    id: "759f8aca-9069-49f8-8845-a7b6e700cb81",
    name: "1728538602203.pdf",
    size: "1.8 MB",
    uploadedAt: "April 21, 2025"
  },
  {
    id: "ce37900e-09d2-44aa-9dc2-ae13cec0819f",
    name: "1728538602203.pdf",
    size: "3.2 MB",
    uploadedAt: "April 22, 2025"
  }
];

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>(staticDocuments);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Only allow PDF files
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed!');
      return;
    }
    
    setCurrentFile(file);
    simulateUpload(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Add new document to list after completion
          const newDoc: Document = {
            id: uuidv4(),
            name: file.name,
            size: formatFileSize(file.size),
            uploadedAt: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          };
          
          setTimeout(() => {
            setDocuments(prev => [newDoc, ...prev]);
            setIsUploading(false);
            setCurrentFile(null);
            // Reset file input
            if (fileInputRef.current) fileInputRef.current.value = '';
          }, 500);
          
          return 100;
        }
        return newProgress;
      });
    }, 150);
  };

  const handleDelete = (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this document?');
    if (!confirm) return;
    
    // Since we're just simulating, simply remove the document from state
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar - Matching home page layout */}
      <aside className={`bg-[#f8f8f8] border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-lg text-primary">Documents</h2>
        </div>
        <nav className="flex-1 overflow-y-auto mt-2">
          <ul className="space-y-1">
            {documents.map(doc => (
              <li 
                key={doc.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                <span className="text-sm truncate block">{doc.name}</span>
              </li>
            ))}
          </ul>
        </nav>
        {/* Powered by branding */}
        <div className="p-4 border-t border-gray-200 mt-auto text-center">
          <p className="text-xs text-gray-500">Powered by <span className="font-semibold text-primary">Banglalink AI</span></p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-col flex-1 h-full overflow-hidden bg-background">
        {/* Topbar - Matching home page */}
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
              <h1 className="text-xl font-bold text-primary">Document Management</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Navigation Links with modern styling */}
            <Link 
              href="/documents" 
              className="px-3 py-2 text-primary font-medium border-b-2 border-primary transition-all duration-200"
            >
              Documents
            </Link>
            <Link 
              href="/" 
              className="px-3 py-2 text-gray-600 hover:text-primary border-b-2 border-transparent hover:border-gray-300 transition-all duration-200"
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

        {/* Main content */}
        <main className="flex-1 p-6 bg-background overflow-auto">
          <div className="max-w-5xl mx-auto">
            {/* Upload Section */}
            <section className="mb-8 p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Upload Documents</h2>
              
              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef}
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {isUploading ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="font-medium">Uploading {currentFile?.name}</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500 flex justify-between">
                    <span>{Math.round(uploadProgress)}%</span>
                    <span>{currentFile?.name}</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors" onClick={handleFileSelect}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div className="text-center">
                    <p className="text-lg font-medium">Click to upload a file</p>
                    <p className="text-sm text-gray-500 mt-1">Only PDF files are supported</p>
                  </div>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFileSelect();
                    }}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Select PDF
                  </Button>
                </div>
              )}
            </section>

            {/* Documents List */}
            <section className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Your Documents</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Size</th>
                      <th className="p-4 font-medium">Uploaded</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id} className="border-t hover:bg-gray-50">
                        <td className="p-4">{doc.name}</td>
                        <td className="p-4">{doc.size}</td>
                        <td className="p-4">{doc.uploadedAt}</td>
                        <td className="p-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                          >
                            View
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(doc.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </main>
    </div>
  )
}