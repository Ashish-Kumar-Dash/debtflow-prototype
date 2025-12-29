import { slaTimelineData } from '@/lib/mockData';

export function SLAHeatmap() {
  const maxValue = Math.max(...slaTimelineData.map(d => d.onTrack + d.atRisk + d.breached));

  return (
    <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">SLA Status Timeline</h3>
          <p className="text-sm text-muted-foreground mt-1">Weekly case distribution by SLA status</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-success" />
            <span className="text-muted-foreground">On Track</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-warning" />
            <span className="text-muted-foreground">At Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-destructive" />
            <span className="text-muted-foreground">Breached</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {slaTimelineData.map((week, index) => {
          const total = week.onTrack + week.atRisk + week.breached;
          const onTrackPercent = (week.onTrack / total) * 100;
          const atRiskPercent = (week.atRisk / total) * 100;
          const breachedPercent = (week.breached / total) * 100;

          return (
            <div key={week.week} className="flex items-center gap-4" style={{ animationDelay: `${index * 50}ms` }}>
              <span className="text-sm text-muted-foreground w-16 shrink-0">{week.week}</span>
              <div className="flex-1 h-8 rounded-lg overflow-hidden flex bg-muted">
                <div
                  className="h-full bg-success transition-all duration-500 ease-out flex items-center justify-center"
                  style={{ width: `${onTrackPercent}%` }}
                >
                  {onTrackPercent > 15 && (
                    <span className="text-[10px] font-medium text-success-foreground">{week.onTrack}</span>
                  )}
                </div>
                <div
                  className="h-full bg-warning transition-all duration-500 ease-out flex items-center justify-center"
                  style={{ width: `${atRiskPercent}%` }}
                >
                  {atRiskPercent > 10 && (
                    <span className="text-[10px] font-medium text-warning-foreground">{week.atRisk}</span>
                  )}
                </div>
                <div
                  className="h-full bg-destructive transition-all duration-500 ease-out flex items-center justify-center"
                  style={{ width: `${breachedPercent}%` }}
                >
                  {breachedPercent > 5 && (
                    <span className="text-[10px] font-medium text-destructive-foreground">{week.breached}</span>
                  )}
                </div>
              </div>
              <span className="text-sm font-medium text-foreground w-12 text-right">{total}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
