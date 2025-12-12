'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Building2, Menu, X, Home, Phone, Info } from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-[200] bg-emerald-950 backdrop-blur-xl border-b border-yellow-600/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Casa Blanca"
              width={160}
              height={64}
              className="h-16 w-auto object-contain"
              priority
            />
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-2xl text-yellow-300 font-dancing-script font-bold leading-tight">
                Casa Blanca
              </span>
              <span className="text-[10px] font-medium text-yellow-300/60 tracking-[0.2em] uppercase font-montserrat text-center">
                HOTELS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <a 
              href="/" 
              className="text-yellow-100/90 hover:text-yellow-400 font-medium transition-colors duration-200 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-yellow-500/10"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </a>
            <Link 
              href="/properties" 
              className="text-yellow-100/90 hover:text-yellow-400 font-medium transition-colors duration-200 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-yellow-500/10"
            >
              <Building2 className="h-4 w-4" />
              <span>Properties</span>
            </Link>
            <Link 
              href="/about" 
              className="text-yellow-100/90 hover:text-yellow-400 font-medium transition-colors duration-200 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-yellow-500/10"
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link 
              href="/contact" 
              className="text-yellow-100/90 hover:text-yellow-400 font-medium transition-colors duration-200 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-yellow-500/10"
            >
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </Link>
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/properties">
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-emerald-950 font-semibold border border-yellow-400/50 px-6 py-2 shadow-lg hover:shadow-yellow-500/30">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 hover:bg-yellow-500/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-yellow-400" />
            ) : (
              <Menu className="h-6 w-6 text-yellow-400" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-yellow-600/20">
            <div className="flex flex-col space-y-2 pt-4">
              <a 
                href="/" 
                className="text-yellow-100/90 hover:text-yellow-400 font-medium px-4 py-2 rounded-lg hover:bg-yellow-500/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <Link 
                href="/properties" 
                className="text-yellow-100/90 hover:text-yellow-400 font-medium px-4 py-2 rounded-lg hover:bg-yellow-500/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Properties
              </Link>
              <Link 
                href="/about" 
                className="text-yellow-100/90 hover:text-yellow-400 font-medium px-4 py-2 rounded-lg hover:bg-yellow-500/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-yellow-100/90 hover:text-yellow-400 font-medium px-4 py-2 rounded-lg hover:bg-yellow-500/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/properties"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-emerald-950 font-semibold border border-yellow-400/50 mt-4">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
