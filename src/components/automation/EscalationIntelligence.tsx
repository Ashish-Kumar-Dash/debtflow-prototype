import { escalationRecommendations } from '@/lib/mockData';
import { Brain, ArrowUpRight, CheckCircle, AlertTriangle, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const actionLabels: Record<string, string> = {
    legal_escalation: 'Legal Escalation',
    credit_bureau: 'Credit Bureau Reporting',
    payment_plan: 'Payment Plan',
    hardship_review: 'Hardship Review',
    write_off: 'Write-Off',
};

export function EscalationIntelligence() {
    return (
        <div className="bg-card rounded-xl border border-border animate-fade-in">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Escalation Intelligence</h3>
                        <p className="text-sm text-muted-foreground">AI recommends optimal escalation path: Legal, Settlement, or Write-Off</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3 p-6">
                {escalationRecommendations.map((rec) => (
                    <div key={rec.id} className="border border-border rounded-lg p-4 hover:border-border/80 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-foreground">{actionLabels[rec.action]}</h4>
                                    <span className="text-xs font-mono text-muted-foreground">{rec.caseId}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{rec.reasoning}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <div className="text-right">
                                    <div className="flex items-center gap-1 mb-1">
                                        <span className="text-2xl font-bold text-foreground">{(rec.confidence * 100).toFixed(0)}%</span>
                                        <span className="text-xs text-muted-foreground">Confidence</span>
                                    </div>
                                    <Badge
                                        className={cn(
                                            'capitalize',
                                            rec.risk_level === 'low'
                                                ? 'bg-green-500/20 text-green-700 border-green-200'
                                                : rec.risk_level === 'medium'
                                                    ? 'bg-yellow-500/20 text-yellow-700 border-yellow-200'
                                                    : 'bg-red-500/20 text-red-700 border-red-200'
                                        )}
                                    >
                                        {rec.risk_level} Risk
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                            {rec.predicted_recovery_rate !== undefined && (
                                <div className="bg-background rounded-lg p-3 border border-border/50">
                                    <p className="text-xs text-muted-foreground mb-1">Recovery Likelihood</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                                            <div
                                                className={cn(
                                                    'h-full rounded-full',
                                                    rec.predicted_recovery_rate >= 0.7
                                                        ? 'bg-green-600'
                                                        : rec.predicted_recovery_rate >= 0.4
                                                            ? 'bg-yellow-600'
                                                            : 'bg-red-600'
                                                )}
                                                style={{ width: `${rec.predicted_recovery_rate * 100}%` }}
                                            />
                                        </div>
                                        <span className="font-bold text-foreground w-12">
                                            {(rec.predicted_recovery_rate * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                </div>
                            )}

                            {rec.estimated_timeline && (
                                <div className="bg-background rounded-lg p-3 border border-border/50">
                                    <p className="text-xs text-muted-foreground mb-1">Est. Timeline</p>
                                    <p className="font-bold text-foreground">{rec.estimated_timeline}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button size="sm" variant="default" className="flex-1 flex items-center justify-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                Approve Action
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                Review Details
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-6 py-4 border-t border-border bg-muted/20">
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    {Object.entries(actionLabels).map(([key, label]) => (
                        <div key={key}>
                            <p className="text-2xl font-bold text-foreground">
                                {escalationRecommendations.filter(r => r.action === key).length}
                            </p>
                            <p className="text-muted-foreground truncate">{label.split(' ')[0]}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
