'use client';

import { useState, useEffect, use, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, ArrowLeft, ExternalLink, MapPinIcon, ClockIcon, Users as UsersIcon, Calendar, Compass, Wifi, Car, Utensils, Wind, Dog, Dumbbell, Waves, Monitor, Coffee, CheckCircle2, Bed } from 'lucide-react';
import { ImageCarousel } from '@/components/ImageCarousel';
import { properties, getPropertyById, type Property, type RoomType } from '@/lib/properties-data';
import { generateBookingUrl } from '@/lib/booking-redirect';

// Map amenity names to icons and descriptions
const amenityConfig: Record<string, { icon: React.ReactNode, description: string }> = {
  'WiFi': { icon: <Wifi className="h-5 w-5" />, description: 'High-speed internet access' },
  'Parking': { icon: <Car className="h-5 w-5" />, description: 'Free on-site parking' },
  'Pool': { icon: <Waves className="h-5 w-5" />, description: 'Outdoor swimming pool' },
  'Room Service': { icon: <Coffee className="h-5 w-5" />, description: '24/7 in-room dining' },
  'Restaurant': { icon: <Utensils className="h-5 w-5" />, description: 'On-site gourmet dining' },
  'Air Conditioning': { icon: <Wind className="h-5 w-5" />, description: 'Climate control' },
  'Pet Friendly': { icon: <Dog className="h-5 w-5" />, description: 'Pets allowed' },
  'Gym': { icon: <Dumbbell className="h-5 w-5" />, description: 'Fitness center' },
  'Spa': { icon: <Waves className="h-5 w-5" />, description: 'Wellness spa' },
  'Conference Room': { icon: <Monitor className="h-5 w-5" />, description: 'Business facilities' },
};

