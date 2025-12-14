// Static properties data for frontend-only website

export interface RoomType {
  id: string;
  name: string;
  description: string;
  maxGuests: number;
  bedType: string;
  photos: {
    id: string;
    url: string;
    isMain?: boolean;
  }[];
  amenities: string[];
}

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
  // Room types available at this property
  roomTypes?: RoomType[];
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
    location: "Orange, CA",
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
    roomTypes: [
      {
        id: "orange-standard-king",
        name: "Standard King Room",
        description: "Comfortable room with a king-size bed, perfect for couples or solo travelers.",
        maxGuests: 2,
        bedType: "1 King Bed",
        photos: [
          { id: "orange-room1-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/2.jpg", isMain: true },
          { id: "orange-room1-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/3.jpg" }
        ],
        amenities: ["WiFi", "TV", "Air Conditioning", "Private Bathroom"]
      },
      {
        id: "orange-double-queen",
        name: "Double Queen Room",
        description: "Spacious room with two queen-size beds, ideal for families or groups.",
        maxGuests: 4,
        bedType: "2 Queen Beds",
        photos: [
          { id: "orange-room2-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/4.jpg", isMain: true },
          { id: "orange-room2-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/5.jpg" }
        ],
        amenities: ["WiFi", "TV", "Air Conditioning", "Private Bathroom", "Microwave"]
      },
      {
        id: "orange-suite",
        name: "King Suite",
        description: "Premium suite with separate living area, kitchenette, and upgraded amenities.",
        maxGuests: 4,
        bedType: "1 King Bed + Sofa Bed",
        photos: [
          { id: "orange-room3-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/6.jpg", isMain: true },
          { id: "orange-room3-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/7.jpg" }
        ],
        amenities: ["WiFi", "TV", "Air Conditioning", "Private Bathroom", "Kitchenette", "Sofa", "Work Desk"]
      },
      {
        id: "orange-spa-bath-king",
        name: "Spa Bath King Room",
        description: "Luxurious room with a king-size bed and premium spa bathroom with soaking tub.",
        maxGuests: 2,
        bedType: "1 King Bed",
        photos: [
          { id: "orange-room4-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/8.jpg", isMain: true },
          { id: "orange-room4-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765485235/9.jpg" }
        ],
        amenities: ["WiFi", "TV", "Air Conditioning", "Private Bathroom", "Spa Tub", "Soaking Tub"]
      }
    ],
    // Additional photos will be appended here
    bookingEngineUrl: "https://booking.hotelkeyapp.com/#/booking/select-rooms?pc=0717&from={checkIn}&to={checkOut}&guests={guests}&skip_search=true&property_id=05ffa925-1976-43ba-b56b-148937916180",
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
  bookingEngineUrl: "https://booking.hotelkeyapp.com/#/booking/select-rooms?pc=1154&from={checkIn}&to={checkOut}&guests={guests}&skip_search=true&property_id=9a4164db-d132-4e98-8299-226c26fcf6e3",
  contact: "6269667777",
  address: "469 East Arrow Highway, Azusa, CA 91702, United States",
  roomTypes: [
    {
      id: "azusa-standard-king",
      name: "Standard King Room",
      description: "Cozy room with a comfortable king-size bed.",
      maxGuests: 2,
      bedType: "1 King Bed",
      photos: [
        { id: "azusa-room1-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/2_azusa.jpg", isMain: true },
        { id: "azusa-room1-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/3_azusa.jpg" }
      ],
      amenities: ["WiFi", "TV", "Air Conditioning", "Private Bathroom"]
    },
    {
      id: "azusa-deluxe-king",
      name: "Deluxe King Room",
      description: "Premium room with a king-size bed and upgraded amenities.",
      maxGuests: 2,
      bedType: "1 King Bed",
      photos: [
        { id: "azusa-room2-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/4_azusa.jpg", isMain: true },
        { id: "azusa-room2-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/5_azusa.jpg" }
      ],
      amenities: ["WiFi", "TV", "Air Conditioning", "Private Bathroom", "Pet Friendly"]
    },
    {
      id: "azusa-standard-double",
      name: "Standard Double Room",
      description: "Comfortable room with two double beds.",
      maxGuests: 4,
      bedType: "2 Double Beds",
      photos: [
        { id: "azusa-room3-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/6_azusa.jpg", isMain: true },
        { id: "azusa-room3-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497058/7_azusa.jpg" }
      ],
      amenities: ["WiFi", "TV", "Air Conditioning", "Private Bathroom"]
    }
  ],
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
  bookingEngineUrl: "https://booking.hotelkeyapp.com/#/booking/select-rooms?pc=1204&from={checkIn}&to={checkOut}&guests={guests}&skip_search=true&property_id=6b228ec1-3c20-40a8-aac0-e150d69235db",
  contact: "9715551234",
  address: "210 South Lincoln Avenue, Corona, CA 92882, United States",
  roomTypes: [
    {
      id: "corona-standard-king",
      name: "Standard King Room",
      description: "Comfortable room with a king-size bed and modern amenities.",
      maxGuests: 2,
      bedType: "1 King Bed",
      photos: [
        { id: "corona-room1-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/2_corona.jpg", isMain: true },
        { id: "corona-room1-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/3_corona.jpg" }
      ],
      amenities: ["WiFi", "TV", "Air Conditioning", "Private Bathroom"]
    },
    {
      id: "corona-one-bedroom-suite",
      name: "One Bedroom Suite",
      description: "Spacious suite with a separate bedroom and living area.",
      maxGuests: 3,
      bedType: "1 Queen Bed",
      photos: [
        { id: "corona-room2-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/4_corona.jpg", isMain: true },
        { id: "corona-room2-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/5_corona.jpg" }
      ],
      amenities: ["WiFi", "TV", "Air Conditioning", "Private Bathroom", "Living Area"]
    },
    {
      id: "corona-standard-double-queen",
      name: "Standard Double Queen Room",
      description: "Perfect for families with two queen-size beds.",
      maxGuests: 4,
      bedType: "2 Queen Beds",
      photos: [
        { id: "corona-room3-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/6_corona.jpg", isMain: true },
        { id: "corona-room3-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765498583/7_corona.jpg" }
      ],
      amenities: ["WiFi", "TV", "Air Conditioning", "Private Bathroom"]
    }
  ],
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
  bookingEngineUrl: "https://www.booking.com/hotel/us/casa-valentine-inn-los-angeles.html",
  contact: "3103070111",
  address: "8210 Avalon Boulevard, South Los Angeles, Los Angeles, CA 90003, United States",
  roomTypes: [
    {
      id: "vale-standard-king",
      name: "Standard King Room",
      description: "Cozy room with a comfortable king-size bed.",
      maxGuests: 2,
      bedType: "1 King Bed",
      photos: [
        { id: "vale-room1-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765495759/2_vale.jpg", isMain: true },
        { id: "vale-room1-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765495759/3_vale.jpg" }
      ],
      amenities: ["WiFi", "TV", "Air Conditioning", "Private Bathroom"]
    }
  ],
  amenities: ["WiFi", "Parking", "Air Conditioning"]
});

