import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ExecutiveKPIs from '../../components/customers/ExecutiveKPIs';
import AnalyticalDiagnosis from '../../components/customers/AnalyticalDiagnosis';
import SegmentsSection from '../../components/customers/SegmentsSection';

export default function CustomersAnalytics() {
  const { customers, periodFilter } = useOutletContext();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. Executive KPIs */}
      <ExecutiveKPIs customers={customers} period={periodFilter} />

      {/* 2. Analytical Diagnosis */}
      <div className="space-y-6">
        <AnalyticalDiagnosis customers={customers} />
        {/* 3. Segments & Tags */}
        <SegmentsSection customers={customers} />
      </div>
    </div>
  );
}
