// Test data for the Appliance Aid Hub chatbot and application

export interface TestService {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  popular: boolean;
  imageUrl?: string;
  category: string;
  features: string[];
  commonIssues: string[];
}

export interface TestProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  inStock: boolean;
  bestseller: boolean;
  category: string;
  description: string;
  specifications: Record<string, string>;
}

export interface TestCustomer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
  };
  preferredTimeSlot: string;
  notes?: string;
}

// Sample Services Data
export const testServices: TestService[] = [
  {
    id: "ac-service-001",
    title: "AC Service & Repair",
    description: "Complete AC maintenance, gas refilling, and repair services for all brands",
    price: 499,
    duration: "1-2 hours",
    rating: 4.8,
    popular: true,
    category: "Air Conditioning",
    features: [
      "Gas refilling",
      "Filter cleaning",
      "Coil cleaning",
      "Thermostat calibration",
      "Duct cleaning",
      "Warranty on parts"
    ],
    commonIssues: [
      "AC not cooling",
      "Strange noises",
      "Water leakage",
      "High electricity bills",
      "Thermostat not working"
    ]
  },
  {
    id: "washing-machine-002",
    title: "Washing Machine Repair",
    description: "Expert repair for all brands of washing machines and dryers",
    price: 399,
    duration: "45 mins",
    rating: 4.7,
    popular: false,
    category: "Laundry",
    features: [
      "Motor repair",
      "Drum replacement",
      "Water inlet valve repair",
      "Belt replacement",
      "Control panel repair",
      "Drain pump repair"
    ],
    commonIssues: [
      "Machine not spinning",
      "Water not draining",
      "Loud vibrations",
      "Door not locking",
      "Display errors"
    ]
  },
  {
    id: "microwave-003",
    title: "Microwave Repair",
    description: "Quick microwave repair and maintenance services",
    price: 299,
    duration: "30 mins",
    rating: 4.6,
    popular: false,
    category: "Kitchen Appliances",
    features: [
      "Magnetron replacement",
      "Door switch repair",
      "Control panel repair",
      "Turntable motor repair",
      "High voltage capacitor replacement",
      "Safety interlock repair"
    ],
    commonIssues: [
      "Not heating food",
      "Turntable not rotating",
      "Door not closing properly",
      "Sparks inside",
      "Display not working"
    ]
  },
  {
    id: "electrical-004",
    title: "Electrical Repair",
    description: "Safe and reliable electrical repair services",
    price: 199,
    duration: "1 hour",
    rating: 4.9,
    popular: false,
    category: "Electrical",
    features: [
      "Wiring repair",
      "Switch replacement",
      "Socket installation",
      "MCB repair",
      "Fan repair",
      "Light fixture installation"
    ],
    commonIssues: [
      "Power cuts",
      "Flickering lights",
      "Socket not working",
      "Switch problems",
      "Wiring issues"
    ]
  },
  {
    id: "refrigerator-005",
    title: "Refrigerator Service",
    description: "Complete refrigerator maintenance and repair services",
    price: 599,
    duration: "1.5 hours",
    rating: 4.5,
    popular: true,
    category: "Kitchen Appliances",
    features: [
      "Gas refilling",
      "Compressor repair",
      "Thermostat replacement",
      "Door seal replacement",
      "Defrost timer repair",
      "Temperature control repair"
    ],
    commonIssues: [
      "Not cooling properly",
      "Ice formation",
      "Strange noises",
      "Door not sealing",
      "Temperature fluctuations"
    ]
  },
  {
    id: "geyser-006",
    title: "Geyser Repair",
    description: "Water heater repair and maintenance services",
    price: 449,
    duration: "1 hour",
    rating: 4.4,
    popular: false,
    category: "Water Heating",
    features: [
      "Heating element replacement",
      "Thermostat repair",
      "Tank cleaning",
      "Anode rod replacement",
      "Pressure valve repair",
      "Wiring repair"
    ],
    commonIssues: [
      "No hot water",
      "Water too hot",
      "Leakage",
      "Strange noises",
      "Electric shock"
    ]
  }
];

