import { killSwitchCases } from '@/lib/mockData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusStyles: Record<string, string> = {
    locked: 'bg-red-500/10 text-red-700 border-red-200',
    review: 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
    released: 'bg-green-500/10 text-green-700 border-green-200',
};

export function RegulatoryKillSwitch() {
    return (
        <Card className="p-6 border-border">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Regulatory Kill Switch</h3>
                    <p className="text-sm text-muted-foreground">Auto-lock cases when legal representation or cease-and-desist is detected.</p>
                </div>
                <Badge variant="outline" className="text-xs">Governance</Badge>
            </div>

            <div className="space-y-3">
                {killSwitchCases.map((item) => (
                    <div key={item.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-foreground">{item.debtor_name}</h4>
                                    <span className="text-xs font-mono text-muted-foreground">{item.caseId}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Trigger: “{item.trigger_phrase}” ({item.channel})</p>
                                <p className="text-xs text-muted-foreground">Detected: {item.triggered_at}</p>
                            </div>
                            <Badge variant="outline" className={cn('text-xs capitalize', statusStyles[item.status])}>{item.status}</Badge>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed mb-2">{item.action_required}</p>
                        <p className="text-xs text-muted-foreground">All outbound communications are paused until legal clears the case.</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}
