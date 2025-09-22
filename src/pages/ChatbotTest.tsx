import React, { useState } from 'react';
import SupportChatWidget from '@/components/SupportChatWidget';
import { sendMessageToMockBot } from '@/lib/mock-chatbot';
import { sendMessageToGemini } from '@/lib/gemini-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { testData } from '@/data/test-data';
import { 
  MessageCircle, 
  Bot, 
  User, 
  Clock, 
  Phone, 
  Mail, 
  MapPin,
  Wrench,
  ShoppingCart,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const ChatbotTest: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  // Test with mock bot
  const handleMockMessage = async (message: string): Promise<string> => {
    return await sendMessageToMockBot(message);
  };

  // Test with Gemini API (if available)
  const handleGeminiMessage = async (message: string): Promise<string> => {
    try {
      return await sendMessageToGemini(message);
    } catch (error) {
      return "Gemini API not available. Please check your API key.";
    }
  };

  // Handle clear chat for test page
  const handleClearChat = () => {
    console.log('Test page chat cleared');
  };

  // Send test message to chatbot
  const sendTestMessage = (message: string) => {
    // This would trigger the chatbot to send a message
    // In a real implementation, you'd need to expose a method from the chatbot component
    console.log('Test message:', message);
  };

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Chatbot Test & Demo Center
            </CardTitle>
            <p className="text-muted-foreground">
              Comprehensive testing interface for the support chatbot with sample data and scenarios.
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chatbots" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="chatbots">Live Chatbots</TabsTrigger>
                <TabsTrigger value="scenarios">Test Scenarios</TabsTrigger>
                <TabsTrigger value="data">Sample Data</TabsTrigger>
                <TabsTrigger value="setup">Setup Guide</TabsTrigger>
              </TabsList>

              {/* Live Chatbots Tab */}
              <TabsContent value="chatbots" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        Mock Chatbot
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Uses predefined responses for testing the UI
                      </p>
                    </CardHeader>
                    <CardContent>
                      <SupportChatWidget 
                        onSendMessage={handleMockMessage}
                        onClearChat={handleClearChat}
                        placeholder="Test with mock responses..."
                        welcomeMessage="Hi! I'm the mock chatbot. I'll respond with predefined messages for testing."
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        Gemini AI Chatbot
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Uses Google Gemini AI for intelligent responses
                      </p>
                      {import.meta.env.VITE_GEMINI_API_KEY ? (
                        <Badge variant="default" className="w-fit">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          API Key Configured
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="w-fit">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          API Key Required
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <SupportChatWidget 
                        onSendMessage={handleGeminiMessage}
                        onClearChat={handleClearChat}
                        placeholder="Test with AI responses..."
                        welcomeMessage="Hi! I'm the AI-powered chatbot. I can help with appliance repair questions."
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Test Scenarios Tab */}
              <TabsContent value="scenarios" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Test Scenarios</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Click on any scenario to test the chatbot responses
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {testData.chatScenarios.map((scenario) => (
                        <Card 
                          key={scenario.id} 
                          className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                            selectedScenario === scenario.id ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => setSelectedScenario(scenario.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-sm">{scenario.title}</h4>
                              <Badge variant="outline" className="text-xs">
                                {scenario.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              <strong>User:</strong> "{scenario.userMessage}"
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <strong>Expected:</strong> {scenario.expectedResponse.substring(0, 100)}...
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Sample Data Tab */}
              <TabsContent value="data" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Services Data */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wrench className="h-5 w-5" />
                        Services ({testData.services.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="space-y-3">
                          {testData.services.map((service) => (
                            <div key={service.id} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-sm">{service.title}</h4>
                                <Badge variant={service.popular ? "default" : "secondary"}>
                                  {service.popular ? "Popular" : "Standard"}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">
                                {service.description}
                              </p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-medium">₹{service.price}</span>
                                <span className="text-muted-foreground">{service.duration}</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span>{service.rating}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Products Data */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Products ({testData.products.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="space-y-3">
                          {testData.products.map((product) => (
                            <div key={product.id} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-sm">{product.name}</h4>
                                <Badge variant={product.bestseller ? "default" : "secondary"}>
                                  {product.bestseller ? "Bestseller" : "Standard"}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">
                                {product.brand} • {product.category}
                              </p>
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">₹{product.price}</span>
                                  {product.originalPrice && (
                                    <span className="text-muted-foreground line-through">
                                      ₹{product.originalPrice}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span>{product.rating}</span>
                                  <span className="text-muted-foreground">({product.reviews})</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Customer Data */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Sample Customers ({testData.customers.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="space-y-3">
                          {testData.customers.map((customer) => (
                            <div key={customer.id} className="border rounded-lg p-3">
                              <h4 className="font-semibold text-sm mb-2">{customer.fullName}</h4>
                              <div className="space-y-1 text-xs text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-3 w-3" />
                                  <span>{customer.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3" />
                                  <span>{customer.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-3 w-3" />
                                  <span>{customer.address.city}, {customer.address.state}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3" />
                                  <span>Prefers: {customer.preferredTimeSlot}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Error Scenarios */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Error Scenarios ({testData.errorScenarios.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="space-y-3">
                          {testData.errorScenarios.map((scenario) => (
                            <div key={scenario.id} className="border rounded-lg p-3">
                              <h4 className="font-semibold text-sm mb-2">{scenario.title}</h4>
                              <p className="text-xs text-muted-foreground mb-2">
                                {scenario.description}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <strong>Expected:</strong> {scenario.expectedBehavior}
                              </p>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Setup Guide Tab */}
              <TabsContent value="setup" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Setup Instructions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">1. For Mock Testing</h4>
                        <p className="text-sm text-muted-foreground">
                          The chatbot will work immediately with predefined responses. No setup required.
                        </p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-semibold mb-2">2. For AI Testing</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Add your Gemini API key to <code className="bg-muted px-1 rounded">.env</code>:
                        </p>
                        <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                          VITE_GEMINI_API_KEY=your_gemini_api_key_here
                        </pre>
                        <p className="text-xs text-muted-foreground mt-2">
                          Note: The chatbot includes a built-in API key for immediate testing.
                        </p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-semibold mb-2">3. Install Dependencies</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Run the following command to install required packages:
                        </p>
                        <pre className="bg-muted p-3 rounded text-xs">
                          npm install @google/generative-ai
                        </pre>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-semibold mb-2">4. Test the Chatbot</h4>
                        <p className="text-sm text-muted-foreground">
                          The chatbot is already integrated into your main app. Visit any page to see the floating chat button.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatbotTest;
