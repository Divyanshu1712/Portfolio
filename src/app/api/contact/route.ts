import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const dataDir = path.join(process.cwd(), 'data');
const contactFilePath = path.join(dataDir, 'contact-submissions.json');

// Make sure the data directory exists
const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(contactFilePath)) {
    fs.writeFileSync(contactFilePath, JSON.stringify([]));
  }
};

// Get all submissions (could be used for an admin panel later)
export async function GET() {
  try {
    ensureDataDir();
    
    const data = fs.readFileSync(contactFilePath, 'utf8');
    const submissions = JSON.parse(data);
    
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

// Save a new submission
export async function POST(request: Request) {
  try {
    ensureDataDir();
    
    const body = await request.json();
    const { name, email, message } = body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Create submission with timestamp and ID
    const submission = {
      id: uuidv4(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    };
    
    // Read existing submissions
    let submissions = [];
    if (fs.existsSync(contactFilePath)) {
      const data = fs.readFileSync(contactFilePath, 'utf8');
      submissions = JSON.parse(data);
    }
    
    // Add new submission
    submissions.push(submission);
    
    // Write back to file
    fs.writeFileSync(contactFilePath, JSON.stringify(submissions, null, 2));
    
    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    );
  }
} 