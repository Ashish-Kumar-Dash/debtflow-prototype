import { reconciliationEvents } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const eventStyles: Record<string, string> = {
    payment_match: 'bg-green-500/10 text-green-700 border-green-200',
    dispute_flag: 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
    duplicate_contact: 'bg-orange-500/10 text-orange-700 border-orange-200',
    write_off: 'bg-red-500/10 text-red-700 border-red-200',
};

export function CleanRoomReconciler() {
    return (
        <Card className="p-6 border-border">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Clean Room Reconciler</h3>
                    <p className="text-sm text-muted-foreground">Real-time kill of cases when ERP shows a payment or dispute.</p>
                </div>
                <Badge variant="outline" className="text-xs">SAP | Oracle | Bank Feeds</Badge>
            </div>

            <div className="space-y-3">
                {reconciliationEvents.map((event) => (
                    <div key={event.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-foreground">{event.caseId}</h4>
                                    <Badge variant="outline" className="text-xs">{event.source_system}</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">Detected: {event.detected_at}</p>
                            </div>
                            <Badge variant="outline" className={cn('text-xs capitalize', eventStyles[event.event_type])}>{event.event_type.replace('_', ' ')}</Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                            <div className="bg-background rounded-lg p-3 border border-border/50">
                                <p className="text-xs text-muted-foreground mb-1">Amount</p>
                                <p className="font-semibold text-foreground">{event.amount ? `$${event.amount.toLocaleString()}` : 'N/A'}</p>
                            </div>
                            <div className="bg-background rounded-lg p-3 border border-border/50">
                                <p className="text-xs text-muted-foreground mb-1">Status</p>
                                <p className="font-semibold text-foreground capitalize">{event.status}</p>
                            </div>
                            <div className="bg-background rounded-lg p-3 border border-border/50">
                                <p className="text-xs text-muted-foreground mb-1">Resolution</p>
                                <p className="text-foreground text-sm leading-snug">{event.resolution_note}</p>
                            </div>
                        </div>

                        <div className="text-xs text-muted-foreground">If resolved, outbound contact is stopped and case is closed in the portal.</div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
