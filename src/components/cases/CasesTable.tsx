import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { casesData } from '@/lib/mockData';
import { Search, Filter, ArrowRight, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CasesTableProps {
  showAllCases?: boolean;
}

export function CasesTable({ showAllCases = false }: CasesTableProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [slaFilter, setSlaFilter] = useState<string>('all');

  const filteredCases = casesData.filter(c => {
    const matchesSearch = 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || c.priority === priorityFilter;
    const matchesSla = slaFilter === 'all' || c.slaStatus === slaFilter;
    return matchesSearch && matchesPriority && matchesSla;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getSlaIcon = (status: string) => {
    switch (status) {
      case 'on-track': return CheckCircle;
      case 'at-risk': return Clock;
      case 'breached': return AlertCircle;
      default: return CheckCircle;
    }
  };

  const getSlaStyles = (status: string) => {
    switch (status) {
      case 'on-track': return 'sla-badge-green';
      case 'at-risk': return 'sla-badge-yellow';
      case 'breached': return 'sla-badge-red';
      default: return 'sla-badge-green';
    }
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return 'priority-low';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border animate-fade-in">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {showAllCases ? 'All Cases' : 'My Assigned Cases'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredCases.length} cases • Click a row to view details
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by case ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary border-border"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-sm bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={slaFilter}
              onChange={(e) => setSlaFilter(e.target.value)}
              className="text-sm bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All SLA Status</option>
              <option value="on-track">On Track</option>
              <option value="at-risk">At Risk</option>
              <option value="breached">Breached</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Case ID</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Customer</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Amount</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Ageing</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Priority</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">SLA Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((caseItem, index) => {
              const SlaIcon = getSlaIcon(caseItem.slaStatus);
              return (
                <tr
                  key={caseItem.id}
                  onClick={() => navigate(`/case/${caseItem.id}`)}
                  className="data-table-row cursor-pointer group"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-medium text-accent">{caseItem.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{caseItem.customerName}</p>
                      <p className="text-xs text-muted-foreground">{caseItem.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-foreground">{formatCurrency(caseItem.amount)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className={cn(
                        'text-sm font-medium',
                        caseItem.ageingDays > 60 ? 'text-destructive' : caseItem.ageingDays > 30 ? 'text-warning' : 'text-foreground'
                      )}>
                        {caseItem.ageingDays} days
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={cn('text-xs', getPriorityStyles(caseItem.priority))}>
                      {caseItem.priority}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={cn('text-xs flex items-center gap-1 w-fit', getSlaStyles(caseItem.slaStatus))}>
                      <SlaIcon className="w-3 h-3" />
                      {caseItem.slaStatus.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
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
