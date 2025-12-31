import { paymentPlans } from '@/lib/mockData';
import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PaymentPlanNegotiation() {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'proposed':
                return 'border-yellow-200 bg-yellow-500/5';
            case 'accepted':
                return 'border-blue-200 bg-blue-500/5';
            case 'signed':
            case 'active':
                return 'border-green-200 bg-green-500/5';
            case 'completed':
                return 'border-emerald-200 bg-emerald-500/5';
            case 'defaulted':
                return 'border-red-200 bg-red-500/5';
            default:
                return 'border-border';
        }
    };

    return (
        <div className="bg-card rounded-xl border border-border animate-fade-in">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Payment Plan Negotiation</h3>
                        <p className="text-sm text-muted-foreground">AI chatbot negotiates custom payment plans with debtors</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4 p-6">
                {paymentPlans.map((plan) => {
                    const completedInstallments = plan.installments.filter(i => i.status === 'completed').length;
                    const totalAmount = plan.installments.reduce((acc, inst) => acc + inst.amount, 0);

                    return (
                        <div key={plan.id} className={cn('border rounded-lg p-4 transition-colors', getStatusColor(plan.status))}>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold text-foreground">{plan.debtor_name}</h4>
                                        <span className="text-xs font-mono text-muted-foreground">{plan.caseId}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Total Debt: <span className="font-bold text-foreground">${plan.total_debt.toLocaleString()}</span>
                                    </p>
                                </div>
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        'text-xs capitalize',
                                        plan.status === 'active' || plan.status === 'signed'
                                            ? 'bg-green-500/20 text-green-700 border-green-200'
                                            : plan.status === 'proposed'
                                                ? 'bg-yellow-500/20 text-yellow-700 border-yellow-200'
                                                : plan.status === 'completed'
                                                    ? 'bg-emerald-500/20 text-emerald-700 border-emerald-200'
                                                    : 'bg-red-500/20 text-red-700 border-red-200'
                                    )}
                                >
                                    {plan.status}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="bg-background rounded-lg p-3 border border-border/50">
                                    <p className="text-xs text-muted-foreground mb-1">Interest Rate</p>
                                    <p className="font-bold text-foreground">{(plan.interest_rate * 100).toFixed(1)}%</p>
                                </div>
                                <div className="bg-background rounded-lg p-3 border border-border/50">
                                    <p className="text-xs text-muted-foreground mb-1">Progress</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                            <div
                                                className="h-full bg-green-600 rounded-full"
                                                style={{ width: `${(completedInstallments / plan.installments.length) * 100}%` }}
                                            />
                                        </div>
                                        <span className="font-bold text-foreground text-sm">
                                            {completedInstallments}/{plan.installments.length}
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-background rounded-lg p-3 border border-border/50">
                                    <p className="text-xs text-muted-foreground mb-1">Negotiation Score</p>
                                    <p className="font-bold text-foreground">{(plan.negotiation_score! * 100).toFixed(0)}%</p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-xs font-medium text-muted-foreground mb-2">Payment Schedule:</p>
                                <div className="space-y-2">
                                    {plan.installments.map((inst) => (
                                        <div key={inst.number} className="flex items-center gap-3 p-2 bg-secondary/50 rounded-lg border border-border/30">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm font-medium text-foreground">
                                                        Installment {inst.number}: ${inst.amount.toLocaleString()}
                                                    </span>
                                                    {inst.status === 'completed' ? (
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    ) : inst.status === 'pending' ? (
                                                        <Clock className="w-4 h-4 text-yellow-600" />
                                                    ) : inst.status === 'partial' ? (
                                                        <AlertCircle className="w-4 h-4 text-orange-600" />
                                                    ) : (
                                                        <AlertCircle className="w-4 h-4 text-red-600" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Due: {inst.due_date}
                                                    {inst.paid_date && ` • Paid: ${inst.paid_date}`}
                                                </p>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    'text-xs capitalize flex-shrink-0',
                                                    inst.status === 'completed'
                                                        ? 'bg-green-500/20 text-green-700 border-green-200'
                                                        : inst.status === 'pending'
                                                            ? 'bg-yellow-500/20 text-yellow-700 border-yellow-200'
                                                            : inst.status === 'partial'
                                                                ? 'bg-orange-500/20 text-orange-700 border-orange-200'
                                                                : 'bg-red-500/20 text-red-700 border-red-200'
                                                )}
                                            >
                                                {inst.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {plan.status === 'proposed' && (
                                <div className="flex gap-2 pt-4 border-t border-border/50">
                                    <Button size="sm" variant="default" className="flex-1">
                                        Send for Signature
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1">
                                        Modify Terms
                                    </Button>
                                </div>
                            )}
                            {plan.status === 'signed' && (
                                <div className="flex gap-2 pt-4 border-t border-border/50">
                                    <Button size="sm" variant="default" className="flex-1">
                                        Activate Plan
                                    </Button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="px-6 py-4 border-t border-border bg-muted/20">
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-foreground">{paymentPlans.length}</p>
                        <p className="text-xs text-muted-foreground">Total Plans</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-600">
                            {paymentPlans.filter(p => ['active', 'signed', 'completed'].includes(p.status)).length}
                        </p>
                        <p className="text-xs text-muted-foreground">Active/Completed</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-yellow-600">
                            {paymentPlans.filter(p => p.status === 'proposed').length}
                        </p>
                        <p className="text-xs text-muted-foreground">Pending Approval</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-accent">
                            ${(paymentPlans.reduce((acc, p) => acc + p.total_debt, 0) / 1000).toFixed(0)}K
                        </p>
                        <p className="text-xs text-muted-foreground">Total Value</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
