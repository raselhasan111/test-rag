import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Document {
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

export function useDocuments() {
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

  return {
    documents,
    isSidebarOpen,
    isUploading,
    uploadProgress,
    currentFile,
    fileInputRef,
    toggleSidebar,
    handleFileSelect,
    handleFileChange,
    handleDelete
  };
}

export type DocumentsHook = ReturnType<typeof useDocuments>;