
import React from 'react';
import { DataExplorer } from './explorer/DataExplorer';

export function ExplorerTab({ isActive }) {
  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="mb-2">
        <h2 className="text-lg font-bold text-slate-900">Explorar Dados</h2>
        <p className="text-sm text-slate-500">Crie análises personalizadas combinando métricas e dimensões.</p>
      </div>
      <DataExplorer />
    </div>
  );
}
