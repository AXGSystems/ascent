'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { coachResponses } from '@/lib/data';
import { dailyInsights } from '@/lib/education';
import { cn } from '@/lib/utils';
import QuickTip from '@/components/QuickTip';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Expanded coach responses for 15+ new topics
const expandedResponses: Record<string, string> = {
  ...coachResponses,
  'credit score':
    "Your credit score is 756 — that's in the \"Very Good\" range. The biggest factors are payment history (35%) and credit utilization (30%). You're using about 6.5% of your available credit right now, which is excellent. Keep paying on time, and you could hit 780+ by end of year. That opens the door to the best mortgage rates when you're ready for that house down payment.",
  'emergency fund':
    "Your Emergency Fund is at $3,600 of your $5,000 goal — that's 72%. At your current $15/day auto-save rate, you'll hit the target around late July. But here's the thing: $5,000 covers about 1.2 months of your expenses. Financial advisors recommend 3-6 months ($15,000-$30,000). Consider bumping the goal after you hit $5k. Even $50/month extra would reach $10k by December 2027.",
  retirement:
    "You're 28, which means time is your biggest asset. If you invest $500/month starting now at 8% average return, you'd have about $1.35 million by age 62. Your Ally Invest account has $26,500 — that's a great start. Make sure you're maxing out any employer 401(k) match first (that's free money), then consider a Roth IRA for tax-free growth.",
  'investing basics':
    "For beginners, here's Christian and Channelle's best path: 1) Max out employer 401(k) match. 2) Fund a Roth IRA ($7,000/year limit for 2026). 3) Low-cost index funds in your Ally account — your S&P 500 ETF at 0.03% is perfect. 4) Avoid the Growth Fund at 0.85% — it's eating your returns. Switching to an index equivalent could save you $128/year in fees.",
  'debt payoff':
    "You have 3 debts totaling $24,400: Chase Visa ($1,800 at 22.99%), Student Loan ($14,200 at 5.5%), Car Loan ($8,400 at 4.2%). My recommendation: Attack the Chase Visa first — it's the smallest AND highest interest, so you get both snowball momentum and avalanche efficiency. Paying $200/month extra clears it in 10 months and saves $180+ in interest.",
  'tax tips':
    "You're likely missing deductions. Channelle's home office ($120/mo potential), education expenses ($85/mo), and business supplies ($30/mo) could save $2,820/year in deductions. That's roughly $700 back at tax time. Also, your mortgage interest ($480/mo) is your biggest deduction. Consider itemizing vs. standard deduction — run the numbers both ways.",
  insurance:
    "Your insurance costs $184/month, but a bill audit found you could save $38/month by switching to a bundled policy with Geico. That's $456/year. Your phone plan at $140/month is also above market rate — Mint Mobile or similar could cut it to $80/month. Combined: $1,176/year in savings with two phone calls.",
  'compound interest':
    "Here's the math that should excite you: Your $10,760 in savings, growing at 5% for 30 years with no additional contributions, becomes $46,400. But add just $200/month? It becomes $214,000. That's the power of compound interest — the earlier you start, the more it works. Einstein called it the 8th wonder of the world for good reason.",
  inflation:
    "Inflation is currently around 3.5%. That means money sitting in a regular savings account at 0.5% is losing 3% of its purchasing power every year. Your Chase Savings earning minimal interest is actually losing money in real terms. Consider moving excess cash to a HYSA (4-5% APY) or into your Ally investment account for long-term growth.",
  'budgeting methods':
    "You're roughly following the 50/30/20 rule right now: 49% bills/housing, 34% flex spending, and 15% savings. But your actual savings rate is 39% because of auto-saves and surplus. That's incredible. The key insight: your system works BECAUSE it's automated. Don't rely on willpower — set up the system and let it run.",
  'financial goals':
    "Let me rank your goals by priority: 1) Emergency Fund to $5,000 (2 months away). 2) Pay off Chase Visa $1,800 (save 23% interest). 3) Hawaii trip $4,000 (on track for October). 4) House down payment (long-term, $10,000 target). You're juggling 6 goals simultaneously — that's ambitious. Consider focusing on 3 at a time for faster progress.",
  'net worth':
    "Your net worth is $82,450 and growing. Over the past 12 months, it's increased by $10,050 — that's a 13.9% growth rate. At this pace, you'll cross $100k in about 18 months. The breakdown: $54,560 in liquid assets, $26,500 in investments, and $1,200 in debt. Your debt-to-asset ratio is just 2.2% — that's excellent.",
  'passive income':
    "You have two passive income streams: Rental ($1,200/mo) and Stock Dividends ($185/quarter). That's $15,140/year without active work. To grow this: 1) Reinvest dividends for compound growth. 2) Consider adding a dividend ETF to Ally Invest. 3) Channelle's Etsy shop ($320/week) is semi-passive. Together you're building multiple income streams — that's the path to financial independence.",
  'side hustles':
    "Channelle is crushing it with two side income streams: Freelance (~$2,800/mo) and Etsy (~$1,280/mo). That's $4,080/month in supplemental income. Combined with Christian's ALTA salary and your rental income, your household income is diversified across 5 sources. The main opportunity: can any of these be scaled without proportional time investment?",
  'financial independence':
    "Financial independence means your investments generate enough to cover expenses — typically 25x annual expenses (the \"4% rule\"). Your annual expenses are roughly $52,000. So your FI number is ~$1,300,000. You're at $82,450, which is about 6.3% of the way there. But with your 39% savings rate and compound growth, you could reach FI by your early 50s. That's 15-20 years ahead of most people.",
  'what if':
    "Let's run some scenarios:\n\n1. Cancel all unused subs → +$62/mo → +$744/yr\n2. Bill audit savings → +$147/mo → +$1,764/yr\n3. Extra $200/mo to investments → +$72,000 over 20 years at 8%\n4. Pay off Chase Visa → Save $413/yr in interest\n5. All combined → +$3,665/yr in immediate savings + $72k long-term growth\n\nSmall changes, massive results.",
  hello:
    "Hey Christian! Great to see you. Your finances are looking solid today — net worth is at an all-time high of $82,450 and your savings rate is a stellar 39%. The one thing I'd flag: Shopping is $35 over budget, and that TreatYoSelf charge is worth reviewing. What would you like to dig into?",
  help:
    "I can help with a lot! Try asking about:\n\n- Spending trends and budget status\n- Savings goals and strategies\n- Bill optimization and audit\n- Credit score improvement\n- Debt payoff strategies\n- Investment basics\n- Tax tips\n- Retirement planning\n- Financial independence\n- \"What if\" scenarios\n\nOr just ask me anything about your money — I analyze your real data to give personalized advice.",
  tips:
    "Here are my top 5 quick wins right now:\n\n1. Cancel Adobe CC → Save $276/year (unused for 90 days)\n2. Switch phone plan → Save $720/year\n3. Pay off Chase Visa → Save $413/year in interest\n4. Move savings to HYSA → Earn $400+/year more\n5. Negotiate internet → Save $300/year\n\nTotal: $2,109/year from 5 moves. Want details on any of these?",
};

