export interface Case {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  ageingDays: number;
  priority: 'High' | 'Medium' | 'Low';
  slaStatus: 'on-track' | 'at-risk' | 'breached';
  slaDeadline: string;
  invoiceNumber: string;
  invoiceDate: string;
  lastContactDate: string;
  paymentHistory: PaymentHistoryItem[];
  notes: string[];
  assignedDca: string;
}

export interface PaymentHistoryItem {
  date: string;
  amount: number;
  status: 'completed' | 'failed' | 'partial';
}

export interface DCA {
  id: string;
  name: string;
  activeCases: number;
  recoveryRate: number;
  avgDaysToRecover: number;
  totalRecovered: number;
  rating: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  caseId: string;
  action: string;
  details: string;
}

export interface AIRecommendation {
  type: 'call' | 'email' | 'sms';
  confidence: number;
  reason: string;
  timing: string;
}

// KPI Data
export const kpiData = {
  totalOutstanding: 12847392,
  recoveryRate: 67.4,
  avgRecoveryTime: 23,
  slaBreaches: 12,
  monthlyTrend: {
    outstanding: -2.3,
    recoveryRate: 4.7,
    avgTime: -1.2,
    breaches: -8.3,
  },
};

// DCA Performance Data
export const dcaData: DCA[] = [
  { id: 'dca-1', name: 'Apex Recovery Solutions', activeCases: 342, recoveryRate: 72.4, avgDaysToRecover: 18, totalRecovered: 2341000, rating: 4.8 },
  { id: 'dca-2', name: 'Sterling Collections', activeCases: 287, recoveryRate: 68.9, avgDaysToRecover: 21, totalRecovered: 1892000, rating: 4.5 },
  { id: 'dca-3', name: 'Meridian Debt Services', activeCases: 198, recoveryRate: 71.2, avgDaysToRecover: 19, totalRecovered: 1654000, rating: 4.6 },
  { id: 'dca-4', name: 'Catalyst Recovery Group', activeCases: 156, recoveryRate: 64.8, avgDaysToRecover: 25, totalRecovered: 987000, rating: 4.2 },
  { id: 'dca-5', name: 'Vanguard Collections', activeCases: 234, recoveryRate: 69.5, avgDaysToRecover: 22, totalRecovered: 1543000, rating: 4.4 },
];

// SLA Timeline Data (for heatmap)
export const slaTimelineData = [
  { week: 'Week 1', onTrack: 145, atRisk: 23, breached: 4 },
  { week: 'Week 2', onTrack: 152, atRisk: 18, breached: 3 },
  { week: 'Week 3', onTrack: 138, atRisk: 31, breached: 7 },
  { week: 'Week 4', onTrack: 161, atRisk: 15, breached: 2 },
  { week: 'Week 5', onTrack: 147, atRisk: 28, breached: 5 },
  { week: 'Week 6', onTrack: 156, atRisk: 20, breached: 3 },
];

