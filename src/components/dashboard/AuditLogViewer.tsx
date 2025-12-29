import { useState } from 'react';
import { auditLogs } from '@/lib/mockData';
import { Search, Filter, Phone, Mail, MessageSquare, FileText, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Phone Call': Phone,
  'Email Sent': Mail,
  'SMS Sent': MessageSquare,
  'Note Added': FileText,
  'Case Assigned': ArrowUpRight,
  'Payment Plan': FileText,
  'Escalation': AlertTriangle,
};

export function AuditLogViewer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesFilter;
  });

  const uniqueActions = [...new Set(auditLogs.map(log => log.action))];

  return (
    <div className="bg-card rounded-xl border border-border animate-fade-in">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Audit Logs</h3>
            <p className="text-sm text-muted-foreground mt-1">Complete activity trail for compliance</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by case ID, user, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary border-border"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="text-sm bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Actions</option>
              {uniqueActions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-card">
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Timestamp</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">User</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Case ID</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Action</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, index) => {
              const IconComponent = actionIcons[log.action] || FileText;
              return (
                <tr key={log.id} className="data-table-row" style={{ animationDelay: `${index * 30}ms` }}>
                  <td className="px-6 py-3">
                    <span className="text-sm text-muted-foreground font-mono">{log.timestamp}</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-sm font-medium text-foreground">{log.user}</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-sm font-mono text-accent">{log.caseId}</span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center">
                        <IconComponent className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-sm text-muted-foreground">{log.details}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
