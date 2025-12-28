import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Book from "./pages/Book";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/hooks/useCart";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/Admin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import SupportChatWidget from "@/components/SupportChatWidget";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { sendMessageToMockBot, resetMockBot } from "@/lib/mock-chatbot";

const queryClient = new QueryClient();

const App = () => {
  // Handle chatbot message sending
  const handleSendMessage = async (message: string): Promise<string> => {
    try {
      return await sendMessageToMockBot(message);
    } catch (error) {
      console.error('Chatbot error:', error);
      throw new Error('Unable to connect to our AI assistant. Please try again later or contact our support team at +91 98765 43210.');
    }
  };

  // Handle clear chat
  const handleClearChat = () => {
    resetMockBot();
    console.log('Chat cleared - all histories reset');
  };

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <AuthProvider>
              <CartProvider>
                <Toaster />
                <Sonner />
                <Navbar />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/book" element={<Book />} />
                  <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/admin" element={<AdminPanel />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/terms-of-service" element={<TermsOfService />} />
                      <Route path="/refund-policy" element={<RefundPolicy />} />
                      <Route path="/cookie-policy" element={<CookiePolicy />} />
                      <Route path="*" element={<NotFound />} />
                </Routes>
                
                {/* Support Chatbot */}
                <SupportChatWidget 
                  onSendMessage={handleSendMessage}
                  onClearChat={handleClearChat}
                  placeholder="Ask about our repair services..."
                  welcomeMessage="Hi! I'm here to help with your appliance repair needs. What can I assist you with today?"
                />
              </CartProvider>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
