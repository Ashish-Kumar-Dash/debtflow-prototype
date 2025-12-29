import { CasesTable } from '@/components/cases/CasesTable';

export default function AllCases() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Cases</h1>
          <p className="text-muted-foreground mt-1">Complete overview of all recovery cases across DCAs</p>
        </div>

        {/* Cases Table */}
        <CasesTable showAllCases />
      </div>
    </div>
  );
}
