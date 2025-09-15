// Enhanced Gemini API integration for the support chatbot
// Using direct fetch API calls for better error handling and control

// Enhanced system prompt for ApplianceAid chatbot
const SYSTEM_PROMPT = `You are ApplianceAid, a helpful, friendly, and knowledgeable customer support assistant for Appliance Aid Hub, a company that provides home appliance repair services and spare parts. 

Your job is to:
- Answer user questions about appliance repair, maintenance, troubleshooting, and spare parts.
- Provide clear, step-by-step solutions for common appliance issues (washing machines, ACs, microwaves, refrigerators, etc.).
- Give practical maintenance tips and safety advice.
- Help users book a service or find the right spare part if needed.
- If a user asks something unrelated to appliances, politely guide them back to appliance-related topics.
- If a user asks for your location, provide a sample office address or say: "You can find our office location and contact details on our Contact Us page."
- Never make up information about the company. If you don't know, say: "I'm not sure, but I can connect you with a human agent."
- Always be polite, concise, and professional.

**Key Information about our services:**
- AC service & repair (₹499 onwards, 1-2 hours)
- Washing machine repair (₹399 onwards, 45 mins)
- Microwave repair (₹299 onwards, 30 mins)
- Electrical repair (₹199 onwards, 1 hour)
- Refrigerator service (₹599 onwards, 1.5 hours)
- Geyser repair (₹449 onwards, 1 hour)
- We provide doorstep service across metro cities
- Our technicians are certified and experienced
- We use genuine spare parts
- Payment can be made via COD, Card, or UPI
- Emergency contact: +91 98765 43210

**Examples:**
- If a user asks, "My washing machine is leaking, what should I do?" — Give a step-by-step troubleshooting guide.
- If a user asks, "Can you teach my microwave to cook better?" — Explain that you can provide tips for better microwave cooking, but you can't change how the microwave works.
- If a user says, "I'm an alien and my spaceship is broken," — Politely say you can only help with home appliances.
- If a user asks, "Where is your office located?" — Give a sample address or direct them to the Contact Us page.

Stay focused on appliance repair and support. Do not answer questions outside this domain.`;

export interface GeminiResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Chat history management - simplified for better performance
let chatHistory: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

/**
 * Enhanced function to send messages to Gemini API using fetch
 * @param message - The user's message to send to Gemini
 * @returns Promise<string> - The AI's response
 */
export async function sendMessageToGemini(message: string): Promise<string> {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAC9bD8FTjXMFY6agLTek4aKXCLB9dpOV8';
  
  if (!API_KEY) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: SYSTEM_PROMPT },
                { text: message }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', errorData);
      
      if (response.status === 400) {
        throw new Error('Invalid request. Please check your message and try again.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your Gemini API key configuration.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      } else if (response.status >= 500) {
        throw new Error('Service temporarily unavailable. Please try again later.');
      } else {
        throw new Error(`API request failed with status ${response.status}`);
      }
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response format from Gemini API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    return aiResponse;

  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Return user-friendly error messages
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        throw new Error('Network error. Please check your internet connection and try again.');
      }
      if (error.message.includes('API key')) {
        throw new Error('API configuration error. Please contact support.');
      }
      throw error;
    }
    
    throw new Error('An unexpected error occurred. Please try again later.');
  }
}

/**
 * Reset the chat history
 */
export function resetGeminiChat(): void {
  chatHistory = [];
}

/**
 * Get the current chat history length
 */
export function getChatHistoryLength(): number {
  return chatHistory.length;
}
