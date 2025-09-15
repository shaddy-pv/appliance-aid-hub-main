# 🧪 Chatbot Testing Guide

## 📊 Complete Test Data Package

I've created a comprehensive testing suite for your chatbot with real-world data and scenarios.

## 🎯 What's Included

### 1. **Sample Data** (`src/data/test-data.ts`)
- **6 Services** with detailed information (AC, Washing Machine, Microwave, Electrical, Refrigerator, Geyser)
- **5 Products** with specifications and pricing
- **3 Sample Customers** with contact information
- **8 Test Scenarios** for different chatbot interactions
- **3 Error Scenarios** for testing error handling
- **Sample Bookings & Orders** for complete testing

### 2. **Enhanced Test Page** (`/chatbot-test`)
- **Live Chatbots** - Test both mock and AI responses side by side
- **Test Scenarios** - Click to test different conversation flows
- **Sample Data Viewer** - Browse all test data in organized tabs
- **Setup Guide** - Step-by-step configuration instructions

### 3. **Automated Test Script** (`src/utils/chatbot-test-script.ts`)
- **Automated testing** for all scenarios
- **Performance metrics** (response times, success rates)
- **Error handling tests**
- **Quick test functions** for manual testing

## 🚀 Quick Start Testing

### 1. **Visit the Test Page**
Navigate to `/chatbot-test` in your browser to access the comprehensive testing interface.

### 2. **Test Scenarios Available**

#### **AC Service Inquiry**
- **User**: "My AC is not cooling properly and making strange noises. What should I do?"
- **Expected**: Information about AC repair services and booking options

#### **Pricing Questions**
- **User**: "What are your service charges for washing machine repair?"
- **Expected**: Service pricing and duration information

#### **Booking Requests**
- **User**: "I want to book a service for my microwave. It's not heating food properly."
- **Expected**: Booking process and scheduling information

#### **Emergency Services**
- **User**: "I have an electrical emergency! My house has no power and I need urgent help."
- **Expected**: Emergency contact information and same-day service details

#### **Product Inquiries**
- **User**: "Do you sell AC filters? My AC filter needs replacement."
- **Expected**: Product information with pricing and specifications

#### **Warranty Questions**
- **User**: "What warranty do you provide on your repairs?"
- **Expected**: Warranty details and service guarantees

#### **Service Area**
- **User**: "Do you provide services in Mumbai?"
- **Expected**: Service area confirmation and location details

#### **Payment Options**
- **User**: "What payment methods do you accept?"
- **Expected**: Payment method options (COD, Card, UPI)

## 📱 Test Data Details

### **Services Data**
```typescript
- AC Service & Repair (₹499, 1-2 hours, 4.8★, Popular)
- Washing Machine Repair (₹399, 45 mins, 4.7★)
- Microwave Repair (₹299, 30 mins, 4.6★)
- Electrical Repair (₹199, 1 hour, 4.9★)
- Refrigerator Service (₹599, 1.5 hours, 4.5★, Popular)
- Geyser Repair (₹449, 1 hour, 4.4★)
```

### **Products Data**
```typescript
- AC Air Filter - Universal (₹299, CoolAir, 4.5★, Bestseller)
- Washing Machine Drive Belt (₹199, PowerDrive, 4.3★)
- Microwave Magnetron (₹1299, MicroTech, 4.7★)
- Modular Switch - 2 Gang (₹149, SwitchPro, 4.6★, Bestseller)
- Refrigerator Thermostat (₹399, CoolControl, 4.4★)
```

### **Customer Data**
```typescript
- Rajesh Kumar (Delhi, AC issues)
- Priya Sharma (Gurgaon, Washing machine problems)
- Amit Patel (Bangalore, Microwave issues)
```

## 🧪 Automated Testing

### **Run All Tests**
```typescript
import { chatbotTester } from '@/utils/chatbot-test-script';

// Run complete test suite
const results = await chatbotTester.runAllTests();
console.log(chatbotTester.getSummary());
```

### **Quick Tests**
```typescript
import { quickTests } from '@/utils/chatbot-test-script';

// Test single message
await quickTests.testMockMessage("My AC is not working");

// Test common questions
await quickTests.testCommonQuestions();
```

## 📊 Test Results

The automated testing provides:
- **Response Times** - Performance metrics
- **Success Rates** - Reliability indicators
- **Error Handling** - Failure scenario testing
- **Detailed Logs** - Complete test execution logs

## 🎯 Manual Testing Checklist

### **UI Testing**
- [ ] Floating chat button appears in bottom-right
- [ ] Chat window opens and closes smoothly
- [ ] Messages display with avatars and timestamps
- [ ] Auto-scroll works for new messages
- [ ] Loading indicators show during AI responses
- [ ] Toast notifications appear for errors/success
- [ ] Mobile responsiveness works on different screen sizes

### **Functionality Testing**
- [ ] Mock bot responds to all test scenarios
- [ ] Gemini API responds to all test scenarios
- [ ] Error handling works for network issues
- [ ] Fallback to mock bot when API fails
- [ ] Message history is maintained correctly
- [ ] Input validation works (empty messages, long messages)

### **Integration Testing**
- [ ] Chatbot integrates with main app
- [ ] No conflicts with existing components
- [ ] Performance is acceptable
- [ ] Memory usage is reasonable

## 🔧 Testing Commands

### **Development Testing**
```bash
# Start development server
npm run dev

# Visit test page
http://localhost:5173/chatbot-test
```

### **Build Testing**
```bash
# Build for production
npm run build

# Test production build
npm run preview
```

### **Lint Testing**
```bash
# Check for code issues
npm run lint
```

## 📈 Performance Testing

### **Response Time Benchmarks**
- **Mock Bot**: < 100ms average
- **Gemini API**: < 2000ms average
- **Error Handling**: < 500ms average

### **Memory Usage**
- **Message History**: Limited to 50 messages (configurable)
- **Component Size**: Optimized for production
- **Bundle Size**: Minimal impact on main app

## 🐛 Common Test Issues

### **Mock Bot Not Responding**
- Check if `sendMessageToMockBot` is imported correctly
- Verify test data is loaded properly
- Check console for error messages

### **Gemini API Errors**
- Verify API key is configured
- Check network connectivity
- Review error messages in console

### **UI Issues**
- Ensure Tailwind CSS is configured
- Check shadcn/ui components are installed
- Verify responsive design on different devices

## 📝 Test Report Template

```markdown
# Chatbot Test Report

## Test Summary
- Total Tests: X
- Passed: X
- Failed: X
- Success Rate: X%

## Performance
- Average Response Time: Xms
- Mock Bot Response Time: Xms
- Gemini API Response Time: Xms

## Issues Found
1. Issue description
2. Issue description

## Recommendations
1. Recommendation
2. Recommendation
```

## 🎉 Ready to Test!

Your chatbot now has comprehensive test data and testing tools. Visit `/chatbot-test` to start testing immediately!

**Test Data Includes:**
- ✅ 6 realistic services with pricing
- ✅ 5 products with specifications  
- ✅ 3 sample customers
- ✅ 8 conversation scenarios
- ✅ 3 error handling scenarios
- ✅ Automated test scripts
- ✅ Performance monitoring
- ✅ Visual test interface

**Start testing now and see your chatbot in action!** 🚀
