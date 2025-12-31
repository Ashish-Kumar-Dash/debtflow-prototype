import { riskSignals } from '@/lib/mockData';
import { AlertCircle, Briefcase, MapPin, TrendingDown, LinkedinIcon, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const signalIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    employment_change: Briefcase,
    relocation: MapPin,
    financial_stress: TrendingDown,
    business_closure: AlertCircle,
};

const sourceLabels: Record<string, string> = {
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    twitter: 'Twitter',
    employment_database: 'Employment DB',
    telematics: 'Telematics',
};

export function RiskSignalsMonitor() {
    return (
        <div className="bg-card rounded-xl border border-border animate-fade-in">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Social & Alternative Data Signals</h3>
                        <p className="text-sm text-muted-foreground">Early warning signals from social media & employment data</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3 p-6">
                {riskSignals.map((signal) => {
                    const Icon = signalIcons[signal.signal_type];

                    return (
                        <div
                            key={signal.id}
                            className={cn(
                                'border rounded-lg p-4 transition-colors',
                                signal.risk_increase >= 0.3
                                    ? 'border-red-200 bg-red-500/5'
                                    : signal.risk_increase >= 0.2
                                        ? 'border-yellow-200 bg-yellow-500/5'
                                        : 'border-blue-200 bg-blue-500/5'
                            )}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1 flex items-start gap-3">
                                    {Icon && <Icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />}
                                    <div>
                                        <h4 className="font-semibold text-foreground capitalize">
                                            {signal.signal_type.replace(/_/g, ' ')}
                                        </h4>
                                        <p className="text-sm text-foreground mt-1">{signal.description}</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="text-xs flex-shrink-0">
                                    {sourceLabels[signal.source]}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-background rounded-lg p-3 border border-border/50">
                                    <p className="text-xs text-muted-foreground mb-1">Risk Increase</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                                            <div
                                                className={cn(
                                                    'h-full rounded-full',
                                                    signal.risk_increase >= 0.3
                                                        ? 'bg-red-600'
                                                        : signal.risk_increase >= 0.2
                                                            ? 'bg-yellow-600'
                                                            : 'bg-blue-600'
                                                )}
                                                style={{ width: `${signal.risk_increase * 100}%` }}
                                            />
                                        </div>
                                        <span className="font-bold text-foreground w-8">
                                            +{(signal.risk_increase * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-background rounded-lg p-3 border border-border/50">
                                    <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-green-600"
                                                style={{ width: `${signal.confidence * 100}%` }}
                                            />
                                        </div>
                                        <span className="font-bold text-foreground w-8">
                                            {(signal.confidence * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-background rounded-lg p-3 border border-border/50">
                                    <p className="text-xs text-muted-foreground mb-1">Case ID</p>
                                    <p className="font-bold text-foreground text-sm">{signal.caseId}</p>
                                </div>
                            </div>

                            <div className="mt-3 text-xs text-muted-foreground">
                                Detected: {new Date(signal.detected_at).toLocaleDateString()}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="px-6 py-4 border-t border-border bg-muted/20">
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-foreground">{riskSignals.length}</p>
                        <p className="text-xs text-muted-foreground">Total Signals</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-red-600">
                            {riskSignals.filter(s => s.risk_increase >= 0.3).length}
                        </p>
                        <p className="text-xs text-muted-foreground">High Risk</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-yellow-600">
                            {riskSignals.filter(s => s.risk_increase >= 0.2 && s.risk_increase < 0.3).length}
                        </p>
                        <p className="text-xs text-muted-foreground">Medium Risk</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-accent">
                            {(riskSignals.reduce((acc, s) => acc + s.confidence, 0) / riskSignals.length * 100).toFixed(0)}%
                        </p>
                        <p className="text-xs text-muted-foreground">Avg Confidence</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
