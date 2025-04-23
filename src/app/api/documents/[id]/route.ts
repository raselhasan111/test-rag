import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const docsDir = path.join(process.cwd(), 'documents');
const metadataPath = path.join(docsDir, 'metadata.json');

// Helper function to get document metadata
const getDocumentsMetadata = () => {
  try {
    if (!fs.existsSync(metadataPath)) {
      return [];
    }
    const data = fs.readFileSync(metadataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading metadata:', error);
    return [];
  }
};

// Helper function to save document metadata
const saveDocumentsMetadata = (metadata) => {
  try {
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving metadata:', error);
    throw new Error('Failed to save document metadata');
  }
};

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const documentId = params.id;
    
    // Get current metadata
    const metadata = getDocumentsMetadata();
    
    // Find the document
    const documentIndex = metadata.findIndex(doc => doc.id === documentId);
    if (documentIndex === -1) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
    
    const document = metadata[documentIndex];
    
    // Delete the file if it exists
    if (document.path && fs.existsSync(document.path)) {
      fs.unlinkSync(document.path);
    }
    
    // Remove the document from metadata
    metadata.splice(documentIndex, 1);
    
    // Save updated metadata
    saveDocumentsMetadata(metadata);
    
    return NextResponse.json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}