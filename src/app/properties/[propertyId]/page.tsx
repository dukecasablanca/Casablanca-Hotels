'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, Users, Wifi, Car, Coffee, CheckCircle2, Phone, ArrowLeft, ExternalLink } from 'lucide-react';
import { ImageCarousel } from '@/components/ImageCarousel';
import { properties, getPropertyById, type Property } from '@/lib/properties-data';
import { generateBookingUrl } from '@/lib/booking-redirect';

// Map amenity names to icons
const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="h-5 w-5" />,
  'Parking': <Car className="h-5 w-5" />,
  'Pool': <Coffee className="h-5 w-5" />,
  'Room Service': <Coffee className="h-5 w-5" />,
  'Restaurant': <Coffee className="h-5 w-5" />,
  'Air Conditioning': <CheckCircle2 className="h-5 w-5" />,
  'Pet Friendly': <CheckCircle2 className="h-5 w-5" />,
};

export default function PropertyDetailsPage({ params }: { params: Promise<{ propertyId: string }> }) {
  const router = useRouter();
  const { propertyId } = use(params);
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Booking form state
  const [checkIn, setCheckIn] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [checkOut, setCheckOut] = useState(() => {
    const tomorrow = new Date(Date.now() + 86400000);
    return tomorrow.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState('1');

  // Load property from static data
  useEffect(() => {
    if (!propertyId) return;
    
    setLoading(true);
    
    // Get property from static data
    const foundProperty = getPropertyById(propertyId);
    
    if (foundProperty) {
      setProperty(foundProperty);
      setError('');
    } else {
      setError('Property not found');
    }
    
    // Check URL parameters for dates
    const urlParams = new URLSearchParams(window.location.search);
    const checkInParam = urlParams.get('checkIn');
    const checkOutParam = urlParams.get('checkOut');
    const guestsParam = urlParams.get('guests');
    
    if (checkInParam) {
      const cleanCheckIn = checkInParam.includes('?') ? checkInParam.split('?')[0] : checkInParam;
      setCheckIn(cleanCheckIn);
    }
    if (checkOutParam) setCheckOut(checkOutParam);
    if (guestsParam) setGuests(guestsParam);
    
    setLoading(false);
  }, [propertyId]);

  // Handle booking redirect to external booking engine
  const handleBookNow = () => {
    if (!property || !property.bookingEngineUrl) {
      // If no booking URL, show contact info or fallback
      alert(`Please call ${property?.contact || 'the hotel'} to make a reservation.`);
      return;
    }
    
    const bookingUrl = generateBookingUrl(property.bookingEngineUrl, {
      propertyId: property.id,
      checkIn,
      checkOut,
      guests: parseInt(guests)
    });
    
    window.open(bookingUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-8">The property you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/properties">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/properties" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
        </Link>
      </div>

      {/* Property Header */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.name}</h1>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            <span>{property.address || property.location}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="h-[400px] bg-gradient-to-br from-blue-400 to-purple-500">
                <ImageCarousel 
                  photos={property.photos || []} 
                  alt={property.name}
                  height="h-[400px]"
                  autoPlay={true}
                  autoPlayInterval={5000}
                />
              </div>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-blue-600">
                        {amenityIcons[amenity] || <CheckCircle2 className="h-5 w-5" />}
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            {property.contact && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <a 
                      href={`tel:${property.contact}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {property.contact}
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Book Your Stay</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                
                {/* Check-in Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Check-out Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline w-4 h-4 mr-1" />
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                {/* Book Now Button */}
                <Button 
                  onClick={handleBookNow}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold"
                >
                  {property.bookingEngineUrl ? (
                    <>
                      Book Now <ExternalLink className="ml-2 h-5 w-5" />
                    </>
                  ) : (
                    <>
                      Call to Book <Phone className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                {/* Contact Info */}
                {property.contact && (
                  <div className="text-center pt-4 border-t">
                    <p className="text-sm text-gray-500 mb-2">Questions? Call us directly</p>
                    <a 
                      href={`tel:${property.contact}`}
                      className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                    >
                      {property.contact}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience {property.name}?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Book your stay today and enjoy our premium amenities, comfortable rooms, and exceptional service.
          </p>
          <Button 
            onClick={handleBookNow}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8"
          >
            {property.bookingEngineUrl ? 'Reserve Now' : 'Contact Us'}
          </Button>
        </div>
      </section>
    </div>
  );
}
