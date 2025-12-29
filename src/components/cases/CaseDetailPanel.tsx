import { Case } from '@/lib/mockData';
import { User, Mail, Phone, FileText, Calendar, Clock, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CaseDetailPanelProps {
  caseData: Case;
}

export function CaseDetailPanel({ caseData }: CaseDetailPanelProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const getSlaStyles = (status: string) => {
    switch (status) {
      case 'on-track': return { bg: 'bg-success/10', text: 'text-success', border: 'border-success/30' };
      case 'at-risk': return { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/30' };
      case 'breached': return { bg: 'bg-destructive/10', text: 'text-destructive', border: 'border-destructive/30' };
      default: return { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' };
    }
  };

  const slaStyles = getSlaStyles(caseData.slaStatus);

  // Calculate days until SLA deadline
  const slaDate = new Date(caseData.slaDeadline);
  const today = new Date();
  const daysUntilSla = Math.ceil((slaDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Customer Summary Card */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{caseData.customerName}</h3>
              <p className="text-sm text-muted-foreground">{caseData.customerId}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn('text-xs', 
            caseData.priority === 'High' ? 'priority-high' :
            caseData.priority === 'Medium' ? 'priority-medium' : 'priority-low'
          )}>
            {caseData.priority} Priority
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>{caseData.customerEmail}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{caseData.customerPhone}</span>
          </div>
        </div>
      </div>

      {/* Amount & SLA */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <DollarSign className="w-4 h-4" />
            Outstanding Amount
          </div>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(caseData.amount)}</p>
          <p className="text-xs text-muted-foreground mt-1">Ageing: {caseData.ageingDays} days</p>
        </div>

        <div className={cn('rounded-xl border p-5', slaStyles.bg, slaStyles.border)}>
          <div className={cn('flex items-center gap-2 text-sm mb-2', slaStyles.text)}>
            {caseData.slaStatus === 'breached' ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <Clock className="w-4 h-4" />
            )}
            SLA Status
          </div>
          <p className={cn('text-2xl font-bold capitalize', slaStyles.text)}>
            {caseData.slaStatus.replace('-', ' ')}
          </p>
          <p className="text-xs mt-1" style={{ color: 'inherit', opacity: 0.8 }}>
            {daysUntilSla > 0 
              ? `${daysUntilSla} days remaining`
              : `${Math.abs(daysUntilSla)} days overdue`
            }
          </p>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h4 className="font-medium text-foreground flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-muted-foreground" />
          Invoice Details
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Invoice Number</p>
            <p className="font-medium text-foreground font-mono">{caseData.invoiceNumber}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Invoice Date</p>
            <p className="font-medium text-foreground">{caseData.invoiceDate}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Contact</p>
            <p className="font-medium text-foreground">{caseData.lastContactDate}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Assigned DCA</p>
            <p className="font-medium text-foreground">{caseData.assignedDca}</p>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h4 className="font-medium text-foreground flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          Payment History
        </h4>
        {caseData.paymentHistory.length > 0 ? (
          <div className="space-y-3">
            {caseData.paymentHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center',
                    payment.status === 'completed' ? 'bg-success/10' :
                    payment.status === 'partial' ? 'bg-warning/10' : 'bg-destructive/10'
                  )}>
                    {payment.status === 'completed' ? (
                      <CheckCircle className="w-3.5 h-3.5 text-success" />
                    ) : payment.status === 'partial' ? (
                      <Clock className="w-3.5 h-3.5 text-warning" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{payment.date}</p>
                    <p className="text-xs text-muted-foreground capitalize">{payment.status}</p>
                  </div>
                </div>
                <span className={cn(
                  'font-medium text-sm',
                  payment.status === 'completed' ? 'text-success' :
                  payment.status === 'partial' ? 'text-warning' : 'text-destructive'
                )}>
                  {payment.amount > 0 ? formatCurrency(payment.amount) : '—'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No payment history available</p>
        )}
      </div>

      {/* Notes */}
      {caseData.notes.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-5">
          <h4 className="font-medium text-foreground mb-3">Case Notes</h4>
          <ul className="space-y-2">
            {caseData.notes.map((note, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
