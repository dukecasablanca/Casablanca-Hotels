'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { properties } from '@/lib/properties-data';
import { generateBookingUrl } from '@/lib/booking-redirect';
import { Calendar, Users, MapPin, ChevronRight, Phone, Compass } from 'lucide-react';
import React from 'react';
import { ImageCarousel } from '@/components/ImageCarousel';

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertiesPageContent />
    </Suspense>
  );
}

function PropertiesPageContent() {
  const searchParams = useSearchParams();
  
  // Initialize state from URL parameters or defaults
  const [checkIn, setCheckIn] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [checkOut, setCheckOut] = useState(() => {
    const tomorrow = new Date(Date.now() + 86400000);
    return tomorrow.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState('1');
  
  // Read URL parameters on mount and when they change
  useEffect(() => {
    const checkInParam = searchParams.get('checkIn');
    const checkOutParam = searchParams.get('checkOut');
    const guestsParam = searchParams.get('guests');
    
    if (checkInParam) {
      // Clean the checkIn param of any cache busting parameters
      const cleanCheckIn = checkInParam.includes('?') 
        ? checkInParam.split('?')[0] 
        : checkInParam;
      setCheckIn(cleanCheckIn);
    }
    
    if (checkOutParam) {
      setCheckOut(checkOutParam);
    }
    
    if (guestsParam) {
      setGuests(guestsParam);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navigation />

      {/* Hero Section - Modern & Clean */}
      <section className="relative py-20 md:py-32 bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/90 via-emerald-900/80 to-emerald-950/95" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight font-serif">
            Our <span className="text-yellow-300">Properties</span>
          </h1>
          <p className="text-lg md:text-xl text-yellow-100/80 max-w-2xl mx-auto mb-10 font-light">
            Comfortable and affordable hotels across Southern California. Choose from our locations in Orange, Azusa, Corona, Riverside, and more.
          </p>
        </div>
      </section>

      {/* Search Section - Floating Card */}
      <section className="relative -mt-16 pb-12 z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-yellow-600/10 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-emerald-800 tracking-wider">Check-in</label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none text-sm font-medium transition-all text-emerald-950"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-emerald-800 tracking-wider">Check-out</label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none text-sm font-medium transition-all text-emerald-950"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-emerald-800 tracking-wider">Guests</label>
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none text-sm font-medium appearance-none transition-all text-emerald-950"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                  <Users className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600 pointer-events-none" />
                </div>
              </div>
              <div>
                <Button
                  onClick={() => {
                    if (checkIn && checkOut) {
                      document.getElementById('properties-list')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full bg-emerald-900 hover:bg-emerald-800 text-yellow-300 py-6 text-lg font-bold rounded-xl shadow-lg shadow-emerald-900/20 transition-all hover:shadow-xl hover:-translate-y-0.5 border border-yellow-600/30"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties List */}
      <section id="properties-list" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-emerald-950 font-serif">Available Properties</h2>
            <div className="h-px flex-1 bg-emerald-100 ml-8 hidden md:block" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card key={property.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col bg-white rounded-2xl ring-1 ring-slate-100">
                {/* Image Carousel */}
                <div className="relative h-64 bg-slate-200 overflow-hidden">
                  <ImageCarousel 
                    photos={property.photos || []} 
                    alt={property.name}
                    height="h-64"
                    autoPlay={false}
                  />
                </div>

                {/* Content */}
                <CardContent className="flex-1 flex flex-col p-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors font-serif">{property.name}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {property.address && (
                          <a 
                            href={`https://www.google.com/maps/search/${encodeURIComponent(property.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-emerald-600 hover:text-emerald-900 hover:bg-emerald-50 rounded-full transition-all"
                            title="Get Directions"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Compass className="w-5 h-5" />
                          </a>
                        )}
                        {property.contact && (
                          <a 
                            href={`tel:${property.contact}`}
                            className="p-2 text-emerald-600 hover:text-emerald-900 hover:bg-emerald-50 rounded-full transition-all"
                            title="Call Property"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Phone className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-slate-500 text-sm mt-2">
                      <MapPin className="w-4 h-4 mr-1.5 text-yellow-600" />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-6 line-clamp-2 text-sm leading-relaxed">{property.description}</p>

                  {/* Amenities Preview */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {property.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-100"
                      >
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-50 text-slate-500 text-xs font-medium border border-slate-100">
                        +{property.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mt-auto space-y-3 pt-6 border-t border-slate-100">
                    <a href={`/properties/${property.id}/details?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`} className="block">
                      <Button
                        variant="outline"
                        className="w-full border-emerald-200 text-emerald-800 hover:border-emerald-500 hover:bg-emerald-50 font-semibold py-5 rounded-xl transition-all"
                      >
                        View Details
                      </Button>
                    </a>
                    
                    <Button
                      onClick={() => {
                        if (!checkIn || !checkOut) {
                          alert('Please select check-in and check-out dates first');
                          return;
                        }
                        const bookingUrl = generateBookingUrl(property.bookingEngineUrl, {
                          propertyId: property.id,
                          checkIn,
                          checkOut,
                          guests: parseInt(guests) || 1
                        });
                        window.open(bookingUrl, '_blank');
                      }}
                      className="w-full bg-emerald-900 hover:bg-emerald-800 text-yellow-300 font-bold py-5 rounded-xl shadow-md shadow-emerald-900/10 transition-all hover:shadow-lg hover:-translate-y-0.5 border border-yellow-600/30"
                    >
                      Book Now <ChevronRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 to-emerald-900/90" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight font-serif">Can't find what you're looking for?</h2>
          <p className="text-lg text-yellow-100/80 mb-10 max-w-2xl mx-auto">
            Our concierge team is here to help you find the perfect accommodation for your stay.
          </p>
          <Button className="bg-yellow-500 text-emerald-950 hover:bg-yellow-400 px-10 py-6 rounded-xl font-bold text-lg shadow-xl transition-all hover:scale-105">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
