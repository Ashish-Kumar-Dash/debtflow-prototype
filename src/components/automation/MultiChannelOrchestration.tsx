import { campaignSequences } from '@/lib/mockData';
import { Zap, Mail, MessageSquare, Phone, CheckCircle, Clock, Dot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const channelIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    email: Mail,
    sms: MessageSquare,
    whatsapp: MessageSquare,
    call: Phone,
};

export function MultiChannelOrchestration() {
    return (
        <div className="bg-card rounded-xl border border-border animate-fade-in">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Multi-Channel Orchestration</h3>
                        <p className="text-sm text-muted-foreground">Automated email → SMS → call sequences based on engagement</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4 p-6">
                {campaignSequences.map((seq) => (
                    <div key={seq.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h4 className="font-semibold text-foreground mb-1">
                                    {seq.caseId}
                                </h4>
                                <p className="text-xs text-muted-foreground capitalize">
                                    Sequence: {seq.sequence_type.replace(/_/g, ' ')} • Success Rate: {(seq.overall_success_rate * 100).toFixed(0)}%
                                </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                                {seq.channels.filter(c => c.sent).length} / {seq.channels.length} Sent
                            </Badge>
                        </div>

                        <div className="space-y-3">
                            {seq.channels.map((step, idx) => {
                                const Icon = channelIcons[step.channel];
                                const isCompleted = step.sent;
                                const engagementStatus = step.engagement_status;

                                return (
                                    <div key={idx} className="flex gap-3">
                                        <div className="flex flex-col items-center">
                                            <div className={cn('w-8 h-8 rounded-full flex items-center justify-center border-2', isCompleted ? 'bg-primary border-primary' : 'bg-secondary border-border')}>
                                                <Icon className={cn('w-4 h-4', isCompleted ? 'text-primary-foreground' : 'text-muted-foreground')} />
                                            </div>
                                            {idx < seq.channels.length - 1 && (
                                                <div className={cn('w-0.5 h-8 mt-1', isCompleted ? 'bg-primary' : 'bg-border')} />
                                            )}
                                        </div>

                                        <div className="flex-1 pt-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="font-medium text-foreground capitalize">
                                                        Step {step.step_number}: {step.channel}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-0.5">
                                                        Template: {step.template_name.replace(/_/g, ' ')} • Wait: {step.wait_hours}h
                                                    </p>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        'text-xs capitalize flex-shrink-0',
                                                        step.sent
                                                            ? 'bg-green-500/20 text-green-700 border-green-200'
                                                            : 'bg-gray-500/20 text-gray-700 border-gray-200'
                                                    )}
                                                >
                                                    {step.sent ? 'Sent' : 'Pending'}
                                                </Badge>
                                            </div>

                                            {step.sent && (
                                                <div className="mt-2 text-xs space-y-1">
                                                    <p className="text-muted-foreground">
                                                        Sent: {step.sent_at && new Date(step.sent_at).toLocaleString()}
                                                    </p>
                                                    {step.engagement_status && (
                                                        <div className="flex items-center gap-2">
                                                            <Dot className={cn('w-3 h-3',
                                                                step.engagement_status === 'opened' ? 'text-blue-600' :
                                                                    step.engagement_status === 'clicked' ? 'text-purple-600' :
                                                                        step.engagement_status === 'no_response' ? 'text-orange-600' :
                                                                            'text-green-600'
                                                            )} />
                                                            <span className={cn(
                                                                'font-medium capitalize',
                                                                step.engagement_status === 'opened' ? 'text-blue-600' :
                                                                    step.engagement_status === 'clicked' ? 'text-purple-600' :
                                                                        step.engagement_status === 'no_response' ? 'text-orange-600' :
                                                                            'text-green-600'
                                                            )}>
                                                                {step.engagement_status.replace(/_/g, ' ')}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Campaign Success Rate</span>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                                    <div
                                        className={cn(
                                            'h-full rounded-full',
                                            seq.overall_success_rate >= 0.6 ? 'bg-green-600' : seq.overall_success_rate >= 0.4 ? 'bg-yellow-600' : 'bg-red-600'
                                        )}
                                        style={{ width: `${seq.overall_success_rate * 100}%` }}
                                    />
                                </div>
                                <span className="font-bold text-foreground w-12">{(seq.overall_success_rate * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-6 py-4 border-t border-border bg-muted/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-foreground">{campaignSequences.length}</p>
                        <p className="text-xs text-muted-foreground">Active Sequences</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">
                            {campaignSequences.reduce((acc, seq) => acc + seq.channels.filter(c => c.sent).length, 0)}
                        </p>
                        <p className="text-xs text-muted-foreground">Steps Completed</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-accent">
                            {(campaignSequences.reduce((acc, seq) => acc + seq.overall_success_rate, 0) / campaignSequences.length * 100).toFixed(0)}%
                        </p>
                        <p className="text-xs text-muted-foreground">Avg Success Rate</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