// Sample Products Data
export const testProducts: TestProduct[] = [
  {
    id: "ac-filter-001",
    name: "AC Air Filter - Universal",
    brand: "CoolAir",
    price: 299,
    originalPrice: 399,
    rating: 4.5,
    reviews: 128,
    imageUrl: "/products/ac-filter.jpg",
    inStock: true,
    bestseller: true,
    category: "AC Parts",
    description: "High-quality air filter for all AC brands. Improves air quality and AC efficiency.",
    specifications: {
      "Compatibility": "Universal",
      "Material": "HEPA Filter",
      "Dimensions": "12x12x1 inches",
      "Warranty": "6 months"
    }
  },
  {
    id: "washing-machine-belt-002",
    name: "Washing Machine Drive Belt",
    brand: "PowerDrive",
    price: 199,
    originalPrice: 249,
    rating: 4.3,
    reviews: 89,
    imageUrl: "/products/washing-belt.jpg",
    inStock: true,
    bestseller: false,
    category: "Washing Machine Parts",
    description: "Durable drive belt for washing machines. Compatible with most top-loading machines.",
    specifications: {
      "Compatibility": "Top-loading machines",
      "Material": "Rubber",
      "Length": "850mm",
      "Warranty": "1 year"
    }
  },
  {
    id: "microwave-magnetron-003",
    name: "Microwave Magnetron",
    brand: "MicroTech",
    price: 1299,
    originalPrice: 1599,
    rating: 4.7,
    reviews: 45,
    imageUrl: "/products/magnetron.jpg",
    inStock: true,
    bestseller: false,
    category: "Microwave Parts",
    description: "High-power magnetron for microwave ovens. Restores heating functionality.",
    specifications: {
      "Power": "800W",
      "Compatibility": "Most brands",
      "Voltage": "220V",
      "Warranty": "2 years"
    }
  },
  {
    id: "electrical-switch-004",
    name: "Modular Switch - 2 Gang",
    brand: "SwitchPro",
    price: 149,
    originalPrice: 199,
    rating: 4.6,
    reviews: 203,
    imageUrl: "/products/switch.jpg",
    inStock: true,
    bestseller: true,
    category: "Electrical",
    description: "Premium modular switch with 2 gangs. Easy installation and long-lasting.",
    specifications: {
      "Type": "2 Gang",
      "Material": "Fire-resistant plastic",
      "Current": "16A",
      "Warranty": "5 years"
    }
  },
  {
    id: "refrigerator-thermostat-005",
    name: "Refrigerator Thermostat",
    brand: "CoolControl",
    price: 399,
    originalPrice: 499,
    rating: 4.4,
    reviews: 67,
    imageUrl: "/products/thermostat.jpg",
    inStock: true,
    bestseller: false,
    category: "Refrigerator Parts",
    description: "Digital thermostat for refrigerators. Precise temperature control.",
    specifications: {
      "Type": "Digital",
      "Temperature Range": "-10°C to +10°C",
      "Display": "LED",
      "Warranty": "1 year"
    }
  }
];

// Sample Customer Data
export const testCustomers: TestCustomer[] = [
  {
    id: "customer-001",
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    address: {
      line1: "123, Green Park",
      line2: "Near Metro Station",
      city: "New Delhi",
      state: "Delhi",
      postalCode: "110016"
    },
    preferredTimeSlot: "10:00-12:00",
    notes: "AC not cooling properly, makes strange noise"
  },
  {
    id: "customer-002",
    fullName: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 87654 32109",
    address: {
      line1: "456, Sector 15",
      city: "Gurgaon",
      state: "Haryana",
      postalCode: "122001"
    },
    preferredTimeSlot: "14:00-16:00",
    notes: "Washing machine not spinning, water not draining"
  },
  {
    id: "customer-003",
    fullName: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 76543 21098",
    address: {
      line1: "789, Koramangala",
      line2: "5th Block",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560034"
    },
    preferredTimeSlot: "16:00-18:00",
    notes: "Microwave not heating food, display shows error"
  }
];

