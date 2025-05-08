import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { useStore } from '../../store';
import { ChatMessage } from '../../types';
import { MessageList } from './MessageList';

type AIChatProps = {
  noteId: string;
  onClose: () => void;
};

export const AIChat: React.FC<AIChatProps> = ({ noteId, onClose }) => {
  const { getChatMessages, addChatMessage } = useStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const messages = getChatMessages(noteId);

  // Focus input when chat opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message
    addChatMessage(noteId, {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    });
    
    setInput('');
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Add AI response with fixed mock response
      const aiResponses = [
        "I can help you organize those thoughts. Would you like me to suggest some structure for your notes?",
        "That's an interesting point. Have you considered looking at it from a different perspective?",
        "I've analyzed your note and found some key themes you might want to explore further.",
        "I'd recommend breaking this topic down into smaller sections for better clarity.",
        "Your ideas are coming together nicely. I can help you refine them if you'd like."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      addChatMessage(noteId, {
        id: Date.now().toString(),
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      });
      
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="slide-up border-t border-gray-200 bg-white shadow-md">
      <div className="flex h-72 flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
          <h3 className="font-medium text-gray-700">AI Assistant</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <MessageList messages={messages} isLoading={isLoading} />
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t border-gray-200 p-3">
          <div className="flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something about your note..."
              className="flex-1 border-none bg-transparent py-1 outline-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="ml-2 rounded-full p-1 text-blue-500 hover:bg-blue-50 disabled:text-gray-300 disabled:hover:bg-transparent"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};