// A$cent — Sample Data
// Ported from NestWorth v5. "Von" -> "Christian", "Caroline" -> "Channelle".

import type {
  NetWorthPoint,
  MonthlySpending,
  CashFlowPoint,
  Merchant,
  SavingsRatePoint,
  MonthlyBudgetPoint,
  ProjectedSavingsPoint,
  ActualSavingsPoint,
  Transaction,
  Account,
  Bill,
  Subscription,
  Nest,
  BudgetCategory,
  IncomeSource,
  IncomeHistoryPoint,
  Achievement,
  ChargeIQResult,
  CoachResponses,
  CreditScorePoint,
  AuditEvent,
  AscentSubScore,
  TaxDeduction,
  InvestmentFee,
  BillAuditItem,
  DebtAccount,
  AlertItem,
  ChatMessage,
  MoneyDateItem,
  FeedbackItem,
  ExportRecord,
  SyncAccount,
} from './types';

// --- Net Worth History (12 months) ---
export const nwHistory: NetWorthPoint[] = [
  { m: 'May', v: 72400 },
  { m: 'Jun', v: 73800 },
  { m: 'Jul', v: 74200 },
  { m: 'Aug', v: 75600 },
  { m: 'Sep', v: 76100 },
  { m: 'Oct', v: 77800 },
  { m: 'Nov', v: 79200 },
  { m: 'Dec', v: 80100 },
  { m: 'Jan', v: 80800 },
  { m: 'Feb', v: 81200 },
  { m: 'Mar', v: 81900 },
  { m: 'Apr', v: 82450 },
];

// --- Monthly Spending by Category (6 months) ---
export const monthlySpending: MonthlySpending[] = [
  { m: 'Nov', g: 520, d: 310, s: 180, e: 120, t: 90 },
  { m: 'Dec', g: 680, d: 420, s: 350, e: 200, t: 95 },
  { m: 'Jan', g: 490, d: 280, s: 150, e: 100, t: 85 },
  { m: 'Feb', g: 510, d: 300, s: 190, e: 130, t: 88 },
  { m: 'Mar', g: 530, d: 290, s: 210, e: 110, t: 92 },
  { m: 'Apr', g: 480, d: 280, s: 235, e: 85, t: 45 },
];

// --- Cash Flow (6 months) ---
export const cashFlow: CashFlowPoint[] = [
  { m: 'Nov', inc: 7080, exp: 4800 },
  { m: 'Dec', inc: 7080, exp: 5200 },
  { m: 'Jan', inc: 7280, exp: 4400 },
  { m: 'Feb', inc: 7080, exp: 4600 },
  { m: 'Mar', inc: 7280, exp: 4520 },
  { m: 'Apr', inc: 7080, exp: 4320 },
];

// --- Top Merchants (9) ---
export const topMerchants: Merchant[] = [
  { n: 'Whole Foods', total: 1240, count: 18, avg: 68.89 },
  { n: 'Amazon', total: 890, count: 12, avg: 74.17 },
  { n: 'Shell Gas', total: 580, count: 12, avg: 48.33 },
  { n: 'Target', total: 520, count: 8, avg: 65.0 },
  { n: 'Costco', total: 480, count: 4, avg: 120.0 },
  { n: "Trader Joe's", total: 340, count: 8, avg: 42.5 },
  { n: 'Starbucks', total: 180, count: 22, avg: 8.18 },
  { n: 'CVS Pharmacy', total: 165, count: 6, avg: 27.5 },
  { n: 'Uber/Lyft', total: 148, count: 9, avg: 16.44 },
];

// --- Savings Rate History (6 months) ---
export const savingsRateHistory: SavingsRatePoint[] = [
  { m: 'Nov', r: 32 },
  { m: 'Dec', r: 27 },
  { m: 'Jan', r: 40 },
  { m: 'Feb', r: 35 },
  { m: 'Mar', r: 38 },
  { m: 'Apr', r: 39 },
];

// --- Monthly Budget History ---
export const monthlyBudgetHistory: MonthlyBudgetPoint[] = [
  { m: 'Jan', budget: 4400, spent: 4100 },
  { m: 'Feb', budget: 4500, spent: 4200 },
  { m: 'Mar', budget: 4600, spent: 4320 },
  { m: 'Apr', budget: 4600, spent: 2920 },
];

