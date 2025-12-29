import { DCAPerformanceTable } from '@/components/dashboard/DCAPerformanceTable';
import { dcaData } from '@/lib/mockData';
import { Building2, TrendingUp, Clock, Award } from 'lucide-react';

export default function DCAs() {
  const totalCases = dcaData.reduce((acc, dca) => acc + dca.activeCases, 0);
  const avgRecoveryRate = dcaData.reduce((acc, dca) => acc + dca.recoveryRate, 0) / dcaData.length;
  const avgDays = dcaData.reduce((acc, dca) => acc + dca.avgDaysToRecover, 0) / dcaData.length;
  const topPerformer = dcaData.reduce((prev, curr) => prev.recoveryRate > curr.recoveryRate ? prev : curr);

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">DCA Management</h1>
          <p className="text-muted-foreground mt-1">Monitor and compare collection agency performance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-5 animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <Building2 className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Active DCAs</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{dcaData.length}</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 animate-fade-in" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Avg Recovery Rate</span>
            </div>
            <p className="text-2xl font-bold text-success">{avgRecoveryRate.toFixed(1)}%</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Avg Days to Recover</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{avgDays.toFixed(0)} days</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 animate-fade-in" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center">
                <Award className="w-4 h-4 text-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Top Performer</span>
            </div>
            <p className="text-lg font-bold text-foreground truncate">{topPerformer.name}</p>
          </div>
        </div>

        {/* DCA Table */}
        <DCAPerformanceTable />
      </div>
    </div>
  );
}