// Primary quick prompts
const quickPrompts = [
  { label: 'Spending', key: 'Spending' },
  { label: 'Budget', key: 'Budget' },
  { label: 'Bills', key: 'Bills' },
  { label: 'Save More', key: 'Save' },
  { label: 'Credit Score', key: 'credit score' },
  { label: 'Debt Strategy', key: 'debt payoff' },
  { label: 'Investing', key: 'investing basics' },
];

// Rotating "Ask me about..." chips
const rotatingChips = [
  [
    { label: 'Emergency Fund', key: 'emergency fund' },
    { label: 'Retirement', key: 'retirement' },
    { label: 'Tax Tips', key: 'tax tips' },
    { label: 'What If?', key: 'what if' },
  ],
  [
    { label: 'Compound Interest', key: 'compound interest' },
    { label: 'Net Worth', key: 'net worth' },
    { label: 'Passive Income', key: 'passive income' },
    { label: 'Quick Tips', key: 'tips' },
  ],
  [
    { label: 'Financial Goals', key: 'financial goals' },
    { label: 'Insurance', key: 'insurance' },
    { label: 'Inflation', key: 'inflation' },
    { label: 'Side Hustles', key: 'side hustles' },
  ],
  [
    { label: 'Budgeting Methods', key: 'budgeting methods' },
    { label: 'FI Number', key: 'financial independence' },
    { label: 'Forecast', key: 'Forecast' },
    { label: 'Sync Status', key: 'Sync' },
  ],
];

