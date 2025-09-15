# 🤖 ApplianceAid Chatbot Test Questions

## 🎯 **Enhanced System Prompt Applied**

Your chatbot now uses the enhanced ApplianceAid system prompt that:
- ✅ Focuses specifically on appliance repair and support
- ✅ Provides step-by-step troubleshooting guides
- ✅ Gives practical maintenance tips and safety advice
- ✅ Politely redirects off-topic questions back to appliances
- ✅ Uses professional, friendly tone
- ✅ Includes specific service pricing and contact information

## 🧪 **Test Questions by Category**

### **1. Appliance Troubleshooting Questions**

#### **AC Issues**
- "My AC is not cooling properly and making strange noises. What should I do?"
- "My AC is leaking water. Can you help me fix it?"
- "My AC is consuming too much electricity. What could be wrong?"
- "The AC remote is not working. How can I fix it?"
- "My AC is not turning on at all. What should I check?"

#### **Washing Machine Issues**
- "My washing machine is leaking water. What should I do?"
- "The washing machine is not spinning. How can I fix it?"
- "Water is not draining from my washing machine."
- "My washing machine makes loud vibrations during spin cycle."
- "The door of my washing machine won't lock properly."

#### **Microwave Issues**
- "My microwave is not heating food properly."
- "The turntable in my microwave is not rotating."
- "My microwave door won't close properly."
- "There are sparks inside my microwave when I use it."
- "The display on my microwave is not working."

#### **Refrigerator Issues**
- "My refrigerator is not cooling properly."
- "There's ice formation in my refrigerator."
- "My refrigerator is making strange noises."
- "The door of my refrigerator won't seal properly."
- "My refrigerator is consuming too much electricity."

#### **Electrical Issues**
- "I have frequent power cuts in my house."
- "My lights are flickering constantly."
- "A socket in my house is not working."
- "I need to replace electrical switches."
- "There's an electrical emergency at my place."

### **2. Service & Pricing Questions**

#### **Service Information**
- "What are your service charges for AC repair?"
- "How much does washing machine repair cost?"
- "What's the price for microwave repair?"
- "Do you have any discounts available?"
- "What's included in the service cost?"

#### **Booking & Scheduling**
- "I want to book a service appointment."
- "Can you schedule AC repair for tomorrow?"
- "What time slots are available for service?"
- "Do you provide same-day service?"
- "Can I reschedule my existing appointment?"

#### **Service Areas**
- "Do you provide services in Mumbai?"
- "Are you available in Delhi?"
- "Do you cover Bangalore area?"
- "What areas do you serve?"
- "Do you provide doorstep service?"

### **3. Product & Parts Questions**

#### **Spare Parts**
- "Do you sell AC filters?"
- "I need a washing machine drive belt."
- "Do you have microwave magnetrons?"
- "What spare parts do you stock?"
- "Are your parts genuine and original?"

#### **Product Information**
- "What's the price of AC air filter?"
- "Do you have universal parts for all brands?"
- "What warranty do you provide on spare parts?"
- "Can you deliver parts to my home?"
- "Do you have original brand parts available?"

### **4. Emergency & Urgent Questions**

#### **Emergency Services**
- "I have an electrical emergency! My house has no power."
- "There's a gas leak. Can you help immediately?"
- "My geyser is leaking badly. It's urgent."
- "I need emergency AC repair right now."
- "My refrigerator stopped working. It's an emergency."

#### **Urgent Repairs**
- "My washing machine broke down. I need it fixed today."
- "Can you come today for microwave repair?"
- "I need immediate electrical repair."
- "My AC stopped working. Can you come now?"

### **5. Maintenance & Tips Questions**

#### **Maintenance Tips**
- "How can I maintain my AC properly?"
- "What are some washing machine maintenance tips?"
- "How often should I clean my microwave?"
- "What maintenance does my refrigerator need?"
- "How can I prevent electrical issues?"

