// A$cent — Shared TypeScript Types

export interface NetWorthPoint {
  m: string;
  v: number;
}

export interface MonthlySpending {
  m: string;
  g: number; // groceries
  d: number; // dining
  s: number; // shopping
  e: number; // entertainment
  t: number; // transport
}

export interface CashFlowPoint {
  m: string;
  inc: number;
  exp: number;
}

export interface Merchant {
  n: string;
  total: number;
  count: number;
  avg: number;
}

export interface SavingsRatePoint {
  m: string;
  r: number;
}

export interface MonthlyBudgetPoint {
  m: string;
  budget: number;
  spent: number;
}

export interface ProjectedSavingsPoint {
  m: string;
  actual: number | null;
  proj: number;
}

export interface ActualSavingsPoint {
  m: string;
  v: number;
}

export interface Transaction {
  who: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  flagged?: boolean;
  refund?: boolean;
  income?: boolean;
}

export interface Account {
  name: string;
  type: string;
  value: number;
  status: 'ok' | 'warn' | 'stale';
  lastSync: string;
  owner: string;
}

export interface Bill {
  name: string;
  amount: number;
  dueLabel: string;
  dueDay: number;
  autopay: boolean;
  paid?: boolean;
}

export interface Subscription {
  name: string;
  amount: number;
  owner: string;
  issue?: string;
  usageScore: number;
  category: string;
  ok?: boolean;
}

export interface Nest {
  name: string;
  current: number;
  goal: number;
  autoAmount: number;
  frequency: 'Daily' | 'Weekly' | 'Biweekly' | 'Monthly';
}

export interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
  fixed?: boolean;
  warning?: boolean;
  over?: boolean;
}

export interface IncomeSource {
  source: string;
  frequency: string;
  nextDate: string;
  amount: string;
  amountNum: number;
  status: 'ok' | 'due';
}

export interface IncomeHistoryPoint {
  m: string;
  v: number;
}

export interface Achievement {
  name: string;
  description: string;
  done: boolean;
  date?: string;
  progress?: number;
}

export interface CreditScorePoint {
  month: string;
  score: number;
}

export interface ChargeIQResult {
  raw: string;
  merchant: string;
  description: string;
  category: string;
  confidence: number;
  phone: string;
  website: string;
}

export interface CoachMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CoachResponses {
  [key: string]: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// --- New types for mega upgrade ---

export interface AuditEvent {
  date: string;
  who: string;
  action: string;
  detail: string;
  severity: 'info' | 'warn' | 'danger';
}

export interface AscentSubScore {
  name: string;
  score: number;
  maxScore: number;
  trend: 'up' | 'down' | 'flat';
  description: string;
}

export interface TaxDeduction {
  category: string;
  amount: number;
  status: 'claimed' | 'potential' | 'review';
  description: string;
}

export interface InvestmentFee {
  account: string;
  type: string;
  rate: number;
  annualCost: number;
  benchmark: number;
  verdict: 'good' | 'ok' | 'high';
}

export interface BillAuditItem {
  name: string;
  current: number;
  potential: number;
  savings: number;
  provider: string;
  action: string;
  status: 'actionable' | 'done' | 'pending';
}

export interface DebtAccount {
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
  type: string;
}

export interface AlertItem {
  id: string;
  type: 'overspending' | 'bill' | 'goal' | 'sync' | 'security' | 'insight';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  from: 'Christian' | 'Channelle';
  text: string;
  time: string;
  date: string;
}

export interface MoneyDateItem {
  label: string;
  christianVal: string;
  channelleVal: string;
}

export interface FeedbackItem {
  id: string;
  type: 'feature' | 'bug';
  title: string;
  status: 'open' | 'planned' | 'done';
  date: string;
}

export interface ExportRecord {
  id: string;
  format: string;
  range: string;
  date: string;
  size: string;
}

export interface SyncAccount {
  name: string;
  institution: string;
  status: 'connected' | 'warning' | 'disconnected';
  lastSync: string;
  nextSync: string;
  owner: string;
}
