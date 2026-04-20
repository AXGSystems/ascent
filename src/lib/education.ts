// A$cent — Financial Literacy Layer
// 40+ financial term definitions for the LearnTooltip system

export const financialTerms: Record<string, string> = {
  'Net Worth':
    'Total assets minus total debts. This is the single most important number in personal finance. If it\'s growing, you\'re winning.',
  'Savings Rate':
    'The percentage of income you save. 20%+ is considered excellent. The average American saves about 4%. You\'re at 39% — top tier.',
  'Safe to Spend':
    'Money left after bills, savings, and debt payments are covered — what you can safely spend without derailing your goals.',
  'Flex Budget':
    'Money left after bills and savings are covered — what you can safely spend without derailing your goals. Same as Safe to Spend.',
  'Emergency Fund':
    '3-6 months of expenses saved in a liquid account. This protects you from job loss, medical bills, or car breakdowns.',
  'Debt-to-Income':
    'Monthly debt payments divided by monthly gross income. Lenders want this under 36%. Below 20% is excellent.',
  'APR':
    'Annual Percentage Rate — the true yearly cost of borrowing, including fees. A 22.99% APR on a credit card means you pay nearly a quarter of your balance in interest each year.',
  'Compound Interest':
    'Interest earned on interest. Einstein called it the 8th wonder of the world. $100/mo at 8% becomes $150,000 in 30 years.',
  'Asset Allocation':
    'How your investments are divided between stocks, bonds, and cash. Younger investors typically hold more stocks for growth.',
  'Dollar Cost Averaging':
    'Investing a fixed amount regularly regardless of price — smooths out market volatility. Your auto-saves already do this.',
  'Sinking Fund':
    'Saving small amounts monthly for a known future expense like insurance, holidays, or car repair. Your Hawaii nest is a sinking fund.',
  'Budget':
    'A plan for how to spend your money each month. The 50/30/20 rule suggests 50% needs, 30% wants, 20% savings.',
  'Cash Flow':
    'Money coming in minus money going out. Positive cash flow means you\'re earning more than spending — the foundation of wealth building.',
  'Surplus':
    'The amount of money left after all expenses. A consistent surplus is the engine that powers savings and investing.',
  'Fixed Costs':
    'Recurring obligations like mortgage, insurance, and loans that don\'t change month to month. Typically 50-60% of spending.',
  'Variable Spending':
    'Discretionary categories like groceries, dining, and shopping that you can adjust. This is where budget wins happen.',
  'Autopay':
    'Automatic bill payments from your bank account. Eliminates late fees and protects your credit score. Set it and forget it.',
  'Credit Score':
    'A 3-digit number (300-850) that represents your creditworthiness. 740+ gets you the best interest rates on loans.',
  'Credit Utilization':
    'The percentage of your available credit you\'re using. Keep it under 30% — ideally under 10% — for the best credit score impact.',
  'Debt Snowball':
    'Paying off debts smallest to largest regardless of interest rate. Builds momentum through quick wins.',
  'Debt Avalanche':
    'Paying off debts highest interest rate first. Mathematically optimal — saves the most money over time.',
  'Liquidity':
    'How quickly an asset can be converted to cash. Checking accounts are highly liquid. Real estate is not.',
  'Inflation':
    'The rate at which prices increase over time. Currently ~3-4%. Money in a 0.5% savings account is losing purchasing power.',
  'HYSA':
    'High-Yield Savings Account. Online banks offer 4-5% APY vs traditional banks at 0.01%. Your emergency fund should be here.',
  'Index Fund':
    'A fund that tracks a market index like the S&P 500. Low fees, broad diversification, and historically strong returns.',
  'ETF':
    'Exchange-Traded Fund — similar to an index fund but trades like a stock. Low fees and tax efficient.',
  'Expense Ratio':
    'The annual fee charged by an investment fund, expressed as a percentage. Under 0.20% is great. Over 0.50% is expensive.',
  'Subscription':
    'A recurring charge for a service. The average American has 12+ subscriptions totaling $219/mo. Audit yours quarterly.',
  'A$cent Score':
    'Your overall financial health score out of 1,000. It factors in savings rate, debt ratio, account health, budget adherence, and more.',
  'Overdraft':
    'When you spend more than your checking account balance. Banks charge $35 per overdraft. Link a savings account as backup.',
  'Amortization':
    'How loan payments split between principal and interest over time. Early payments are mostly interest; later ones are mostly principal.',
  'Refinancing':
    'Replacing a loan with a new one at better terms. Can save thousands on mortgages and student loans when rates drop.',
  'Tax Deduction':
    'An expense that reduces your taxable income. Mortgage interest, charitable donations, and student loan interest are common ones.',
  'Tax Credit':
    'A dollar-for-dollar reduction in your tax bill. Worth more than deductions. The child tax credit is $2,000 per child.',
  'Passive Income':
    'Money earned with minimal ongoing effort — rental income, dividends, royalties. The goal is income that works while you sleep.',
  'Diversification':
    'Spreading investments across different asset types to reduce risk. Don\'t put all your eggs in one basket.',
  'Bull Market':
    'A period when stock prices are rising (20%+ from recent lows). Historically lasts about 4-5 years on average.',
  'Bear Market':
    'A period when stock prices decline 20%+ from recent highs. Historically lasts about 9-16 months. Stay the course.',
  'Recurring Expense':
    'Any charge that happens on a regular schedule — subscriptions, bills, insurance premiums. Track these to avoid budget leaks.',
  'Financial Independence':
    'Having enough investments to cover your expenses without working. Often expressed as 25x your annual expenses saved.',
  'Rule of 72':
    'Divide 72 by your interest rate to estimate how many years it takes to double your money. At 8% returns, money doubles in 9 years.',
  'Zero-Based Budget':
    'A budgeting method where every dollar has a job. Income minus expenses minus savings equals zero.',
  'Pay Yourself First':
    'Automatically saving money before spending on anything else. The most effective savings strategy there is.',
};