export default function CoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hey Christian! I'm your A$cent financial coach. I don't just report numbers — I analyze your real data and give personalized advice. Ask me about spending, budget, bills, savings, credit score, debt strategy, investing, taxes, or any \"what if\" scenario. What's on your mind?",
    },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get the daily insight based on date
  const dailyInsight = useMemo(() => {
    const dayOfMonth = new Date().getDate();
    return dailyInsights[(dayOfMonth - 1) % dailyInsights.length];
  }, []);

  // Rotate chips based on the current minute (changes every few minutes)
  const currentChipSet = useMemo(() => {
    const idx = Math.floor(Date.now() / 180000) % rotatingChips.length;
    return rotatingChips[idx];
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  function handleSend(text: string) {
    const sanitized = text.trim().slice(0, 500);
    if (!sanitized) return;
    const userMsg: ChatMessage = { role: 'user', content: sanitized };

    // Find matching response from expanded set
    const lowerText = sanitized.toLowerCase();
    const key = Object.keys(expandedResponses).find(
      (k) => lowerText.includes(k.toLowerCase())
    );
    const reply = key
      ? expandedResponses[key]
      : "Great question! I don't have a specific analysis for that yet, but I'm always learning. Try asking about: spending, budget, bills, savings, credit score, debt payoff, investing, retirement, tax tips, insurance, compound interest, inflation, budgeting methods, financial goals, net worth, passive income, side hustles, financial independence, or \"what if\" scenarios. I analyze your real data for each of these topics.";

    setMessages((prev) => [...prev, userMsg, { role: 'assistant', content: reply }]);
    setInput('');
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100dvh-8rem)] lg:h-[calc(100dvh-6rem)]">
      {/* Header */}
      <section className="mb-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10 hero-sweep">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5 hero-shimmer" />
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                <path d="M18 15l.75 2.25L21 18l-2.25.75L18 21l-.75-2.25L15 18l2.25-.75L18 15z" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 breathing-dot" style={{ width: '6px', height: '6px' }} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">A$cent Coach</h1>
              <p className="text-xs text-white/50">Your AI financial advisor — 22 topics available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Insight */}
      <div className="mb-3 rounded-xl border border-brand-teal/20 bg-brand-teal/5 p-3">
        <div className="flex items-start gap-2">
          <span className="text-sm shrink-0" aria-hidden="true">{'\uD83D\uDCA1'}</span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-teal mb-0.5">Daily Insight</p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{dailyInsight}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pb-4"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'flex animate-fade-in',
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            )}
            style={{ animationDelay: `${Math.min(i * 50, 300)}ms` }}
          >
            <div
              className={cn(
                'max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed transition-all',
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

      {/* Primary quick prompts */}
      <div className="flex flex-wrap gap-2 mb-2">
        {quickPrompts.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => handleSend(p.key)}
            className="px-3 py-2 rounded-full text-xs font-medium bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20 transition-all min-h-[44px] active:scale-[0.95] action-link"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Rotating "Ask me about..." chips */}
      <div className="mb-3">
        <p className="text-[10px] text-[var(--text-muted)] mb-1.5">Ask me about...</p>
        <div className="flex flex-wrap gap-2">
          {currentChipSet.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => handleSend(p.key)}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-brand-teal/10 hover:text-brand-teal hover:border-brand-teal/30 transition-all active:scale-[0.95]"
            >
              {p.label}
            </button>
          ))}
        </div>
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
          className="flex-1 px-4 py-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-teal/30 min-h-[48px] backdrop-blur-xl transition-shadow"
        />
        <button
          type="button"
          onClick={() => handleSend(input)}
          disabled={!input.trim()}
          className="min-h-[48px] px-5 rounded-2xl bg-brand-teal text-white font-medium text-sm hover:bg-brand-teal-dark transition-all active:scale-[0.95] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>

      {/* Quick Tip */}
      <QuickTip page="coach" />
    </div>
  );
}
