import { AuditLogViewer } from '@/components/dashboard/AuditLogViewer';
import { auditLogs } from '@/lib/mockData';
import { FileText, Users, Clock, Shield } from 'lucide-react';

export default function AuditLogs() {
  const uniqueUsers = new Set(auditLogs.map(log => log.user)).size;
  const todayLogs = auditLogs.filter(log => log.timestamp.startsWith('2025-02-05')).length;
  const uniqueCases = new Set(auditLogs.map(log => log.caseId)).size;

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Complete activity trail for compliance and governance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-5 animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Entries</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{auditLogs.length}</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 animate-fade-in" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Today's Activity</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{todayLogs}</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Active Users</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{uniqueUsers}</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 animate-fade-in" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Cases Tracked</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{uniqueCases}</p>
          </div>
        </div>

        {/* Audit Log Viewer */}
        <AuditLogViewer />
      </div>
    </div>
  );
}
