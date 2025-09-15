# Support Chatbot Integration Guide

This guide explains how to integrate the AI-powered support chatbot into your React + TypeScript + Tailwind CSS application.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install @google/generative-ai
```

### 2. Environment Setup

Create a `.env` file in your project root and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Basic Integration

Add the chatbot to your main App component:

```tsx
import SupportChatWidget from '@/components/SupportChatWidget';
import { sendMessageToGemini } from '@/lib/gemini-api';

function App() {
  const handleSendMessage = async (message: string): Promise<string> => {
    try {
      return await sendMessageToGemini(message);
    } catch (error) {
      return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
    }
  };

  return (
    <div>
      {/* Your app content */}
      
      {/* Add the chatbot */}
      <SupportChatWidget onSendMessage={handleSendMessage} />
    </div>
  );
}
```

## 🎨 Customization Options

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSendMessage` | `(message: string) => Promise<string>` | Required | Function to handle message sending |
| `className` | `string` | `undefined` | Additional CSS classes |
| `placeholder` | `string` | `"Type your message..."` | Input placeholder text |
| `welcomeMessage` | `string` | `"Hello! I'm here to help..."` | Initial bot message |
| `maxMessages` | `number` | `50` | Maximum messages to keep in history |

### Example with Custom Props

```tsx
<SupportChatWidget
  onSendMessage={handleSendMessage}
  placeholder="Ask about our services..."
  welcomeMessage="Welcome to Appliance Aid Hub! How can I help you today?"
  maxMessages={100}
  className="custom-chatbot-styles"
/>
```

## 🔧 Advanced Configuration

### Custom API Integration

Instead of using the Gemini API, you can integrate with your own backend:

```tsx
const handleSendMessage = async (message: string): Promise<string> => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  
  const data = await response.json();
  return data.response;
};
```

### Styling Customization

The chatbot uses Tailwind CSS classes. You can customize the appearance by:

1. **Using the `className` prop** for the main container
2. **Modifying the component** for more extensive changes
3. **Using CSS variables** for theme customization

```tsx
// Example: Custom positioning
<SupportChatWidget 
  onSendMessage={handleSendMessage}
  className="bottom-6 right-6" // Custom position
/>
```

## 📱 Mobile Responsiveness

The chatbot is fully responsive and includes:

- **Touch-friendly** buttons and inputs
- **Mobile-optimized** chat window sizing
- **Keyboard navigation** support
- **Accessibility** features (ARIA labels, screen reader support)

## ♿ Accessibility Features

- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **Focus management** when opening/closing
- **High contrast** color scheme
- **Semantic HTML** structure

## 🔒 Security Considerations

1. **API Key Security**: Never expose your Gemini API key in client-side code
2. **Input Validation**: The component includes basic input sanitization
3. **Rate Limiting**: Consider implementing rate limiting for production use
4. **Error Handling**: Graceful fallbacks for API failures

## 🚀 Production Deployment

### Environment Variables

```env
# Production
VITE_GEMINI_API_KEY=your_production_api_key
NODE_ENV=production
```

### Build Configuration

The chatbot will be included in your production build automatically. No additional configuration needed.

### Performance Optimization

- **Message History**: Limited to `maxMessages` (default: 50)
- **Lazy Loading**: Component only loads when needed
- **Memory Management**: Old messages are automatically cleaned up

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify the key is correct
   - Check environment variable name (`VITE_GEMINI_API_KEY`)
   - Ensure the key has proper permissions

2. **Styling Issues**
   - Make sure Tailwind CSS is properly configured
   - Check for CSS conflicts
   - Verify shadcn/ui components are installed

3. **TypeScript Errors**
   - Ensure all dependencies are installed
   - Check import paths
   - Verify TypeScript configuration

### Debug Mode

Enable debug logging by adding to your environment:

```env
VITE_DEBUG_CHATBOT=true
```

## 📊 Analytics Integration

Track chatbot usage with analytics:

```tsx
const handleSendMessage = async (message: string): Promise<string> => {
  // Track message sent
  analytics.track('chatbot_message_sent', { message });
  
  const response = await sendMessageToGemini(message);
  
  // Track response received
  analytics.track('chatbot_response_received', { response });
  
  return response;
};
```

## 🔄 State Management

The chatbot manages its own state internally. For global state management:

```tsx
// Example with Zustand
const useChatbotStore = create((set) => ({
  isOpen: false,
  messages: [],
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
}));
```

## 📝 Example Use Cases

### E-commerce Support
- Product inquiries
- Order status questions
- Return/refund assistance

### Service Booking
- Appointment scheduling
- Service information
- Pricing questions

### Technical Support
- Troubleshooting guides
- FAQ responses
- Escalation to human agents

## 🎯 Best Practices

1. **Keep responses concise** but helpful
2. **Provide clear escalation paths** to human support
3. **Test thoroughly** on different devices
4. **Monitor performance** and user feedback
5. **Update the system prompt** based on common questions
6. **Implement proper error handling**
7. **Consider rate limiting** for production use

## 📚 Additional Resources

- [Gemini API Documentation](https://ai.google.dev/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Accessibility](https://reactjs.org/docs/accessibility.html)
