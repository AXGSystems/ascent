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
  MoneyMindSegment,
  RegretPurchase,
  CategoryRegret,
  LifeEvent,
  NWProjectionPoint,
  PriceCreepItem,
  DriftIndicator,
  DriftHistory,
  CoupleSyncArea,
  SpendingComparison,
  PaycheckAllocation,
  SpendShieldPurchase,
  WealthPrintSection,
  MoneyMemoryComparison,
  RetrospectiveItem,
  SharedExpense,
  NudgeItem,
  IncomeShieldMonth,
  IncomeSourceReliability,
  DebtDuelMove,
  DebtDuelBadge,
  TaxThresholdAlert,
  QuarterlyPayment,
  LegacyMilestone,
  VaultDocument,
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
  { id: 'f4', type: 'feature', title: 'Recurring transaction detection', status: 'planned', date: 'Mar 15' },
  { id: 'f5', type: 'bug', title: 'Chart labels overlap on small screens', status: 'done', date: 'Mar 10' },
  { id: 'f6', type: 'feature', title: 'Joint account split tracking', status: 'open', date: 'Feb 20' },
];

// --- Export Records ---
export const exportRecords: ExportRecord[] = [
  { id: 'e1', format: 'PDF', range: 'Q1 2026', date: 'Apr 14', size: '2.4 MB' },
  { id: 'e2', format: 'CSV', range: 'March 2026', date: 'Apr 1', size: '148 KB' },
  { id: 'e3', format: 'JSON', range: 'Full Year 2025', date: 'Jan 15', size: '5.1 MB' },
  { id: 'e4', format: 'Excel', range: 'Q4 2025', date: 'Jan 5', size: '1.8 MB' },
  { id: 'e5', format: 'PDF', range: 'Year-End Summary 2025', date: 'Dec 31', size: '3.2 MB' },
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

// ===== INNOVATE FEATURES DATA =====

// --- MoneyMind Data ---
export const moneyMindSegments: MoneyMindSegment[] = [
  { label: 'Necessary', value: 40, color: '#2d8f5e' },
  { label: 'Planned', value: 25, color: '#0a8ebc' },
  { label: 'Impulse', value: 20, color: '#d4a843' },
  { label: 'Regret', value: 10, color: '#c0392b' },
  { label: 'Joy', value: 5, color: '#8b5cf6' },
];

export const topRegretPurchases: RegretPurchase[] = [
  { name: 'TreatYoSelf Clothing', amount: 650, date: 'Apr 13', regretScore: 92, category: 'Shopping' },
  { name: 'Late-Night Amazon', amount: 89, date: 'Apr 8', regretScore: 78, category: 'Shopping' },
  { name: 'Uber Eats (2AM)', amount: 42, date: 'Apr 5', regretScore: 85, category: 'Dining' },
  { name: 'In-App Purchase', amount: 19.99, date: 'Apr 3', regretScore: 71, category: 'Entertainment' },
  { name: 'Gas Station Snacks', amount: 14.50, date: 'Apr 1', regretScore: 65, category: 'Food' },
];

export const categoryRegretRates: CategoryRegret[] = [
  { category: 'Shopping', regretRate: 45, avgAmount: 87 },
  { category: 'Dining', regretRate: 32, avgAmount: 34 },
  { category: 'Entertainment', regretRate: 28, avgAmount: 22 },
  { category: 'Groceries', regretRate: 8, avgAmount: 65 },
  { category: 'Transport', regretRate: 5, avgAmount: 48 },
];

export const impulseScoreTrend: number[] = [72, 68, 65, 70, 58, 52, 48, 55, 42, 38, 35, 32];

// --- LifeLine Data ---
export const lifeEvents: LifeEvent[] = [
  { name: 'Baby', icon: 'baby', targetAge: 32, estimatedCost: 15000, monthlyImpact: -1200, enabled: true },
  { name: 'House Down Payment', icon: 'home', targetAge: 33, estimatedCost: 60000, monthlyImpact: -800, enabled: true },
  { name: 'Career Change', icon: 'briefcase', targetAge: 35, estimatedCost: 5000, monthlyImpact: 1500, enabled: false },
  { name: 'Retirement', icon: 'sunset', targetAge: 62, estimatedCost: 0, monthlyImpact: -3000, enabled: true },
  { name: 'Start Business', icon: 'rocket', targetAge: 36, estimatedCost: 25000, monthlyImpact: -500, enabled: false },
  { name: 'Kids College', icon: 'graduation', targetAge: 50, estimatedCost: 80000, monthlyImpact: -600, enabled: true },
];

export const nwProjectionData: NWProjectionPoint[] = [
  { age: 28, withEvents: 82450, withoutEvents: 82450 },
  { age: 30, withEvents: 105000, withoutEvents: 112000 },
  { age: 35, withEvents: 168000, withoutEvents: 210000 },
  { age: 40, withEvents: 285000, withoutEvents: 340000 },
  { age: 45, withEvents: 420000, withoutEvents: 510000 },
  { age: 50, withEvents: 580000, withoutEvents: 720000 },
  { age: 55, withEvents: 780000, withoutEvents: 980000 },
  { age: 60, withEvents: 1020000, withoutEvents: 1300000 },
  { age: 65, withEvents: 1250000, withoutEvents: 1650000 },
];

// --- PriceGhost Data ---
export const priceCreepItems: PriceCreepItem[] = [
  { name: 'Netflix', originalPrice: 10.99, currentPrice: 15.49, startDate: 'Jan 2022', category: 'Entertainment', priceHistory: [10.99, 11.99, 13.99, 15.49], increasePercent: 41 },
  { name: 'Hulu', originalPrice: 12.99, currentPrice: 17.99, startDate: 'Mar 2022', category: 'Entertainment', priceHistory: [12.99, 14.99, 15.99, 17.99], increasePercent: 38 },
  { name: 'Disney+', originalPrice: 7.99, currentPrice: 13.99, startDate: 'Nov 2021', category: 'Entertainment', priceHistory: [7.99, 10.99, 13.99], increasePercent: 75 },
  { name: 'Spotify', originalPrice: 9.99, currentPrice: 16.99, startDate: 'Jun 2021', category: 'Entertainment', priceHistory: [9.99, 10.99, 13.99, 16.99], increasePercent: 70 },
  { name: 'YouTube Premium', originalPrice: 11.99, currentPrice: 13.99, startDate: 'Aug 2022', category: 'Entertainment', priceHistory: [11.99, 13.99], increasePercent: 17 },
  { name: 'Adobe CC', originalPrice: 19.99, currentPrice: 22.99, startDate: 'Feb 2023', category: 'Productivity', priceHistory: [19.99, 20.99, 22.99], increasePercent: 15 },
  { name: 'ChatGPT Plus', originalPrice: 20.00, currentPrice: 20.00, startDate: 'Jan 2024', category: 'AI', priceHistory: [20.00], increasePercent: 0 },
  { name: 'iCloud', originalPrice: 0.99, currentPrice: 2.99, startDate: 'Sep 2020', category: 'Storage', priceHistory: [0.99, 2.99], increasePercent: 202 },
  { name: 'Gym', originalPrice: 35.00, currentPrice: 50.00, startDate: 'Jan 2023', category: 'Fitness', priceHistory: [35.00, 40.00, 45.00, 50.00], increasePercent: 43 },
  { name: 'Headspace', originalPrice: 12.99, currentPrice: 14.99, startDate: 'Apr 2023', category: 'Wellness', priceHistory: [12.99, 14.99], increasePercent: 15 },
  { name: 'NYT', originalPrice: 1.00, currentPrice: 4.25, startDate: 'May 2022', category: 'News', priceHistory: [1.00, 2.00, 4.25], increasePercent: 325 },
  { name: 'Dropbox', originalPrice: 9.99, currentPrice: 11.99, startDate: 'Jul 2023', category: 'Storage', priceHistory: [9.99, 11.99], increasePercent: 20 },
];

// --- DriftGuard Data ---
export const driftIndicators: DriftIndicator[] = [
  { label: 'Avg Restaurant Check', current: '$48', previous: '$36', changePercent: 33, direction: 'up' },
  { label: 'Grocery Basket', current: '$72', previous: '$58', changePercent: 24, direction: 'up' },
  { label: 'Subscription Count', current: '12', previous: '8', changePercent: 50, direction: 'up' },
  { label: 'Amazon Order Avg', current: '$74', previous: '$52', changePercent: 42, direction: 'up' },
  { label: 'Coffee Spend/Mo', current: '$68', previous: '$42', changePercent: 62, direction: 'up' },
  { label: 'Delivery Orders/Mo', current: '8', previous: '4', changePercent: 100, direction: 'up' },
];

export const driftHistoryData: DriftHistory[] = [
  { m: 'Nov', incomeGrowth: 2, spendingGrowth: 5 },
  { m: 'Dec', incomeGrowth: 2, spendingGrowth: 12 },
  { m: 'Jan', incomeGrowth: 5, spendingGrowth: 8 },
  { m: 'Feb', incomeGrowth: 5, spendingGrowth: 10 },
  { m: 'Mar', incomeGrowth: 5, spendingGrowth: 14 },
  { m: 'Apr', incomeGrowth: 5, spendingGrowth: 18 },
];

// --- CoupleSync Data ---
export const coupleSyncAreas: CoupleSyncArea[] = [
  { area: 'Saving Goals', christianScore: 85, channelleScore: 78, aligned: true },
  { area: 'Dining Budget', christianScore: 60, channelleScore: 82, aligned: false },
  { area: 'Emergency Fund', christianScore: 90, channelleScore: 72, aligned: false },
  { area: 'Shopping Limits', christianScore: 55, channelleScore: 40, aligned: true },
  { area: 'Investment Risk', christianScore: 78, channelleScore: 65, aligned: true },
  { area: 'Vacation Budget', christianScore: 70, channelleScore: 90, aligned: false },
  { area: 'Subscription Audit', christianScore: 88, channelleScore: 45, aligned: false },
  { area: 'Debt Payoff Speed', christianScore: 82, channelleScore: 80, aligned: true },
];

export const coupleSpendingComparison: SpendingComparison[] = [
  { category: 'Groceries', christian: 480, channelle: 0 },
  { category: 'Dining', christian: 120, channelle: 160 },
  { category: 'Shopping', christian: 85, channelle: 800 },
  { category: 'Entertainment', christian: 45, channelle: 40 },
  { category: 'Transport', christian: 95, channelle: 25 },
  { category: 'Personal', christian: 30, channelle: 60 },
];

export const conversationStarters: string[] = [
  'Channelle spent 9x more on shopping this month. Time for a reset?',
  'You both agree on debt payoff speed — great alignment!',
  'Christian wants a bigger emergency fund. Discuss target together?',
  'Vacation budget gap: Channelle wants to spend 29% more. Compromise?',
  'Subscription audit needed: 43-point gap in priority scores.',
];

// --- PaycheckMap Data ---
export const paycheckAllocations: PaycheckAllocation[] = [
  { label: 'Bills & Housing', amount: 2100, color: '#c0392b', percent: 49 },
  { label: 'Savings', amount: 650, color: '#2d8f5e', percent: 15 },
  { label: 'Debt Payments', amount: 85, color: '#d4a843', percent: 2 },
  { label: 'Flex Spending', amount: 1445, color: '#0a8ebc', percent: 34 },
];

// --- SpendShield Data ---
export const spendShieldPurchases: SpendShieldPurchase[] = [
  { merchant: 'Amazon', amount: 89.99, category: 'Shopping', budgetRemaining: 115, avgSpend: 52, regretProbability: 62, score: 38, date: 'Today' },
  { merchant: 'Whole Foods', amount: 67.43, category: 'Groceries', budgetRemaining: 320, avgSpend: 68, regretProbability: 5, score: 92, date: 'Today' },
  { merchant: 'Best Buy', amount: 249.99, category: 'Shopping', budgetRemaining: 115, avgSpend: 52, regretProbability: 78, score: 15, date: 'Yesterday' },
  { merchant: 'Uber Eats', amount: 32.00, category: 'Dining', budgetRemaining: 20, avgSpend: 28, regretProbability: 55, score: 42, date: 'Yesterday' },
  { merchant: 'Target', amount: 45.60, category: 'Shopping', budgetRemaining: 115, avgSpend: 65, regretProbability: 22, score: 74, date: 'Apr 12' },
  { merchant: 'Shell Gas', amount: 48.20, category: 'Transport', budgetRemaining: 80, avgSpend: 48, regretProbability: 3, score: 96, date: 'Apr 12' },
];

// --- WealthPrint Data ---
export const wealthPrintSections: WealthPrintSection[] = [
  { name: 'Net Worth', enabled: true, summary: '12-month net worth trend and breakdown', value: '$82,450' },
  { name: 'Income', enabled: true, summary: 'Income sources and monthly history', value: '$7,080/mo' },
  { name: 'Spending', enabled: true, summary: 'Category breakdown and trends', value: '$4,320/mo' },
  { name: 'Debt', enabled: true, summary: 'Debt accounts, rates, and payoff plan', value: '$24,400' },
  { name: 'Credit', enabled: true, summary: 'Credit score history and factors', value: '756' },
  { name: 'Goals', enabled: true, summary: 'Savings goals progress and projections', value: '6 active' },
  { name: 'A$cent Score', enabled: true, summary: 'Overall financial health assessment', value: '72/100' },
];

// --- MoneyMemory Data ---
export const moneyMemoryComparisons: MoneyMemoryComparison[] = [
  { label: 'Net Worth', then: 73800, now: 82450, change: 8650, changePercent: 11.7 },
  { label: 'Monthly Spending', then: 5200, now: 4320, change: -880, changePercent: -16.9 },
  { label: 'Savings Rate', then: 27, now: 39, change: 12, changePercent: 44.4 },
  { label: 'Total Debt', then: 28600, now: 24400, change: -4200, changePercent: -14.7 },
];

export const retrospectiveTimeline: RetrospectiveItem[] = [
  { month: 'May 2025', highlight: 'Started A$cent tracking', metric: 'NW: $72,400', good: true },
  { month: 'Jun 2025', highlight: 'First savings goal created', metric: 'Emergency fund started', good: true },
  { month: 'Jul 2025', highlight: 'Holiday overspend', metric: 'Budget exceeded by $800', good: false },
  { month: 'Aug 2025', highlight: 'Channelle freelance boost', metric: '+$1,200 extra income', good: true },
  { month: 'Sep 2025', highlight: 'Insurance rate increase', metric: '+$38/mo', good: false },
  { month: 'Oct 2025', highlight: 'Paid off credit card', metric: '-$2,400 debt', good: true },
  { month: 'Nov 2025', highlight: 'Black Friday discipline', metric: 'Only $45 spent', good: true },
  { month: 'Dec 2025', highlight: 'Holiday spending spike', metric: '$350 over budget', good: false },
  { month: 'Jan 2026', highlight: 'New Year savings reset', metric: '40% savings rate', good: true },
  { month: 'Feb 2026', highlight: 'Auto-save increase', metric: '+$5/day savings', good: true },
  { month: 'Mar 2026', highlight: 'Net worth record', metric: '$81,900 ATH', good: true },
  { month: 'Apr 2026', highlight: 'Budget streak: 14 days', metric: 'Under budget daily', good: true },
];

// --- SplitSense Data ---
export const sharedExpenses: SharedExpense[] = [
  { name: 'Whole Foods Groceries', amount: 124.30, paidBy: 'Christian', date: 'Apr 14', category: 'Groceries' },
  { name: 'Electric Bill', amount: 145.00, paidBy: 'Christian', date: 'Apr 10', category: 'Bills' },
  { name: 'Date Night Dinner', amount: 86.00, paidBy: 'Channelle', date: 'Apr 9', category: 'Dining' },
  { name: 'Netflix', amount: 15.49, paidBy: 'Christian', date: 'Apr 10', category: 'Subscriptions' },
  { name: 'Water Bill', amount: 65.00, paidBy: 'Christian', date: 'Apr 12', category: 'Bills' },
  { name: 'Costco Run', amount: 189.00, paidBy: 'Channelle', date: 'Apr 8', category: 'Groceries' },
  { name: 'Internet', amount: 89.00, paidBy: 'Christian', date: 'Apr 15', category: 'Bills' },
  { name: 'Gym (Joint)', amount: 50.00, paidBy: 'Christian', date: 'Apr 1', category: 'Fitness' },
];

// --- NudgeIQ Data ---
export const nudgeItems: NudgeItem[] = [
  { id: 'n1', message: 'Your dining budget is 93% spent with 12 days left. Skip eating out this weekend to stay on track.', category: 'spending', impact: 'Save ~$60', saved: false, date: 'Today' },
  { id: 'n2', message: 'Moving $50/mo from flex to your Hawaii fund gets you there 2 months sooner.', category: 'goal', impact: 'Hawaii by Aug', saved: true, date: 'Today' },
  { id: 'n3', message: 'You have 3 subscriptions with under 5% usage. Canceling saves $52/mo.', category: 'savings', impact: 'Save $624/yr', saved: false, date: 'Yesterday' },
  { id: 'n4', message: 'Paying $50 extra on Chase Visa this month saves $127 in interest over the loan.', category: 'debt', impact: 'Save $127', saved: true, date: 'Yesterday' },
  { id: 'n5', message: 'Your grocery spending is 8% below average this month. Keep it up!', category: 'spending', impact: 'On track', saved: false, date: 'Apr 12' },
  { id: 'n6', message: 'Emergency fund is at 72% — increase daily auto-save by $2 to hit goal by July.', category: 'savings', impact: 'Goal by Jul', saved: false, date: 'Apr 11' },
  { id: 'n7', message: 'Switching your phone plan to Mint Mobile saves $60/mo ($720/yr).', category: 'savings', impact: 'Save $720/yr', saved: true, date: 'Apr 10' },
  { id: 'n8', message: 'Your net worth crossed $82k — up 11.7% from last year. Celebrate responsibly!', category: 'goal', impact: 'Milestone', saved: false, date: 'Apr 8' },
  { id: 'n9', message: 'Amazon spending averages $74/order. Consider a 24-hour rule before checkout.', category: 'spending', impact: 'Save ~$180/mo', saved: false, date: 'Apr 5' },
  { id: 'n10', message: 'Car loan payoff in 22 months. Adding $50/mo cuts it to 18 months and saves $340.', category: 'debt', impact: 'Save $340', saved: true, date: 'Apr 3' },
];

// --- IncomeShield Data ---
export const incomeShieldMonths: IncomeShieldMonth[] = [
  { m: 'Nov', baseline: 7080, actual: 7080 },
  { m: 'Dec', baseline: 7080, actual: 7080 },
  { m: 'Jan', baseline: 7080, actual: 7280 },
  { m: 'Feb', baseline: 7080, actual: 7080 },
  { m: 'Mar', baseline: 7080, actual: 7280 },
  { m: 'Apr', baseline: 7080, actual: 7080 },
  { m: 'May', baseline: 7080, actual: 6400 },
  { m: 'Jun', baseline: 7080, actual: 8200 },
  { m: 'Jul', baseline: 7080, actual: 5800 },
  { m: 'Aug', baseline: 7080, actual: 7600 },
  { m: 'Sep', baseline: 7080, actual: 7080 },
  { m: 'Oct', baseline: 7080, actual: 8100 },
];

export const incomeSourceReliability: IncomeSourceReliability[] = [
  { source: 'ALTA Payroll', reliability: 98, avgAmount: 4280, variance: 0 },
  { source: 'Freelance (Channelle)', reliability: 72, avgAmount: 2800, variance: 15 },
  { source: 'Rental Income', reliability: 95, avgAmount: 1200, variance: 0 },
  { source: 'Etsy Shop', reliability: 45, avgAmount: 320, variance: 40 },
  { source: 'Stock Dividends', reliability: 85, avgAmount: 185, variance: 10 },
];

// --- DebtDuel Data ---
export const debtDuelMoves: DebtDuelMove[] = [
  { who: 'Christian', action: 'Extra $100 on Chase Visa', points: 50, date: 'Apr 14', debt: 'Chase Visa' },
  { who: 'Channelle', action: 'Skipped Uber Eats, cooked instead', points: 25, date: 'Apr 13', debt: 'General' },
  { who: 'Christian', action: 'Round-up savings to debt', points: 15, date: 'Apr 12', debt: 'Student Loan' },
  { who: 'Channelle', action: 'Sold old clothes on Poshmark', points: 40, date: 'Apr 11', debt: 'Chase Visa' },
  { who: 'Christian', action: 'Cancelled Headspace ($15/mo)', points: 30, date: 'Apr 10', debt: 'General' },
  { who: 'Channelle', action: 'Extra freelance gig ($200)', points: 60, date: 'Apr 8', debt: 'Car Loan' },
  { who: 'Christian', action: 'Meal prepped all week', points: 20, date: 'Apr 7', debt: 'General' },
  { who: 'Channelle', action: 'Returned Amazon impulse buy', points: 35, date: 'Apr 5', debt: 'Chase Visa' },
];

export const debtDuelBadges: DebtDuelBadge[] = [
  { name: 'First Blood', description: 'Made first extra payment', earned: true, icon: 'sword' },
  { name: 'Streak Master', description: '7-day no-spend streak', earned: true, icon: 'flame' },
  { name: 'Side Hustle Hero', description: 'Earned extra income for debt', earned: true, icon: 'rocket' },
  { name: 'Budget Boss', description: 'Under budget for 30 days', earned: false, icon: 'crown' },
  { name: 'Debt Slayer', description: 'Paid off one debt completely', earned: false, icon: 'trophy' },
  { name: 'Summit Seeker', description: 'Reached 50% debt reduction', earned: false, icon: 'mountain' },
];

// --- TaxRadar Data ---
export const taxThresholdAlerts: TaxThresholdAlert[] = [
  { title: 'Charitable Giving', description: '$50 more in donations unlocks $800 in additional tax savings', potentialSavings: 800, status: 'near' },
  { title: 'HSA Contribution', description: 'Contribute $1,200 more to max out HSA for the year', potentialSavings: 300, status: 'far' },
  { title: 'Home Office Deduction', description: 'Channelle qualifies — claim $120/mo for dedicated workspace', potentialSavings: 1440, status: 'met' },
  { title: 'Education Credits', description: 'Online courses may qualify for Lifetime Learning Credit', potentialSavings: 400, status: 'near' },
];

export const quarterlyPayments: QuarterlyPayment[] = [
  { quarter: 'Q1', due: 'Apr 15', amount: 2100, status: 'paid' },
  { quarter: 'Q2', due: 'Jun 15', amount: 2100, status: 'upcoming' },
  { quarter: 'Q3', due: 'Sep 15', amount: 2100, status: 'upcoming' },
  { quarter: 'Q4', due: 'Jan 15', amount: 2100, status: 'upcoming' },
];

// --- Legacy Data ---
export const legacyMilestones: LegacyMilestone[] = [
  { age: 28, label: 'Today', projectedNW: 82450 },
  { age: 30, label: 'Age 30', projectedNW: 115000 },
  { age: 40, label: 'Age 40', projectedNW: 340000 },
  { age: 50, label: 'Age 50', projectedNW: 720000 },
  { age: 60, label: 'Age 60', projectedNW: 1300000 },
  { age: 65, label: 'Retirement', projectedNW: 1650000 },
];

export const vaultDocuments: VaultDocument[] = [
  { name: 'Will & Testament', type: 'Legal', uploaded: true, date: 'Jan 2026' },
  { name: 'Life Insurance Policy', type: 'Insurance', uploaded: true, date: 'Mar 2026' },
  { name: 'Trust Documents', type: 'Legal', uploaded: false },
  { name: 'Power of Attorney', type: 'Legal', uploaded: false },
  { name: 'Property Deeds', type: 'Property', uploaded: false },
  { name: 'Investment Account Beneficiaries', type: 'Financial', uploaded: true, date: 'Feb 2026' },
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
