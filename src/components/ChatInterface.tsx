
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  sender: 'user' | 'doctor';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  doctorId?: string;
  doctorName?: string;
  doctorImage?: string;
}

export function ChatInterface({ doctorId, doctorName = "Dr. Smith", doctorImage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'doctor',
      content: `Hello! I'm ${doctorName}. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');

    // Simulate doctor response after a short delay
    setTimeout(() => {
      const responses = [
        "I understand your concern. Let me help you with that.",
        "That's a good question. Based on your symptoms, I would recommend...",
        "Thank you for sharing that information. Can you tell me a bit more about when it started?",
        "I see. Have you tried any medications for this issue?",
        "That's quite common. Don't worry, we'll figure this out together.",
      ];
      
      const doctorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'doctor',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, doctorResponse]);
      
      toast({
        title: "New message",
        description: `${doctorName} has responded to your message`,
      });
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={doctorImage} />
            <AvatarFallback>{doctorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{doctorName}</CardTitle>
            <p className="text-sm text-muted-foreground">Online • Usually responds in a few minutes</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[75%] px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-health-500 text-white rounded-tr-none' 
                      : 'bg-muted rounded-tl-none'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-health-50' : 'text-muted-foreground'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-3">
        <div className="flex w-full gap-2">
          <Input 
            placeholder="Type your message..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="flex-grow"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-health-500 hover:bg-health-600"
          >
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ChatInterface;
