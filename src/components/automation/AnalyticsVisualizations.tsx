import { sankeyFlows, assignmentReasoning, marketplaceRounds } from '@/lib/mockData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function AnalyticsVisualizations() {
    const total = sankeyFlows.reduce((acc, f) => acc + f.amount, 0);
    const champion = marketplaceRounds[0];

    return (
        <Card className="p-6 border-border space-y-4">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Impact Visuals</h3>
                    <p className="text-sm text-muted-foreground">Show the flow, the leaderboard, and the AI reasoning behind assignments.</p>
                </div>
                <Badge variant="outline" className="text-xs">Pitch Ready</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Cash Flow (Sankey-lite)</h4>
                    <div className="space-y-2">
                        {sankeyFlows.map((flow) => {
                            const width = `${(flow.amount / total) * 100}%`;
                            const label = flow.stage === 'overdue' ? 'Total Overdue' : flow.stage === 'assigned' ? 'Assigned to DCA' : flow.stage === 'recovered' ? 'Recovered' : 'Written Off';
                            const color =
                                flow.stage === 'recovered'
                                    ? 'bg-green-500'
                                    : flow.stage === 'written_off'
                                        ? 'bg-red-500'
                                        : flow.stage === 'assigned'
                                            ? 'bg-blue-500'
                                            : 'bg-amber-500';
                            return (
                                <div key={flow.stage} className="space-y-1">
                                    <div className="text-xs text-muted-foreground">{label}</div>
                                    <div className="h-3 rounded-full bg-muted overflow-hidden">
                                        <div className={cn('h-full rounded-full', color)} style={{ width }} />
                                    </div>
                                    <div className="text-xs text-foreground">${flow.amount.toLocaleString()}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">DCA Leaderboard</h4>
                    <div className="space-y-2 text-sm">
                        <LeaderboardRow label={champion.champion} value={`${(champion.metrics.recovery_rate * 100).toFixed(0)}%`} helper="Recovery" />
                        <LeaderboardRow label={champion.challenger} value={`${(champion.challenger_metrics.recovery_rate * 100).toFixed(0)}%`} helper="Challenger" accent />
                        <LeaderboardRow label="Compliance" value={`${(champion.metrics.compliance_score * 100).toFixed(0)}%`} helper="Champion" />
                        <LeaderboardRow label="Debtor NPS" value={`${champion.metrics.debtor_nps}`} helper="Champion" />
                    </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">AI Reasoning Card</h4>
                    <div className="space-y-3">
                        {assignmentReasoning.slice(0, 1).map((reason) => (
                            <div key={reason.id} className="border border-border/60 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">{reason.caseId}</p>
                                        <p className="text-xs text-muted-foreground">Assigned to {reason.assigned_to}</p>
                                    </div>
                                    <Badge variant="outline" className="text-xs">{(reason.confidence * 100).toFixed(0)}% confidence</Badge>
                                </div>
                                <p className="text-sm text-foreground leading-relaxed mb-2">{reason.justification}</p>
                                <div className="flex flex-wrap gap-1">
                                    {reason.factors.map((factor) => (
                                        <Badge key={factor} variant="outline" className="text-[11px]">{factor}</Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}

function LeaderboardRow({ label, value, helper, accent }: { label: string; value: string; helper: string; accent?: boolean }) {
    return (
        <div className="flex items-center justify-between border border-border/40 rounded-lg p-2">
            <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-[11px] text-muted-foreground">{helper}</p>
            </div>
            <span className={cn('text-sm font-semibold', accent && 'text-primary')}>{value}</span>
        </div>
    );
}