// Test Chat Scenarios
export const testChatScenarios = [
  {
    id: "scenario-001",
    title: "AC Service Inquiry",
    userMessage: "My AC is not cooling properly and making strange noises. What should I do?",
    expectedResponse: "I can help you with your AC issues. Based on your description, it sounds like your AC needs servicing. We offer AC repair services starting at ₹499. Would you like to book an appointment?",
    category: "AC Repair"
  },
  {
    id: "scenario-002",
    title: "Pricing Question",
    userMessage: "What are your service charges for washing machine repair?",
    expectedResponse: "Our washing machine repair service costs ₹399 and takes about 45 minutes. This includes diagnosis, repair, and testing. Would you like to book this service?",
    category: "Pricing"
  },
  {
    id: "scenario-003",
    title: "Booking Request",
    userMessage: "I want to book a service for my microwave. It's not heating food properly.",
    expectedResponse: "I can help you book a microwave repair service. Our microwave repair costs ₹299 and takes about 30 minutes. When would you like to schedule the appointment?",
    category: "Booking"
  },
  {
    id: "scenario-004",
    title: "Emergency Service",
    userMessage: "I have an electrical emergency! My house has no power and I need urgent help.",
    expectedResponse: "I understand this is urgent! For electrical emergencies, please call our emergency line at +91 98765 43210 immediately. We provide same-day emergency service.",
    category: "Emergency"
  },
  {
    id: "scenario-005",
    title: "Product Inquiry",
    userMessage: "Do you sell AC filters? My AC filter needs replacement.",
    expectedResponse: "Yes, we have AC filters available! We have a universal AC air filter for ₹299 (original price ₹399). It's compatible with all AC brands and comes with a 6-month warranty. Would you like to order one?",
    category: "Products"
  },
  {
    id: "scenario-006",
    title: "Warranty Question",
    userMessage: "What warranty do you provide on your repairs?",
    expectedResponse: "We provide a 30-day warranty on all repairs and use only genuine spare parts. Our technicians are certified and experienced. Is there a specific repair you're interested in?",
    category: "Warranty"
  },
  {
    id: "scenario-007",
    title: "Service Area",
    userMessage: "Do you provide services in Mumbai?",
    expectedResponse: "Yes, we provide doorstep service across all metro cities including Mumbai. Our technicians will come to your location at your preferred time. What service do you need?",
    category: "Service Area"
  },
  {
    id: "scenario-008",
    title: "Payment Options",
    userMessage: "What payment methods do you accept?",
    expectedResponse: "We accept multiple payment methods including Cash on Delivery (COD), Credit/Debit Cards, and UPI. You can pay after the service is completed to your satisfaction.",
    category: "Payment"
  }
];

// Test Error Scenarios
export const testErrorScenarios = [
  {
    id: "error-001",
    title: "Network Error",
    description: "Simulate network connectivity issues",
    userMessage: "Test network error",
    expectedBehavior: "Should show error toast and fallback to mock response"
  },
  {
    id: "error-002",
    title: "API Rate Limit",
    description: "Simulate API rate limiting",
    userMessage: "Test rate limit",
    expectedBehavior: "Should show rate limit error and fallback to mock response"
  },
  {
    id: "error-003",
    title: "Invalid API Key",
    description: "Simulate invalid API key error",
    userMessage: "Test API key error",
    expectedBehavior: "Should show authentication error and fallback to mock response"
  }
];

// Sample Booking Data
export const testBookings = [
  {
    id: "booking-001",
    serviceId: "ac-service-001",
    customerId: "customer-001",
    preferredDate: "2024-01-15",
    preferredTimeSlot: "10:00-12:00",
    status: "requested",
    notes: "AC not cooling, strange noise"
  },
  {
    id: "booking-002",
    serviceId: "washing-machine-002",
    customerId: "customer-002",
    preferredDate: "2024-01-16",
    preferredTimeSlot: "14:00-16:00",
    status: "scheduled",
    notes: "Machine not spinning"
  }
];

// Sample Order Data
export const testOrders = [
  {
    id: "order-001",
    customerId: "customer-001",
    items: [
      {
        type: "product",
        productId: "ac-filter-001",
        name: "AC Air Filter - Universal",
        price: 299,
        quantity: 2
      }
    ],
    subtotal: 598,
    paymentMethod: "cod",
    status: "placed"
  }
];

// Export all test data
export const testData = {
  services: testServices,
  products: testProducts,
  customers: testCustomers,
  chatScenarios: testChatScenarios,
  errorScenarios: testErrorScenarios,
  bookings: testBookings,
  orders: testOrders
};

export default testData;
