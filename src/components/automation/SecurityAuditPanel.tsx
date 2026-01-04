import { securityAudits } from '@/lib/mockData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SecurityAuditPanel() {
    return (
        <Card className="p-6 border-border">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Enhanced Security & Privacy Layer</h3>
                    <p className="text-sm text-muted-foreground">Zero-trust portal with automated PII masking</p>
                </div>
                <Badge variant="outline" className="text-xs">40-50% Breach Risk Reduction</Badge>
            </div>

            <div className="space-y-3">
                {securityAudits.map((audit) => (
                    <div
                        key={audit.id}
                        className={cn(
                            "border rounded-lg p-4",
                            audit.riskLevel === 'critical' ? "border-red-500/50 bg-red-500/5" :
                                audit.riskLevel === 'high' ? "border-orange-500/50 bg-orange-500/5" :
                                    audit.riskLevel === 'medium' ? "border-yellow-500/50 bg-yellow-500/5" :
                                        "border-green-500/50 bg-green-500/5"
                        )}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-foreground">{audit.caseId}</h4>
                                    <Badge
                                        variant={
                                            audit.status === 'passed' ? 'default' :
                                                audit.status === 'warning' ? 'outline' :
                                                    'destructive'
                                        }
                                        className="text-[10px] h-5"
                                    >
                                        {audit.status === 'passed' ? <CheckCircle className="h-3 w-3 mr-1" /> :
                                            audit.status === 'warning' ? <AlertTriangle className="h-3 w-3 mr-1" /> :
                                                <XCircle className="h-3 w-3 mr-1" />}
                                        {audit.status.toUpperCase()}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{audit.scanType} • {audit.scannedAt}</p>
                            </div>
                            <div className="text-right">
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "text-xs",
                                        audit.riskLevel === 'critical' ? "border-red-500 text-red-600" :
                                            audit.riskLevel === 'high' ? "border-orange-500 text-orange-600" :
                                                audit.riskLevel === 'medium' ? "border-yellow-500 text-yellow-600" :
                                                    "border-green-500 text-green-600"
                                    )}
                                >
                                    <Shield className="h-3 w-3 mr-1" />
                                    {audit.riskLevel.toUpperCase()}
                                </Badge>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-xs font-medium text-muted-foreground">Compliance Score</p>
                                <span className="text-xs font-bold text-foreground">{audit.complianceScore}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full rounded-full",
                                        audit.complianceScore >= 90 ? "bg-green-600" :
                                            audit.complianceScore >= 70 ? "bg-yellow-600" :
                                                "bg-red-600"
                                    )}
                                    style={{ width: `${audit.complianceScore}%` }}
                                />
                            </div>
                        </div>

                        {audit.findings?.length > 0 && (
                            <div className="mb-3 bg-background rounded-lg p-3 border border-border/50">
                                <p className="text-xs font-medium text-muted-foreground mb-2">Security Findings ({audit.findings.length})</p>
                                <div className="space-y-1">
                                    {audit.findings.map((finding, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-xs">
                                            <AlertTriangle className="h-3 w-3 text-orange-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-foreground">{finding}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {audit.remediationSteps?.length > 0 && (
                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-2">Recommended Actions</p>
                                <div className="space-y-1">
                                    {audit.remediationSteps.map((step, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-xs">
                                            <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-foreground">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {audit.status === 'failed' && (
                            <div className="mt-3 pt-3 border-t border-border/50">
                                <Button size="sm" variant="destructive" className="w-full">
                                    Escalate to Security Team
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-3">PII Masking Examples</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-background rounded-lg p-3 border border-border/50">
                        <p className="text-muted-foreground mb-1">SSN</p>
                        <p className="font-mono font-bold text-foreground">***-**-4523</p>
                    </div>
                    <div className="bg-background rounded-lg p-3 border border-border/50">
                        <p className="text-muted-foreground mb-1">Account Number</p>
                        <p className="font-mono font-bold text-foreground">****7891</p>
                    </div>
                    <div className="bg-background rounded-lg p-3 border border-border/50">
                        <p className="text-muted-foreground mb-1">Email</p>
                        <p className="font-mono font-bold text-foreground">j***@acme.com</p>
                    </div>
                    <div className="bg-background rounded-lg p-3 border border-border/50">
                        <p className="text-muted-foreground mb-1">Phone</p>
                        <p className="font-mono font-bold text-foreground">(***) ***-7890</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border mt-4 text-center text-sm">
                <div>
                    <p className="text-2xl font-bold text-foreground">{securityAudits.length}</p>
                    <p className="text-xs text-muted-foreground">Audits Run</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-green-600">
                        {Math.round(securityAudits.reduce((sum, a) => sum + a.complianceScore, 0) / securityAudits.length)}%
                    </p>
                    <p className="text-xs text-muted-foreground">Avg Compliance</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-accent">
                        {securityAudits.filter(a => a.status === 'passed').length}/{securityAudits.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Passed</p>
                </div>
            </div>
        </Card>
    );
}
