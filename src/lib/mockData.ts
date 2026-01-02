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

// 1. Automated Outreach Campaign
export interface OutreachCampaign {
  id: string;
  caseId: string;
  channel: 'sms' | 'email' | 'whatsapp' | 'voice';
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'failed';
  sentAt: string;
  deliveredAt?: string;
  openedAt?: string;
  clickedAt?: string;
  message: string;
  debtor_response?: string;
  responseReceivedAt?: string;
}

// 2. LLM-Generated Message
export interface GeneratedMessage {
  id: string;
  caseId: string;
  debtor_name: string;
  debtor_age: number;
  debtor_occupation: string;
  variant: 1 | 2 | 3;
  content: string;
  tone: 'empathetic' | 'firm' | 'professional';
  compliance_status: 'safe' | 'flagged' | 'blocked';
  flagged_phrases?: string[];
  engagement_score?: number; // predicted engagement %
}

// 3. Debtor Response Processing
export interface DebitorResponse {
  id: string;
  caseId: string;
  channel: 'email' | 'sms' | 'voice_transcript' | 'document';
  receivedAt: string;
  rawContent: string;
  extracted_data: {
    promise_to_pay: boolean;
    amount?: number;
    due_date?: string;
    hardship_claim?: string;
    escalation_needed?: boolean;
  };
  confidence_score: number; // 0-1 OCR/NLP accuracy
  manual_review_needed: boolean;
}

// 4. Real-Time Compliance Check
export interface ComplianceCheck {
  id: string;
  timestamp: string;
  caseId: string;
  agentId: string;
  channel: 'call' | 'email' | 'sms';
  content: string;
  violations: ComplianceViolation[];
  compliance_score: number; // 0-100%
  is_blocked: boolean;
}

export interface ComplianceViolation {
  rule: string;
  severity: 'warning' | 'error';
  phrase?: string;
  guideline: 'FDCPA' | 'CFPB' | 'TCPA';
  correction?: string;
}

// 5. Escalation Intelligence
export interface EscalationRecommendation {
  id: string;
  caseId: string;
  action: 'legal_escalation' | 'credit_bureau' | 'payment_plan' | 'hardship_review' | 'write_off';
  confidence: number; // 0-1 likelihood of success
  reasoning: string;
  predicted_recovery_rate?: number;
  estimated_timeline?: string;
  risk_level: 'low' | 'medium' | 'high';
}

// 6. Social & Alternative Data Signal
export interface RiskSignal {
  id: string;
  caseId: string;
  signal_type: 'employment_change' | 'relocation' | 'financial_stress' | 'business_closure';
  source: 'linkedin' | 'facebook' | 'twitter' | 'employment_database' | 'telematics';
  description: string;
  detected_at: string;
  risk_increase: number; // 0-1, how much it increases flight risk
  confidence: number; // 0-1, confidence in signal
}

// 7. Multi-Channel Campaign Sequence
export interface CampaignSequence {
  id: string;
  caseId: string;
  sequence_type: 'initial_contact' | 'follow_up' | 'escalation' | 'final_notice';
  channels: ChannelStep[];
  overall_success_rate: number;
  created_at: string;
}

export interface ChannelStep {
  step_number: number;
  channel: 'email' | 'sms' | 'whatsapp' | 'call';
  wait_hours: number;
  template_name: string;
  sent: boolean;
  sent_at?: string;
  engagement_status?: 'pending' | 'opened' | 'clicked' | 'no_response';
}

// 8. Payment Plan Agreement
export interface PaymentPlan {
  id: string;
  caseId: string;
  debtor_name: string;
  total_debt: number;
  installments: PaymentInstallment[];
  interest_rate: number;
  status: 'proposed' | 'accepted' | 'signed' | 'active' | 'completed' | 'defaulted';
  created_at: string;
  signed_at?: string;
  negotiation_score?: number; // how much debtor negotiated down
}

export interface PaymentInstallment {
  number: number;
  due_date: string;
  amount: number;
  paid: boolean;
  paid_date?: string;
  status: 'pending' | 'completed' | 'missed' | 'partial';
}

