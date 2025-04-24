'use client'

import React from 'react';
import { useDocuments } from '@/hooks/useDocuments';
import { DocumentSidebar } from '@/components/documents/DocumentSidebar';
import { DocumentUpload } from '@/components/documents/DocumentUpload';
import { DocumentTable } from '@/components/documents/DocumentTable';
import { Header } from '@/components/layout/Header';

export function Documents() {
  const documentsHook = useDocuments();
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DocumentSidebar documentsHook={documentsHook} />

      {/* Main content */}
      <main className="flex flex-col flex-1 h-full overflow-hidden bg-background">
        {/* Header */}
        <Header 
          title="Document Management"
          currentPage="documents"
          toggleSidebar={documentsHook.toggleSidebar}
        />

        {/* Main content area */}
        <main className="flex-1 p-6 bg-background overflow-auto">
          <div className="max-w-5xl mx-auto">
            {/* Upload Section */}
            <DocumentUpload documentsHook={documentsHook} />

            {/* Documents List */}
            <DocumentTable documentsHook={documentsHook} />
          </div>
        </main>
      </main>
    </div>
  );
}