// Quick tips for each page
export const pageTips: Record<string, string> = {
  home: 'Review your dashboard weekly. A 10-minute check-in prevents surprises and keeps you in control of your financial story.',
  spend: 'The 50/30/20 rule: 50% needs, 30% wants, 20% savings. Track where every dollar goes and you\'ll find money you didn\'t know you had.',
  save: 'Automate your savings. Money you never see is money you never spend. Even $5/day adds up to $1,825/year.',
  money: 'Check your sync status weekly. Stale data means blind spots. Your net worth is only as accurate as your latest sync.',
  coach: 'Ask me about anything — spending trends, savings strategies, or "what if" scenarios. I analyze your real data to give personalized advice.',
  chargeiq: 'Don\'t recognize a charge? Look it up before calling your bank. Most mystery charges are abbreviations of legitimate merchants.',
  credit: 'Your credit score is a snapshot, not a verdict. Small consistent actions matter most — pay on time, keep utilization low, and be patient.',
  forecast: 'Projections are based on current patterns. Small changes today compound dramatically — saving $50 more per month adds $7,200 in 10 years.',
  transactions: 'Review transactions weekly to catch errors and fraud early. Flag anything you don\'t recognize within 60 days for full protection.',
  bills: 'Putting all bills on autopay eliminates late fees and protects your credit score. Two of your bills are still manual — consider switching.',
  subscriptions: 'The average household overspends $50/mo on unused subscriptions. Review yours quarterly and cancel anything with a usage score under 3.',
  accounts: 'Keep at least 2 months of expenses in your checking account as a buffer. Move everything above that to a high-yield savings account.',
  debt: 'Paying even $50 extra on your highest-interest debt can save you hundreds in interest over the life of the loan.',
  emergency: 'Your emergency fund should cover 3-6 months of essential expenses. Keep it in a high-yield savings account for easy access.',
  nests: 'Name your savings goals — it makes them real. "Hawaii Fund" is more motivating than "Savings Account #3."',
  income: 'Multiple income streams reduce financial risk. Your household has 5 sources — that\'s excellent diversification.',
  settings: 'Review your connected accounts and notification preferences monthly to make sure everything is current.',
  sync: 'Reconnect stale accounts promptly. Cap One Savings has been disconnected for 47 days — your net worth may be off.',
  score: 'Your A$cent Score rewards consistency. Focus on the lowest sub-score for the biggest improvement — right now that\'s Emergency Fund.',
  alerts: 'Don\'t ignore alerts — they\'re early warnings. Addressing a budget overage today prevents a bigger problem next month.',
  export: 'Export your data quarterly for backup and tax prep. PDF for sharing with advisors, CSV for spreadsheet analysis.',
  feedback: 'Your feature requests shape the roadmap. The most-requested features get built first.',
  tax: 'Track deductible expenses year-round, not just at tax time. You may be missing $200+/month in potential deductions.',
  moneymind: 'Understanding your spending psychology helps you make better decisions. 20% of your spending is impulse — awareness is the first step.',
  forecast_page: 'Run "what if" scenarios to see how changes today affect your future. Even small adjustments compound dramatically over decades.',
  priceghost: 'Subscription prices creep up silently. Your services have increased 40%+ on average since you signed up. Audit annually.',
  driftguard: 'Lifestyle inflation is the silent wealth killer. Your spending is growing faster than your income — time to course correct.',
  couplesync: 'Financial alignment with your partner predicts relationship satisfaction. Schedule monthly money dates to stay on the same page.',
  paycheckmap: 'Knowing exactly where your paycheck goes removes anxiety. Your bills take 49%, savings 15%, debt 2%, and flex spending 34%.',
  spendshield: 'Before big purchases, check the SpendShield score. A score under 50 means you\'re likely to regret it.',
  debtduel: 'Gamifying debt payoff makes it fun. Compete with your partner to see who can make the most progress each month.',
  wealthprint: 'Your WealthPrint is a snapshot of your complete financial picture. Review it quarterly with your partner.',
  moneymemory: 'Looking back at where you started keeps you motivated. Your net worth is up 14% in the last 12 months.',
  splitsense: 'Fair doesn\'t always mean 50/50. Split expenses based on income ratios or whoever benefits most.',
  nudgeiq: 'Small nudges create big results. Each saved nudge is a micro-decision that compounds into real wealth over time.',
  incomeshield: 'Income volatility is normal with freelance work. Build a buffer of 2-3 months of expenses to smooth out uneven months.',
  legacy: 'Estate planning isn\'t just for the wealthy. A basic will and beneficiary designations protect your family at any income level.',
  taxradar: 'Tax-loss harvesting and threshold awareness can save you thousands. Stay within $400 of AGI brackets for maximum benefit.',
  partner: 'Joint finances require trust and transparency. Use A$cent\'s partner features to stay aligned without judgment.',
  moneydate: 'A weekly 15-minute money check-in is more effective than an annual deep dive. Make it a ritual, not a chore.',
  lifeline: 'Major life events reshape your finances. Planning for them reduces stress and helps you enjoy the journey.',
  billaudit: 'Most people overpay for insurance, internet, and phone by $100+/month. A yearly negotiation call can save $1,200+.',
  achievements: 'You earn achievements by building consistent habits. Focus on streaks — they compound just like interest.',
  fees: 'Even a 0.1% difference in expense ratios can cost you tens of thousands over a career. Choose low-cost index funds.',
  messages: 'Use the household chat for money conversations. Written discussions reduce misunderstandings and create a record.',
};

