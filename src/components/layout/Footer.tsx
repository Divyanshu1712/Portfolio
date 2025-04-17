'use client';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Divyanshu Srivastava. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 