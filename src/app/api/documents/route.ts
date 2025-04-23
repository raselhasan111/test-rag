import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Static document data
const staticDocuments = [
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

export async function GET() {
  try {
    // Return static document data instead of reading from filesystem
    return NextResponse.json(staticDocuments);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}