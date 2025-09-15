import React from 'react';
import SupportChatWidget from './SupportChatWidget';
import { sendMessageToGemini } from '@/lib/gemini-api';

// Example usage component showing how to integrate the chatbot
const ExampleChatbotUsage: React.FC = () => {
  // This is the function that will be called when a user sends a message
  const handleSendMessage = async (message: string): Promise<string> => {
    try {
      // Call the Gemini API to get a response
      const response = await sendMessageToGemini(message);
      return response;
    } catch (error) {
      // Fallback response if API fails
      console.error('Chatbot error:', error);
      return "I'm sorry, I'm having trouble connecting right now. Please try again later or contact our support team at +91 98765 43210.";
    }
  };

  return (
    <div>
      {/* Your main app content goes here */}
      <h1>Your App Content</h1>
      
      {/* Add the chatbot widget */}
      <SupportChatWidget 
        onSendMessage={handleSendMessage}
        placeholder="Ask about our repair services..."
        welcomeMessage="Hi! I'm here to help with your appliance repair needs. What can I assist you with today?"
      />
    </div>
  );
};

export default ExampleChatbotUsage;