// --- Projected Savings ---
export const projectedSavings: ProjectedSavingsPoint[] = [
  { m: 'May', actual: null, proj: 9000 },
  { m: 'Jun', actual: null, proj: 11760 },
  { m: 'Jul', actual: null, proj: 14520 },
  { m: 'Aug', actual: null, proj: 17280 },
  { m: 'Sep', actual: null, proj: 20040 },
  { m: 'Oct', actual: null, proj: 22800 },
  { m: 'Nov', actual: null, proj: 25560 },
  { m: 'Dec', actual: null, proj: 28320 },
];

// --- Actual Savings ---
export const actualSavings: ActualSavingsPoint[] = [
  { m: 'Jan', v: 2760 },
  { m: 'Feb', v: 5240 },
  { m: 'Mar', v: 8000 },
  { m: 'Apr', v: 10760 },
];

// --- Transactions (16+) ---
export const transactions: Transaction[] = [
  { who: 'C', name: 'Whole Foods', category: 'Groceries', amount: -67.43, date: 'Today' },
  { who: 'Ch', name: 'TreatYoSelf', category: 'Clothing', amount: -650.0, date: 'Yesterday', flagged: true },
  { who: 'C', name: 'Shell Gas', category: 'Transport', amount: -48.2, date: 'Yesterday' },
  { who: 'J', name: 'Mortgage', category: 'Housing', amount: -2000, date: 'Friday' },
  { who: 'Ch', name: 'Target Refund', category: 'Refund', amount: 84.5, date: 'Apr 10', refund: true },
  { who: 'C', name: 'Netflix', category: 'Subscriptions', amount: -15.49, date: 'Apr 10' },
  { who: 'Ch', name: 'Amazon', category: 'Shopping', amount: -150.0, date: 'Apr 10' },
  { who: 'C', name: 'ALTA Payroll', category: 'Income', amount: 4280, date: 'Apr 11', income: true },
  { who: 'C', name: 'Costco', category: 'Groceries', amount: -124.3, date: 'Apr 8' },
  { who: 'Ch', name: 'Starbucks', category: 'Dining', amount: -6.75, date: 'Apr 8' },
  { who: 'C', name: "Trader Joe's", category: 'Groceries', amount: -42.5, date: 'Apr 7' },
  { who: 'Ch', name: 'Uber Eats', category: 'Dining', amount: -32.0, date: 'Apr 7' },
  { who: 'J', name: 'Insurance', category: 'Insurance', amount: -184.0, date: 'Apr 5' },
  { who: 'C', name: 'CVS Pharmacy', category: 'Health', amount: -27.5, date: 'Apr 4' },
  { who: 'Ch', name: 'Channelle Freelance', category: 'Income', amount: 2800, date: 'Apr 1', income: true },
  { who: 'C', name: 'Gym', category: 'Fitness', amount: -50.0, date: 'Apr 1' },
];

// --- Accounts (6) ---
export const accounts: Account[] = [
  { name: 'Chase Checking', type: 'Checking', value: 5360, status: 'ok', lastSync: '2h', owner: 'Joint' },
  { name: 'Chase Savings', type: 'Savings', value: 12400, status: 'ok', lastSync: '2h', owner: 'Joint' },
  { name: 'Capital One', type: 'Checking', value: 2100, status: 'warn', lastSync: '3d', owner: 'Christian' },
  { name: 'Cap One Savings', type: 'Savings', value: 8200, status: 'stale', lastSync: '47d', owner: 'Channelle' },
  { name: 'Ally Invest', type: 'Investment', value: 26500, status: 'ok', lastSync: '1d', owner: 'Christian' },
  { name: 'Credit Cards', type: 'Credit', value: -1200, status: 'ok', lastSync: '6h', owner: 'Joint' },
];

// --- Bills (9) ---
export const bills: Bill[] = [
  { name: 'Mortgage', amount: 2000, dueLabel: '1st', dueDay: 1, autopay: true, paid: true },
  { name: 'Insurance', amount: 184, dueLabel: '5th', dueDay: 5, autopay: true, paid: true },
  { name: 'Electric', amount: 145, dueLabel: '10th', dueDay: 10, autopay: false },
  { name: 'Water', amount: 65, dueLabel: '12th', dueDay: 12, autopay: false },
  { name: 'Internet', amount: 89, dueLabel: '15th', dueDay: 15, autopay: true },
  { name: 'Car Payment', amount: 385, dueLabel: '15th', dueDay: 15, autopay: true },
  { name: 'Phone', amount: 140, dueLabel: '18th', dueDay: 18, autopay: true },
  { name: 'Gym', amount: 50, dueLabel: '20th', dueDay: 20, autopay: true },
  { name: 'Student Loans', amount: 320, dueLabel: '25th', dueDay: 25, autopay: true },
];