// Cases Data
export const casesData: Case[] = [
  {
    id: 'CASE-2025-001',
    customerId: 'CUST-7821',
    customerName: 'Acme Corp',
    customerEmail: 'billing@acmecorp.com',
    customerPhone: '+1 (555) 123-4567',
    amount: 47892.50,
    ageingDays: 45,
    priority: 'High',
    slaStatus: 'at-risk',
    slaDeadline: '2025-02-15',
    invoiceNumber: 'INV-2025-78234',
    invoiceDate: '2023-12-15',
    lastContactDate: '2025-01-28',
    paymentHistory: [
      { date: '2023-10-15', amount: 25000, status: 'completed' },
      { date: '2023-11-15', amount: 15000, status: 'partial' },
      { date: '2023-12-15', amount: 0, status: 'failed' },
    ],
    notes: ['Customer requested payment extension', 'Follow-up call scheduled'],
    assignedDca: 'Apex Recovery Solutions',
  },
  {
    id: 'CASE-2025-002',
    customerId: 'CUST-4523',
    customerName: 'TechStart Inc',
    customerEmail: 'accounts@techstart.io',
    customerPhone: '+1 (555) 234-5678',
    amount: 23450.00,
    ageingDays: 32,
    priority: 'Medium',
    slaStatus: 'on-track',
    slaDeadline: '2025-02-28',
    invoiceNumber: 'INV-2025-78456',
    invoiceDate: '2025-01-02',
    lastContactDate: '2025-02-01',
    paymentHistory: [
      { date: '2023-11-02', amount: 23450, status: 'completed' },
      { date: '2023-12-02', amount: 23450, status: 'completed' },
    ],
    notes: ['Responsive customer, temporary cash flow issues'],
    assignedDca: 'Sterling Collections',
  },
  {
    id: 'CASE-2025-003',
    customerId: 'CUST-9012',
    customerName: 'Global Logistics LLC',
    customerEmail: 'finance@globallog.com',
    customerPhone: '+1 (555) 345-6789',
    amount: 89234.75,
    ageingDays: 67,
    priority: 'High',
    slaStatus: 'breached',
    slaDeadline: '2025-01-20',
    invoiceNumber: 'INV-2025-77891',
    invoiceDate: '2023-11-20',
    lastContactDate: '2025-01-15',
    paymentHistory: [
      { date: '2023-09-20', amount: 45000, status: 'completed' },
      { date: '2023-10-20', amount: 0, status: 'failed' },
    ],
    notes: ['Escalated to senior management', 'Legal review pending'],
    assignedDca: 'Meridian Debt Services',
  },
  {
    id: 'CASE-2025-004',
    customerId: 'CUST-3456',
    customerName: 'Sunrise Manufacturing',
    customerEmail: 'ap@sunrise-mfg.com',
    customerPhone: '+1 (555) 456-7890',
    amount: 12890.00,
    ageingDays: 18,
    priority: 'Low',
    slaStatus: 'on-track',
    slaDeadline: '2025-03-10',
    invoiceNumber: 'INV-2025-79012',
    invoiceDate: '2025-01-22',
    lastContactDate: '2025-02-05',
    paymentHistory: [
      { date: '2023-12-22', amount: 12890, status: 'completed' },
    ],
    notes: ['First-time late payment'],
    assignedDca: 'Apex Recovery Solutions',
  },
  {
    id: 'CASE-2025-005',
    customerId: 'CUST-6789',
    customerName: 'Metro Retail Group',
    customerEmail: 'payments@metroretail.com',
    customerPhone: '+1 (555) 567-8901',
    amount: 156780.25,
    ageingDays: 52,
    priority: 'High',
    slaStatus: 'at-risk',
    slaDeadline: '2025-02-12',
    invoiceNumber: 'INV-2025-78567',
    invoiceDate: '2023-12-08',
    lastContactDate: '2025-01-30',
    paymentHistory: [
      { date: '2023-10-08', amount: 78000, status: 'completed' },
      { date: '2023-11-08', amount: 40000, status: 'partial' },
      { date: '2023-12-08', amount: 0, status: 'failed' },
    ],
    notes: ['Negotiating payment plan', 'CFO contact established'],
    assignedDca: 'Catalyst Recovery Group',
  },
  {
    id: 'CASE-2025-006',
    customerId: 'CUST-1234',
    customerName: 'Urban Delivery Co',
    customerEmail: 'finance@urbandelivery.net',
    customerPhone: '+1 (555) 678-9012',
    amount: 8450.00,
    ageingDays: 28,
    priority: 'Medium',
    slaStatus: 'on-track',
    slaDeadline: '2025-02-25',
    invoiceNumber: 'INV-2025-79234',
    invoiceDate: '2025-01-10',
    lastContactDate: '2025-02-03',
    paymentHistory: [],
    notes: ['New customer, first invoice'],
    assignedDca: 'Vanguard Collections',
  },
];

