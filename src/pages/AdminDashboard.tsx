import { KPICard } from '@/components/dashboard/KPICard';
import { SLAHeatmap } from '@/components/dashboard/SLAHeatmap';
import { DCAPerformanceTable } from '@/components/dashboard/DCAPerformanceTable';
import { AuditLogViewer } from '@/components/dashboard/AuditLogViewer';
import { kpiData } from '@/lib/mockData';
import { DollarSign, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recovery Command Center</h1>
          <p className="text-muted-foreground mt-1">Real-time overview of debt collection operations</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <KPICard
            title="Total Outstanding"
            value={formatCurrency(kpiData.totalOutstanding)}
            trend={kpiData.monthlyTrend.outstanding}
            trendLabel="vs last month"
            icon={DollarSign}
          />
          <KPICard
            title="Recovery Rate"
            value={`${kpiData.recoveryRate}%`}
            trend={kpiData.monthlyTrend.recoveryRate}
            trendLabel="vs last month"
            icon={TrendingUp}
            variant="success"
          />
          <KPICard
            title="Avg Recovery Time"
            value={`${kpiData.avgRecoveryTime} days`}
            trend={kpiData.monthlyTrend.avgTime}
            trendLabel="vs last month"
            icon={Clock}
          />
          <KPICard
            title="SLA Breaches"
            value={`${kpiData.slaBreaches}`}
            trend={kpiData.monthlyTrend.breaches}
            trendLabel="vs last month"
            icon={AlertTriangle}
            variant="destructive"
          />
        </div>

        {/* SLA Heatmap */}
        <SLAHeatmap />

        {/* DCA Performance Table */}
        <DCAPerformanceTable />

        {/* Audit Logs */}
        <AuditLogViewer />
      </div>
    </div>
  );
}
