import React from 'react';
import { SettlementSandbox } from '@/components/automation/SettlementSandbox';
import { DCAMarketplace } from '@/components/automation/DCAMarketplace';
import { CleanRoomReconciler } from '@/components/automation/CleanRoomReconciler';
import { MultiEntitySupport } from '@/components/automation/MultiEntitySupport';
import { AnalyticsVisualizations } from '@/components/automation/AnalyticsVisualizations';
import { RegulatoryKillSwitch } from '@/components/automation/RegulatoryKillSwitch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, ShieldCheck, Globe2, BarChart3, Gavel, Sparkles } from 'lucide-react';

export default function InnovationHub() {
    return (
        <div className="min-h-screen bg-background">
            <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Sparkles className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Innovation Lab</h1>
                            <p className="text-muted-foreground">Settlement sandbox, performance-based DCA marketplace, clean-room reconciliation, and global governance.</p>
                        </div>
                    </div>
                    <Card className="p-4 border-l-4 border-l-primary bg-primary/5 flex flex-wrap gap-4">
                        <Badge variant="outline" className="text-xs">Early Settlements</Badge>
                        <Badge variant="outline" className="text-xs">Champion/Challenger</Badge>
                        <Badge variant="outline" className="text-xs">ERP Clean Room</Badge>
                        <Badge variant="outline" className="text-xs">Multi-Currency</Badge>
                        <Badge variant="outline" className="text-xs">Impact Visuals</Badge>
                        <Badge variant="outline" className="text-xs">Kill Switch</Badge>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SettlementSandbox />
                    <DCAMarketplace />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CleanRoomReconciler />
                    <MultiEntitySupport />
                </div>

                <AnalyticsVisualizations />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RegulatoryKillSwitch />
                    <Card className="p-6 border-border flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                            <Bot className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">Linkages to Automation</h3>
                                <p className="text-sm text-muted-foreground">Use these modules alongside outreach, compliance, and escalation for a unified flow.</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>• Early settlements feed Payment Plan Negotiation to finalize terms.</p>
                            <p>• Marketplace outcomes inform Escalation Intelligence and routing.</p>
                            <p>• Clean-room events pause Multi-Channel Orchestration instantly.</p>
                            <p>• Kill Switch locks cases and alerts Compliance Monitoring.</p>
                            <p>• Multi-entity settings drive localized templates and SLA rules.</p>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Highlight title="Faster Liquidation" icon={<Bot className="h-5 w-5" />} value="70%" helper="Settlement acceptance target" />
                    <Highlight title="Fair Competition" icon={<ShieldCheck className="h-5 w-5" />} value="10%" helper="Cases reserved for challengers" />
                    <Highlight title="Governance" icon={<Gavel className="h-5 w-5" />} value="<5s" helper="Kill switch response time" />
                </div>
            </div>
        </div>
    );
}

function Highlight({ title, icon, value, helper }: { title: string; icon: React.ReactNode; value: string; helper: string }) {
    return (
        <Card className="p-4 border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
            <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{helper}</p>
            </div>
        </Card>
    );
}
