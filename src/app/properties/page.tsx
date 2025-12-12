'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { properties } from '@/lib/properties-data';
import { generateBookingUrl } from '@/lib/booking-redirect';
import { Calendar, Users, MapPin, ChevronRight, Phone } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-8 bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-950 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Properties</h1>
          <p className="text-lg text-yellow-300/80">
            Discover our collection of premium accommodations
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Search & Book</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Check-in
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Check-out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                />
              </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Users className="inline w-4 h-4 mr-1" />
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                >
                  {[1, 2].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
              <div>
                <Button
                  onClick={() => {
                    if (checkIn && checkOut) {
                      document.getElementById('properties-list')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-green-950 text-yellow-400 border border-yellow-600/50"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties List */}
      <section id="properties-list" className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                {/* Image Carousel */}
                <div className="relative h-48 bg-gradient-to-br from-emerald-800 to-green-950 overflow-hidden">
                  <ImageCarousel 
                    photos={property.photos || []} 
                    alt={property.name}
                    height="h-48"
                    autoPlay={true}
                    autoPlayInterval={5000}
                  />
                </div>                {/* Content */}
                <CardHeader className="pb-3">
                  <h3 className="text-xl font-bold text-gray-900">{property.name}</h3>
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col justify-between">
                  <p className="text-gray-700 mb-4">{property.description}</p>

                  {(property.contact || property.address) && (
                    <div className="text-sm text-gray-600 mb-4">
                      {property.contact && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          <a href={`tel:${property.contact}`} className="underline">{property.contact}</a>
                        </div>
                      )}
                      {property.address && (
                        <div className="flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{property.address}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="inline-block bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Details Button */}
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
                      window.location.href = bookingUrl;
                    }}
                    className="w-full bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-green-950 text-yellow-400 border border-yellow-600/50 font-semibold"
                  >
                    View Details & Book
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-lg text-yellow-300/80 mb-8">Contact our team for more information</p>
          <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-emerald-900 hover:from-yellow-400 hover:to-yellow-500 px-8 py-3 border border-yellow-400/50 font-semibold">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
