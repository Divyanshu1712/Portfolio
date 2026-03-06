'use client';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Divyanshu Srivastava. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 