// Casa Playa Inn Suites
properties.push({
  id: "casa-playa-inn-suites",
  name: "Casa Playa Inn Suites",
  description: "Comfortable suites near the coast with friendly service and modern amenities.",
  location: "Anaheim, CA",
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
  bookingEngineUrl: "https://www.booking.com/hotel/us/ramona-motel-stanton.html",
  contact: "7148266060",
  address: "10301 Beach Boulevard, Stanton, CA 90680, United States",
  roomTypes: [
    {
      id: "playa-deluxe-king",
      name: "Deluxe King Room",
      description: "Elegant room with a king-size bed, premium amenities, and modern decor.",
      maxGuests: 2,
      bedType: "1 King Bed",
      photos: [
        { id: "playa-room1-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/2_playa.jpg", isMain: true },
        { id: "playa-room1-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/3_playa.jpg" }
      ],
      amenities: ["WiFi", "TV", "Air Conditioning", "Private Bathroom", "Pool Access"]
    },
    {
      id: "playa-king-suite",
      name: "King Suite",
      description: "Spacious suite with a king-size bed and separate living area.",
      maxGuests: 3,
      bedType: "1 King Bed",
      photos: [
        { id: "playa-room2-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/4_playa.jpg", isMain: true },
        { id: "playa-room2-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765497647/5_playa.jpg" }
      ],
      amenities: ["WiFi", "TV", "Air Conditioning", "Private Bathroom", "Pool Access", "Sitting Area"]
    }
  ],
  amenities: ["WiFi", "Parking", "Pool", "Air Conditioning"]
});

