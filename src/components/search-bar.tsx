"use client";

import React, { useState, useEffect } from 'react';
import { Search, Building2, Calendar, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { normalizeDate, formatDateForDisplay } from '@/lib/date-utils';
import { properties as staticProperties } from '@/lib/properties-data';

interface SearchBarProps {
  variant?: 'default' | 'compact' | 'expanded';
  initialValues?: {
    propertyId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  };
  onSearchStart?: (params: { checkIn: string; checkOut: string; guests: string }) => void;
}

export function SearchBar({ variant = 'default', initialValues = {}, onSearchStart }: SearchBarProps) {
  const router = useRouter();
  const [selectedProperty, setSelectedProperty] = useState(initialValues.propertyId || '');
  const [isSearching, setIsSearching] = useState(false);
  // Set default check-in to tomorrow if not provided
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };
  
  // Set default check-out to the day after tomorrow if not provided
  const getDayAfterTomorrow = () => {
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    return dayAfterTomorrow.toISOString().split('T')[0];
  };
  
  const [checkIn, setCheckIn] = useState(initialValues.checkIn || getTomorrow());
  const [checkOut, setCheckOut] = useState(initialValues.checkOut || getDayAfterTomorrow());
  const [guests, setGuests] = useState(initialValues.guests || '1');

  // Sync internal state when initialValues prop changes (e.g., when URL params update)
  useEffect(() => {
    if (initialValues.checkIn) {
      setCheckIn(initialValues.checkIn);
    }
    if (initialValues.checkOut) {
      setCheckOut(initialValues.checkOut);
    }
    if (initialValues.guests) {
      setGuests(initialValues.guests);
    }
    if (initialValues.propertyId !== undefined) {
      setSelectedProperty(initialValues.propertyId);
    }
  }, [initialValues.checkIn, initialValues.checkOut, initialValues.guests, initialValues.propertyId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Normalize dates
    const formattedCheckIn = normalizeDate(checkIn);
    const formattedCheckOut = normalizeDate(checkOut, 1);
    
    // If onSearchStart callback is provided, use it instead of navigating
    // This allows the parent component to handle the search UI
    if (onSearchStart) {
      onSearchStart({
        checkIn: formattedCheckIn,
        checkOut: formattedCheckOut,
        guests: guests || '1'
      });
      return;
    }
    
    // Start the searching animation
    setIsSearching(true);

    // Build the query string for search
    const params = new URLSearchParams();
    
    if (selectedProperty) params.append('propertyId', selectedProperty);
    
    // Generate a timestamp for cache busting to always get fresh availability data
    const timestamp = new Date().getTime().toString();
    
    // Standardize date format to YYYY-MM-DD for consistency throughout the app
    if (checkIn) {
      params.append('checkIn', formattedCheckIn);
      params.append('_t', timestamp);
    }
    
    if (checkOut) {
      params.append('checkOut', formattedCheckOut);
    }
    
    if (guests) params.append('guests', guests);
    
    const queryString = params.toString();
    
    // Store search parameters in session storage for consistency
    try {
      sessionStorage.removeItem('lastSearch');
      const searchData = {
        checkIn: formattedCheckIn || '',
        checkOut: formattedCheckOut || '',
        guests: guests || '',
        propertyId: selectedProperty || ''
      };
      sessionStorage.setItem('lastSearch', JSON.stringify(searchData));
    } catch (e) {
      console.error('Error storing search data:', e);
    }
    
    // Check if we're currently on the properties page
    const isOnPropertiesPage = typeof window !== 'undefined' && window.location.pathname === '/properties';
    
    // Add a small delay to allow animation to play before navigation
    setTimeout(() => {
      if (isOnPropertiesPage) {
        // If we're already on the properties page, just refresh the data without navigation
        if (typeof window !== 'undefined') {
          const searchEvent = new CustomEvent('refreshPropertyCards', { 
            detail: { 
              checkIn: formattedCheckIn,
              checkOut: formattedCheckOut,
              guests: guests,
              propertyId: selectedProperty,
              timestamp: timestamp
            }
          });
          const newUrl = `/properties?${queryString}`;
          window.history.pushState({ path: newUrl }, '', newUrl);
          window.dispatchEvent(searchEvent);
        }
        setIsSearching(false);
      } else {
        // If we're not on the properties page, navigate there
        const newUrl = `/properties?${queryString}`;
        router.push(newUrl);
      }
    }, 800);
    
  };

  // Style classes based on variant
  const baseFormClasses = {
    default: "mx-auto max-w-5xl rounded-2xl bg-white/90 backdrop-blur-sm p-4 sm:p-6 shadow-2xl border border-white/40",
    compact: "mx-auto max-w-5xl rounded-xl bg-white p-4 sm:p-5 shadow-md border border-gray-100",
    expanded: "mx-auto max-w-6xl rounded-xl bg-white/95 backdrop-blur-sm py-3 px-4 shadow-lg border border-gray-200"
  };
  
  // Add animation classes when searching
  const formClasses = `${baseFormClasses[variant]} transition-all duration-700 ease-out ${
    isSearching ? 'transform -translate-y-4 scale-[0.98] opacity-90' : ''
  }`;

  const buttonClasses = {
    default: "w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold text-white shadow-xl transition-all duration-300 py-3 text-base hover:shadow-2xl transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed",
    compact: "w-full bg-blue-600 hover:bg-blue-700 font-semibold text-white transition-all duration-200 py-3 text-sm disabled:opacity-70 disabled:cursor-not-allowed",
    expanded: "bg-blue-600 hover:bg-blue-700 font-semibold text-white transition-all duration-200 px-6 py-3 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
  };

  const gridClasses = {
    default: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4",
    compact: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3",
    expanded: "flex flex-wrap items-center gap-3"
  };
  
  // Calculate nights for display
  const calculateNights = () => {
    if (checkIn && checkOut && new Date(checkOut) > new Date(checkIn)) {
      return Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
    }
    return null;
  };
  
  const nights = calculateNights();
  
  return (
    <form onSubmit={handleSearch} className={formClasses}>
      {/* Single row of labels at the top - hide for expanded variant */}
      {variant !== 'expanded' && (
        <div className="hidden sm:flex justify-between mb-1 px-1 py-1">
          <span className="text-xs text-gray-600 font-semibold px-2 flex-1">Property</span>
          <span className="text-xs text-gray-600 font-semibold px-2 flex-1">Check-in Date</span>
          <span className="text-xs text-gray-600 font-semibold flex items-center px-2 flex-1">
            Check-out Date
            {nights && (
              <span className="ml-2 text-blue-600">({nights} night{nights !== 1 ? 's' : ''})</span>
            )}
          </span>
          <span className="text-xs text-gray-600 font-semibold px-2 flex-1">Guests</span>
        </div>
      )}
      
      <div className={gridClasses[variant]}>
        {/* Property Selection */}
        <div className={`relative ${variant === 'expanded' ? 'flex-1 min-w-[180px]' : ''}`}>
          <label className="sm:hidden block text-xs text-gray-600 font-semibold mb-1">Property</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-600" />
            <select 
              className={`w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white appearance-none text-gray-800 font-medium ${variant === 'expanded' ? 'text-sm py-2.5' : 'text-base'}`}
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
            >
              <option value="">All Properties</option>
              {staticProperties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name} - {property.location}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Check-in */}
        <div className={`relative ${variant === 'expanded' ? 'min-w-[140px]' : ''}`}>
          <label className="sm:hidden block text-xs text-gray-600 font-semibold mb-1">Check-in Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-600" />
            <input 
              type="date" 
              aria-label="Check-in date"
              className={`w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-800 font-medium ${variant === 'expanded' ? 'text-sm py-2.5' : 'text-base'}`}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                // If check-out date is before new check-in date, update it
                if (e.target.value > checkOut) {
                  const nextDay = new Date(e.target.value);
                  nextDay.setDate(nextDay.getDate() + 1);
                  setCheckOut(nextDay.toISOString().split('T')[0]);
                }
              }}
              min={new Date().toISOString().split('T')[0]} // Today's date
            />
          </div>
        </div>

        {/* Check-out */}
        <div className={`relative ${variant === 'expanded' ? 'min-w-[140px]' : ''}`}>
          <label className="sm:hidden block text-xs text-gray-600 font-semibold mb-1">
            Check-out Date {nights && <span className="text-blue-600">({nights} night{nights !== 1 ? 's' : ''})</span>}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-600" />
            <input 
              type="date" 
              aria-label="Check-out date"
              className={`w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-800 font-medium ${variant === 'expanded' ? 'text-sm py-2.5' : 'text-base'}`}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]} // Minimum is check-in date or today
            />
          </div>
        </div>
        {/* Guests */}
        <div className={`relative ${variant === 'expanded' ? 'min-w-[120px]' : ''}`}>
          <label className="sm:hidden block text-xs text-gray-600 font-semibold mb-1">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-600" />
            <select 
              className={`w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white text-gray-800 font-medium ${variant === 'expanded' ? 'text-sm py-2.5' : 'text-base'}`}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
            </select>
          </div>
        </div>

        {/* Search Button - inline for expanded variant */}
        {variant === 'expanded' && (
          <Button 
            type="submit"
            disabled={isSearching}
            className={`${buttonClasses[variant]} relative overflow-hidden group flex items-center`}
          >
            {isSearching ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                <span>Update</span>
              </>
            )}
          </Button>
        )}
      </div>

      {/* Search Button - full width for default/compact variants */}
      {variant !== 'expanded' && (
        <Button 
          type="submit"
          disabled={isSearching}
          className={`${buttonClasses[variant]} relative overflow-hidden group`}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
          {isSearching ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 relative z-10 animate-spin" />
              <span className="relative z-10">Searching properties...</span>
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2 relative z-10" />
              <span className="relative z-10">
                {checkIn && checkOut ? 
                  `Check Availability: ${formatDateForDisplay(checkIn, 'compact')} - ${formatDateForDisplay(checkOut, 'compact')}` : 
                  'Find Available Properties'}
              </span>
              {initialValues.checkIn && initialValues.checkOut && (checkIn !== initialValues.checkIn || checkOut !== initialValues.checkOut) && (
                <span className="ml-1 bg-yellow-400 text-yellow-800 text-xs px-2 py-0.5 rounded-full relative z-10">New Dates</span>
              )}
            </>
          )}
        </Button>
      )}
    </form>
  );
}
