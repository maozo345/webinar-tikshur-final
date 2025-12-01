import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage, Webinar } from '../types';
import { generateWebinarResponse } from '../services/geminiService';

interface ChatInterfaceProps {
  currentWebinar: Webinar;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ currentWebinar }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `שלום! אני העוזר החכם שלך לוובינר "${currentWebinar.title}". איך אני יכול לעזור לך להבין את התוכן היום?`,
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset chat when webinar changes
  useEffect(() => {
    setMessages([{
      id: 'welcome-' + currentWebinar.id,
      role: 'model',
      text: `שלום! אני העוזר החכם שלך לוובינר "${currentWebinar.title}". שאל אותי כל דבר שקשור לנושא!`,
      timestamp: new Date()
    }]);
  }, [currentWebinar.id]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const context = `
        Title: ${currentWebinar.title}
        Description: ${currentWebinar.description}
        Topics: ${currentWebinar.topics.join(', ')}
      `;
      
      const responseText = await generateWebinarResponse(messages, userMsg.text, context);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: 'אופס, נתקלתי בבעיה. נסה שוב מאוחר יותר.',
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white flex items-center gap-3 shadow-sm">
        <div className="p-2 bg-white/20 rounded-full">
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </div>
        <div>
          <h3 className="font-bold text-sm">עוזר בינה מלאכותית</h3>
          <p className="text-xs text-primary-100 opacity-90">שאל שאלות בזמן אמת</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
              
              <div className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-primary-100 text-primary-600'}
              `}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>

              <div className={`
                p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-white text-slate-800 rounded-tr-none border border-slate-200' 
                  : 'bg-primary-600 text-white rounded-tl-none'
                }
                ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}
              `}>
                {msg.text}
              </div>

            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end w-full">
             <div className="flex flex-row-reverse items-center gap-2 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                   <Bot size={16} />
                </div>
                <div className="bg-primary-50 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                   <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                   <span className="text-xs text-primary-500 font-medium">מקליד...</span>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-slate-100">
        <div className="flex items-end gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-primary-100 focus-within:border-primary-400 transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="שאל משהו על הוובינר..."
            className="flex-1 bg-transparent border-none resize-none focus:ring-0 text-sm max-h-32 min-h-[44px] py-3 px-2 text-slate-700 placeholder:text-slate-400"
            rows={1}
            style={{ height: 'auto' }} 
            onInput={(e) => {
               const target = e.target as HTMLTextAreaElement;
               target.style.height = 'auto';
               target.style.height = target.scrollHeight + 'px';
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`
              p-2.5 rounded-lg flex-shrink-0 transition-all duration-200
              ${!input.trim() || isLoading 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg active:scale-95'
              }
            `}
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="rtl:rotate-180" />}
          </button>
        </div>
      </div>
    </div>
  );
};