// Casa Blanca Inn - Whittier
properties.push({
  id: "casa-blanca-whittier",
  name: "Casa Blanca Inn - Whittier",
  description: "Comfortable Accommodations: Casa Blanca Inn in Whittier offers family rooms with private bathrooms, city views, and modern amenities. Each room includes a refrigerator, work desk, free toiletries, microwave, shower, and TV. Essential Facilities: Guests enjoy free WiFi, a hot tub, and a 24-hour front desk. Free on-site private parking is available, ensuring convenience for all visitors. Prime Location: Located 16 mi from Long Beach Airport, the hotel is near attractions such as Whittier College (1.5 mi), Heritage Park (3.7 mi), and Amc Theaters (5 mi). Guests appreciate the value for money, quietness of the area, and attentive property staff.",
  location: "Whittier, CA",
  image: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/1_Whittier.jpg",
  photos: [
    { id: "whittier-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/1_Whittier.jpg", isMain: true },
    { id: "whittier-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/2_Whittier.jpg" },
    { id: "whittier-3", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/3_Whittier.jpg" },
    { id: "whittier-4", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/4_Whittier.jpg" },
    { id: "whittier-5", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/5_Whittier.jpg" },
    { id: "whittier-6", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/6_Whittier.jpg" },
    { id: "whittier-7", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/7_Whittier.jpg" },
    { id: "whittier-8", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/8_Whittier.jpg" },
    { id: "whittier-9", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/9_Whittier.jpg" },
    { id: "whittier-10", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/10_Whittier.jpg" },
    { id: "whittier-11", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/11_Whittier.jpg" },
    { id: "whittier-12", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/12_Whittier.jpg" },
    { id: "whittier-13", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/13_Whittier.jpg" },
    { id: "whittier-14", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/14_Whittier.jpg" },
    { id: "whittier-15", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/15_Whittier.jpg" },
    { id: "whittier-16", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/16_Whittier.jpg" },
    { id: "whittier-17", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/17_Whittier.jpg" }
  ],
  bookingEngineUrl: "https://www.booking.com/hotel/us/blue-pacific-motel.html",
  contact: "5629680000",
  address: "12702 Whittier Boulevard, Whittier, CA 90602, United States",
  roomTypes: [
    {
      id: "whittier-king-studio",
      name: "King Studio",
      description: "500 sq ft entire studio with king bed, city view, bathtub, private bathroom, refrigerator, microwave, and private entrance.",
      maxGuests: 2,
      bedType: "1 King Bed",
      photos: [
        { id: "whittier-room1-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/2_Whittier.jpg", isMain: true },
        { id: "whittier-room1-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/3_Whittier.jpg" }
      ],
      amenities: ["Free WiFi", "TV", "Bathtub", "Private Bathroom", "Refrigerator", "Microwave", "Desk", "Private Entrance", "Hardwood Floors"]
    },
    {
      id: "whittier-standard-king",
      name: "Standard King Room",
      description: "350 sq ft room with king bed, air conditioning, city view, flat-screen TV, bathtub, and private bathroom.",
      maxGuests: 2,
      bedType: "1 King Bed",
      photos: [
        { id: "whittier-room2-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/4_Whittier.jpg", isMain: true },
        { id: "whittier-room2-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/5_Whittier.jpg" }
      ],
      amenities: ["Free WiFi", "Air Conditioning", "City View", "Flat-screen TV", "Bathtub", "Private Bathroom"]
    },
    {
      id: "whittier-king-suite",
      name: "King Suite",
      description: "425 sq ft private suite with king bed, air conditioning, city view, flat-screen TV, bathtub, and private bathroom.",
      maxGuests: 2,
      bedType: "1 King Bed",
      photos: [
        { id: "whittier-room3-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/6_Whittier.jpg", isMain: true },
        { id: "whittier-room3-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/7_Whittier.jpg" }
      ],
      amenities: ["Free WiFi", "Air Conditioning", "City View", "Flat-screen TV", "Bathtub", "Private Bathroom", "Private Suite"]
    },
    {
      id: "whittier-two-bedroom-suite",
      name: "Two-Bedroom Suite",
      description: "600 sq ft private suite with two bedrooms, each with a king bed. City view, bathtub, and private bathroom.",
      maxGuests: 4,
      bedType: "2 King Beds",
      photos: [
        { id: "whittier-room4-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/8_Whittier.jpg", isMain: true },
        { id: "whittier-room4-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765734508/9_Whittier.jpg" }
      ],
      amenities: ["Free WiFi", "City View", "TV", "Bathtub", "Private Bathroom", "Private Suite", "Two Bedrooms"]
    }
  ],
  amenities: ["WiFi", "Parking", "Hot Tub", "Air Conditioning", "Family Rooms", "24-Hour Front Desk"]
});

// Casa Blanca Express & Suites - Cypress
properties.push({
  id: "casa-blanca-cypress",
  name: "Casa Blanca Express & Suites - Cypress",
  description: "Comfortable Accommodations: Casa Blanca Express & Suites - Cypress in Cypress offers comfortable rooms with air-conditioning, private bathrooms, refrigerators, work desks, showers, and TVs. Guests enjoy free on-site private parking and a 24-hour front desk. Convenient Location: Located 7.5 mi from Long Beach Airport, the hotel is near attractions such as Knotts Berry Farm (2.9 mi), Knott's Soak City (2.4 mi), and Adventure City (3.1 mi). Other nearby points include Cerritos Center for the Performing Arts (4.3 mi) and Stanton Central Park (3.1 mi). Guest Services: Guests appreciate the friendly host, attentive property staff, and excellent service support. The hotel ensures a comfortable stay with its comfortable rooms and excellent service.",
  location: "Cypress, CA",
  image: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/1_cypress.jpg",
  photos: [
    { id: "cypress-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/1_cypress.jpg", isMain: true },
    { id: "cypress-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/2_cypress.jpg" },
    { id: "cypress-3", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/3_cypress.jpg" },
    { id: "cypress-4", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/4_cypress.jpg" },
    { id: "cypress-5", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/5_cypress.jpg" },
    { id: "cypress-6", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/6_cypress.jpg" },
    { id: "cypress-7", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/7_cypress.jpg" },
    { id: "cypress-8", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/8_cypress.jpg" },
    { id: "cypress-9", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/9_cypress.jpg" },
    { id: "cypress-10", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/10_cypress.jpg" },
    { id: "cypress-11", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/11_cypress.jpg" },
    { id: "cypress-12", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/12_cypress.jpg" },
    { id: "cypress-13", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/13_cypress.jpg" }
  ],
  bookingEngineUrl: "https://www.booking.com/hotel/us/royal-inn-motel-cypress.html",
  contact: "5629680000",
  address: "6112 Lincoln Avenue, Cypress, CA 90630, United States",
  roomTypes: [
    {
      id: "cypress-standard-king",
      name: "Standard King Room",
      description: "325 sq ft room with king bed, air conditioning, flat-screen TV, attached bathroom with bathtub or shower, refrigerator, and desk.",
      maxGuests: 2,
      bedType: "1 King Bed",
      photos: [
        { id: "cypress-room1-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/2_cypress.jpg", isMain: true },
        { id: "cypress-room1-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733958/3_cypress.jpg" }
      ],
      amenities: ["Air Conditioning", "Flat-screen TV", "Attached Bathroom", "Bathtub or Shower", "Refrigerator", "Desk", "Towels", "Satellite Channels"]
    }
  ],
  amenities: ["WiFi", "Parking", "Air Conditioning", "Private Bathrooms", "Work Desk", "24-Hour Front Desk"]
});

// Regency Hotel - Moreno Valley
properties.push({
  id: "regency-hotel-moreno-valley",
  name: "Regency Hotel - Moreno Valley",
  description: "Featuring an outdoor pool, Regency Hotel - Moreno Valley is located in Moreno Valley. Free Wi-Fi access is available in all rooms. Cable TV is offered in all guest rooms at the Regency Hotel - Moreno Valley. A microwave and small fridge are also provided. A 24-hour front desk is available for guest convenience. Vending machines are on site for a quick snack. John Wayne Airport is 41 mi away. The property offers free parking. Guests appreciate the quiet, clean property with friendly staff and excellent service.",
  location: "Moreno Valley, CA",
  image: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/1_Moreno.jpg",
  photos: [
    { id: "moreno-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/1_Moreno.jpg", isMain: true },
    { id: "moreno-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/2_Moreno.jpg" },
    { id: "moreno-3", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/3_Moreno.jpg" },
    { id: "moreno-4", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/4_Moreno.jpg" },
    { id: "moreno-5", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/5_Moreno.jpg" },
    { id: "moreno-6", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/6_Moreno.jpg" },
    { id: "moreno-7", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/7_Moreno.jpg" },
    { id: "moreno-8", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/8_Moreno.jpg" },
    { id: "moreno-9", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/9_Moreno.jpg" },
    { id: "moreno-10", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/10_Moreno.jpg" },
    { id: "moreno-11", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/11_Moreno.jpg" },
    { id: "moreno-12", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/12_Moreno.jpg" },
    { id: "moreno-13", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/13_Moreno.jpg" },
    { id: "moreno-14", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/14_Moreno.jpg" },
    { id: "moreno-15", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/15_Moreno.jpg" },
    { id: "moreno-16", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/16_Moreno.jpg" },
    { id: "moreno-17", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/17_Moreno.jpg" },
    { id: "moreno-18", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/18_Moreno.jpg" }
  ],
  bookingEngineUrl: "https://reservation.asiwebres.com/v5/RoomAvailability.aspx?sid=8472215628844c139633d45a05297ef4&Operation=Date",
  contact: "951 363 2222",
  address: "24810 Sunnymead Boulevard, Moreno Valley, CA 92553, United States",
  roomTypes: [
    {
      id: "moreno-standard-king",
      name: "Standard King Room",
      description: "Comfortable room with king bed, cable TV, microwave and fridge.",
      maxGuests: 2,
      bedType: "1 King Bed",
      photos: [
        { id: "moreno-room1-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/2_Moreno.jpg", isMain: true },
        { id: "moreno-room1-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/3_Moreno.jpg" }
      ],
      amenities: ["WiFi", "Cable TV", "Air Conditioning", "Private Bathroom", "Microwave", "Fridge", "Pool Access"]
    },
    {
      id: "moreno-king-suite",
      name: "King Suite",
      description: "Premium suite with king bed, separate living area, and enhanced amenities.",
      maxGuests: 3,
      bedType: "1 King Bed",
      photos: [
        { id: "moreno-room3-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/6_Moreno.jpg", isMain: true },
        { id: "moreno-room3-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/7_Moreno.jpg" }
      ],
      amenities: ["WiFi", "Cable TV", "Air Conditioning", "Private Bathroom", "Microwave", "Fridge", "Pool Access", "Sitting Area"]
    },
    {
      id: "moreno-standard-queen",
      name: "Standard Queen Room with Two Queen Beds",
      description: "Comfortable room with two queen beds, perfect for families or small groups.",
      maxGuests: 4,
      bedType: "2 Queen Beds",
      photos: [
        { id: "moreno-room4-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/8_Moreno.jpg", isMain: true },
        { id: "moreno-room4-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765735066/9_Moreno.jpg" }
      ],
      amenities: ["WiFi", "Cable TV", "Air Conditioning", "Private Bathroom", "Microwave", "Fridge", "Pool Access"]
    }
  ],
  amenities: ["WiFi", "Parking", "Pool", "Cable TV", "Microwave", "Fridge", "24-Hour Front Desk"]
});

// Circle Inn Hotel - Jurupa Valley Riverside
properties.push({
  id: "circle-inn-riverside",
  name: "Circle Inn Hotel - Jurupa Valley Riverside",
  description: "Comfortable Accommodations: Circle Inn Hotel - Jurupa Valley Riverside 60 Fwy in Riverside offers air-conditioned rooms with private bathrooms, work desks, and TVs. Each room includes a microwave for added convenience. Convenient Amenities: Guests enjoy free on-site private parking, ensuring easy access to their vehicles. The hotel provides a shower and a work desk, catering to both business and leisure travelers. Prime Location: Located 9.3 mi from LA/Ontario International Airport and 9.3 mi from Auto Club Speedway, the hotel is also close to Ontario Mills and Riverside Convention Center. Nearby attractions include Big League Dreams Sports Park at 4.3 mi and Riverside Art Museum at 8.7 mi.",
  location: "Riverside, CA",
  image: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733532/1_circle.jpg",
  photos: [
    { id: "riverside-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733532/1_circle.jpg", isMain: true },
    { id: "riverside-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733532/2_circle.jpg" },
    { id: "riverside-3", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733532/3_circle.jpg" },
    { id: "riverside-4", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733532/4_circle.jpg" },
    { id: "riverside-5", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733532/5_circle.jpg" },
    { id: "riverside-6", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733532/6_circle.jpg" },
    { id: "riverside-7", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733532/7_circle.jpg" },
    { id: "riverside-8", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733532/8_circle.jpg" }
  ],
  bookingEngineUrl: "https://www.booking.com/hotel/us/casa-blanca-riverside-by-dream-luxe.html",
  contact: "9516317777",
  address: "9220 Granite Hill Drive, Riverside, CA 92509, United States",
  roomTypes: [
    {
      id: "riverside-standard-king",
      name: "Standard King Room",
      description: "300 sq ft room with queen bed, air conditioning, flat-screen TV, private bathroom with shower, desk, and microwave.",
      maxGuests: 2,
      bedType: "1 Queen Bed",
      photos: [
        { id: "riverside-room1-1", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733532/2_circle.jpg", isMain: true },
        { id: "riverside-room1-2", url: "https://res.cloudinary.com/dyskxbejq/image/upload/v1765733532/3_circle.jpg" }
      ],
      amenities: ["Air Conditioning", "Flat-screen TV", "Private Bathroom", "Shower", "Desk", "Microwave", "Towels"]
    }
  ],
  amenities: ["Parking", "Air Conditioning", "Private Bathrooms", "Work Desk", "TV", "Microwave"]
});

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(p => p.id === id);
};

export const getAllProperties = (): Property[] => {
  return properties;
};