// 9. Churn Prediction
export interface ChurnPrediction {
  id: string;
  caseId: string;
  debtor_name: string;
  churn_risk_score: number; // 0-1, likelihood of ghosting
  risk_level: 'low' | 'medium' | 'high';
  churn_signals: string[];
  last_engagement: string;
  recommended_action: 'special_offer' | 'escalate_agent' | 'hardship_program' | 'monitor';
  special_offer?: string; // e.g., "Waive 20% if paid by Friday"
  created_at: string;
}

// 10. Settlement Sandbox
export interface SettlementOffer {
  id: string;
  caseId: string;
  debtor_name: string;
  total_balance: number;
  recommended_settlement_pct: number; // e.g., 0.7 means 70% settlement
  predicted_full_recovery_prob: number; // 0-1
  predicted_settlement_prob: number; // 0-1
  early_bird_discount?: number; // optional additional discount
  settlement_window_days: number;
  rationale: string;
  status: 'recommended' | 'presented' | 'accepted' | 'expired';
}

// 11. DCA Marketplace (Champion vs Challenger)
export interface MarketplaceRound {
  id: string;
  cohort: string;
  champion: string;
  challenger: string;
  reserved_share_pct: number; // portion of cases reserved for challenger
  allocation_window_days: number;
  metrics: {
    recovery_rate: number;
    avg_days_to_recover: number;
    compliance_score: number;
    debtor_nps: number;
  };
  challenger_metrics: {
    recovery_rate: number;
    avg_days_to_recover: number;
    compliance_score: number;
    debtor_nps: number;
  };
  winner?: 'champion' | 'challenger';
}

// 12. Clean Room Reconciliation
export interface ReconcilerEvent {
  id: string;
  caseId: string;
  source_system: 'SAP' | 'Oracle' | 'Stripe' | 'BankFeed';
  event_type: 'payment_match' | 'dispute_flag' | 'duplicate_contact' | 'write_off';
  detected_at: string;
  amount?: number;
  status: 'open' | 'resolved' | 'ignored';
  resolution_note?: string;
}

// 13. Multi-Entity / Multi-Currency
export interface EntityProfile {
  id: string;
  name: string;
  region: string;
  currency: string;
  timezone: string;
  local_compliance: string[];
  dcas: string[];
  cases: number;
  rules_summary: string;
}

// 14. AI Reasoning (Assignment rationale)
export interface AssignmentReasoning {
  id: string;
  caseId: string;
  assigned_to: string;
  confidence: number;
  factors: string[];
  expected_recovery_rate: number;
  justification: string;
}

// 15. Regulatory Kill Switch
export interface KillSwitchCase {
  id: string;
  caseId: string;
  debtor_name: string;
  trigger_phrase: string;
  channel: 'chat' | 'call' | 'email';
  triggered_at: string;
  status: 'locked' | 'review' | 'released';
  action_required: string;
}

