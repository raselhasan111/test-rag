import React from 'react';
import { Button } from "@/components/ui/button";
import { DocumentsHook } from '@/hooks/useDocuments';

interface DocumentUploadProps {
  documentsHook: DocumentsHook;
}

export function DocumentUpload({ documentsHook }: DocumentUploadProps) {
  const { 
    isUploading, 
    uploadProgress, 
    currentFile, 
    fileInputRef, 
    handleFileChange, 
    handleFileSelect 
  } = documentsHook;

  return (
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
  );
}