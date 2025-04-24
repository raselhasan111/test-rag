import React from 'react';
import { DocumentsHook } from '@/hooks/useDocuments';

interface DocumentSidebarProps {
  documentsHook: DocumentsHook;
}

export function DocumentSidebar({ documentsHook }: DocumentSidebarProps) {
  const { documents, isSidebarOpen } = documentsHook;

  return (
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
  );
}