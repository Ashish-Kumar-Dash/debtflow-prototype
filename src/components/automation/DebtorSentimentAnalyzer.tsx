import { sentimentAnalyses, sentimentHeatmaps } from '@/lib/mockData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function DebtorSentimentAnalyzer() {
    return (
        <Card className="p-6 border-border">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Debtor Sentiment Analyzer</h3>
                    <p className="text-sm text-muted-foreground">NLP-powered sentiment detection with auto-tone adjustment</p>
                </div>
                <Badge variant="outline" className="text-xs">20-30% Escalation Reduction</Badge>
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Recent Sentiment Analyses</h4>
                <div className="space-y-2">
                    {sentimentAnalyses.map((analysis) => (
                        <div key={analysis.id} className="border border-border rounded-lg p-3">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h5 className="font-semibold text-sm text-foreground">{analysis.debtor_name}</h5>
                                        <Badge
                                            variant={analysis.category === 'positive' ? 'default' : analysis.category === 'negative' || analysis.category === 'frustrated' ? 'destructive' : 'outline'}
                                            className="text-[10px] h-5"
                                        >
                                            {analysis.category}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{analysis.channel} • {analysis.interactionAt}</p>
                                </div>
                                <div className="text-right">
                                    <div className={cn(
                                        "text-lg font-bold",
                                        analysis.sentimentScore >= 0.5 ? "text-green-600" : analysis.sentimentScore >= 0 ? "text-yellow-600" : "text-red-600"
                                    )}>
                                        {analysis.sentimentScore > 0 ? '+' : ''}{analysis.sentimentScore.toFixed(2)}
                                    </div>
                                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden mt-1">
                                        <div
                                            className={cn(
                                                "h-full transition-all",
                                                analysis.sentimentScore >= 0.5 ? "bg-green-600" : analysis.sentimentScore >= 0 ? "bg-yellow-600" : "bg-red-600"
                                            )}
                                            style={{ width: `${Math.abs(analysis.sentimentScore) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {analysis.adjustmentTrigger && (
                                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2 mb-2">
                                    <p className="text-xs text-orange-600 font-medium">
                                        Alert: Tone Adjustment Triggered - Recommended: <span className="font-bold capitalize">{analysis.recommendedTone}</span>
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-1">
                                {analysis.keyPhrases.map((phrase, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-[10px]">"{phrase}"</Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-sm font-medium text-foreground mb-3">DCA Sentiment Heatmap (NPS Tracking)</h4>
                <div className="space-y-2">
                    {sentimentHeatmaps.map((heatmap) => (
                        <div key={heatmap.dca} className="border border-border rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-semibold text-sm text-foreground">{heatmap.dca}</h5>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant={heatmap.npsScore >= 50 ? 'default' : heatmap.npsScore >= 30 ? 'outline' : 'destructive'}
                                        className="text-xs"
                                    >
                                        NPS: {heatmap.npsScore}
                                    </Badge>
                                    <span className={cn(
                                        "text-sm font-bold",
                                        heatmap.avgSentiment >= 0.4 ? "text-green-600" : heatmap.avgSentiment >= 0.2 ? "text-yellow-600" : "text-red-600"
                                    )}>
                                        {heatmap.avgSentiment > 0 ? '+' : ''}{heatmap.avgSentiment.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2">
                                    <p className="text-xs text-muted-foreground mb-1">Positive</p>
                                    <p className="font-bold text-green-600">{heatmap.positiveCount}</p>
                                </div>
                                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2">
                                    <p className="text-xs text-muted-foreground mb-1">Neutral</p>
                                    <p className="font-bold text-yellow-600">{heatmap.neutralCount}</p>
                                </div>
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2">
                                    <p className="text-xs text-muted-foreground mb-1">Negative</p>
                                    <p className="font-bold text-red-600">{heatmap.negativeCount}</p>
                                </div>
                            </div>

                            <div className="mt-2">
                                <div className="flex h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-green-600"
                                        style={{ width: `${(heatmap.positiveCount / (heatmap.positiveCount + heatmap.neutralCount + heatmap.negativeCount)) * 100}%` }}
                                    />
                                    <div
                                        className="bg-yellow-600"
                                        style={{ width: `${(heatmap.neutralCount / (heatmap.positiveCount + heatmap.neutralCount + heatmap.negativeCount)) * 100}%` }}
                                    />
                                    <div
                                        className="bg-red-600"
                                        style={{ width: `${(heatmap.negativeCount / (heatmap.positiveCount + heatmap.neutralCount + heatmap.negativeCount)) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
