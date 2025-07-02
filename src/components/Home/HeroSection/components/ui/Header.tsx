'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '../AppIcon';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-spring ${
        isScrolled 
          ? 'bg-surface/95 backdrop-blur-soft shadow-soft' 
          : 'bg-surface/80 backdrop-blur-soft'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group transition-spring hover:scale-102"
            onClick={closeMenu}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center shadow-soft group-hover:shadow-glow transition-spring">
                <svg 
                  className="w-6 h-6 text-accent-foreground" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-heading-semibold text-text-primary group-hover:text-accent transition-spring">
                Enhanced Hero
              </h1>
              <p className="text-xs font-caption text-text-secondary -mt-1">
                Premium Slider
              </p>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-text-primary hover:text-accent hover:bg-muted rounded-lg transition-spring hover:scale-102"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;