// --- Subscriptions (12) ---
export const subscriptions: Subscription[] = [
  { name: 'Netflix', amount: 15.49, owner: 'Shared', ok: true, usageScore: 9, category: 'Entertainment' },
  { name: 'Hulu', amount: 17.99, owner: 'Shared', issue: 'Low use', usageScore: 3, category: 'Entertainment' },
  { name: 'Disney+', amount: 13.99, owner: 'Channelle', issue: '<5%', usageScore: 1, category: 'Entertainment' },
  { name: 'Headspace', amount: 14.99, owner: 'Christian', issue: '60d', usageScore: 2, category: 'Wellness' },
  { name: 'Adobe CC', amount: 22.99, owner: 'Channelle', issue: '90d', usageScore: 1, category: 'Productivity' },
  { name: 'Spotify', amount: 16.99, owner: 'Shared', ok: true, usageScore: 10, category: 'Entertainment' },
  { name: 'iCloud', amount: 2.99, owner: 'Christian', ok: true, usageScore: 8, category: 'Storage' },
  { name: 'YouTube Premium', amount: 13.99, owner: 'Shared', ok: true, usageScore: 7, category: 'Entertainment' },
  { name: 'Gym', amount: 50, owner: 'Shared', ok: true, usageScore: 6, category: 'Fitness' },
  { name: 'NYT', amount: 4.25, owner: 'Christian', ok: true, usageScore: 5, category: 'News' },
  { name: 'ChatGPT Plus', amount: 20, owner: 'Christian', ok: true, usageScore: 9, category: 'AI' },
  { name: 'Dropbox', amount: 11.99, owner: 'Channelle', issue: 'Low use', usageScore: 2, category: 'Storage' },
];

// --- Nests / Savings Goals (6) ---
export const nests: Nest[] = [
  { name: 'Emergency', current: 3600, goal: 5000, autoAmount: 15, frequency: 'Daily' },
  { name: 'Hawaii', current: 1800, goal: 4000, autoAmount: 25, frequency: 'Weekly' },
  { name: 'Mortgage DP', current: 2100, goal: 10000, autoAmount: 50, frequency: 'Biweekly' },
  { name: 'College', current: 450, goal: 20000, autoAmount: 10, frequency: 'Daily' },
  { name: 'New Car', current: 800, goal: 8000, autoAmount: 20, frequency: 'Weekly' },
  { name: 'Wedding Fund', current: 1200, goal: 5000, autoAmount: 30, frequency: 'Weekly' },
];

// --- Budget Categories (10) ---
export const budgetCategories: BudgetCategory[] = [
  { name: 'Housing', allocated: 2400, spent: 1500, fixed: true },
  { name: 'Groceries', allocated: 800, spent: 480 },
  { name: 'Dining Out', allocated: 300, spent: 280, warning: true },
  { name: 'Shopping', allocated: 200, spent: 235, over: true },
  { name: 'Entertainment', allocated: 150, spent: 85 },
  { name: 'Transport', allocated: 200, spent: 120 },
  { name: 'Subscriptions', allocated: 100, spent: 62 },
  { name: 'Health', allocated: 150, spent: 45 },
  { name: 'Personal', allocated: 200, spent: 90 },
  { name: 'Misc', allocated: 100, spent: 23 },
];

// --- Income Sources (5) ---
export const incomeSources: IncomeSource[] = [
  { source: 'ALTA Payroll (Christian)', frequency: 'Biweekly', nextDate: 'Apr 25', amount: '$4,280', amountNum: 4280, status: 'ok' },
  { source: 'Freelance (Channelle)', frequency: 'Monthly', nextDate: 'Apr 15', amount: '~$2,800', amountNum: 2800, status: 'due' },
  { source: 'Rental', frequency: 'Monthly 1st', nextDate: 'May 1', amount: '$1,200', amountNum: 1200, status: 'ok' },
  { source: 'Etsy Shop (Channelle)', frequency: 'Weekly', nextDate: 'Apr 21', amount: '~$320', amountNum: 320, status: 'ok' },
  { source: 'Stock Dividends', frequency: 'Quarterly', nextDate: 'Jun 15', amount: '$185', amountNum: 185, status: 'ok' },
];

