"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hola, ¿Cómo puedo ayudarte?', isUser: false }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle dragging functionality
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && chatRef.current) {
        const newX = Math.max(0, Math.min(window.innerWidth - chatRef.current.offsetWidth, e.clientX - dragOffset.x));
        const newY = Math.max(0, Math.min(window.innerHeight - chatRef.current.offsetHeight, e.clientY - dragOffset.y));
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (chatRef.current) {
      const rect = chatRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: newMessage,
        isUser: true
      };
      
      setMessages([...messages, userMessage]);
      setNewMessage('');
      
      // Simulate assistant response after a delay
      setTimeout(() => {
        const assistantMessage = {
          id: messages.length + 2,
          text: 'Estoy procesando tu solicitud...',
          isUser: false
        };
        setMessages(prev => [...prev, assistantMessage]);
      }, 1000);
    }
  };

  return (
    <div
      ref={chatRef}
      className="fixed z-50 flex flex-col"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: isOpen ? '300px' : 'auto',
        transition: 'width 0.3s ease-in-out'
      }}
    >
      {/* Chat Header - Used for dragging */}
      <div 
        className=" p-2 rounded-t-lg flex justify-between items-center cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          {isOpen && (
            <div className="text-white font-medium">Chat</div>
          )}
        </div>
        <button 
          onClick={toggleChat}
          className="w-20 h-20 rounded-full  hover:bg-blue-700 flex items-center justify-center transition-colors"
        >
          {isOpen ? (
            <span className="text-white">×</span>
          ) : (
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              <Image 
                src="/avatar-assistant.png" 
                alt="Assistant" 
                width={100} 
                height={100} 
                style={{width: "80px", height: "80px"}}
                className="rounded-full"
              />
            </div>
          )}
        </button>
      </div>

      {/* Chat Body */}
      {isOpen && (
        <div className="flex flex-col bg-gray-900 rounded-b-lg shadow-lg overflow-hidden">
          {/* Messages area */}
          <div className="flex-1 p-3 overflow-y-auto max-h-80 space-y-3">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!msg.isUser && (
                  <div className="flex-shrink-0 mr-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden  flex items-center justify-center">
                      <Image 
                        src="/avatar-assistant.png" 
                        alt="Assistant" 
                        width={32} 
                        height={32} 
                        className="rounded-full"
                      />
                    </div>
                  </div>
                )}
                <div 
                  className={`max-w-[70%] rounded-lg px-3 py-2 ${msg.isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-800 p-2">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje"
                className="flex-1 bg-gray-800 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
