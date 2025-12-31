import { outreachCampaigns } from '@/lib/mockData';
import { MessageSquare, Mail, Phone, Send, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const channelIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    sms: MessageSquare,
    email: Mail,
    whatsapp: MessageSquare,
    voice: Phone,
};

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
    sent: 'bg-blue-500/10 text-blue-700 border-blue-200',
    delivered: 'bg-green-500/10 text-green-700 border-green-200',
    opened: 'bg-purple-500/10 text-purple-700 border-purple-200',
    clicked: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
    failed: 'bg-red-500/10 text-red-700 border-red-200',
};

export function AutomatedOutreach() {
    return (
        <div className="bg-card rounded-xl border border-border animate-fade-in">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Send className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Automated Outreach</h3>
                        <p className="text-sm text-muted-foreground">AI-powered 24/7 debtor communication via SMS, Email, WhatsApp & Voice</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3 p-6">
                {outreachCampaigns.map((campaign) => {
                    const Icon = channelIcons[campaign.channel];
                    const statusColor = statusColors[campaign.status];

                    return (
                        <div key={campaign.id} className="bg-secondary/50 rounded-lg border border-border/50 p-4 hover:border-border transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start gap-3 flex-1">
                                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="font-medium text-foreground capitalize">{campaign.channel}</span>
                                            <Badge variant="outline" className={cn('text-xs capitalize', statusColor)}>
                                                {campaign.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{campaign.message}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>Sent: {new Date(campaign.sentAt).toLocaleString()}</span>
                                </div>
                                {campaign.status === 'delivered' && campaign.deliveredAt && (
                                    <div className="flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3 text-green-600" />
                                        <span>Delivered: {new Date(campaign.deliveredAt).toLocaleString()}</span>
                                    </div>
                                )}
                                {campaign.status === 'opened' && campaign.openedAt && (
                                    <div className="flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3 text-blue-600" />
                                        <span>Opened: {new Date(campaign.openedAt).toLocaleString()}</span>
                                    </div>
                                )}
                            </div>

                            {campaign.debtor_response && (
                                <div className="mt-3 p-3 bg-background rounded-lg border border-border/30">
                                    <p className="text-xs font-medium text-muted-foreground mb-1">Debtor Response:</p>
                                    <p className="text-sm text-foreground">{campaign.debtor_response}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="px-6 py-4 border-t border-border bg-muted/20">
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-foreground">{outreachCampaigns.length}</p>
                        <p className="text-xs text-muted-foreground">Total Campaigns</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-600">
                            {outreachCampaigns.filter(c => ['delivered', 'opened', 'clicked'].includes(c.status)).length}
                        </p>
                        <p className="text-xs text-muted-foreground">Successful</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-yellow-600">
                            {outreachCampaigns.filter(c => c.status === 'pending').length}
                        </p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-purple-600">
                            {outreachCampaigns.filter(c => c.debtor_response).length}
                        </p>
                        <p className="text-xs text-muted-foreground">Responses</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