// --- Income History (12 months) ---
export const incomeHistory: IncomeHistoryPoint[] = [
  { m: 'May', v: 7800 },
  { m: 'Jun', v: 8100 },
  { m: 'Jul', v: 7400 },
  { m: 'Aug', v: 8280 },
  { m: 'Sep', v: 7080 },
  { m: 'Oct', v: 8560 },
  { m: 'Nov', v: 7080 },
  { m: 'Dec', v: 7080 },
  { m: 'Jan', v: 7280 },
  { m: 'Feb', v: 7080 },
  { m: 'Mar', v: 7280 },
  { m: 'Apr', v: 7080 },
];

// --- Achievements ---
export const achievements: Achievement[] = [
  { name: 'Budget Streak', description: '14 days under budget', done: true, date: 'Apr 14' },
  { name: 'First Nest', description: 'Created first savings goal', done: true, date: 'Jan 15' },
  { name: '$1k Saved', description: 'Auto-saved over $1,000', done: true, date: 'Feb 22' },
  { name: '$5k Saved', description: 'Auto-saved over $5,000', done: true, date: 'Mar 30' },
  { name: 'Net Worth $100k', description: 'Reach $100k net worth', done: false, progress: 82 },
  { name: '3-Month Fund', description: 'Emergency fund covers 3 months', done: false, progress: 28 },
  { name: 'Debt Free', description: 'Pay off all consumer debt', done: false, progress: 65 },
  { name: 'Bill Master', description: 'All bills on autopay', done: false, progress: 78 },
  { name: 'Money Date x4', description: '4 money dates completed', done: true, date: 'Apr 1' },
  { name: 'Scanner Pro', description: '10 receipts scanned', done: false, progress: 30 },
];

// --- Credit Score History ---
export const creditHistory: CreditScorePoint[] = [
  { month: 'May', score: 712 },
  { month: 'Jun', score: 718 },
  { month: 'Jul', score: 722 },
  { month: 'Aug', score: 715 },
  { month: 'Sep', score: 728 },
  { month: 'Oct', score: 735 },
  { month: 'Nov', score: 738 },
  { month: 'Dec', score: 741 },
  { month: 'Jan', score: 745 },
  { month: 'Feb', score: 748 },
  { month: 'Mar', score: 752 },
  { month: 'Apr', score: 756 },
];

// --- ChargeIQ Demo Data (6 charges) ---
export const chargeIQDemoCharges: ChargeIQResult[] = [
  {
    raw: 'APCR*DIGITALRVRM',
    merchant: 'Apple Card - Digital River',
    description: 'Software/App purchase via Apple payment system',
    category: 'Software',
    confidence: 92,
    phone: '1-800-275-2273',
    website: 'apple.com/card',
  },
  {
    raw: 'SQ *EBC CO LLC',
    merchant: 'East Bay Coffee Co.',
    description: 'Local coffee shop using Square POS',
    category: 'Dining',
    confidence: 88,
    phone: '(510) 555-0142',
    website: 'eastbaycoffee.com',
  },
  {
    raw: 'PAYPAL *STEAMGAMES',
    merchant: 'Steam (Valve Corp)',
    description: 'Video game purchase via PayPal',
    category: 'Entertainment',
    confidence: 95,
    phone: '1-425-889-9642',
    website: 'store.steampowered.com',
  },
  {
    raw: 'TST* BURGER BARN',
    merchant: 'Burger Barn Restaurant',
    description: 'Restaurant using Toast POS system',
    category: 'Dining',
    confidence: 91,
    phone: '(703) 555-0188',
    website: 'burgerbarn.com',
  },
  {
    raw: 'AMZN MKTP US*2K4J',
    merchant: 'Amazon Marketplace',
    description: 'Third-party seller purchase on Amazon',
    category: 'Shopping',
    confidence: 97,
    phone: '1-888-280-4331',
    website: 'amazon.com',
  },
  {
    raw: 'VZWRLSS*APOCC VB',
    merchant: 'Verizon Wireless',
    description: 'Monthly phone plan payment',
    category: 'Bills',
    confidence: 94,
    phone: '1-800-922-0204',
    website: 'verizon.com',
  },
];

