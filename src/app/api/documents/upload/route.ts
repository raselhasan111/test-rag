import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, writeFileSync } from 'fs';
import { mkdir, readdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Create the documents directory if it doesn't exist
const docsDir = path.join(process.cwd(), 'documents');
const metadataPath = path.join(docsDir, 'metadata.json');

// Helper function to get document metadata
const getDocumentsMetadata = () => {
  try {
    if (!require('fs').existsSync(metadataPath)) {
      return [];
    }
    const data = require('fs').readFileSync(metadataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading metadata:', error);
    return [];
  }
};

// Helper function to save document metadata
const saveDocumentsMetadata = (metadata) => {
  try {
    require('fs').writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving metadata:', error);
    throw new Error('Failed to save document metadata');
  }
};

export async function POST(req: NextRequest) {
  try {
    // Ensure the documents directory exists
    await mkdir(docsDir, { recursive: true });
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Check if it's a PDF
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }
    
    // Generate a unique ID for the document
    const id = uuidv4();
    const fileName = `${id}-${file.name}`;
    const filePath = path.join(docsDir, fileName);
    
    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Write file to disk
    await new Promise<void>((resolve, reject) => {
      writeFile(filePath, buffer, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    // Update metadata
    const metadata = getDocumentsMetadata();
    const newDocument = {
      id,
      name: file.name,
      size: formatFileSize(file.size),
      uploadedAt: new Date().toLocaleString(),
      path: filePath
    };
    
    metadata.push(newDocument);
    saveDocumentsMetadata(metadata);
    
    return NextResponse.json({ 
      message: 'File uploaded successfully', 
      document: newDocument 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

// Helper function to format file size
function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + ' bytes';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}