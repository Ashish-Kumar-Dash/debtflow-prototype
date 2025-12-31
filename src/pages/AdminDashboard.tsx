import { KPICard } from '@/components/dashboard/KPICard';
import { SLAHeatmap } from '@/components/dashboard/SLAHeatmap';
import { DCAPerformanceTable } from '@/components/dashboard/DCAPerformanceTable';
import { AuditLogViewer } from '@/components/dashboard/AuditLogViewer';
import { kpiData } from '@/lib/mockData';
import { DollarSign, TrendingUp, Clock, AlertTriangle, Bot, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Recovery Command Center</h1>
            <p className="text-muted-foreground mt-1">Real-time overview of debt collection operations</p>
          </div>

          {/* Quick Link to Automation Hub */}
          <Link to="/automation">
            <Button variant="outline" className="gap-2">
              <Bot className="h-4 w-4" />
              AI Automation Hub
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
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

        {/* Automation Quick Access Banner */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  9 AI-Powered Automation Features Active
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Auto-outreach, message generation, compliance monitoring, and more
                </p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                    1,247 actions today
                  </span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">
                    892 AI recommendations
                  </span>
                </div>
              </div>
            </div>
            <Link to="/automation">
              <Button size="lg" className="gap-2">
                View Automation Hub
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>

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