// Daily insights — one for each day of the month
export const dailyInsights: string[] = [
  'Did you know? Moving $50/mo more to savings would add $7,200 over 10 years with compound interest at 5%.',
  'Americans spend an average of $18,000/year on non-essential items. Tracking spending is the first step to cutting that number.',
  'The "latte factor" is real: $5/day on small purchases equals $1,825/year — enough for a vacation fund.',
  'People who write down financial goals are 42% more likely to achieve them. Your A$cent dashboard is your goal tracker.',
  'The average American pays $160/year in credit card interest. Paying your balance in full each month eliminates this entirely.',
  'Automating your savings makes you 3x more likely to reach your goals. Your auto-saves are already doing this.',
  'Couples who have regular money conversations report 20% less financial stress. Schedule your next money date.',
  'Your net worth today is just a starting point. The direction matters more than the number.',
  'The Rule of 72: divide 72 by your return rate to see how long it takes to double your money. At 8%, that\'s 9 years.',
  'Emergency funds prevent 60% of financial crises from becoming financial disasters. Keep building yours.',
  'The best time to negotiate bills is right after a price increase or when your contract expires.',
  'Subscription creep adds an average of $30/month per year to household budgets. Audit yours quarterly.',
  'Paying an extra $100/mo on a $200,000 mortgage saves $30,000+ in interest over the life of the loan.',
  'Your savings rate of 39% puts you in the top 10% of American households. That\'s wealth-building territory.',
  'The 50/30/20 rule is a guideline, not a law. Adjust the ratios to fit your life and goals.',
  'Checking your credit score doesn\'t lower it. Check it monthly to catch errors and track progress.',
  'The biggest predictor of financial success isn\'t income — it\'s the gap between what you earn and what you spend.',
  'Having 3+ income sources reduces the financial impact of losing any single one by 60%.',
  'The average household wastes $50/month on unused subscriptions. That\'s $600/year going nowhere.',
  'Setting up autopay for all bills eliminates the #1 cause of credit score drops: missed payments.',
  'Index funds have outperformed 85% of actively managed funds over the past 20 years — with lower fees.',
  'Your car loses 20% of its value in the first year. Consider buying 1-2 year old vehicles to save thousands.',
  'Health Savings Accounts (HSAs) are the most tax-advantaged account available — triple tax benefit.',
  'The average American spends $230/month eating out. Cooking at home 3 more nights per week saves $100+.',
  'A $1 increase in your daily savings rate equals $365/year or $18,250 over 50 years at 5% growth.',
  'Identity theft costs the average victim $1,343 and 7 hours of recovery time. Monitor your accounts weekly.',
  'Your employer 401(k) match is free money — not contributing enough to get the full match is leaving money on the table.',
  'Financial stress is the #1 cause of relationship conflict. Open communication and shared goals fix this.',
  'The "pay yourself first" method works because it removes willpower from the equation. Automate, then forget.',
  'Your financial journey is a marathon, not a sprint. Consistency beats intensity every single time.',
  'Review your insurance annually. Life changes (marriage, home, kids) can qualify you for better rates.',
];
