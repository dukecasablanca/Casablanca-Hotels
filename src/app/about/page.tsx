'use client';

import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, Shield, Star, Clock, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-950 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-yellow-400">Casa Blanca</span>
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100/80">
              Your trusted partner for luxury accommodations in Los Angeles
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Casa Blanca Hotels has been connecting travelers with quality, 
                luxury accommodations across Los Angeles. We believe that everyone deserves 
                a premium place to stay that feels like home.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide travelers with easy access to elegant, comfortable, and luxurious 
                  hotel accommodations while delivering exceptional service and memorable experiences.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the leading boutique hotel collection in Los Angeles, known for our elegance, 
                  personalized service, and commitment to creating unforgettable stays.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-800 mb-2">10+</div>
                <div className="text-gray-600">Premium Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-800 mb-2">50K+</div>
                <div className="text-gray-600">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-800 mb-2">100K+</div>
                <div className="text-gray-600">Nights Booked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">4.8</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-emerald-900/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and help us deliver the best experience for our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-emerald-800" />
                </div>
                <CardTitle>Trust & Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every property is verified and all transactions are secure, ensuring your safety and peace of mind.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle>Quality First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We work only with motels that meet our high standards for cleanliness, comfort, and service.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-emerald-700" />
                </div>
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our customer support team is available around the clock to help with any questions or issues.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-yellow-400/80">&copy; 2025 Casa Blanca Hotels. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
