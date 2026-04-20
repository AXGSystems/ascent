'use client';

import { useState } from 'react';
import { chatMessages } from '@/lib/data';
import { cn } from '@/lib/utils';
import Card from '@/components/Card';
import AdvisorTip from '@/components/AdvisorTip';
import ScrollReveal from '@/components/ScrollReveal';
import QuickTip from '@/components/QuickTip';

export default function MessagesPage() {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    const sanitized = input.trim().slice(0, 500);
    if (!sanitized) return;
    const newMsg = {
      id: `m${messages.length + 1}`,
      from: 'Christian' as const,
      text: sanitized,
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      date: 'Today',
    };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  const recentTopics = [
    'Electric bill discussion',
    'TreatYoSelf charge',
    'Hawaii fund increase',
    'Weekend money date',
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Messages</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C+C</span>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-0.5">Household Chat</p>
              <p className="text-xl font-bold text-white">Christian & Channelle</p>
              <p className="text-sm text-white/60">{messages.length} messages today</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="tip">
            Weekly money check-ins reduce financial arguments by 40%. Use the chat to discuss spending decisions before they happen.
          </AdvisorTip>
          <AdvisorTip type="insight">
            Couples who communicate about money save 23% more. Your household chat keeps both partners in the loop.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Chat + Sidebar */}

      <ScrollReveal>
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Chat Window */}
        <Card padding={false} className="flex flex-col" >
          <div className="px-5 pt-5 pb-3 border-b border-[var(--border-color)]">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[500px]">
            {messages.map((msg) => (
              <div key={msg.id} className={cn('flex', msg.from === 'Christian' ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                  'max-w-[75%] rounded-2xl px-4 py-2.5',
                  msg.from === 'Christian'
                    ? 'bg-brand-teal text-white rounded-br-md'
                    : 'bg-[var(--border-color)] text-[var(--text-primary)] rounded-bl-md'
                )}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={cn('text-[10px] mt-1', msg.from === 'Christian' ? 'text-white/50' : 'text-[var(--text-muted)]')}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-[var(--border-color)] flex gap-2">
            <label className="sr-only" htmlFor="message-input">Type a message</label>
            <input
              id="message-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              maxLength={500}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-brand-teal/50 min-h-[44px]"
            />
            <button
              type="button"
              onClick={handleSend}
              className="px-4 py-2.5 rounded-xl bg-brand-teal text-white text-sm font-medium hover:bg-brand-teal-dark transition-colors min-h-[44px]"
            >
              Send
            </button>
          </div>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Recent Topics</h2>
            <div className="space-y-2">
              {recentTopics.map((topic, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--border-color)] transition-colors">
                  <span className="w-2 h-2 rounded-full bg-brand-teal shrink-0" />
                  <span className="text-sm text-[var(--text-secondary)]">{topic}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Shared Receipts</h2>
            <div className="space-y-2">
              {[
                { name: 'TreatYoSelf', amount: '$650', who: 'Channelle' },
                { name: 'Whole Foods', amount: '$67.43', who: 'Christian' },
                { name: 'Costco', amount: '$124.30', who: 'Christian' },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-[var(--border-color)]/50">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{r.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{r.who}</p>
                  </div>
                  <span className="text-sm tabular-nums font-semibold text-[var(--text-primary)]">{r.amount}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      </ScrollReveal>

      {/* QUICK TIP */}
      <QuickTip page="messages" />
    </div>
  );
}
