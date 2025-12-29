import { CasesTable } from '@/components/cases/CasesTable';

export default function AgentCases() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Cases</h1>
          <p className="text-muted-foreground mt-1">Manage your assigned recovery cases</p>
        </div>

        {/* Cases Table */}
        <CasesTable />
      </div>
    </div>
  );
}
