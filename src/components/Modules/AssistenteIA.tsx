import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Bot, 
  User, 
  Paperclip, 
  Mic, 
  Sparkles, 
  Scale, 
  ShieldCheck, 
  Gavel,
  MessageSquare,
  MoreHorizontal,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  { icon: Scale, label: 'Analisar multa de velocidade', color: 'text-blue-500' },
  { icon: Gavel, label: 'Como recorrer de sinal vermelho?', color: 'text-red-500' },
  { icon: ShieldCheck, label: 'Verificar validade de CNH', color: 'text-secondary' },
  { icon: Sparkles, label: 'Redigir recurso de multa', color: 'text-primary' },
];

export const AssistenteIA: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou seu Assistente Jurídico IA. Posso te ajudar a analisar multas, redigir defesas ou tirar dúvidas sobre o Código de Trânsito Brasileiro. Como posso ajudar hoje?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Entendi sua dúvida sobre "${input}". Com base no CTB (Código de Trânsito Brasileiro), posso te orientar que este tipo de infração geralmente permite recurso baseado em erros formais no auto de infração ou falta de aferição do equipamento pelo INMETRO. Gostaria que eu analisasse um documento específico?`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Chat Header */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 dark:shadow-none">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Assistente Jurídico IA
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary dark:bg-primary/20">
                PRO
              </span>
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Online e pronto para ajudar</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <RotateCcw className="h-5 w-5" />
          </button>
          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex w-full gap-4",
                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white",
                msg.role === 'user' ? "bg-slate-800 dark:bg-slate-700" : "bg-primary"
              )}>
                {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              
              <div className={cn(
                "flex max-w-[80%] flex-col gap-2",
                msg.role === 'user' ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                  msg.role === 'user' 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700"
                )}>
                  {msg.content}
                </div>
                
                <div className="flex items-center gap-3 px-1">
                  <span className="text-[10px] text-slate-400">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <Copy className="h-3 w-3" />
                      </button>
                      <button className="text-slate-400 hover:text-secondary transition-colors">
                        <ThumbsUp className="h-3 w-3" />
                      </button>
                      <button className="text-slate-400 hover:text-red-600 transition-colors">
                        <ThumbsDown className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-white px-4 py-3 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length === 1 && (
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setInput(prompt.label)}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition-all hover:border-primary hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
              >
                <div className={cn("rounded-lg bg-slate-50 p-2 dark:bg-slate-900", prompt.color)}>
                  <prompt.icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{prompt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="border-t border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl">
          <div className="relative flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 dark:border-slate-800 dark:bg-slate-900">
            <button className="rounded-xl p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <Paperclip className="h-5 w-5" />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Descreva sua dúvida jurídica ou anexe uma multa..." 
              className="flex-1 bg-transparent px-2 py-2 text-sm text-slate-900 outline-none dark:text-white"
            />
            <button className="rounded-xl p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <Mic className="h-5 w-5" />
            </button>
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="rounded-xl bg-primary p-2.5 text-white transition-all hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-3 text-center text-[10px] text-slate-400">
            O Assistente IA pode cometer erros. Verifique informações importantes com um advogado.
          </p>
        </div>
      </div>
    </div>
  );
};
