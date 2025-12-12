// Static properties data for frontend-only website
export interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  // Optional Cloudinary collection or gallery link for property images
  galleryCollection?: string;
  // Optional array of photos for carousels / galleries
  photos?: {
    id: string;
    url: string;
    isMain?: boolean;
  }[];
  // Optional contact phone number for the property
  contact?: string;
  // Optional full address for the property
  address?: string;
  bookingEngineUrl: string;
  amenities: string[];
}

export const properties: Property[] = [
  {
    id: "casa-camino",
    name: "Casa Camino Hotel - Orange",
    description: "A charming and comfortable hotel with excellent amenities and warm hospitality",
    location: "Los Angeles, CA",
    image: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/1.jpg",
    galleryCollection: "https://collection.cloudinary.com/dyskxbejq/71046c512c2ca17979f217c6356e1664",
    photos: [
      { id: "orange-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/1.jpg", isMain: true },
      { id: "orange-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/2.jpg" },
      { id: "orange-3", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/3.jpg" },
      { id: "orange-4", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/4.jpg" },
      { id: "orange-5", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/5.jpg" },
      { id: "orange-6", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/6.jpg" },
      { id: "orange-7", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/7.jpg" },
      { id: "orange-8", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/8.jpg" },
      { id: "orange-9", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/9.jpg" },
      { id: "orange-10", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/10.jpg" },
      { id: "orange-11", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/11.jpg" }
    ],
    contact: "7146391121",
    address: "1930 East Katella Avenue, Orange, CA 92857, United States",
    // Additional photos will be appended here
    bookingEngineUrl: "https://booking.hotelkeyapp.com/#/booking/select-rooms?pc=0717&from={checkIn}&to={checkOut}&guests={guests}&skip_search=true&property_id=05ffa925-1976-43ba-b56b-148937916180&url=http%3A%2F%2Fwww.casacaminohotel.com%2F",
    amenities: ["WiFi", "Parking", "Room Service", "Pool", "Restaurant"]
  },
  // Add more properties here
  // {
  //   id: "property-2",
  //   name: "Property Name",
  //   description: "Description",
  //   location: "Location",
  //   image: "/properties/property-2.jpg",
  //   bookingEngineUrl: "https://booking.hotelkeyapp.com/#/booking/...",
  //   amenities: ["WiFi", "Parking"]
  // }
];

// Casa Blanca Hotel - Azusa
properties.push({
  id: "casa-blanca-azusa",
  name: "Casa Blanca Hotel - Azusa",
  description: "Comfortable rooms and warm hospitality in Azusa, California.",
  location: "Azusa, CA",
  image: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/1_azusa.jpg",
  photos: [
    { id: "azusa-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/1_azusa.jpg", isMain: true },
    { id: "azusa-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/2_azusa.jpg" },
    { id: "azusa-3", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/3_azusa.jpg" },
    { id: "azusa-4", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/4_azusa.jpg" },
    { id: "azusa-5", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/5_azusa.jpg" },
    { id: "azusa-6", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/6_azusa.jpg" },
    { id: "azusa-7", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/7_azusa.jpg" },
    { id: "azusa-8", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/8_azusa.jpg" },
    { id: "azusa-9", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/9_azusa.jpg" },
    { id: "azusa-10", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/10_azusa.jpg" },
    { id: "azusa-11", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/11_azusa.jpg" }
  ],
  bookingEngineUrl: "",
  contact: "6269667777",
  address: "469 East Arrow Highway, Azusa, CA 91702, United States",
  amenities: ["WiFi", "Parking", "Air Conditioning", "Pet Friendly"]
});

// Casa Blanca Hotel - Corona
properties.push({
  id: "casa-blanca-corona",
  name: "Casa Blanca Hotel - Corona",
  description: "Comfortable rooms and friendly service in Corona, California.",
  location: "Corona, CA",
  image: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/1_corona.jpg",
  photos: [
    { id: "corona-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/1_corona.jpg", isMain: true },
    { id: "corona-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/2_corona.jpg" },
    { id: "corona-3", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/3_corona.jpg" },
    { id: "corona-4", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/4_corona.jpg" },
    { id: "corona-5", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/5_corona.jpg" },
    { id: "corona-6", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/6_corona.jpg" },
    { id: "corona-7", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/7_corona.jpg" },
    { id: "corona-8", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/8_corona.jpg" }
  ],
  bookingEngineUrl: "",
  contact: "9715551234",
  address: "210 South Lincoln Avenue, Corona, CA 92882, United States",
  amenities: ["WiFi", "Parking", "Air Conditioning"]
});

// Casa Valentine Inn - Los Angeles
properties.push({
  id: "casa-valentine-los-angeles",
  name: "Casa Valentine Inn - Los Angeles",
  description: "Cozy inn with comfortable rooms and friendly service in Los Angeles.",
  location: "Los Angeles, CA",
  image: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765495759/1_vale.jpg",
  photos: [
    { id: "vale-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765495759/1_vale.jpg", isMain: true },
    { id: "vale-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765495759/2_vale.jpg" },
    { id: "vale-3", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765495759/3_vale.jpg" },
    { id: "vale-4", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765495759/4_vale.jpg" },
    { id: "vale-5", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765495759/5_vale.jpg" }
  ],
  bookingEngineUrl: "",
  contact: "3103070111",
  address: "8210 Avalon Boulevard, South Los Angeles, Los Angeles, CA 90003, United States",
  amenities: ["WiFi", "Parking", "Air Conditioning"]
});

// Casa Playa Inn Suites
properties.push({
  id: "casa-playa-inn-suites",
  name: "Casa Playa Inn Suites",
  description: "Comfortable suites near the coast with friendly service and modern amenities.",
  location: "California",
  image: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/1_playa.jpg",
  photos: [
    { id: "playa-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/1_playa.jpg", isMain: true },
    { id: "playa-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/2_playa.jpg" },
    { id: "playa-3", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/3_playa.jpg" },
    { id: "playa-4", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/4_playa.jpg" },
    { id: "playa-5", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/5_playa.jpg" },
    { id: "playa-6", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/6_playa.jpg" },
    { id: "playa-7", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/7_playa.jpg" },
    { id: "playa-8", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/8_playa.jpg" },
    { id: "playa-9", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/9_playa.jpg" },
    { id: "playa-10", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/10_playa.jpg" },
    { id: "playa-11", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/11_playa.jpg" },
    { id: "playa-12", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/12_playa.jpg" },
    { id: "playa-13", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/13_playa.jpg" },
    { id: "playa-14", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/14_playa.jpg" },
    { id: "playa-15", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/15_playa.jpg" }
  ],
  bookingEngineUrl: "",
  contact: "7148266060",
  address: "10301 Beach Boulevard, Stanton, CA 90680, United States",
  amenities: ["WiFi", "Parking", "Pool", "Air Conditioning"]
});

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(p => p.id === id);
};

export const getAllProperties = (): Property[] => {
  return properties;
};