// Audit Logs
export const auditLogs: AuditLog[] = [
  { id: 'log-1', timestamp: '2025-02-05 14:32:18', user: 'Sarah Bernard', caseId: 'CASE-2025-001', action: 'Phone Call', details: 'Left voicemail, customer unavailable' },
  { id: 'log-2', timestamp: '2025-02-05 13:45:02', user: 'John Doe', caseId: 'CASE-2025-003', action: 'Email Sent', details: 'Payment reminder with escalation notice' },
  { id: 'log-3', timestamp: '2025-02-05 11:20:45', user: 'Emily Adams', caseId: 'CASE-2025-005', action: 'Payment Plan', details: 'Negotiated 3-month installment plan' },
  { id: 'log-4', timestamp: '2025-02-05 10:15:33', user: 'James Wilson', caseId: 'CASE-2025-002', action: 'SMS Sent', details: 'Payment link reminder' },
  { id: 'log-5', timestamp: '2025-02-04 16:48:21', user: 'Sarah Bernard', caseId: 'CASE-2025-001', action: 'Note Added', details: 'Customer requested callback on Monday' },
  { id: 'log-6', timestamp: '2025-02-04 15:22:09', user: 'Alex Marks', caseId: 'CASE-2025-004', action: 'Case Assigned', details: 'Assigned to Apex Recovery Solutions' },
  { id: 'log-7', timestamp: '2025-02-04 14:05:47', user: 'John Doe', caseId: 'CASE-2025-006', action: 'Email Sent', details: 'Initial contact email' },
  { id: 'log-8', timestamp: '2025-02-04 11:33:12', user: 'Emily Adams', caseId: 'CASE-2025-003', action: 'Escalation', details: 'Escalated to legal review' },
];

// AI Recommendations Generator
export function getAIRecommendations(caseData: Case): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];

  // Logic based on case data to generate contextual recommendations
  if (caseData.ageingDays > 60) {
    recommendations.push({
      type: 'call',
      confidence: 78,
      reason: 'Extended ageing period suggests direct engagement is needed. Historical data shows 43% higher resolution rate with phone contact for accounts over 60 days.',
      timing: 'Best time: 10 AM - 12 PM (based on customer timezone)',
    });
  }

  if (caseData.paymentHistory.some(p => p.status === 'partial')) {
    recommendations.push({
      type: 'sms',
      confidence: 85,
      reason: 'Customer has made partial payments before, indicating willingness to pay. SMS with a direct payment link has 67% open rate within 15 minutes.',
      timing: 'Send immediately - customer typically responds within 2 hours',
    });
  }

  if (caseData.slaStatus === 'at-risk') {
    recommendations.push({
      type: 'email',
      confidence: 72,
      reason: 'SLA deadline approaching. Email provides documented trail and allows customer to review account details. Include payment options and deadline.',
      timing: 'Send today before 5 PM for same-day review probability',
    });
  }

  // Default recommendations if none match
  if (recommendations.length === 0) {
    recommendations.push(
      {
        type: 'email',
        confidence: 82,
        reason: 'Standard follow-up recommended. Customer email engagement rate is above average for this account segment.',
        timing: 'Best sent Tuesday-Thursday, 9-11 AM',
      },
      {
        type: 'sms',
        confidence: 68,
        reason: 'Supplementary SMS can increase response rate by 34% when paired with email outreach.',
        timing: 'Send 4 hours after email if no response',
      }
    );
  }

  // Sort by confidence
  return recommendations.sort((a, b) => b.confidence - a.confidence);
}

// Chart data for recovery trends
export const recoveryTrendData = [
  { month: 'Aug', recovered: 1890000, target: 2000000 },
  { month: 'Sep', recovered: 2100000, target: 2000000 },
  { month: 'Oct', recovered: 1950000, target: 2100000 },
  { month: 'Nov', recovered: 2340000, target: 2100000 },
  { month: 'Dec', recovered: 2180000, target: 2200000 },
  { month: 'Jan', recovered: 2450000, target: 2200000 },
];
