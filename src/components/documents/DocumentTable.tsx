import React from 'react';
import { Button } from "@/components/ui/button";
import { DocumentsHook } from '@/hooks/useDocuments';

interface DocumentTableProps {
  documentsHook: DocumentsHook;
}

export function DocumentTable({ documentsHook }: DocumentTableProps) {
  const { documents, handleDelete } = documentsHook;
  
  return (
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
  );
}