// --- Audit Trail (8 events) ---
export const auditTrail: AuditEvent[] = [
  { date: 'Apr 14', who: 'Christian', action: 'Exported Q1 report', detail: 'PDF format, all accounts', severity: 'info' },
  { date: 'Apr 12', who: 'Channelle', action: 'Recategorized transaction', detail: 'Amazon $150 -> Gifts', severity: 'info' },
  { date: 'Mar 14', who: 'Christian', action: 'Reconnected Cap One', detail: 'Was stale for 2 days', severity: 'warn' },
  { date: 'Mar 12', who: 'Channelle', action: 'Disconnected Cap One Savings', detail: 'Manual disconnect', severity: 'danger' },
  { date: 'Mar 10', who: 'Channelle', action: 'Deleted transaction', detail: 'Target $84.50 refund', severity: 'danger' },
  { date: 'Feb 25', who: 'Christian', action: 'Recategorized Amazon', detail: 'Shopping -> Home', severity: 'info' },
  { date: 'Feb 20', who: 'Christian', action: 'Exported Q1 data', detail: 'CSV format', severity: 'info' },
  { date: 'Feb 14', who: 'Channelle', action: 'Updated budget', detail: 'Shopping $200 -> $250', severity: 'info' },
];

// --- A$cent Sub-Scores (8) ---
export const ascentSubScores: AscentSubScore[] = [
  { name: 'Savings Rate', score: 82, maxScore: 100, trend: 'up', description: 'Saving 39% of income consistently' },
  { name: 'Debt Ratio', score: 90, maxScore: 100, trend: 'up', description: 'Low debt-to-income ratio' },
  { name: 'Account Health', score: 55, maxScore: 100, trend: 'down', description: 'One stale account needs attention' },
  { name: 'Budget Adherence', score: 60, maxScore: 100, trend: 'flat', description: 'Shopping category over budget' },
  { name: 'Emergency Fund', score: 28, maxScore: 100, trend: 'up', description: '0.8 months saved of 3-month target' },
  { name: 'Velocity', score: 65, maxScore: 100, trend: 'up', description: 'Net worth growing steadily' },
  { name: 'Bill Health', score: 95, maxScore: 100, trend: 'flat', description: '7 of 9 bills on autopay' },
  { name: 'NW Trend', score: 88, maxScore: 100, trend: 'up', description: '12-month upward trajectory' },
];

// --- Tax Deductions ---
export const taxDeductions: TaxDeduction[] = [
  { category: 'Mortgage Interest', amount: 480, status: 'claimed', description: 'Monthly mortgage interest payments' },
  { category: 'State Taxes', amount: 320, status: 'claimed', description: 'State income tax withholding' },
  { category: 'Charitable', amount: 150, status: 'claimed', description: 'Donations to nonprofits' },
  { category: 'Home Office', amount: 120, status: 'potential', description: 'Channelle freelance home office' },
  { category: 'Education', amount: 85, status: 'potential', description: 'Online courses and certifications' },
  { category: 'Medical', amount: 55, status: 'review', description: 'Out-of-pocket medical expenses' },
  { category: 'Business Expenses', amount: 30, status: 'review', description: 'Freelance supplies and software' },
];

// --- Investment Fees ---
export const investmentFees: InvestmentFee[] = [
  { account: 'Ally Invest - S&P 500 ETF', type: 'Index ETF', rate: 0.03, annualCost: 8, benchmark: 0.03, verdict: 'good' },
  { account: 'Ally Invest - Bond Fund', type: 'Bond Fund', rate: 0.15, annualCost: 24, benchmark: 0.10, verdict: 'ok' },
  { account: 'Ally Invest - Growth Fund', type: 'Mutual Fund', rate: 0.85, annualCost: 128, benchmark: 0.20, verdict: 'high' },
  { account: 'Ally Invest - Intl ETF', type: 'Intl ETF', rate: 0.11, annualCost: 17, benchmark: 0.08, verdict: 'ok' },
  { account: 'Ally Invest - REIT', type: 'REIT Fund', rate: 0.48, annualCost: 38, benchmark: 0.12, verdict: 'high' },
];