export default function PropertyDetailsPage({ params }: { params: Promise<{ propertyId: string }> }) {
  const { propertyId } = use(params);
  const searchParams = useSearchParams();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Booking form state
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getMinDate = () => formatDate(new Date());

  // Initialize with defaults, will be updated from URL params in useEffect
  const [checkIn, setCheckIn] = useState(() => {
    const today = new Date();
    return formatDate(today);
  });
  const [checkOut, setCheckOut] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow);
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

  useEffect(() => {
    if (!propertyId) return;
    
    setLoading(true);
    const foundProperty = getPropertyById(propertyId);
    
    if (foundProperty) {
      setProperty(foundProperty);
      setError('');
    } else {
      setError('Property not found');
    }
    
    setLoading(false);
  }, [propertyId]);

  const handleBookNow = useCallback(() => {
    if (!property || !property.bookingEngineUrl) {
      alert(`Please call ${property?.contact || 'the hotel'} to make a reservation.`);
      return;
    }
    
    console.log('Booking params:', { checkIn, checkOut, guests });
    
    const bookingUrl = generateBookingUrl(property.bookingEngineUrl, {
      propertyId: property.id,
      checkIn,
      checkOut,
      guests: parseInt(guests)
    });
    
    console.log('Generated URL:', bookingUrl);
    
    window.open(bookingUrl, '_blank');
  }, [property, checkIn, checkOut, guests]);

  const handleGetDirections = () => {
    if (!property?.address) {
      alert('Address not available');
      return;
    }
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(property.address)}`;
    window.open(mapsUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="h-[60vh] bg-gray-100 animate-pulse" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Link href="/properties">
            <Button>Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navigation />

      {/* Hero Section - Immersive & Full Height */}
      <div className="relative h-[75vh] w-full bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0">
          <ImageCarousel 
            photos={property.photos || []} 
            alt={property.name}
            height="h-full"
            autoPlay={true}
            autoPlayInterval={6000}
          />
        </div>
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent" />

        {/* Top Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
          <Link href={`/properties?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}>
            <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-white transition-colors">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Properties
            </Button>
          </Link>
        </div>

        {/* Hero Content - Title & Location */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight text-shadow-sm font-serif text-white">
                {property.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-lg md:text-xl font-medium text-yellow-100/90">
                <div 
                  className="flex items-center cursor-pointer hover:text-yellow-300 transition-colors group"
                  onClick={handleGetDirections}
                  title="Get Directions"
                >
                  <MapPin className="h-5 w-5 mr-2 text-yellow-400 group-hover:scale-110 transition-transform" />
                  <span className="underline decoration-yellow-400/30 underline-offset-4 group-hover:decoration-yellow-300">{property.address || property.location}</span>
                </div>
                {property.contact && (
                  <div className="flex items-center group">
                    <Phone className="h-5 w-5 mr-2 text-yellow-400 group-hover:scale-110 transition-transform" />
                    <a href={`tel:${property.contact}`} className="hover:text-yellow-300 transition-colors underline decoration-yellow-400/30 underline-offset-4 hover:decoration-yellow-300">
                      {property.contact}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Details (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center text-emerald-950 font-serif">
                <span className="bg-emerald-900 text-yellow-300 p-2 rounded-lg mr-3">
                  <Compass className="h-6 w-6" />
                </span>
                About this stay
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                {property.description}
              </p>
            </section>

            <div className="h-px bg-emerald-100" />

            {/* Room Types */}
            {property.roomTypes && property.roomTypes.length > 0 && (
              <>
                <section>
                  <h2 className="text-2xl font-bold mb-8 flex items-center text-emerald-950 font-serif">
                    <span className="bg-emerald-900 text-yellow-300 p-2 rounded-lg mr-3">
                      <Bed className="h-6 w-6" />
                    </span>
                    Available Room Types
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {property.roomTypes.map((room) => (
                      <div key={room.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full group hover:border-emerald-200">
                        {/* Room Image Carousel */}
                        <div className="relative h-56 bg-slate-100">
                          <ImageCarousel 
                            photos={room.photos || []} 
                            alt={room.name}
                            height="h-full"
                            autoPlay={false}
                          />
                        </div>
                        
                        {/* Room Details */}
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-emerald-950 mb-2 font-serif group-hover:text-emerald-700 transition-colors">{room.name}</h3>
                            <p className="text-slate-600 mb-4 text-sm leading-relaxed line-clamp-2">{room.description}</p>
                            
                            {/* Room Info */}
                            <div className="flex flex-wrap gap-3 mb-4">
                              <div className="flex items-center text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                <Bed className="h-3.5 w-3.5 mr-1.5 text-yellow-600" />
                                <span className="text-xs font-medium">{room.bedType}</span>
                              </div>
                              <div className="flex items-center text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                <UsersIcon className="h-3.5 w-3.5 mr-1.5 text-yellow-600" />
                                <span className="text-xs font-medium">Max {room.maxGuests}</span>
                              </div>
                            </div>
                            
                            {/* Room Amenities */}
                            <div className="flex flex-wrap gap-1.5">
                              {room.amenities.slice(0, 4).map((amenity) => (
                                <span
                                  key={amenity}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-100"
                                >
                                  {amenity}
                                </span>
                              ))}
                              {room.amenities.length > 4 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-500 border border-slate-100">
                                  +{room.amenities.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="h-px bg-emerald-100" />
              </>
            )}

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-bold mb-8 text-emerald-950 font-serif">What this place offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-start p-4 rounded-xl bg-white hover:bg-emerald-50 transition-colors border border-slate-100 hover:border-emerald-200 shadow-sm">
                    <div className="mr-4 text-yellow-600 bg-emerald-50 p-3 rounded-full">
                      {amenityConfig[amenity]?.icon || <CheckCircle2 className="h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-emerald-950 text-lg">{amenity}</h3>
                      <p className="text-slate-500 mt-1">
                        {amenityConfig[amenity]?.description || 'Premium amenity included'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-px bg-emerald-100" />

            {/* Facilities */}
            <section>
              <h2 className="text-2xl font-bold mb-8 text-emerald-950 font-serif">Property Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: ClockIcon, title: "24/7 Service", desc: "Always here for you" },
                  { icon: UsersIcon, title: "Family Friendly", desc: "Spaces for everyone" },
                  { icon: Utensils, title: "Dining", desc: "Local flavors nearby" }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center group hover:border-emerald-200">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-50 text-yellow-600 rounded-full mb-4 group-hover:bg-emerald-100 transition-colors">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-emerald-950 mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-px bg-emerald-100" />

            {/* House Rules */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-emerald-950 font-serif">Things to know</h2>
              <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-emerald-950 mb-4">House Rules</h3>
                    <ul className="space-y-3 text-slate-600">
                      <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />Check-in: After 3:00 PM</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />Check-out: Before 11:00 AM</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />No smoking</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />Pets allowed</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-950 mb-4">Cancellation Policy</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Free cancellation until 24 hours before check-in. After that, cancel before check-in and get a full refund, minus the first night and service fee.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Sticky Booking (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl border border-yellow-600/10 overflow-hidden">
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold text-emerald-950 font-serif">Book your stay</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-emerald-800 tracking-wider">Check-in</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={getMinDate()}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none text-sm font-medium transition-all text-emerald-950"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase text-emerald-800 tracking-wider">Check-out</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            min={checkIn}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none text-sm font-medium transition-all text-emerald-950"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
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
                        <UsersIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                      if (!property || !property.bookingEngineUrl) {
                        alert(`Please call ${property?.contact || 'the hotel'} to make a reservation.`);
                        return;
                      }
                      
                      console.log('Current state:', { checkIn, checkOut, guests });
                      
                      const bookingUrl = property.bookingEngineUrl
                        .replace('{checkIn}', checkIn)
                        .replace('{checkOut}', checkOut)
                        .replace('{guests}', guests);
                      
                      console.log('Generated URL:', bookingUrl);
                      
                      window.open(bookingUrl, '_blank');
                    }}
                    className="w-full bg-emerald-900 hover:bg-emerald-800 text-yellow-300 py-6 text-lg font-bold rounded-xl shadow-lg shadow-emerald-900/20 transition-all hover:shadow-xl hover:-translate-y-0.5 border border-yellow-600/30"
                  >
                    {property?.bookingEngineUrl ? 'Check Availability' : 'Call to Book'}
                  </Button>

                  {property?.address && (
                    <Button
                      onClick={handleGetDirections}
                      variant="outline"
                      className="w-full py-6 border-2 border-emerald-100 text-emerald-800 hover:border-emerald-500 hover:bg-emerald-50 rounded-xl font-semibold transition-all"
                    >
                      <Compass className="mr-2 h-5 w-5" />
                      Get Directions
                    </Button>
                  )}

                  <div className="pt-6 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-500 mb-2">Questions about this property?</p>
                    <a href={`tel:${property?.contact}`} className="inline-flex items-center text-emerald-700 font-bold hover:text-emerald-800 transition-colors">
                      <Phone className="h-4 w-4 mr-2" />
                      {property?.contact}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
