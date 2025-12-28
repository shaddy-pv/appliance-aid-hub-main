// Application configuration
export const config = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  
  // Gemini AI Configuration
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAC9bD8FTjXMFY6agLTek4aKXCLB9dpOV8',
  
  // Razorpay Configuration
  razorpay: {
    keyId: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_your_key_id_here',
    currency: 'INR',
    name: 'Appliance Aid Hub',
    description: 'Appliance Repair Service Payment',
    image: '/logo.png',
    theme: {
      color: '#2563eb',
    },
  },
  
  // Environment
  isDevelopment: import.meta.env.NODE_ENV === 'development',
  isProduction: import.meta.env.NODE_ENV === 'production',
};
