
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function LandingPageFooter() {
  const [currentYear, setCurrentYear] = useState<number | string>('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="absolute bottom-0 left-0 right-0 py-8 text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p>&copy; {currentYear || new Date().getFullYear()} AI Tools Hub. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-6">
          <Link href="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact Us
          </Link>
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