// --- Bill Audit Items ---
export const billAuditItems: BillAuditItem[] = [
  { name: 'Insurance', current: 184, potential: 146, savings: 38, provider: 'Geico', action: 'Switch to bundled policy', status: 'actionable' },
  { name: 'Internet', current: 89, potential: 64, savings: 25, provider: 'AT&T Fiber', action: 'Negotiate or switch provider', status: 'actionable' },
  { name: 'Phone', current: 140, potential: 80, savings: 60, provider: 'Mint Mobile', action: 'Switch to prepaid plan', status: 'actionable' },
  { name: 'Streaming Bundle', current: 62, potential: 38, savings: 24, provider: 'Disney Bundle', action: 'Consolidate 3 services', status: 'pending' },
];

// --- Debt Accounts ---
export const debtAccounts: DebtAccount[] = [
  { name: 'Chase Visa', balance: 1800, rate: 22.99, minPayment: 45, type: 'Credit Card' },
  { name: 'Student Loan', balance: 14200, rate: 5.5, minPayment: 320, type: 'Student Loan' },
  { name: 'Car Loan', balance: 8400, rate: 4.2, minPayment: 385, type: 'Auto Loan' },
];

// --- Alert Items (12) ---
export const alertItems: AlertItem[] = [
  { id: 'a1', type: 'overspending', title: 'Shopping Over Budget', message: 'Shopping category is $35 over the $200 limit', date: 'Today', read: false },
  { id: 'a2', type: 'bill', title: 'Electric Bill Due', message: 'Electric bill of $145 due on the 10th (manual pay)', date: 'Today', read: false },
  { id: 'a3', type: 'sync', title: 'Cap One Savings Stale', message: 'Account has not synced in 47 days', date: 'Yesterday', read: false },
  { id: 'a4', type: 'security', title: 'Large Purchase Detected', message: 'TreatYoSelf $650 flagged as unusual', date: 'Yesterday', read: true },
  { id: 'a5', type: 'goal', title: 'Hawaii Nest Milestone', message: 'Reached 45% of your Hawaii savings goal', date: 'Apr 12', read: true },
  { id: 'a6', type: 'insight', title: 'Savings Rate Up', message: 'Your savings rate increased to 39% this month', date: 'Apr 11', read: true },
  { id: 'a7', type: 'bill', title: 'Mortgage Paid', message: 'April mortgage of $2,000 processed via autopay', date: 'Apr 1', read: true },
  { id: 'a8', type: 'overspending', title: 'Dining Near Limit', message: 'Dining is at 93% of budget ($280/$300)', date: 'Apr 10', read: true },
  { id: 'a9', type: 'sync', title: 'Capital One Warning', message: 'Capital One checking last synced 3 days ago', date: 'Apr 8', read: true },
  { id: 'a10', type: 'goal', title: 'Emergency Fund Update', message: 'Emergency fund reached $3,600 (72% of goal)', date: 'Apr 5', read: true },
  { id: 'a11', type: 'insight', title: 'Net Worth Record', message: 'Net worth reached all-time high of $82,450', date: 'Apr 3', read: true },
  { id: 'a12', type: 'security', title: 'New Device Login', message: 'New login from Chrome on MacBook Pro', date: 'Mar 28', read: true },
];

// --- Chat Messages ---
export const chatMessages: ChatMessage[] = [
  { id: 'm1', from: 'Christian', text: 'Hey, did you see the electric bill came in at $145?', time: '9:15 AM', date: 'Today' },
  { id: 'm2', from: 'Channelle', text: 'Yeah, its higher than usual. AC already?', time: '9:22 AM', date: 'Today' },
  { id: 'm3', from: 'Christian', text: 'Probably. Also we need to talk about the TreatYoSelf charge...', time: '9:25 AM', date: 'Today' },
  { id: 'm4', from: 'Channelle', text: 'I know I know. It was a birthday gift for my sister. One time thing!', time: '9:28 AM', date: 'Today' },
  { id: 'm5', from: 'Christian', text: 'Ok fair enough. Should we move it to the Gifts category?', time: '9:30 AM', date: 'Today' },
  { id: 'm6', from: 'Channelle', text: 'Yes please. Also can we bump the Hawaii fund? Im excited about the trip', time: '9:35 AM', date: 'Today' },
  { id: 'm7', from: 'Christian', text: 'Sure, I can increase the weekly to $35. That gets us there by October.', time: '9:40 AM', date: 'Today' },
  { id: 'm8', from: 'Channelle', text: 'Perfect! Money date this weekend?', time: '9:42 AM', date: 'Today' },
];

