# 🤖 Support Chatbot Implementation

A fully-featured customer support chatbot for your React + TypeScript + Tailwind CSS application using shadcn/ui components and Google Gemini AI.

## ✨ Features

- **🎨 Modern UI**: Beautiful floating chat widget with smooth animations
- **🤖 AI-Powered**: Google Gemini AI integration for intelligent responses
- **📱 Mobile-First**: Fully responsive design with touch-friendly interactions
- **♿ Accessible**: ARIA labels, keyboard navigation, and screen reader support
- **🔧 Customizable**: Easy to customize styling and behavior
- **🧪 Testable**: Mock chatbot for development and testing
- **⚡ Fast**: Optimized performance with message history management

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install @google/generative-ai
```

### 2. Environment Setup

Create a `.env` file in your project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Basic Usage

The chatbot is already integrated into your main App component:

```tsx
import SupportChatWidget from '@/components/SupportChatWidget';

function App() {
  const handleSendMessage = async (message: string): Promise<string> => {
    // Your message handling logic here
    return await sendMessageToGemini(message);
  };

  return (
    <div>
      {/* Your app content */}
      <SupportChatWidget onSendMessage={handleSendMessage} />
    </div>
  );
}
```

## 🧪 Testing

Visit `/chatbot-test` to test the chatbot functionality with both mock and AI responses.

## 📁 File Structure

```
src/
├── components/
│   └── SupportChatWidget.tsx      # Main chatbot component
├── lib/
│   ├── gemini-api.ts              # Gemini AI integration
│   └── mock-chatbot.ts            # Mock responses for testing
├── pages/
│   └── ChatbotTest.tsx            # Test page
└── App.tsx                        # Main app with chatbot integration
```

## 🎨 Customization

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSendMessage` | `(message: string) => Promise<string>` | Required | Function to handle message sending |
| `className` | `string` | `undefined` | Additional CSS classes |
| `placeholder` | `string` | `"Type your message..."` | Input placeholder text |
| `welcomeMessage` | `string` | `"Hello! I'm here to help..."` | Initial bot message |
| `maxMessages` | `number` | `50` | Maximum messages to keep in history |

### Example Customization

```tsx
<SupportChatWidget
  onSendMessage={handleSendMessage}
  placeholder="Ask about our services..."
  welcomeMessage="Welcome to Appliance Aid Hub! How can I help?"
  maxMessages={100}
  className="custom-chatbot-styles"
/>
```

## 🔧 API Integration

### With Gemini AI

```tsx
import { sendMessageToGemini } from '@/lib/gemini-api';

const handleSendMessage = async (message: string): Promise<string> => {
  return await sendMessageToGemini(message);
};
```

### With Custom Backend

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

### With Mock Responses (Testing)

```tsx
import { sendMessageToMockBot } from '@/lib/mock-chatbot';

const handleSendMessage = async (message: string): Promise<string> => {
  return await sendMessageToMockBot(message);
};
```

## 🎯 Use Cases

### E-commerce Support
- Product inquiries and recommendations
- Order status and tracking
- Return and refund assistance
- Payment and billing questions

### Service Booking
- Appointment scheduling
- Service information and pricing
- Technician availability
- Location and timing questions

### Technical Support
- Troubleshooting guides
- FAQ responses
- Escalation to human agents
- Knowledge base search

## 📱 Mobile Features

- **Touch-friendly** buttons and inputs
- **Responsive design** that adapts to screen size
- **Smooth scrolling** message area
- **Optimized chat window** sizing
- **Gesture support** for mobile interactions

## ♿ Accessibility Features

- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **Focus management** when opening/closing
- **High contrast** color scheme
- **Semantic HTML** structure
- **Screen reader** announcements

## 🔒 Security Considerations

1. **API Key Security**: Never expose API keys in client-side code
2. **Input Validation**: Basic input sanitization included
3. **Rate Limiting**: Consider implementing for production
4. **Error Handling**: Graceful fallbacks for API failures

## 🚀 Production Deployment

### Environment Variables

```env
# Production
VITE_GEMINI_API_KEY=your_production_api_key
NODE_ENV=production
```

### Performance Optimization

- **Message History**: Limited to `maxMessages` (default: 50)
- **Lazy Loading**: Component only loads when needed
- **Memory Management**: Old messages are automatically cleaned up
- **Bundle Size**: Optimized for production builds

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify the key is correct
   - Check environment variable name
   - Ensure proper permissions

2. **Styling Issues**
   - Check Tailwind CSS configuration
   - Verify shadcn/ui components
   - Look for CSS conflicts

3. **TypeScript Errors**
   - Ensure all dependencies are installed
   - Check import paths
   - Verify TypeScript configuration

### Debug Mode

Enable debug logging:

```env
VITE_DEBUG_CHATBOT=true
```

## 📊 Analytics Integration

Track chatbot usage:

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

## 🎯 Best Practices

1. **Keep responses concise** but helpful
2. **Provide clear escalation paths** to human support
3. **Test thoroughly** on different devices
4. **Monitor performance** and user feedback
5. **Update system prompts** based on common questions
6. **Implement proper error handling**
7. **Consider rate limiting** for production use

## 📚 Additional Resources

- [Gemini API Documentation](https://ai.google.dev/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Accessibility](https://reactjs.org/docs/accessibility.html)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Need help?** Contact the development team or check the troubleshooting section above.
