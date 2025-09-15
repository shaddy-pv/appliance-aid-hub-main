import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Minimize2,
  Maximize2,
  Clock,
  AlertCircle,
  Trash2,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
}

interface SupportChatWidgetProps {
  onSendMessage: (message: string) => Promise<string>;
  className?: string;
  placeholder?: string;
  welcomeMessage?: string;
  maxMessages?: number;
  onClearChat?: () => void;
}

export const SupportChatWidget: React.FC<SupportChatWidgetProps> = ({
  onSendMessage,
  className,
  placeholder = "Type your message...",
  welcomeMessage = "Hello! I'm here to help with your appliance repair needs. How can I assist you today?",
  maxMessages = 50,
  onClearChat
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      content: welcomeMessage,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await onSendMessage(userMessage.content);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => {
        const newMessages = [...prev, botMessage];
        // Keep only the last maxMessages messages
        return newMessages.slice(-maxMessages);
      });

      // Show success toast for important responses
      if (response.toLowerCase().includes('book') || response.toLowerCase().includes('appointment')) {
        toast({
          title: "Service Information",
          description: "I've provided information about our services. You can book an appointment anytime!",
          duration: 3000,
        });
      }

    } catch (error) {
      console.error('Chatbot error:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : "Sorry, I'm having trouble connecting right now. Please try again later or contact our support team directly.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);

      // Show error toast
      toast({
        title: "Connection Error",
        description: "Unable to connect to our AI assistant. Please try again or contact support.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        content: welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    
    // Call the optional onClearChat callback
    if (onClearChat) {
      onClearChat();
    }
    
    // Show success toast
    toast({
      title: "Chat Cleared",
      description: "Your conversation has been reset. How can I help you today?",
      duration: 2000,
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
          aria-label="Open support chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={cn(
          "shadow-2xl border-0 bg-background/95 backdrop-blur-sm transition-all duration-300",
          isMinimized ? "h-12 w-80" : "w-80 h-96",
          // Add responsive sizing for better mobile experience
          "sm:w-80 sm:h-96",
          // Larger size when not minimized on larger screens
          !isMinimized && "lg:w-96 lg:h-[32rem]"
        )}>
          {/* Chat Header */}
          <CardHeader className={cn(
            "flex flex-row items-center justify-between space-y-0 p-4 border-b",
            isMinimized && "py-2"
          )}>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <h3 className="font-semibold text-sm">Support Chat</h3>
              {isTyping && (
                <Badge variant="secondary" className="text-xs">
                  Typing...
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {!isMinimized && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="h-6 w-6 p-0"
                  aria-label="Clear chat"
                  title="Clear conversation"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMinimize}
                className="h-6 w-6 p-0"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                title={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="h-6 w-6 p-0"
                aria-label="Close chat"
                title="Close chat"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>

          {/* Chat Messages */}
          {!isMinimized && (
            <>
              <CardContent className="p-0 flex-1">
                <ScrollArea className="h-64 lg:h-80 px-4" ref={scrollAreaRef}>
                  <div className="space-y-4 py-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3",
                          message.sender === 'user' ? "justify-end" : "justify-start"
                        )}
                      >
                        {message.sender === 'bot' && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src="/bot-avatar.png" alt="AI Assistant" />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={cn(
                          "flex flex-col max-w-[80%]",
                          message.sender === 'user' ? "items-end" : "items-start"
                        )}>
                          <div
                            className={cn(
                              "rounded-lg px-4 py-3 text-sm shadow-sm",
                              message.sender === 'user'
                                ? "bg-primary text-primary-foreground rounded-br-sm"
                                : "bg-muted rounded-bl-sm"
                            )}
                          >
                            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                          </div>
                          
                          <div className={cn(
                            "flex items-center gap-1 mt-1 text-xs opacity-70",
                            message.sender === 'user' ? "text-primary-foreground/70" : "text-muted-foreground"
                          )}>
                            <Clock className="h-3 w-3" />
                            <span>{formatTime(message.timestamp)}</span>
                            {message.sender === 'bot' && (
                              <span className="ml-1">• AI Assistant</span>
                            )}
                          </div>
                        </div>

                        {message.sender === 'user' && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src="/user-avatar.png" alt="You" />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    
                    {/* Loading indicator */}
                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src="/bot-avatar.png" alt="AI Assistant" />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <div className="bg-muted rounded-lg px-4 py-3 text-sm shadow-sm rounded-bl-sm">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="h-4 w-4 animate-spin text-primary" />
                              <span className="text-muted-foreground">AI is thinking...</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground opacity-70">
                            <Clock className="h-3 w-3" />
                            <span>Just now</span>
                            <span className="ml-1">• AI Assistant</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    disabled={isLoading}
                    className="flex-1"
                    aria-label="Type your message"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    size="sm"
                    className="px-3"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
};

export default SupportChatWidget;
