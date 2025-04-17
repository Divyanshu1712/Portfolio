import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// For a real application, you would use a database like MongoDB, PostgreSQL, etc.
// This is a simplified version that will work in serverless environments like Vercel
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // In a real application, you would store this data in a database
    // For now, we'll just return success since we can't write to the filesystem in Vercel
    const submission = {
      id: uuidv4(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    };
    
    // Here you would typically add database code, for example:
    // await db.collection('contacts').insertOne(submission);
    
    console.log('Contact form submission:', submission);
    
    return NextResponse.json({ 
      success: true, 
      id: submission.id,
      message: 'Your message has been received. Thank you for reaching out!'
    });
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again later.' },
      { status: 500 }
    );
  }
}

// This GET endpoint would not work in production without a database
export async function GET() {
  // In production, you would fetch data from a database
  return NextResponse.json({ 
    message: 'This endpoint requires a database connection in production.'
  });
} 