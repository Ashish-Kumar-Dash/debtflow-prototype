import { routingRecommendations } from '@/lib/mockData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PredictiveCaseRouter() {
    return (
        <Card className="p-6 border-border">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Predictive Case Routing Engine</h3>
                    <p className="text-sm text-muted-foreground">ML-powered assignment optimizer for maximum recovery efficiency</p>
                </div>
                <Badge variant="outline" className="text-xs">85-95% Accuracy</Badge>
            </div>

            <div className="space-y-3">
                {routingRecommendations.map((route) => (
                    <div key={route.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-foreground">{route.caseId}</h4>
                                    <Badge variant="outline" className="text-xs">{(route.routingConfidence * 100).toFixed(0)}% confidence</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">Predicted DCA: <span className="font-semibold text-foreground">{route.predictedDCA}</span></p>
                            </div>
                            <Button size="sm" variant="default">Route Case</Button>
                        </div>

                        <p className="text-sm text-foreground mb-3 leading-relaxed">{route.rationale}</p>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="bg-background rounded-lg p-3 border border-border/50">
                                <p className="text-xs text-muted-foreground mb-1">Expected Recovery Rate</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                                        <div className="h-full bg-green-600 rounded-full" style={{ width: `${route.expectedRecoveryRate * 100}%` }} />
                                    </div>
                                    <span className="font-bold text-foreground">{(route.expectedRecoveryRate * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                            <div className="bg-background rounded-lg p-3 border border-border/50">
                                <p className="text-xs text-muted-foreground mb-1">Expected Days to Recover</p>
                                <p className="font-bold text-foreground">{route.expectedDaysToRecover} days</p>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Routing Factors:</p>
                            <div className="flex flex-wrap gap-1">
                                {route.factors.map((factor, idx) => (
                                    <Badge key={idx} variant="outline" className="text-[11px]">{factor}</Badge>
                                ))}
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-border/50">
                            <p className="text-xs font-medium text-muted-foreground mb-2">Alternative Options:</p>
                            <div className="flex gap-2">
                                {route.alternativeDCAs.map((alt, idx) => (
                                    <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-lg text-xs">
                                        <span className="text-foreground">{alt.name}</span>
                                        <span className="text-muted-foreground">{(alt.confidence * 100).toFixed(0)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                        <p className="text-2xl font-bold text-foreground">{routingRecommendations.length}</p>
                        <p className="text-xs text-muted-foreground">Pending Routing</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-600">94%</p>
                        <p className="text-xs text-muted-foreground">Avg Confidence</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-accent">10-15%</p>
                        <p className="text-xs text-muted-foreground">Recovery Uplift</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}
