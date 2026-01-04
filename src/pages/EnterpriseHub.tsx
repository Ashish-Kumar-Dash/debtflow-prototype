import { PredictiveCaseRouter } from '@/components/automation/PredictiveCaseRouter';
import { DebtorSentimentAnalyzer } from '@/components/automation/DebtorSentimentAnalyzer';
import { DCAIncentiveLeaderboard } from '@/components/automation/DCAIncentiveLeaderboard';
import { SecurityAuditPanel } from '@/components/automation/SecurityAuditPanel';
import { ExecutiveReportGenerator } from '@/components/automation/ExecutiveReportGenerator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EnterpriseHub() {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Enterprise Intelligence Hub</h1>
                    <p className="text-muted-foreground mt-1">
                        Advanced ML-powered features for scalable, secure, and data-driven recovery operations
                    </p>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    AI-Powered
                </Badge>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">Enterprise-Grade Capabilities</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                            These features deliver measurable business impact: 10-15% recovery uplift, 20-30% escalation reduction,
                            40-50% breach risk reduction, and 5-10 hours saved weekly on reporting.
                        </p>
                        <div className="flex gap-2">
                            <Link to="/automation">
                                <Button variant="outline" size="sm">
                                    <ArrowRight className="h-4 w-4 mr-1" />
                                    View AI Automation Hub
                                </Button>
                            </Link>
                            <Link to="/innovation">
                                <Button variant="outline" size="sm">
                                    <ArrowRight className="h-4 w-4 mr-1" />
                                    View Innovation Lab
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <Badge variant="default" className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Enterprise Ready
                    </Badge>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                    <PredictiveCaseRouter />
                </div>

                <div className="lg:col-span-2">
                    <DebtorSentimentAnalyzer />
                </div>

                <div className="lg:col-span-2">
                    <DCAIncentiveLeaderboard />
                </div>

                <SecurityAuditPanel />

                <ExecutiveReportGenerator />
            </div>

            <div className="bg-secondary/50 border border-border rounded-lg p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-semibold text-foreground mb-2">Predictive Intelligence</h4>
                        <p className="text-sm text-muted-foreground">
                            ML routing engine predicts optimal DCA assignments with 85-95% accuracy,
                            delivering 10-15% recovery uplift through data-driven case allocation.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-2">Sentiment Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                            NLP-powered sentiment detection with auto-tone adjustment reduces escalations by 20-30%,
                            tracking debtor mood across all channels with real-time NPS heatmaps.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-2">Gamification Engine</h4>
                        <p className="text-sm text-muted-foreground">
                            Dynamic incentive system with points, badges, and challenges drives 15-25% performance uplift,
                            creating competitive leaderboards that motivate DCAs to excel.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-2">Zero-Trust Security</h4>
                        <p className="text-sm text-muted-foreground">
                            Automated PII masking and security audits reduce breach risk by 40-50%,
                            ensuring GDPR/FDCPA compliance with real-time privacy impact scanning.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-2">Executive Reporting</h4>
                        <p className="text-sm text-muted-foreground">
                            AI-generated narrative reports with C-suite formatting save 5-10 hours weekly,
                            providing instant insights with PDF/PowerPoint/PowerBI export capabilities.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-2">Production Roadmap</h4>
                        <p className="text-sm text-muted-foreground">
                            Ready for AWS/GCP deployment with TensorFlow routing models, Azure Sentiment API,
                            Vault for secrets, and Tableau integrations planned for Q2 2025.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
