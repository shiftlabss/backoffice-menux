
import React, { useEffect, useState } from 'react';
import { CategoriesTable } from './items/CategoriesTable';
import { ItemsTable } from './items/ItemsTable';
import { analyticsService } from '../../services/mockAnalytics';
import { Loader2 } from 'lucide-react';

export function ItemsTab({ isActive }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isActive && !data) {
      setLoading(true);
      analyticsService.getItems()
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
      <CategoriesTable categories={data.categories} />
      <ItemsTable items={data.items} />
    </div>
  );
}
