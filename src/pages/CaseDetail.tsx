import { useParams, useNavigate } from 'react-router-dom';
import { casesData } from '@/lib/mockData';
import { CaseDetailPanel } from '@/components/cases/CaseDetailPanel';
import { RecoveryCopilot } from '@/components/cases/RecoveryCopilot';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CaseDetail() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const caseData = casesData.find(c => c.id === caseId);

  if (!caseData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Case Not Found</h2>
          <p className="text-muted-foreground mb-4">The case you're looking for doesn't exist.</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{caseData.id}</h1>
            <p className="text-muted-foreground">{caseData.customerName}</p>
          </div>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Panel - Case Details */}
          <div className="lg:col-span-3">
            <CaseDetailPanel caseData={caseData} />
          </div>

          {/* Right Panel - Recovery Copilot */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <RecoveryCopilot caseData={caseData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
