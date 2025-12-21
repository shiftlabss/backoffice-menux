
import React, { useEffect, useState } from 'react';
import { FullFunnel } from './funnel/FullFunnel';
import { DropoffPatterns } from './funnel/DropoffPatterns';
import { analyticsService } from '../../services/mockAnalytics';
import { Loader2 } from 'lucide-react';

export function FunnelTab({ isActive }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isActive && !data) {
      setLoading(true);
      analyticsService.getFunnel()
        .then(res => setData(res))
        .finally(() => setLoading(false));
    }
  }, [isActive, data]);

  if (!isActive) return null;

  if (loading && !data) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <FullFunnel stages={data.stages} />
      <DropoffPatterns patterns={data.patterns} />
    </div>
  );
}
