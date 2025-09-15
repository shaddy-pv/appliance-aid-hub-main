// Mock chatbot service for testing the UI without requiring Gemini API
// This can be used as a fallback or for development/testing

export interface MockResponse {
  text: string;
  delay?: number;
}

// Simple mock responses for testing
const mockResponses: MockResponse[] = [
  { text: "I'd be happy to help you with your appliance repair needs! What specific issue are you experiencing?", delay: 1000 },
  { text: "That sounds like a common issue. Let me help you troubleshoot this step by step.", delay: 1500 },
  { text: "Based on your description, I recommend booking a service appointment. Our certified technicians can diagnose and fix this issue.", delay: 1200 },
  { text: "We offer several repair services including AC repair (₹499), washing machine repair (₹399), microwave repair (₹299), and electrical repair (₹199).", delay: 1000 },
  { text: "You can book a service appointment through our booking page. Our technicians will come to your location at your preferred time.", delay: 1300 },
  { text: "I understand your concern. Our technicians are fully certified and we use only genuine spare parts for all repairs.", delay: 1100 },
  { text: "For urgent repairs, you can call us directly at +91 98765 43210. We offer same-day service in most cases.", delay: 1000 },
  { text: "That's a great question! Our repair process typically takes 1-2 hours depending on the complexity of the issue.", delay: 1200 },
  { text: "We provide a 30-day warranty on all repairs and use only genuine spare parts from authorized dealers.", delay: 1000 },
  { text: "I'm here to help! Is there anything else you'd like to know about our services?", delay: 800 }
];

let responseIndex = 0;

export async function sendMessageToMockBot(message: string): Promise<string> {
  // Simulate API delay
  const delay = Math.random() * 2000 + 500; // 500ms to 2.5s delay
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get a response based on keywords in the message
      const lowerMessage = message.toLowerCase();
      let response: MockResponse;
      
      if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('₹')) {
        response = mockResponses[3]; // Price information
      } else if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
        response = mockResponses[4]; // Booking information
      } else if (lowerMessage.includes('urgent') || lowerMessage.includes('emergency') || lowerMessage.includes('call')) {
        response = mockResponses[6]; // Urgent service
      } else if (lowerMessage.includes('warranty') || lowerMessage.includes('guarantee')) {
        response = mockResponses[8]; // Warranty information
      } else if (lowerMessage.includes('time') || lowerMessage.includes('duration') || lowerMessage.includes('how long')) {
        response = mockResponses[7]; // Time information
      } else if (lowerMessage.includes('technician') || lowerMessage.includes('certified') || lowerMessage.includes('qualified')) {
        response = mockResponses[5]; // Technician information
      } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
        response = mockResponses[9]; // General help
      } else {
        // Use cycling responses for general queries
        response = mockResponses[responseIndex % mockResponses.length];
        responseIndex++;
      }
      
      resolve(response.text);
    }, delay);
  });
}

// Reset the response index (useful for testing)
export function resetMockBot(): void {
  responseIndex = 0;
}
