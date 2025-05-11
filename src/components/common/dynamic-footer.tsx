
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function DynamicFooter() {
  const [currentYear, setCurrentYear] = useState<number | string>('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-8 text-center text-sm text-muted-foreground border-t bg-card">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p>&copy; {currentYear || new Date().getFullYear()} AI Tools Hub. All rights reserved.</p>
        <div className="flex space-x-4">
          <Link href="/terms-of-use" className="hover:text-primary transition-colors">
            Terms of Use
          </Link>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
