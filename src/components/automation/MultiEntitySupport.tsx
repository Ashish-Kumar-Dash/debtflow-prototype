import { entityProfiles } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function MultiEntitySupport() {
    return (
        <Card className="p-6 border-border">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Multi-Entity / Multi-Currency</h3>
                    <p className="text-sm text-muted-foreground">Hierarchical org structure with local compliance and currencies.</p>
                </div>
                <Badge variant="outline" className="text-xs">Global Admin</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {entityProfiles.map((entity) => (
                    <div key={entity.id} className="border border-border rounded-lg p-4 bg-background">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h4 className="font-semibold text-foreground">{entity.name}</h4>
                                <p className="text-xs text-muted-foreground">{entity.region} • {entity.timezone}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">{entity.currency}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">DCAs: {entity.dcas.join(', ')}</p>
                        <p className="text-xs text-muted-foreground mb-2">Cases: {entity.cases.toLocaleString()}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                            {entity.local_compliance.map((rule) => (
                                <Badge key={rule} variant="outline" className="text-[11px]">{rule}</Badge>
                            ))}
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{entity.rules_summary}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}