// 16. Visualization Data
export interface SankeyFlow {
  stage: 'overdue' | 'assigned' | 'recovered' | 'written_off';
  amount: number;
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

// ===== NEW FEATURES MOCK DATA =====

// 1. Automated Outreach Campaigns
export const outreachCampaigns: OutreachCampaign[] = [
  {
    id: 'campaign-1',
    caseId: 'CASE-2025-001',
    channel: 'sms',
    status: 'delivered',
    sentAt: '2025-02-05 09:15:00',
    deliveredAt: '2025-02-05 09:16:00',
    message: 'Hi Acme Corp, Invoice INV-2025-78234 for $47,892.50 is 45 days overdue. Pay now: https://pay.fedex.com/CASE-2025-001',
  },
  {
    id: 'campaign-2',
    caseId: 'CASE-2025-001',
    channel: 'whatsapp',
    status: 'pending',
    sentAt: '2025-02-05 10:30:00',
    message: 'Would you like to discuss a payment plan for your outstanding invoice?',
  },
  {
    id: 'campaign-3',
    caseId: 'CASE-2025-003',
    channel: 'voice',
    status: 'sent',
    sentAt: '2025-02-05 14:00:00',
    message: 'Auto-call: This is FedEx calling about invoice INV-2025-77891. Press 1 to pay, 2 to speak with agent, 3 for more time.',
  },
  {
    id: 'campaign-4',
    caseId: 'CASE-2025-005',
    channel: 'email',
    status: 'opened',
    sentAt: '2025-02-04 08:00:00',
    openedAt: '2025-02-04 10:45:00',
    message: 'Payment Reminder: Your invoice is approaching SLA deadline. Settle now to avoid legal action.',
  },
];

// 2. LLM-Generated Messages with variants
export const generatedMessages: GeneratedMessage[] = [
  {
    id: 'msg-1',
    caseId: 'CASE-2025-001',
    debtor_name: 'Acme Corp',
    debtor_age: 45,
    debtor_occupation: 'Manufacturing Executive',
    variant: 1,
    content: 'Hi there,\n\nWe noticed your recent payment hasn\'t come through for invoice INV-2025-78234 ($47,892.50). Life gets busy—here\'s a quick link to settle this in under 2 minutes:\n\nhttps://pay.fedex.com/CASE-2025-001\n\nIf you need assistance with a payment plan, just reply to this email.\n\nBest regards,\nFedEx Collections',
    tone: 'empathetic',
    compliance_status: 'safe',
    engagement_score: 68,
  },
  {
    id: 'msg-2',
    caseId: 'CASE-2025-001',
    debtor_name: 'Acme Corp',
    debtor_age: 45,
    debtor_occupation: 'Manufacturing Executive',
    variant: 2,
    content: 'Urgent: Invoice INV-2025-78234 is 45 days overdue ($47,892.50). Immediate action required to avoid account suspension. Pay now: https://pay.fedex.com/CASE-2025-001',
    tone: 'firm',
    compliance_status: 'safe',
    engagement_score: 45,
  },
  {
    id: 'msg-3',
    caseId: 'CASE-2025-001',
    debtor_name: 'Acme Corp',
    debtor_age: 45,
    debtor_occupation: 'Manufacturing Executive',
    variant: 3,
    content: 'Dear Acme Corp,\n\nWe hope this finds you well. We wanted to reach out regarding your outstanding invoice INV-2025-78234 ($47,892.50). We understand that managing multiple vendors can be challenging.\n\nWe\'d like to work with you to resolve this. Please contact us at 1-800-FEDEX-PAY or click here to set up a payment arrangement: https://pay.fedex.com/CASE-2025-001\n\nThank you for your prompt attention.\n\nSincerely,\nFedEx Collections',
    tone: 'professional',
    compliance_status: 'safe',
    engagement_score: 72,
  },
];

// 3. Debtor Response Processing (OCR/NLP)
export const debiorResponses: DebitorResponse[] = [
  {
    id: 'resp-1',
    caseId: 'CASE-2025-002',
    channel: 'email',
    receivedAt: '2025-02-05 11:20:00',
    rawContent: 'Hi, I can pay $10,000 now and $13,450 by Feb 28. Will that work?',
    extracted_data: {
      promise_to_pay: true,
      amount: 23450,
      due_date: '2025-02-28',
      hardship_claim: false,
      escalation_needed: false,
    },
    confidence_score: 0.98,
    manual_review_needed: false,
  },
  {
    id: 'resp-2',
    caseId: 'CASE-2025-005',
    channel: 'email',
    receivedAt: '2025-02-05 14:35:00',
    rawContent: '[Screenshot of bank transfer confirmation showing payment of $78,000 on 2025-02-05]',
    extracted_data: {
      promise_to_pay: false,
      amount: 78000,
      due_date: '2025-02-05',
      escalation_needed: false,
    },
    confidence_score: 0.92,
    manual_review_needed: false,
  },
  {
    id: 'resp-3',
    caseId: 'CASE-2025-003',
    channel: 'email',
    receivedAt: '2025-02-05 13:00:00',
    rawContent: 'I lost my job last month due to company layoffs. Medical bills are piling up. Can we discuss options?',
    extracted_data: {
      promise_to_pay: false,
      hardship_claim: 'Job loss, medical expenses',
      escalation_needed: true,
    },
    confidence_score: 0.95,
    manual_review_needed: true,
  },
];

// 4. Real-Time Compliance Monitoring
export const complianceChecks: ComplianceCheck[] = [
  {
    id: 'comp-1',
    timestamp: '2025-02-05 14:32:00',
    caseId: 'CASE-2025-001',
    agentId: 'agent-sarah',
    channel: 'call',
    content: 'We\'ll sue you if you don\'t pay immediately.',
    violations: [
      {
        rule: 'Threat of legal action without intent',
        severity: 'error',
        phrase: 'We\'ll sue you',
        guideline: 'FDCPA',
        correction: 'Use: "If this matter is not resolved, we may pursue legal remedies."',
      },
    ],
    compliance_score: 0,
    is_blocked: true,
  },
  {
    id: 'comp-2',
    timestamp: '2025-02-05 15:10:00',
    caseId: 'CASE-2025-002',
    agentId: 'agent-john',
    channel: 'email',
    content: 'Hi there, I see your invoice is overdue. Here\'s a link to pay: [link]. Let me know if you have any questions.',
    violations: [],
    compliance_score: 100,
    is_blocked: false,
  },
  {
    id: 'comp-3',
    timestamp: '2025-02-05 09:00:00',
    caseId: 'CASE-2025-005',
    agentId: 'agent-emily',
    channel: 'call',
    content: 'Called customer at workplace after they requested no workplace contact.',
    violations: [
      {
        rule: 'Contacting at workplace after request to cease',
        severity: 'error',
        guideline: 'FDCPA',
        correction: 'Contact only at home phone number going forward.',
      },
    ],
    compliance_score: 0,
    is_blocked: true,
  },
];

// 5. Escalation Intelligence
export const escalationRecommendations: EscalationRecommendation[] = [
  {
    id: 'esc-1',
    caseId: 'CASE-2025-003',
    action: 'legal_escalation',
    confidence: 0.92,
    reasoning: 'Debtor has ignored 10+ contact attempts over 62 days. Debt exceeds $10K. No historical payment records. Recommend legal escalation.',
    predicted_recovery_rate: 0.45,
    estimated_timeline: '120-180 days',
    risk_level: 'high',
  },
  {
    id: 'esc-2',
    caseId: 'CASE-2025-002',
    action: 'payment_plan',
    confidence: 0.88,
    reasoning: 'Debtor has good payment history and is engaging. Claims temporary cash flow issues. Recommend flexible payment plan.',
    predicted_recovery_rate: 0.78,
    estimated_timeline: '30-60 days',
    risk_level: 'low',
  },
  {
    id: 'esc-3',
    caseId: 'CASE-2025-005',
    action: 'hardship_review',
    confidence: 0.85,
    reasoning: 'Debtor cited job loss and medical hardship. Recommend hardship program review for partial settlement.',
    predicted_recovery_rate: 0.65,
    estimated_timeline: '45-75 days',
    risk_level: 'medium',
  },
  {
    id: 'esc-4',
    caseId: 'CASE-2025-006',
    action: 'write_off',
    confidence: 0.72,
    reasoning: 'New customer with small balance. Limited recovery prospects. Recommend write-off for tax purposes.',
    predicted_recovery_rate: 0.15,
    risk_level: 'low',
  },
];

// 6. Social Media & Risk Signals
export const riskSignals: RiskSignal[] = [
  {
    id: 'signal-1',
    caseId: 'CASE-2025-003',
    signal_type: 'employment_change',
    source: 'linkedin',
    description: 'LinkedIn profile updated: "Open to work" status activated 10 days ago',
    detected_at: '2025-02-03',
    risk_increase: 0.35,
    confidence: 0.88,
  },
  {
    id: 'signal-2',
    caseId: 'CASE-2025-001',
    signal_type: 'relocation',
    source: 'employment_database',
    description: 'Company headquarters address changed from Chicago to Dallas',
    detected_at: '2025-02-01',
    risk_increase: 0.25,
    confidence: 0.92,
  },
  {
    id: 'signal-3',
    caseId: 'CASE-2025-005',
    signal_type: 'financial_stress',
    source: 'twitter',
    description: 'Social media posts indicate financial difficulty and job stress',
    detected_at: '2025-02-04',
    risk_increase: 0.40,
    confidence: 0.76,
  },
];

// 7. Multi-Channel Campaign Sequences
export const campaignSequences: CampaignSequence[] = [
  {
    id: 'seq-1',
    caseId: 'CASE-2025-001',
    sequence_type: 'initial_contact',
    channels: [
      {
        step_number: 1,
        channel: 'email',
        wait_hours: 0,
        template_name: 'initial_reminder',
        sent: true,
        sent_at: '2025-02-04 08:00:00',
        engagement_status: 'opened',
      },
      {
        step_number: 2,
        channel: 'sms',
        wait_hours: 24,
        template_name: 'urgent_sms',
        sent: true,
        sent_at: '2025-02-05 08:00:00',
        engagement_status: 'delivered',
      },
      {
        step_number: 3,
        channel: 'call',
        wait_hours: 48,
        template_name: 'agent_call',
        sent: false,
        engagement_status: 'pending',
      },
    ],
    overall_success_rate: 0.68,
    created_at: '2025-02-04 08:00:00',
  },
  {
    id: 'seq-2',
    caseId: 'CASE-2025-003',
    sequence_type: 'escalation',
    channels: [
      {
        step_number: 1,
        channel: 'email',
        wait_hours: 0,
        template_name: 'final_notice',
        sent: true,
        sent_at: '2025-02-03 10:00:00',
        engagement_status: 'opened',
      },
      {
        step_number: 2,
        channel: 'call',
        wait_hours: 12,
        template_name: 'supervisor_call',
        sent: true,
        sent_at: '2025-02-03 22:00:00',
        engagement_status: 'no_response',
      },
      {
        step_number: 3,
        channel: 'whatsapp',
        wait_hours: 24,
        template_name: 'legal_notice_message',
        sent: false,
        engagement_status: 'pending',
      },
    ],
    overall_success_rate: 0.35,
    created_at: '2025-02-02 10:00:00',
  },
];

// 8. Payment Plan Negotiations
export const paymentPlans: PaymentPlan[] = [
  {
    id: 'plan-1',
    caseId: 'CASE-2025-002',
    debtor_name: 'TechStart Inc',
    total_debt: 23450,
    installments: [
      { number: 1, due_date: '2025-02-15', amount: 5862.50, paid: true, paid_date: '2025-02-14', status: 'completed' },
      { number: 2, due_date: '2025-03-15', amount: 5862.50, paid: false, status: 'pending' },
      { number: 3, due_date: '2025-04-15', amount: 5862.50, paid: false, status: 'pending' },
      { number: 4, due_date: '2025-05-15', amount: 5862.50, paid: false, status: 'pending' },
    ],
    interest_rate: 0,
    status: 'active',
    created_at: '2025-02-01',
    signed_at: '2025-02-02',
    negotiation_score: 0.5, // debtor negotiated 0% interest
  },
  {
    id: 'plan-2',
    caseId: 'CASE-2025-005',
    debtor_name: 'Metro Retail Group',
    total_debt: 156780.25,
    installments: [
      { number: 1, due_date: '2025-02-20', amount: 62712.10, paid: false, status: 'pending' },
      { number: 2, due_date: '2025-03-20', amount: 47034.08, paid: false, status: 'pending' },
      { number: 3, due_date: '2025-04-20', amount: 47034.07, paid: false, status: 'pending' },
    ],
    interest_rate: 0.05,
    status: 'proposed',
    created_at: '2025-02-05',
    negotiation_score: 0.75, // debtor negotiated 5% discount
  },
];

// 9. Churn Predictions
export const churnPredictions: ChurnPrediction[] = [
  {
    id: 'churn-1',
    caseId: 'CASE-2025-001',
    debtor_name: 'Acme Corp',
    churn_risk_score: 0.72,
    risk_level: 'high',
    churn_signals: [
      'Engagement score dropped from 0.8 → 0.3 in 7 days',
      'Opened last 3 emails but never clicked payment link',
      'Promised to pay 2x but missed both dates',
    ],
    last_engagement: '2025-02-04 10:45:00',
    recommended_action: 'special_offer',
    special_offer: 'Pay 80% of balance ($38,314) by Friday and we\'ll waive the remaining 20%',
    created_at: '2025-02-05',
  },
  {
    id: 'churn-2',
    caseId: 'CASE-2025-003',
    debtor_name: 'Global Logistics LLC',
    churn_risk_score: 0.88,
    risk_level: 'high',
    churn_signals: [
      'No response to 10+ contact attempts',
      'Stopped answering calls after initially engaging',
      'Last contact was 20 days ago',
      'Risk signal: LinkedIn "open to work" status',
    ],
    last_engagement: '2025-01-15 14:00:00',
    recommended_action: 'escalate_agent',
    created_at: '2025-02-05',
  },
  {
    id: 'churn-3',
    caseId: 'CASE-2025-006',
    debtor_name: 'Urban Delivery Co',
    churn_risk_score: 0.35,
    risk_level: 'low',
    churn_signals: ['New customer (first invoice)', 'No engagement history yet'],
    last_engagement: '2025-02-03 09:00:00',
    recommended_action: 'monitor',
    created_at: '2025-02-05',
  },
];

// 10. Settlement Sandbox
export const settlementOffers: SettlementOffer[] = [
  {
    id: 'settle-1',
    caseId: 'CASE-2025-007',
    debtor_name: 'Pacific Freight Co',
    total_balance: 98200,
    recommended_settlement_pct: 0.7,
    predicted_full_recovery_prob: 0.32,
    predicted_settlement_prob: 0.78,
    early_bird_discount: 0.05,
    settlement_window_days: 10,
    rationale: 'Similar freight debtors accepted 70% lump-sum within 14 days; cash flow forecast weak.',
    status: 'recommended',
  },
  {
    id: 'settle-2',
    caseId: 'CASE-2025-008',
    debtor_name: 'Northwind Imports',
    total_balance: 45600,
    recommended_settlement_pct: 0.65,
    predicted_full_recovery_prob: 0.28,
    predicted_settlement_prob: 0.72,
    settlement_window_days: 7,
    rationale: 'Low engagement and ageing >90 days; 65% settlement yields faster liquidation.',
    status: 'presented',
  },
  {
    id: 'settle-3',
    caseId: 'CASE-2025-009',
    debtor_name: 'Europa Logistics',
    total_balance: 120500,
    recommended_settlement_pct: 0.74,
    predicted_full_recovery_prob: 0.4,
    predicted_settlement_prob: 0.81,
    early_bird_discount: 0.03,
    settlement_window_days: 5,
    rationale: 'EMEA freight invoices show 18% higher acceptance with “early bird” 3% incentives.',
    status: 'accepted',
  },
];

// 11. DCA Marketplace (Champion vs Challenger)
export const marketplaceRounds: MarketplaceRound[] = [
  {
    id: 'round-1',
    cohort: 'Q1-Enterprise Freight',
    champion: 'Atlas Recoveries',
    challenger: 'BrightPath Collections',
    reserved_share_pct: 0.1,
    allocation_window_days: 30,
    metrics: {
      recovery_rate: 0.62,
      avg_days_to_recover: 38,
      compliance_score: 0.98,
      debtor_nps: 41,
    },
    challenger_metrics: {
      recovery_rate: 0.58,
      avg_days_to_recover: 33,
      compliance_score: 0.96,
      debtor_nps: 52,
    },
    winner: 'champion',
  },
  {
    id: 'round-2',
    cohort: 'SMB Ground (US West)',
    champion: 'Summit DCA',
    challenger: 'Pioneer Recoveries',
    reserved_share_pct: 0.1,
    allocation_window_days: 21,
    metrics: {
      recovery_rate: 0.55,
      avg_days_to_recover: 29,
      compliance_score: 0.94,
      debtor_nps: 38,
    },
    challenger_metrics: {
      recovery_rate: 0.6,
      avg_days_to_recover: 31,
      compliance_score: 0.97,
      debtor_nps: 46,
    },
    winner: 'challenger',
  },
];

// 12. Clean Room Reconciliation
export const reconciliationEvents: ReconcilerEvent[] = [
  {
    id: 'rec-1',
    caseId: 'CASE-2025-002',
    source_system: 'SAP',
    event_type: 'payment_match',
    detected_at: '2025-02-06 09:10:00',
    amount: 23450,
    status: 'resolved',
    resolution_note: 'Payment posted in SAP; case auto-closed in DCA portal to prevent double contact.',
  },
  {
    id: 'rec-2',
    caseId: 'CASE-2025-010',
    source_system: 'Oracle',
    event_type: 'duplicate_contact',
    detected_at: '2025-02-06 09:30:00',
    status: 'open',
    resolution_note: 'ERP shows promise-to-pay; DCA outreach paused pending confirmation.',
  },
  {
    id: 'rec-3',
    caseId: 'CASE-2025-011',
    source_system: 'BankFeed',
    event_type: 'payment_match',
    detected_at: '2025-02-06 10:05:00',
    amount: 5820,
    status: 'resolved',
    resolution_note: 'Bank feed matched reference ID; ledger updated; outreach canceled.',
  },
];

// 13. Multi-Entity / Multi-Currency
export const entityProfiles: EntityProfile[] = [
  {
    id: 'entity-1',
    name: 'FedEx Express Europe',
    region: 'EU',
    currency: 'EUR',
    timezone: 'CET',
    local_compliance: ['GDPR', 'EBA Guidelines'],
    dcas: ['Atlas Recoveries', 'BrightPath Collections'],
    cases: 1820,
    rules_summary: 'GDPR consent for outreach, 8am-8pm local contact rules, language-specific templates.',
  },
  {
    id: 'entity-2',
    name: 'FedEx Ground US',
    region: 'US',
    currency: 'USD',
    timezone: 'ET/PT',
    local_compliance: ['FDCPA', 'TCPA'],
    dcas: ['Summit DCA', 'Pioneer Recoveries'],
    cases: 2450,
    rules_summary: 'Call frequency caps, Do-Not-Call scrubs, consented SMS only.',
  },
  {
    id: 'entity-3',
    name: 'FedEx Freight APAC',
    region: 'APAC',
    currency: 'SGD',
    timezone: 'SGT',
    local_compliance: ['PDPA', 'Spam Control Act'],
    dcas: ['Harbor Collections'],
    cases: 940,
    rules_summary: 'SMS opt-in tracking, bilingual templates, weekly contact caps.',
  },
];

// 14. AI Reasoning Cards
export const assignmentReasoning: AssignmentReasoning[] = [
  {
    id: 'reason-1',
    caseId: 'CASE-2025-001',
    assigned_to: 'Atlas Recoveries',
    confidence: 0.92,
    factors: ['High recovery rate on freight >$25k', '92% success for Midwest accounts', 'Low complaint rate'],
    expected_recovery_rate: 0.78,
    justification: 'Atlas outperforms peers on B2B freight invoices over $25k in Midwest region.',
  },
  {
    id: 'reason-2',
    caseId: 'CASE-2025-010',
    assigned_to: 'Pioneer Recoveries',
    confidence: 0.81,
    factors: ['Challenger program allocation', 'Best NPS in SMB cohort', 'Fastest first-contact time'],
    expected_recovery_rate: 0.63,
    justification: 'Testing challenger on SMB cohort with fast outreach; NPS advantage expected to lift recovery.',
  },
  {
    id: 'reason-3',
    caseId: 'CASE-2025-011',
    assigned_to: 'BrightPath Collections',
    confidence: 0.76,
    factors: ['Strong APAC language coverage', 'High compliance score', 'Lower cost-to-collect'],
    expected_recovery_rate: 0.61,
    justification: 'Language coverage and compliance history make BrightPath optimal for APAC freight accounts.',
  },
];

// 15. Regulatory Kill Switch
export const killSwitchCases: KillSwitchCase[] = [
  {
    id: 'kill-1',
    caseId: 'CASE-2025-012',
    debtor_name: 'Mariner Logistics',
    trigger_phrase: 'represented by legal counsel',
    channel: 'chat',
    triggered_at: '2025-02-06 11:05:00',
    status: 'locked',
    action_required: 'Escalate to FedEx Legal. Do not contact debtor until cleared.',
  },
  {
    id: 'kill-2',
    caseId: 'CASE-2025-013',
    debtor_name: 'Silverline Supply',
    trigger_phrase: 'cease and desist',
    channel: 'email',
    triggered_at: '2025-02-06 10:42:00',
    status: 'review',
    action_required: 'Legal review pending. Outbound communications paused.',
  },
  {
    id: 'kill-3',
    caseId: 'CASE-2025-014',
    debtor_name: 'Aurora Retail',
    trigger_phrase: 'filed a complaint',
    channel: 'call',
    triggered_at: '2025-02-06 09:55:00',
    status: 'locked',
    action_required: 'Case locked; notify compliance and document call transcript.',
  },
];

// 16. Visualization Data
export const sankeyFlows: SankeyFlow[] = [
  { stage: 'overdue', amount: 5200000 },
  { stage: 'assigned', amount: 4200000 },
  { stage: 'recovered', amount: 2700000 },
  { stage: 'written_off', amount: 900000 },
];
