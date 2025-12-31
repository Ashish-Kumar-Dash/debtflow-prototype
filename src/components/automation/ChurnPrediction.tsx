import { churnPredictions } from '@/lib/mockData';
import { TrendingDown, AlertTriangle, Heart, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    special_offer: Zap,
    escalate_agent: AlertTriangle,
    hardship_program: Heart,
    monitor: TrendingDown,
};

const actionLabels: Record<string, string> = {
    special_offer: 'Special Offer',
    escalate_agent: 'Escalate to Agent',
    hardship_program: 'Hardship Program',
    monitor: 'Monitor',
};

export function ChurnPrediction() {
    return (
        <div className="bg-card rounded-xl border border-border animate-fade-in">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <TrendingDown className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Churn Prediction & Retention</h3>
                        <p className="text-sm text-muted-foreground">Identify debtors about to disengage and trigger proactive interventions</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4 p-6">
                {churnPredictions.map((prediction) => {
                    const Icon = actionIcons[prediction.recommended_action];

                    return (
                        <div
                            key={prediction.id}
                            className={cn(
                                'border rounded-lg p-4 transition-colors',
                                prediction.risk_level === 'high'
                                    ? 'border-red-200 bg-red-500/5'
                                    : prediction.risk_level === 'medium'
                                        ? 'border-yellow-200 bg-yellow-500/5'
                                        : 'border-green-200 bg-green-500/5'
                            )}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold text-foreground">{prediction.debtor_name}</h4>
                                        <span className="text-xs font-mono text-muted-foreground">{prediction.caseId}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Last Engagement: {new Date(prediction.last_engagement).toLocaleString()}
                                    </p>
                                </div>
                                <Badge
                                    className={cn(
                                        'text-xs flex-shrink-0',
                                        prediction.risk_level === 'high'
                                            ? 'bg-red-500/20 text-red-700 border-red-200'
                                            : prediction.risk_level === 'medium'
                                                ? 'bg-yellow-500/20 text-yellow-700 border-yellow-200'
                                                : 'bg-green-500/20 text-green-700 border-green-200'
                                    )}
                                >
                                    {prediction.risk_level.toUpperCase()} RISK
                                </Badge>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-foreground">Churn Risk Score</span>
                                    <span className="text-lg font-bold text-foreground">
                                        {(prediction.churn_risk_score * 100).toFixed(0)}%
                                    </span>
                                </div>
                                <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                                    <div
                                        className={cn(
                                            'h-full rounded-full transition-all duration-500',
                                            prediction.churn_risk_score >= 0.7
                                                ? 'bg-red-600'
                                                : prediction.churn_risk_score >= 0.4
                                                    ? 'bg-yellow-600'
                                                    : 'bg-green-600'
                                        )}
                                        style={{ width: `${prediction.churn_risk_score * 100}%` }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {prediction.churn_risk_score >= 0.7
                                        ? 'Imminent risk of disengagement'
                                        : prediction.churn_risk_score >= 0.4
                                            ? 'Moderate risk of dropping off'
                                            : 'Low risk - continuing engagement'}
                                </p>
                            </div>

                            <div className="mb-4">
                                <p className="text-xs font-medium text-muted-foreground mb-2">Risk Signals:</p>
                                <div className="space-y-1">
                                    {prediction.churn_signals.map((signal, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-xs text-foreground">
                                            <span className="text-red-600 mt-0.5">•</span>
                                            <span>{signal}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-background rounded-lg border border-border/50 p-3 mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    {Icon && <Icon className="w-4 h-4 text-accent" />}
                                    <p className="text-sm font-medium text-foreground">
                                        Recommended: {actionLabels[prediction.recommended_action]}
                                    </p>
                                </div>
                                {prediction.special_offer && (
                                    <p className="text-sm text-foreground bg-accent/10 rounded p-2 border border-accent/20">
                                        {prediction.special_offer}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <Button size="sm" variant="default" className="flex-1">
                                    Execute Action
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1">
                                    View Full Profile
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="px-6 py-4 border-t border-border bg-muted/20">
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-foreground">{churnPredictions.length}</p>
                        <p className="text-xs text-muted-foreground">Monitored</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-red-600">
                            {churnPredictions.filter(p => p.risk_level === 'high').length}
                        </p>
                        <p className="text-xs text-muted-foreground">High Risk</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-yellow-600">
                            {churnPredictions.filter(p => p.risk_level === 'medium').length}
                        </p>
                        <p className="text-xs text-muted-foreground">Medium Risk</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-600">
                            {churnPredictions.filter(p => p.risk_level === 'low').length}
                        </p>
                        <p className="text-xs text-muted-foreground">Low Risk</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
