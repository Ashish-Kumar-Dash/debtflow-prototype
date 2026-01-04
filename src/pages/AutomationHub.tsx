import { AutomatedOutreach } from '@/components/automation/AutomatedOutreach';
import { MessageGenerator } from '@/components/automation/MessageGenerator';
import { ResponseProcessing } from '@/components/automation/ResponseProcessing';
import { ComplianceMonitoring } from '@/components/automation/ComplianceMonitoring';
import { EscalationIntelligence } from '@/components/automation/EscalationIntelligence';
import { MultiChannelOrchestration } from '@/components/automation/MultiChannelOrchestration';
import { PaymentPlanNegotiation } from '@/components/automation/PaymentPlanNegotiation';
import { ChurnPrediction } from '@/components/automation/ChurnPrediction';
import { RiskSignalsMonitor } from '@/components/automation/RiskSignalsMonitor';
import { SettlementSandbox } from '@/components/automation/SettlementSandbox';
import { DCAMarketplace } from '@/components/automation/DCAMarketplace';
import { Bot, Zap, Brain, Shield, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function AutomationHub() {
    return (
        <div className="min-h-screen bg-background">
            <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">
                {/* Page Header with Stats */}
                <div className="space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                            <Bot className="h-8 w-8 text-primary" />
                            AI Automation Hub
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Advanced AI-powered features for intelligent debt recovery orchestration
                        </p>
                    </div>

                    {/* Quick Stats Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="p-4 border-l-4 border-l-blue-500">
                            <div className="flex items-center gap-3">
                                <Zap className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Auto Actions Today</p>
                                    <p className="text-2xl font-bold">1,247</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-4 border-l-4 border-l-green-500">
                            <div className="flex items-center gap-3">
                                <Brain className="h-5 w-5 text-green-500" />
                                <div>
                                    <p className="text-sm text-muted-foreground">AI Recommendations</p>
                                    <p className="text-2xl font-bold">892</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-4 border-l-4 border-l-purple-500">
                            <div className="flex items-center gap-3">
                                <Shield className="h-5 w-5 text-purple-500" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Compliance Checks</p>
                                    <p className="text-2xl font-bold">100%</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-4 border-l-4 border-l-orange-500">
                            <div className="flex items-center gap-3">
                                <Bot className="h-5 w-5 text-orange-500" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Active Workflows</p>
                                    <p className="text-2xl font-bold">23</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Communication Automation Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b pb-2">
                        <Zap className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold text-foreground">
                            Communication Automation
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <AutomatedOutreach />
                        <MessageGenerator />
                    </div>
                </div>

                {/* Processing & Compliance Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b pb-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold text-foreground">
                            Processing & Compliance
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ResponseProcessing />
                        <ComplianceMonitoring />
                    </div>
                </div>

                {/* Decision Intelligence Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b pb-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold text-foreground">
                            Decision Intelligence
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <EscalationIntelligence />
                        <MultiChannelOrchestration />
                    </div>
                </div>

                {/* Debtor Engagement Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b pb-2">
                        <Bot className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold text-foreground">
                            Debtor Engagement & Retention
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <PaymentPlanNegotiation />
                        <ChurnPrediction />
                    </div>
                </div>

                {/* Advanced Analytics Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b pb-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold text-foreground">
                            Advanced Risk Analytics
                        </h2>
                    </div>
                    <RiskSignalsMonitor />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-semibold text-foreground">Innovation Snapshot</h2>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/innovation" className="text-sm text-primary hover:underline">Open Innovation Lab</Link>
                            <Link to="/enterprise" className="text-sm text-primary hover:underline">Open Enterprise Hub</Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SettlementSandbox />
                        <DCAMarketplace />
                    </div>
                </div>
            </div>
        </div>
    );
}