// --- Money Date Items ---
export const moneyDateItems: MoneyDateItem[] = [
  { label: 'Groceries', christianVal: '$480', channelleVal: '$0' },
  { label: 'Dining', christianVal: '$120', channelleVal: '$160' },
  { label: 'Shopping', christianVal: '$85', channelleVal: '$150' },
  { label: 'Entertainment', christianVal: '$45', channelleVal: '$40' },
  { label: 'Transport', christianVal: '$45', channelleVal: '$0' },
  { label: 'Personal', christianVal: '$30', channelleVal: '$60' },
];

// --- Feedback Items ---
export const feedbackItems: FeedbackItem[] = [
  { id: 'f1', type: 'feature', title: 'Add receipt scanning from camera', status: 'planned', date: 'Apr 10' },
  { id: 'f2', type: 'bug', title: 'Dark mode flickers on page load', status: 'done', date: 'Apr 5' },
  { id: 'f3', type: 'feature', title: 'Export to Google Sheets', status: 'open', date: 'Mar 28' },
];

// --- Export Records ---
export const exportRecords: ExportRecord[] = [
  { id: 'e1', format: 'PDF', range: 'Q1 2026', date: 'Apr 14', size: '2.4 MB' },
  { id: 'e2', format: 'CSV', range: 'March 2026', date: 'Apr 1', size: '148 KB' },
  { id: 'e3', format: 'JSON', range: 'Full Year 2025', date: 'Jan 15', size: '5.1 MB' },
];

// --- Sync Accounts ---
export const syncAccounts: SyncAccount[] = [
  { name: 'Chase Checking', institution: 'Chase', status: 'connected', lastSync: '2 hours ago', nextSync: 'In 4 hours', owner: 'Joint' },
  { name: 'Chase Savings', institution: 'Chase', status: 'connected', lastSync: '2 hours ago', nextSync: 'In 4 hours', owner: 'Joint' },
  { name: 'Capital One Checking', institution: 'Capital One', status: 'warning', lastSync: '3 days ago', nextSync: 'Retry needed', owner: 'Christian' },
  { name: 'Cap One Savings', institution: 'Capital One', status: 'disconnected', lastSync: '47 days ago', nextSync: 'Reconnect required', owner: 'Channelle' },
  { name: 'Ally Invest', institution: 'Ally', status: 'connected', lastSync: '1 day ago', nextSync: 'In 12 hours', owner: 'Christian' },
  { name: 'Credit Cards', institution: 'Chase', status: 'connected', lastSync: '6 hours ago', nextSync: 'In 6 hours', owner: 'Joint' },
];

// --- Coach AI Responses ---
export const coachResponses: CoachResponses = {
  Spending:
    'This week:\n\n- Christian: $145\n- Channelle: $755 (TreatYoSelf $650)\n\nSpending 38% faster than average. May exceed budget by $420.',
  Sync:
    'Cap One Savings disconnected by Channelle Mar 12. 47 days stale. Cross-reference shows 3 unmatched ($342).\n\nMonarch shows stale numbers silently. We flag it.',
  Bills:
    '4 savings opportunities:\n1. Insurance: -$38\n2. Streaming: -$24\n3. Internet: -$25\n4. Phone: -$60\n\n+3 unused subs: $62\nTotal: $209/mo -> $2,508/yr',
  Save:
    '7 moves for $409/mo ($4,908/yr):\n1. Bill audit $147\n2. Drop subs $62\n3. Tighten Shopping\n4. Tighten Dining\n5. Round-Ups for Channelle\n6. Bump daily save\n7. Switch phone',
  Audit:
    'Mar 12 - Channelle disconnected Cap One\nMar 10 - Channelle deleted Target $84.50\nMar 14 - Christian reconnected\nFeb 25 - Recategorized Amazon\nFeb 20 - Christian exported Q1',
  Forecast:
    'At current pace:\n- End of April: $84,800\n- End of Q2: $89,200\n- End of Year: $115,400\n\nWith bill audit savings applied:\n- End of Year: $117,200 (+$1,764)',
  Budget:
    "April budget: $4,600 total, $2,920 spent (63%).\n\nYou have $1,680 left across 12 days ($140/day safe rate).\n\nShopping is $35 over cap. All other categories are tracking within limits.\n\nAt this pace, you'll finish April with ~$1,000 surplus.",
};
