import { settlementOffers } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const statusStyles: Record<string, string> = {
    recommended: 'bg-blue-500/10 text-blue-700 border-blue-200',
    presented: 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
    accepted: 'bg-green-500/10 text-green-700 border-green-200',
    expired: 'bg-red-500/10 text-red-700 border-red-200',
};

export function SettlementSandbox() {
    return (
        <Card className="p-6 border-border">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Settlement Sandbox</h3>
                    <p className="text-sm text-muted-foreground">Dynamic early-settlement offers to liquidate stagnant debt faster.</p>
                </div>
                <Badge variant="outline" className="text-xs">Direct-to-Consumer ROI</Badge>
            </div>

            <div className="space-y-3">
                {settlementOffers.map((offer) => {
                    const settlementAmount = offer.total_balance * offer.recommended_settlement_pct;
                    const earlyBird = offer.early_bird_discount ? settlementAmount * (1 - offer.early_bird_discount) : settlementAmount;
                    return (
                        <div key={offer.id} className="border border-border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold text-foreground">{offer.debtor_name}</h4>
                                        <span className="text-xs font-mono text-muted-foreground">{offer.caseId}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Balance: ${offer.total_balance.toLocaleString()}</p>
                                </div>
                                <Badge variant="outline" className={cn('text-xs capitalize', statusStyles[offer.status])}>{offer.status}</Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                                <div className="bg-background rounded-lg p-3 border border-border/50">
                                    <p className="text-xs text-muted-foreground mb-1">Recommended Settlement</p>
                                    <p className="font-bold text-foreground">{(offer.recommended_settlement_pct * 100).toFixed(0)}% (${settlementAmount.toLocaleString()})</p>
                                </div>
                                <div className="bg-background rounded-lg p-3 border border-border/50">
                                    <p className="text-xs text-muted-foreground mb-1">Early Bird</p>
                                    <p className="font-bold text-foreground">{offer.early_bird_discount ? `${(offer.early_bird_discount * 100).toFixed(0)}% → $${earlyBird.toLocaleString()}` : 'Optional'}</p>
                                </div>
                                <div className="bg-background rounded-lg p-3 border border-border/50">
                                    <p className="text-xs text-muted-foreground mb-1">Full Recovery Prob.</p>
                                    <p className="font-bold text-foreground">{(offer.predicted_full_recovery_prob * 100).toFixed(0)}%</p>
                                </div>
                                <div className="bg-background rounded-lg p-3 border border-border/50">
                                    <p className="text-xs text-muted-foreground mb-1">Settlement Prob.</p>
                                    <p className="font-bold text-foreground">{(offer.predicted_settlement_prob * 100).toFixed(0)}%</p>
                                </div>
                            </div>

                            <p className="text-sm text-foreground mb-3 leading-relaxed">{offer.rationale}</p>

                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Offer window: {offer.settlement_window_days} days</span>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="default">Present Offer</Button>
                                    <Button size="sm" variant="outline">Simulate</Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
