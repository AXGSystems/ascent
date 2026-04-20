'use client';

import { useState, useRef, useEffect } from 'react';
import { coachResponses } from '@/lib/data';
import { cn } from '@/lib/utils';
import AdvisorTip from '@/components/AdvisorTip';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const quickPrompts = [
  { label: 'Spending', key: 'Spending' },
  { label: 'Budget', key: 'Budget' },
  { label: 'Bills', key: 'Bills' },
  { label: 'Save More', key: 'Save' },
  { label: 'Sync', key: 'Sync' },
  { label: 'Audit', key: 'Audit' },
  { label: 'Forecast', key: 'Forecast' },
];

export default function CoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hey Christian! I'm your A$cent financial coach. Ask me about your spending, budget, bills, savings, or I can audit your accounts. What do you want to dig into?",
    },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  function handleSend(text: string) {
    const sanitized = text.trim().slice(0, 500);
    if (!sanitized) return;
    const userMsg: ChatMessage = { role: 'user', content: sanitized };

    // Find matching response
    const key = Object.keys(coachResponses).find(
      (k) => text.toLowerCase().includes(k.toLowerCase())
    );
    const reply = key
      ? coachResponses[key]
      : "I don't have data on that yet. Try asking about Spending, Budget, Bills, Save, Sync, Audit, or Forecast.";

    setMessages((prev) => [...prev, userMsg, { role: 'assistant', content: reply }]);
    setInput('');
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100dvh-8rem)] lg:h-[calc(100dvh-6rem)]">
      {/* Header */}
      <section className="mb-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5 hero-shimmer" />
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                <path d="M18 15l.75 2.25L21 18l-2.25.75L18 21l-.75-2.25L15 18l2.25-.75L18 15z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">A$cent Coach</h1>
              <p className="text-xs text-white/50">Your AI financial advisor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pb-4"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'flex',
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-brand-teal text-white rounded-br-sm'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-bl-sm backdrop-blur-xl'
              )}
            >
              <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
            </div>
          </div>
        ))}
      </div>

      {/* Guidance */}
      <div className="mb-3">
        <AdvisorTip type="tip">
          Try asking about your Spending, Budget, or Savings. The coach analyzes your real data and gives personalized recommendations.
        </AdvisorTip>
      </div>

      {/* Quick prompts */}
      <div className="flex flex-wrap gap-2 mb-3">
        {quickPrompts.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => handleSend(p.key)}
            className="px-3 py-2 rounded-full text-xs font-medium bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20 transition-colors min-h-[44px]"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <label className="sr-only" htmlFor="coach-input">Ask your coach</label>
        <input
          id="coach-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder="Ask about your finances..."
          maxLength={500}
          className="flex-1 px-4 py-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-teal/30 min-h-[48px] backdrop-blur-xl"
        />
        <button
          type="button"
          onClick={() => handleSend(input)}
          disabled={!input.trim()}
          className="min-h-[48px] px-5 rounded-2xl bg-brand-teal text-white font-medium text-sm hover:bg-brand-teal-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}
