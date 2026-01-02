import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TopNav } from '@/components/layout/TopNav';
import AdminDashboard from './AdminDashboard';
import AgentCases from './AgentCases';
import CaseDetail from './CaseDetail';
import AllCases from './AllCases';
import DCAs from './DCAs';
import SLAMonitor from './SLAMonitor';
import AuditLogs from './AuditLogs';
import Automation from './AutomationHub'
import InnovationHub from './InnovationHub';
export default function Index() {
  const [persona, setPersona] = useState<'admin' | 'agent'>('admin');

  return (
    <div className="min-h-screen bg-background">
      <TopNav persona={persona} onPersonaChange={setPersona} />

      {persona === 'admin' ? (
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/cases" element={<AllCases />} />
          <Route path="/case/:caseId" element={<CaseDetail />} />
          <Route path="/dcas" element={<DCAs />} />
          <Route path="/sla-monitor" element={<SLAMonitor />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/innovation" element={<InnovationHub />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/agent/cases" replace />} />
          <Route path="/agent/cases" element={<AgentCases />} />
          <Route path="/case/:caseId" element={<CaseDetail />} />
          <Route path="*" element={<Navigate to="/agent/cases" replace />} />
        </Routes>
      )}
    </div>
  );
}