#### **Safety Advice**
- "Is it safe to repair electrical appliances myself?"
- "What safety precautions should I take with my AC?"
- "How can I prevent washing machine accidents?"
- "What should I do if my microwave catches fire?"
- "How can I make my home electrical system safer?"

### **6. Off-Topic Questions (Should Redirect)**

#### **Non-Appliance Questions**
- "Can you teach me to cook better?"
- "I'm an alien and my spaceship is broken."
- "Can you help me with my homework?"
- "What's the weather like today?"
- "Can you tell me a joke?"

#### **Expected Responses**
- Should politely redirect to appliance-related topics
- Should maintain professional tone
- Should offer appliance repair help instead

### **7. Company Information Questions**

#### **Location & Contact**
- "Where is your office located?"
- "What's your phone number?"
- "How can I contact you?"
- "Do you have a helpline?"
- "What's your email address?"

#### **Business Hours**
- "What are your working hours?"
- "Do you work on weekends?"
- "Are you available in the evening?"
- "Can you come on Sunday?"
- "What's your earliest available slot?"

### **8. Payment & Warranty Questions**

#### **Payment Methods**
- "What payment methods do you accept?"
- "Do you accept credit cards?"
- "Can I pay by UPI?"
- "Do you have cash on delivery?"
- "When do I need to pay for the service?"

#### **Warranty & Guarantees**
- "What warranty do you provide on repairs?"
- "How long is the repair warranty?"
- "Do you guarantee your work?"
- "What if the repair fails after service?"
- "Do you provide free follow-up service?"

### **9. Technical & Complex Questions**

#### **Complex Issues**
- "My AC is not cooling, making noise, and leaking water. I need urgent repair and want to know the cost and warranty."
- "I want to book washing machine repair for tomorrow, need to know pricing, payment options, and if you provide same-day service."
- "My microwave is not heating, the turntable is stuck, and the display shows error codes. What should I do?"

#### **Multi-Appliance Issues**
- "I have problems with my AC, washing machine, and microwave. Can you help with all of them?"
- "My entire home electrical system is having issues. What should I do?"
- "I need maintenance for all my appliances. Do you offer package deals?"

### **10. Edge Case Questions**

#### **Boundary Testing**
- "" (empty message)
- "a".repeat(1000) (very long message)
- "!@#$%^&*()" (special characters only)
- "123456789" (numbers only)
- "Test" (simple test word)

#### **Unusual Scenarios**
- "Can you fix my broken heart?" (should redirect to appliances)
- "Will you marry my washing machine?" (should redirect professionally)
- "Can you make my AC sing?" (should offer maintenance tips instead)

## 🎯 **Expected Behavior**

### **✅ Good Responses Should:**
- Provide step-by-step troubleshooting guides
- Include relevant service pricing and contact information
- Offer practical maintenance tips and safety advice
- Maintain professional, friendly tone
- Redirect off-topic questions back to appliances
- Suggest booking service when appropriate

### **❌ Bad Responses Should Be Avoided:**
- Answering non-appliance questions directly
- Making up company information
- Being rude or unprofessional
- Providing incorrect technical information
- Going off-topic without redirecting

## 🧪 **Testing Instructions**

1. **Start with basic troubleshooting questions**
2. **Test service and pricing inquiries**
3. **Try off-topic questions to test redirection**
4. **Test emergency scenarios**
5. **Verify company information responses**
6. **Test edge cases and boundary conditions**

## 📊 **Success Metrics**

- **Relevance**: Responses should be appliance-focused
- **Helpfulness**: Should provide actionable solutions
- **Professionalism**: Maintain friendly, professional tone
- **Accuracy**: Use correct service information
- **Redirection**: Handle off-topic questions appropriately

**Your ApplianceAid chatbot is now ready for comprehensive testing!** 🚀

The enhanced system prompt ensures focused, professional responses that stay within the appliance repair domain while providing helpful, actionable advice to customers.
