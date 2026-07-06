import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import type { ChatMessage } from '../../types';
import { generateId } from '../../lib/utils';

const predefinedResponses: Record<string, string> = {
  'hello': 'Hello! Welcome to Harper & Reed Realty. How can I help you today? You can ask me about:\n\n🏠 Our featured listings\n💰 Home valuations\n📅 Scheduling a consultation\n📍 Areas we serve',
  'listings': 'We have some beautiful properties available! Our featured listings include:\n\n• Modern Colonial Estate in Northwood — $1,850,000\n• Lakeside Contemporary in Westhaven — $2,450,000\n• Charming Victorian Townhouse in Oakridge — $875,000\n\nWould you like to see more details on any of these?',
  'valuation': 'I\'d be happy to help with a home valuation! Please fill out the "What\'s My Home Worth?" form on our website, and Sarah or James will get back to you with a comprehensive market analysis within 24 hours.',
  'schedule': 'Great! You can schedule a consultation by:\n\n1. Clicking the "Schedule a Consultation" button in our navigation\n2. Filling out the contact form at the bottom of the page\n3. Calling us directly at (555) 123-4567\n\nWe look forward to meeting you!',
  'areas': 'We serve the following areas:\n\n• Northwood\n• Westhaven\n• Oakridge\n• Southpointe\n• Easton\n\nAll neighborhoods in the Greater Metro Area!',
  'default': 'I\'m not sure I understand. Here are some things you can ask me:\n\n🏠 "Show me listings"\n💰 "Home valuation"\n📅 "Schedule a consultation"\n📍 "Areas you serve"\n\nOr feel free to call us at (555) 123-4567!',
};

function getBotResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('list') || lower.includes('proper') || lower.includes('home')) return predefinedResponses.listings;
  if (lower.includes('valu') || lower.includes('worth') || lower.includes('appraisal')) return predefinedResponses.valuation;
  if (lower.includes('schedul') || lower.includes('consult') || lower.includes('meeting')) return predefinedResponses.schedule;
  if (lower.includes('area') || lower.includes('serve') || lower.includes('location') || lower.includes('neighborhood')) return predefinedResponses.areas;
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) return predefinedResponses.hello;
  return predefinedResponses.default;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      text: '🏠 Hi! I\'m the Harper & Reed assistant. How can I help you today?',
      sender: 'agent',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: generateId(),
        text: getBotResponse(input),
        sender: 'agent',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brass text-white shadow-lg transition-colors hover:bg-brass/90"
        aria-label="Chat with us"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 rounded-t-2xl bg-forest-800 px-5 py-4 text-white">
              <Bot className="h-6 w-6" />
              <div>
                <p className="text-sm font-semibold">Harper & Reed Assistant</p>
                <p className="text-xs text-forest-200">Online — typically replies instantly</p>
              </div>
            </div>

            <div className="flex h-[400px] flex-col gap-3 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[80%] gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      msg.sender === 'user' ? 'bg-forest-100' : 'bg-brass/20'
                    }`}>
                      {msg.sender === 'user' ? (
                        <User className="h-4 w-4 text-forest-800" />
                      ) : (
                        <Bot className="h-4 w-4 text-brass" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-forest-800 text-white'
                        : 'bg-gray-100 text-charcoal'
                    }`}>
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i}>{line || '\u00A0'}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-100 p-4">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-forest-800 focus:bg-white"
                />
                <button
                  onClick={handleSend}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-800 text-white transition-colors hover:bg-forest-700"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
