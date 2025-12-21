
import React, { useEffect, useState } from 'react';
import { PulseStrip } from './overview/PulseStrip';
import { ExecutiveKPIGrid } from './overview/ExecutiveKPIGrid';
import { MainDailyChart } from './overview/MainDailyChart';
import { QuickDiagnosis } from './overview/QuickDiagnosis';
import { analyticsService } from '../../services/mockAnalytics';
import { Loader2 } from 'lucide-react';

export function OverviewTab({ isActive }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isActive && !data) {
      setLoading(true);
      analyticsService.getOverview()
        .then(res => setData(res))
        .finally(() => setLoading(false));
    }
  }, [isActive, data]);

  if (!isActive) return null; // Or keep structure but hidden

  if (loading && !data) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Real-time Pulse */}
      <PulseStrip data={data.pulse} />

      {/* KPIs */}
      <ExecutiveKPIGrid kpis={data.kpis} />

      {/* Chart */}
      <MainDailyChart data={data.chart} />

      {/* Diagnosis */}
      <QuickDiagnosis diagnosis={data.diagnosis} />
    </div>
  );
}
