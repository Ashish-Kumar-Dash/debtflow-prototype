import { complianceChecks } from '@/lib/mockData';
import { ShieldAlert, CheckCircle, AlertCircle, AlertTriangle, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function ComplianceMonitoring() {
    const totalScanned = complianceChecks.length;
    const violations = complianceChecks.filter(c => c.violations.length > 0).length;
    const blocked = complianceChecks.filter(c => c.is_blocked).length;
    const compliant = complianceChecks.filter(c => c.compliance_score === 100).length;

    return (
        <div className="bg-card rounded-xl border border-border animate-fade-in">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <ShieldAlert className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Real-Time Compliance Monitoring</h3>
                        <p className="text-sm text-muted-foreground">AI monitors calls, emails & SMS for FDCPA, CFPB, TCPA violations in real-time</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3 p-6">
                {complianceChecks.map((check) => (
                    <div
                        key={check.id}
                        className={cn(
                            'border rounded-lg p-4 transition-colors',
                            check.is_blocked
                                ? 'border-destructive/50 bg-destructive/5'
                                : check.violations.length > 0
                                    ? 'border-yellow-500/50 bg-yellow-500/5'
                                    : 'border-green-500/50 bg-green-500/5'
                        )}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-foreground">{check.caseId}</span>
                                    <Badge variant="outline" className="capitalize text-xs">
                                        {check.channel}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Agent: {check.agentId} • {new Date(check.timestamp).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {check.is_blocked ? (
                                    <Badge className="bg-red-500/20 text-red-700 border-red-200 flex items-center gap-1">
                                        <Zap className="w-3 h-3" />
                                        BLOCKED
                                    </Badge>
                                ) : check.violations.length > 0 ? (
                                    <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-200 flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        {check.violations.length} Warning{check.violations.length > 1 ? 's' : ''}
                                    </Badge>
                                ) : (
                                    <Badge className="bg-green-500/20 text-green-700 border-green-200 flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Compliant
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="bg-secondary/50 rounded-lg p-3 mb-3 border border-border/50">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Content:</p>
                            <p className="text-sm text-foreground line-clamp-2">{check.content}</p>
                        </div>

                        {check.violations.length > 0 && (
                            <div className="space-y-2 mb-3">
                                {check.violations.map((violation, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            'rounded-lg p-3 border',
                                            violation.severity === 'error'
                                                ? 'bg-red-500/10 border-red-500/30'
                                                : 'bg-yellow-500/10 border-yellow-500/30'
                                        )}
                                    >
                                        <div className="flex items-start gap-2 mb-1">
                                            <AlertCircle className={cn('w-4 h-4 flex-shrink-0 mt-0.5', violation.severity === 'error' ? 'text-red-600' : 'text-yellow-600')} />
                                            <div className="flex-1">
                                                <p className={cn('text-sm font-medium', violation.severity === 'error' ? 'text-red-700' : 'text-yellow-700')}>
                                                    {violation.rule}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">Guideline: {violation.guideline}</p>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    'text-xs capitalize flex-shrink-0',
                                                    violation.severity === 'error' ? 'border-red-200' : 'border-yellow-200'
                                                )}
                                            >
                                                {violation.severity}
                                            </Badge>
                                        </div>
                                        {violation.phrase && (
                                            <p className="text-xs text-muted-foreground mt-2 ml-6">
                                                Phrase: <span className="font-mono text-foreground">"{violation.phrase}"</span>
                                            </p>
                                        )}
                                        {violation.correction && (
                                            <p className="text-xs text-green-600 mt-2 ml-6">
                                                Suggestion: {violation.correction}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Compliance Score:</span>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                                    <div
                                        className={cn(
                                            'h-full rounded-full transition-all duration-500',
                                            check.compliance_score === 100
                                                ? 'bg-green-600'
                                                : check.compliance_score >= 70
                                                    ? 'bg-yellow-600'
                                                    : 'bg-red-600'
                                        )}
                                        style={{ width: `${check.compliance_score}%` }}
                                    />
                                </div>
                                <span className="font-medium text-foreground w-8">{check.compliance_score}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-6 py-4 border-t border-border bg-muted/20">
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-foreground">{totalScanned}</p>
                        <p className="text-xs text-muted-foreground">Total Scanned</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-600">{compliant}</p>
                        <p className="text-xs text-muted-foreground">Compliant</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-yellow-600">{violations}</p>
                        <p className="text-xs text-muted-foreground">Violations</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-red-600">{blocked}</p>
                        <p className="text-xs text-muted-foreground">Blocked</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
