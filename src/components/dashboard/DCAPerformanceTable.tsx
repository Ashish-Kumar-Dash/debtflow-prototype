import { dcaData } from '@/lib/mockData';
import { Star, TrendingUp, Clock, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DCAPerformanceTable() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <div className="bg-card rounded-xl border border-border animate-fade-in">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">DCA Performance</h3>
        <p className="text-sm text-muted-foreground mt-1">Recovery metrics by collection agency</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">DCA Name</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Active Cases</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Recovery Rate</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Avg Days</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Total Recovered</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Rating</th>
            </tr>
          </thead>
          <tbody>
            {dcaData.map((dca, index) => (
              <tr key={dca.id} className="data-table-row" style={{ animationDelay: `${index * 50}ms` }}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{dca.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-foreground font-medium">{dca.activeCases}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          dca.recoveryRate >= 70 ? 'bg-success' : dca.recoveryRate >= 65 ? 'bg-warning' : 'bg-destructive'
                        )}
                        style={{ width: `${dca.recoveryRate}%` }}
                      />
                    </div>
                    <span className={cn(
                      'text-sm font-medium',
                      dca.recoveryRate >= 70 ? 'text-success' : dca.recoveryRate >= 65 ? 'text-warning' : 'text-destructive'
                    )}>
                      {dca.recoveryRate}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-foreground">{dca.avgDaysToRecover} days</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-foreground font-medium">{formatCurrency(dca.totalRecovered)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-warning" />
                    <span className="text-foreground font-medium">{dca.rating}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
