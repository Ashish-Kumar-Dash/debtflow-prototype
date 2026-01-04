import { executiveReports } from '@/lib/mockData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, TrendingUp, TrendingDown, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ExecutiveReportGenerator() {
    return (
        <Card className="p-6 border-border">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Executive Reporting Suite</h3>
                    <p className="text-sm text-muted-foreground">AI-generated narrative reports with C-suite formatting</p>
                </div>
                <Badge variant="outline" className="text-xs">Saves 5-10 hrs/week</Badge>
            </div>

            <div className="space-y-4">
                {executiveReports.map((report) => (
                    <div key={report.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-semibold text-foreground">{report.reportType} Report</h4>
                                    <Badge variant="outline" className="text-[10px]">{report.period}</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">Generated: {report.generatedAt}</p>
                            </div>
                            <div className="flex gap-1">
                                {report.exportFormats.map((format) => (
                                    <Button key={format} size="sm" variant="outline" className="h-7 px-2">
                                        <Download className="h-3 w-3 mr-1" />
                                        {format}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-background rounded-lg p-4 border border-border/50 mb-3">
                            <h5 className="text-sm font-semibold text-foreground mb-2">Executive Summary</h5>
                            <p className="text-sm text-foreground leading-relaxed">{report.narrative}</p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-3 mb-3">
                            <div className="bg-background rounded-lg p-3 border border-border/50">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                                    <Lightbulb className="h-3 w-3" />
                                    Key Insights ({report.keyInsights.length})
                                </h5>
                                <div className="space-y-1">
                                    {report.keyInsights.map((insight, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-xs">
                                            <div className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                                            <span className="text-foreground">{insight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-background rounded-lg p-3 border border-border/50">
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">Performance Metrics</h5>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">Recovery Rate</span>
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-foreground">{report.metrics.recoveryRate}%</span>
                                            {report.metrics.recoveryRateChange !== undefined && (
                                                <span className={cn(
                                                    "text-[10px] font-bold flex items-center",
                                                    report.metrics.recoveryRateChange > 0 ? "text-green-600" : "text-red-600"
                                                )}>
                                                    {report.metrics.recoveryRateChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                                    {report.metrics.recoveryRateChange > 0 ? '+' : ''}{report.metrics.recoveryRateChange}%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">Avg Days to Recover</span>
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-foreground">{report.metrics.avgDaysToRecover} days</span>
                                            {report.metrics.avgDaysChange !== undefined && (
                                                <span className={cn(
                                                    "text-[10px] font-bold flex items-center",
                                                    report.metrics.avgDaysChange < 0 ? "text-green-600" : "text-red-600"
                                                )}>
                                                    {report.metrics.avgDaysChange < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                                                    {report.metrics.avgDaysChange > 0 ? '+' : ''}{report.metrics.avgDaysChange}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">Total Recovered</span>
                                        <span className="font-bold text-foreground">{report.metrics.totalRecovered}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">Compliance Score</span>
                                        <span className="font-bold text-green-600">{report.metrics.complianceScore}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {report.recommendations.length > 0 && (
                            <div className="bg-blue-500/5 border border-blue-500/30 rounded-lg p-3">
                                <h5 className="text-xs font-medium text-blue-600 mb-2">Strategic Recommendations</h5>
                                <div className="space-y-1">
                                    {report.recommendations.map((rec, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-xs">
                                            <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold mt-0.5 flex-shrink-0">
                                                {idx + 1}
                                            </div>
                                            <span className="text-foreground">{rec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-foreground">Automated Report Generation</p>
                        <p className="text-xs text-muted-foreground">Next weekly report: Feb 15, 2025 • Next monthly: Mar 1, 2025</p>
                    </div>
                    <Button variant="default">
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Custom Report
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-border mt-4 text-center text-sm">
                <div>
                    <p className="text-2xl font-bold text-foreground">{executiveReports.length}</p>
                    <p className="text-xs text-muted-foreground">Reports Generated</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-green-600">
                        {executiveReports.reduce((sum, r) => sum + r.keyInsights.length, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Key Insights</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-accent">
                        {executiveReports.reduce((sum, r) => sum + r.recommendations.length, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Recommendations</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-foreground">3</p>
                    <p className="text-xs text-muted-foreground">Export Formats</p>
                </div>
            </div>
        </Card>
    );
}
