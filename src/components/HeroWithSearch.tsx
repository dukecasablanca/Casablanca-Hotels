"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SearchBar } from '@/components/search-bar';
import { properties } from '@/lib/properties-data';
import { generateBookingUrl } from '@/lib/booking-redirect';
import { normalizeDate } from '@/lib/date-utils';
import gsap from 'gsap';
import { ImageCarousel } from '@/components/ImageCarousel';

export function HeroWithSearch() {
  const bgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Animation states
  const [animationPhase, setAnimationPhase] = useState<'hero' | 'fading' | 'floating' | 'expanded' | 'scrollExpanded' | 'closing' | 'returning'>('hero');
  
  // Store search params for booking
  const [searchParams, setSearchParams] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1'
  });
  
  // Track if user has scrolled past the hero section
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const hasTriggeredScrollExpand = useRef(false);
  
  // Track if expansion was triggered by search (to show properties) vs scroll (no properties)
  const [triggeredBySearch, setTriggeredBySearch] = useState(false);

  // Scroll detection - smoothly stick search bar to top when scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      // Search bar is at bottom-[15%], so it's at 85% of hero height
      // Trigger when scrolled enough that search bar would be near the nav (around 70% of viewport)
      const scrollThreshold = window.innerHeight * 0.70;
      const scrolledPast = window.scrollY > scrollThreshold;
      setIsScrolledPast(scrolledPast);
      
      // Directly switch to scrollExpanded when scrolling past (instant, no animation phases)
      if (scrolledPast && animationPhase === 'hero') {
        hasTriggeredScrollExpand.current = true;
        setTriggeredBySearch(false);
        setAnimationPhase('scrollExpanded');
      }
      
      // Return to hero state when scrolling back to top (only if in scrollExpanded mode)
      if (window.scrollY < 100 && animationPhase === 'scrollExpanded') {
        hasTriggeredScrollExpand.current = false;
        setAnimationPhase('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animationPhase]);

  useEffect(() => {
    if (!bgRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationPhase !== 'hero') return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(bgRef.current, {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: "power1.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [animationPhase]);

  const handleSearchStart = (params: { checkIn: string; checkOut: string; guests: string }) => {
    // Store search params
    setSearchParams(params);
    
    // On mobile (< 768px), redirect to properties page instead of animated experience
    if (window.innerWidth < 768) {
      const searchQuery = new URLSearchParams({
        checkIn: params.checkIn,
        checkOut: params.checkOut,
        guests: params.guests
      }).toString();
      router.push(`/properties?${searchQuery}`);
      return;
    }
    
    // If already expanded with properties, just update params and scroll to top
    if (animationPhase === 'expanded') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Mark as triggered by search (to show properties)
    setTriggeredBySearch(true);
    
    // If already in scrollExpanded, just switch to expanded to show properties
    if (animationPhase === 'scrollExpanded') {
      setAnimationPhase('expanded');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Phase 1: Fade out taglines
    setAnimationPhase('fading');
    
    // Phase 2: Float search bar up and expand at the same time (overlap)
    setTimeout(() => {
      setAnimationPhase('floating');
      setAnimationPhase('expanded');
    }, 800);
  };

  const handleCloseSearch = () => {
    // Reset scroll trigger
    hasTriggeredScrollExpand.current = false;
    setTriggeredBySearch(false);
    
    // Phase 1: First hide properties (keep bar at top)
    setAnimationPhase('closing');
    
    // Phase 2: After properties fade out, move bar down (wait longer)
    setTimeout(() => {
      setAnimationPhase('returning');
    }, 900);
    
    // Phase 3: After bar has returned, show the hero content (wait longer)
    setTimeout(() => {
      setAnimationPhase('hero');
    }, 2200);
  };

  const handleBookProperty = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    const formattedCheckIn = searchParams.checkIn || normalizeDate(new Date().toISOString().split('T')[0]);
    const formattedCheckOut = searchParams.checkOut || normalizeDate(new Date().toISOString().split('T')[0], 1);

    const bookingUrl = generateBookingUrl(property.bookingEngineUrl, {
      propertyId,
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      guests: parseInt(searchParams.guests) || 1
    });

    window.location.href = bookingUrl;
  };

  const isSearchMode = animationPhase !== 'hero' && animationPhase !== 'returning';
  const showTaglines = animationPhase === 'hero';
  const isExpanded = animationPhase === 'expanded';
  const isScrollExpanded = animationPhase === 'scrollExpanded';
  const isReturning = animationPhase === 'returning';
  
  // Only show properties when expanded via search click (not scroll)
  const showProperties = isExpanded && triggeredBySearch;
  
  // Search bar should be fixed only AFTER text has faded (floating phase onwards)
  // Not during 'fading' - wait for text to disappear first
  const isSearchBarFixed = animationPhase === 'floating' || animationPhase === 'expanded' || animationPhase === 'scrollExpanded' || animationPhase === 'closing';
  
  // Use expanded variant for search bar when fully expanded, compact otherwise
  const searchBarVariant = (isExpanded || isScrollExpanded) ? 'expanded' : (isReturning ? 'compact' : 'compact');

  return (
    <div 
      ref={containerRef}
      className={`relative w-full transition-all duration-700 ease-out ${
        isExpanded ? 'min-h-screen' : 'h-screen'
      }`}
    >
      {/* Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        ref={bgRef}
        animate={{
          scale: isSearchMode ? 1.05 : 1,
        }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-no-repeat"></div>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 via-emerald-900/60 to-emerald-950/80"
          animate={{
            opacity: isExpanded ? 0.95 : 1,
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
      
      {/* White overlay that fades in when expanded */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ top: '120px' }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 h-full">
        
        {/* Hero Content - Taglines */}
        <motion.div 
          className="absolute inset-0 flex items-start justify-center px-4 pt-32 md:pt-40"
          animate={{
            opacity: showTaglines ? 1 : 0,
            y: showTaglines ? 0 : -30,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ pointerEvents: showTaglines ? 'auto' : 'none' }}
        >
          <div className="text-center w-full max-w-4xl">
            {/* Elegant Divider */}
            <motion.div 
              className="mb-6 flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-yellow-500/70"></div>
              <span className="text-yellow-400 text-sm font-medium tracking-[0.3em] uppercase">By Ruhi</span>
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-yellow-500/70"></div>
            </motion.div>

            {/* Main heading */}
            <motion.h1 
              className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-dancing-script"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-yellow-400 drop-shadow-[0_4px_12px_rgba(202,138,4,0.4)]">
                Casa Blanca
              </span>
            </motion.h1>
            
            <motion.h2 
              className="mb-6 text-lg font-medium sm:text-xl md:text-2xl lg:text-3xl leading-tight tracking-wide"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-white/90 font-montserrat">
                Experience Luxury in Los Angeles
              </span>
            </motion.h2>

            {/* Elegant Divider */}
            <motion.div 
              className="mb-6 flex items-center justify-center"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.55 }}
            >
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
            </motion.div>
            
            <motion.p 
              className="mx-auto mb-10 max-w-2xl text-base text-white/80 sm:text-lg md:text-xl leading-relaxed font-montserrat"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Discover our collection of premium boutique accommodations, where timeless elegance meets modern comfort.
            </motion.p>
          </div>
        </motion.div>

        {/* Search Bar - Sticks to top when scrolling */}
        <div
          className={`
            ${isSearchBarFixed 
              ? 'fixed top-[80px] left-0 right-0 z-[150]' 
              : 'absolute bottom-[15%] left-0 right-0 z-10'
            }
            transition-all duration-[1500ms] ease-in-out
          `}
        >
          <div className="px-4 py-2">
            {/* Search Bar Header when expanded or scrollExpanded */}
            <AnimatePresence>
              {(isExpanded || isScrollExpanded) && (
                <motion.div 
                  className="max-w-5xl mx-auto flex items-center justify-between mb-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-white font-bold text-lg drop-shadow-lg">
                    {showProperties ? `${properties.length} Properties Available` : 'Search for Properties'}
                  </h2>
                  <button 
                    onClick={handleCloseSearch}
                    className="text-white/80 hover:text-white transition-colors px-4 py-2 hover:bg-white/10 rounded-lg text-sm font-medium"
                  >
                    ← Back to Home
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Use the existing SearchBar component */}
            <SearchBar 
              variant={searchBarVariant}
              onSearchStart={handleSearchStart}
            />
          </div>
        </div>

        {/* Properties Grid - Only shown when expanded */}
        <AnimatePresence>
          {showProperties && (
            <motion.div 
              className="pt-56 pb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.4 + (index * 0.1),
                        ease: "easeOut"
                      }}
                    >
                      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col group bg-white">
                        <div className="relative h-48 bg-gradient-to-br from-emerald-800 to-green-950 overflow-hidden">
                          <ImageCarousel 
                            photos={property.photos || []} 
                            alt={property.name}
                            height="h-48"
                            autoPlay={true}
                            autoPlayInterval={5000}
                          />
                        </div>

                        <CardHeader className="pb-3">
                          <h3 className="text-xl font-bold text-gray-900">{property.name}</h3>
                          <div className="flex items-center text-gray-600 mt-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col justify-between">
                          <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>

                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {property.amenities.slice(0, 3).map((amenity) => (
                                <span
                                  key={amenity}
                                  className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>

                          <Button
                            onClick={() => handleBookProperty(property.id)}
                            className="w-full bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-green-950 text-yellow-400 border border-yellow-600/50 font-semibold"
                          >
                            View Details & Book
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Scroll indicator - only in hero mode */}
      <AnimatePresence>
        {animationPhase === 'hero' && (
          <motion.div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex cursor-pointer flex-col items-center group"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            >
              <span className="mb-1 text-xs font-medium text-white/80 group-hover:text-white transition-colors">
                Scroll to explore
              </span>
              <div className="p-1.5 rounded-full border border-white/40 group-hover:border-white/60 transition-colors bg-white/10 backdrop-blur-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"/>
                </svg>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
