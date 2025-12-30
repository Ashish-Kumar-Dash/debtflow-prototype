import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, Building2, Activity, FileText, UserCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopNavProps {
  persona: 'admin' | 'agent';
  onPersonaChange: (persona: 'admin' | 'agent') => void;
}

const adminNavItems = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Cases', href: '/cases', icon: FolderOpen },
  { label: 'DCAs', href: '/dcas', icon: Building2 },
  { label: 'SLA Monitor', href: '/sla-monitor', icon: Activity },
  { label: 'Audit Logs', href: '/audit-logs', icon: FileText },
];

const agentNavItems = [
  { label: 'My Cases', href: '/agent/cases', icon: FolderOpen },
];

export function TopNav({ persona, onPersonaChange }: TopNavProps) {
  const location = useLocation();
  const navItems = persona === 'admin' ? adminNavItems : agentNavItems;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex h-16 items-center px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 mr-8">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">D</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-foreground text-sm leading-tight">DebtFlow </span>
            <span className="text-[10px] text-muted-foreground leading-tight">by FedEx</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'nav-link',
                  isActive && 'nav-link-active'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Persona Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-secondary hover:bg-secondary/80 transition-colors">
            <UserCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {persona === 'admin' ? 'FedEx Admin' : 'DCA Agent'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card border border-border">
            <DropdownMenuItem
              onClick={() => onPersonaChange('admin')}
              className={cn(persona === 'admin' && 'bg-secondary')}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              FedEx Admin
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onPersonaChange('agent')}
              className={cn(persona === 'agent' && 'bg-secondary')}
            >
              <UserCircle className="w-4 h-4 mr-2" />
              DCA Agent
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
