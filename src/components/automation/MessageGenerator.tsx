import { generatedMessages } from '@/lib/mockData';
import { Sparkles, AlertTriangle, CheckCircle, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export function MessageGenerator() {
    const handleCopyMessage = (content: string) => {
        navigator.clipboard.writeText(content);
        toast({
            title: 'Copied to clipboard',
            description: 'Message variant copied successfully',
        });
    };

    return (
        <div className="bg-card rounded-xl border border-border animate-fade-in">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">LLM Message Generator</h3>
                        <p className="text-sm text-muted-foreground">GPT-4 generates personalized, compliant collection messages</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4 p-6">
                {generatedMessages.map((msg) => (
                    <div key={msg.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h4 className="font-medium text-foreground mb-1">
                                    {msg.debtor_name} - Variant {msg.variant}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    Age: {msg.debtor_age}, Occupation: {msg.debtor_occupation}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="capitalize">
                                    {msg.tone}
                                </Badge>
                                {msg.compliance_status === 'safe' ? (
                                    <Badge className="bg-green-500/20 text-green-700 border-green-200 flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Safe
                                    </Badge>
                                ) : msg.compliance_status === 'flagged' ? (
                                    <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-200 flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        Flagged
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive" className="flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        Blocked
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="bg-secondary/50 rounded-lg p-4 mb-3 border border-border/50">
                            <p className="text-sm text-foreground whitespace-pre-line">{msg.content}</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm">
                                {msg.engagement_score && (
                                    <div>
                                        <span className="text-muted-foreground">Predicted Engagement: </span>
                                        <span className="font-bold text-foreground">{msg.engagement_score}%</span>
                                    </div>
                                )}
                                {msg.flagged_phrases && msg.flagged_phrases.length > 0 && (
                                    <div>
                                        <span className="text-yellow-600 font-medium">
                                            {msg.flagged_phrases.length} Flagged Phrase{msg.flagged_phrases.length > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCopyMessage(msg.content)}
                                className="flex items-center gap-2"
                            >
                                <Copy className="w-3 h-3" />
                                Copy
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-6 py-4 border-t border-border bg-muted/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-foreground">{generatedMessages.length}</p>
                        <p className="text-xs text-muted-foreground">Total Messages</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-600">
                            {generatedMessages.filter(m => m.compliance_status === 'safe').length}
                        </p>
                        <p className="text-xs text-muted-foreground">Compliant</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-accent">
                            {Math.round(generatedMessages.reduce((acc, m) => acc + (m.engagement_score || 0), 0) / generatedMessages.length)}%
                        </p>
                        <p className="text-xs text-muted-foreground">Avg Engagement</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
