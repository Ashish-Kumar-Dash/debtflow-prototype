import { SLAHeatmap } from '@/components/dashboard/SLAHeatmap';
import { casesData, slaTimelineData } from '@/lib/mockData';
import { AlertCircle, Clock, CheckCircle, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SLAMonitor() {
  const onTrackCases = casesData.filter(c => c.slaStatus === 'on-track').length;
  const atRiskCases = casesData.filter(c => c.slaStatus === 'at-risk').length;
  const breachedCases = casesData.filter(c => c.slaStatus === 'breached').length;

  const totalCases = casesData.length;
  const complianceRate = ((onTrackCases / totalCases) * 100).toFixed(1);

  // Calculate weekly trend
  const thisWeek = slaTimelineData[slaTimelineData.length - 1];
  const lastWeek = slaTimelineData[slaTimelineData.length - 2];
  const breachTrend = thisWeek.breached - lastWeek.breached;

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">SLA Monitor</h1>
          <p className="text-muted-foreground mt-1">Track SLA compliance and identify at-risk cases</p>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-success/30 p-5 animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">On Track</span>
            </div>
            <p className="text-3xl font-bold text-success">{onTrackCases}</p>
            <p className="text-xs text-muted-foreground mt-1">cases within SLA</p>
          </div>

          <div className="bg-card rounded-xl border border-warning/30 p-5 animate-fade-in" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-warning" />
              </div>
              <span className="text-sm text-muted-foreground">At Risk</span>
            </div>
            <p className="text-3xl font-bold text-warning">{atRiskCases}</p>
            <p className="text-xs text-muted-foreground mt-1">approaching deadline</p>
          </div>

          <div className="bg-card rounded-xl border border-destructive/30 p-5 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-destructive" />
              </div>
              <span className="text-sm text-muted-foreground">Breached</span>
            </div>
            <p className="text-3xl font-bold text-destructive">{breachedCases}</p>
            <div className="flex items-center gap-1 text-xs mt-1">
              {breachTrend <= 0 ? (
                <span className="text-success flex items-center gap-0.5">
                  <TrendingDown className="w-3 h-3" />
                  {Math.abs(breachTrend)} fewer than last week
                </span>
              ) : (
                <span className="text-destructive">+{breachTrend} from last week</span>
              )}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 animate-fade-in" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">Compliance Rate</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{complianceRate}%</p>
            <p className="text-xs text-muted-foreground mt-1">overall SLA compliance</p>
          </div>
        </div>

        {/* SLA Heatmap */}
        <SLAHeatmap />

        {/* At Risk Cases */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Cases Requiring Immediate Attention</h3>
            <p className="text-sm text-muted-foreground mt-1">At-risk and breached cases sorted by urgency</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Case ID</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Customer</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Amount</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">SLA Deadline</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Assigned DCA</th>
                </tr>
              </thead>
              <tbody>
                {casesData
                  .filter(c => c.slaStatus !== 'on-track')
                  .sort((a, b) => (a.slaStatus === 'breached' ? -1 : 1))
                  .map((caseItem, index) => (
                    <tr key={caseItem.id} className="data-table-row">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-medium text-accent">{caseItem.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-foreground">{caseItem.customerName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-foreground">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(caseItem.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-foreground">{caseItem.slaDeadline}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                          caseItem.slaStatus === 'at-risk' ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
                        )}>
                          {caseItem.slaStatus === 'at-risk' ? (
                            <Clock className="w-3 h-3" />
                          ) : (
                            <AlertCircle className="w-3 h-3" />
                          )}
                          {caseItem.slaStatus.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">{caseItem.assignedDca}</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
