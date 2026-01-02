import { marketplaceRounds } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function DCAMarketplace() {
    return (
        <Card className="p-6 border-border">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">DCA Marketplace</h3>
                    <p className="text-sm text-muted-foreground">Champion vs Challenger allocation with performance-based share shifts.</p>
                </div>
                <Badge variant="outline" className="text-xs">10% Challenger Reserve</Badge>
            </div>

            <div className="space-y-3">
                {marketplaceRounds.map((round) => (
                    <div key={round.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h4 className="font-semibold text-foreground">{round.cohort}</h4>
                                <p className="text-xs text-muted-foreground">Window: {round.allocation_window_days} days</p>
                            </div>
                            {round.winner && (
                                <Badge variant="outline" className={cn('text-xs capitalize', round.winner === 'challenger' ? 'bg-green-500/10 text-green-700 border-green-200' : 'bg-blue-500/10 text-blue-700 border-blue-200')}>
                                    Winner: {round.winner}
                                </Badge>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="bg-background rounded-lg p-3 border border-border/50">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-foreground">Champion</span>
                                    <Badge variant="outline" className="text-xs">{round.champion}</Badge>
                                </div>
                                <p className="text-muted-foreground text-xs mb-2">Allocation: {(1 - round.reserved_share_pct) * 100}%</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <Metric label="Recovery" value={`${(round.metrics.recovery_rate * 100).toFixed(0)}%`} strong />
                                    <Metric label="Days to Recover" value={`${round.metrics.avg_days_to_recover}d`} />
                                    <Metric label="Compliance" value={`${(round.metrics.compliance_score * 100).toFixed(0)}%`} />
                                    <Metric label="Debtor NPS" value={`${round.metrics.debtor_nps}`} />
                                </div>
                            </div>

                            <div className="bg-background rounded-lg p-3 border border-border/50">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-foreground">Challenger</span>
                                    <Badge variant="outline" className="text-xs">{round.challenger}</Badge>
                                </div>
                                <p className="text-muted-foreground text-xs mb-2">Reserved Share: {(round.reserved_share_pct * 100).toFixed(0)}%</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <Metric label="Recovery" value={`${(round.challenger_metrics.recovery_rate * 100).toFixed(0)}%`} strong />
                                    <Metric label="Days to Recover" value={`${round.challenger_metrics.avg_days_to_recover}d`} />
                                    <Metric label="Compliance" value={`${(round.challenger_metrics.compliance_score * 100).toFixed(0)}%`} />
                                    <Metric label="Debtor NPS" value={`${round.challenger_metrics.debtor_nps}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

function Metric({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
    return (
        <div className="rounded-lg border border-border/50 p-2">
            <p className="text-[11px] text-muted-foreground mb-1">{label}</p>
            <p className={cn('text-sm', strong && 'font-semibold text-foreground')}>{value}</p>
        </div>
    );
}
