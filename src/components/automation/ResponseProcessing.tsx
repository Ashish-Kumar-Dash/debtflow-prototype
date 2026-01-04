import { debiorResponses } from '@/lib/mockData';
import { FileText, CheckCircle, AlertTriangle, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function ResponseProcessing() {
    return (
        <div className="bg-card rounded-xl border border-border animate-fade-in">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Automated Response Processing</h3>
                        <p className="text-sm text-muted-foreground">OCR & NLP extracts payment data and promises-to-pay from debtor responses</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4 p-6">
                {debiorResponses.map((response) => (
                    <div key={response.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h4 className="font-medium text-foreground mb-1">
                                    {response.caseId}
                                </h4>
                                <p className="text-xs text-muted-foreground capitalize">
                                    Channel: {response.channel} • Received: {new Date(response.receivedAt).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {response.manual_review_needed ? (
                                    <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-200 flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        Review Needed
                                    </Badge>
                                ) : (
                                    <Badge className="bg-green-500/20 text-green-700 border-green-200 flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Auto-Processed
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="bg-secondary/50 rounded-lg p-3 mb-3 border border-border/50">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Raw Response:</p>
                            <p className="text-sm text-foreground line-clamp-2">{response.rawContent}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div className="bg-background rounded-lg p-3 border border-border/50">
                                <p className="text-xs font-medium text-muted-foreground mb-2">Extracted Data:</p>
                                <div className="space-y-1 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Promise to Pay:</span>
                                        <span className="font-medium">
                                            {response.extracted_data.promise_to_pay ? (
                                                <span className="text-green-600">Yes</span>
                                            ) : (
                                                <span className="text-gray-600">No</span>
                                            )}
                                        </span>
                                    </div>
                                    {response.extracted_data.amount && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Amount:</span>
                                            <span className="font-medium text-foreground">
                                                ${response.extracted_data.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                    {response.extracted_data.due_date && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Due Date:</span>
                                            <span className="font-medium text-foreground">{response.extracted_data.due_date}</span>
                                        </div>
                                    )}
                                    {response.extracted_data.hardship_claim && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Hardship:</span>
                                            <span className="font-medium text-yellow-600">Claimed</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-background rounded-lg p-3 border border-border/50">
                                <p className="text-xs font-medium text-muted-foreground mb-2">Confidence & Flags:</p>
                                <div className="space-y-1 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">OCR/NLP Confidence:</span>
                                        <span className="font-medium text-foreground">{(response.confidence_score * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Escalation Needed:</span>
                                        <span className="font-medium">
                                            {response.extracted_data.escalation_needed ? (
                                                <span className="text-red-600">Yes</span>
                                            ) : (
                                                <span className="text-green-600">No</span>
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Manual Review:</span>
                                        <span className="font-medium">
                                            {response.manual_review_needed ? (
                                                <span className="text-yellow-600">Required</span>
                                            ) : (
                                                <span className="text-green-600">Not needed</span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/20 rounded-lg p-2">
                            <Eye className="w-4 h-4" />
                            {response.manual_review_needed
                                ? 'Flagged for manual review due to hardship claim or ambiguity'
                                : response.extracted_data.promise_to_pay
                                    ? `Auto-created payment plan: ${response.extracted_data.amount ? '$' + response.extracted_data.amount.toLocaleString() : ''} due ${response.extracted_data.due_date}`
                                    : 'Logged in case history for supervisor review'}
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-6 py-4 border-t border-border bg-muted/20">
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-foreground">{debiorResponses.length}</p>
                        <p className="text-xs text-muted-foreground">Total Responses</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-600">
                            {debiorResponses.filter(r => !r.manual_review_needed).length}
                        </p>
                        <p className="text-xs text-muted-foreground">Auto-Processed</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-purple-600">
                            {debiorResponses.filter(r => r.extracted_data.promise_to_pay).length}
                        </p>
                        <p className="text-xs text-muted-foreground">Promises to Pay</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-yellow-600">
                            {debiorResponses.filter(r => r.manual_review_needed).length}
                        </p>
                        <p className="text-xs text-muted-foreground">Need Review</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
