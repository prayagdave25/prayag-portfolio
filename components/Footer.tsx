'use client';

import { FaHeart } from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-text-secondary flex items-center justify-center gap-2">
            Built with <FaHeart className="text-accent-primary" aria-label="love" /> using Next.js, 
            TailwindCSS & Framer Motion
          </p>
          <p className="text-text-secondary mt-2">
            © {currentYear} Prayag Vikram Dave. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
