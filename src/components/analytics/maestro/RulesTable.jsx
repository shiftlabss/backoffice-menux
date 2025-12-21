
import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { MoreHorizontal, Play, Pause, Edit2, Activity } from 'lucide-react';
import { cn } from '../../../lib/utils';

export function RulesTable({ rules }) {
  if (!rules) return null;

  return (
    <Card className="p-0 border border-slate-200 overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Activity size={18} className="text-purple-600" /> Regras e Experimentos
        </h3>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold">
          + Nova Regra
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Regra</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Gatilho</th>
              <th className="px-4 py-3">Canal</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Performance</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rules.map((rule) => (
              <tr key={rule.id} className="hover:bg-purple-50/30 transition-colors">
                <td className="px-4 py-3 font-bold text-slate-900">{rule.name}</td>
                <td className="px-4 py-3 text-slate-600">{rule.type}</td>
                <td className="px-4 py-3 text-slate-500 text-xs font-mono bg-slate-50 rounded px-2 w-fit">{rule.trigger}</td>
                <td className="px-4 py-3 text-slate-600">{rule.channel}</td>
                <td className="px-4 py-3">
                  <Badge variant="secondary" className={cn(
                    "text-[10px]",
                    rule.status === 'Active' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      rule.status === 'Paused' ? "bg-slate-100 text-slate-500 border-slate-200" :
                        "bg-amber-50 text-amber-700"
                  )}>
                    {rule.status === 'Active' ? 'Ativa' : rule.status === 'Paused' ? 'Pausada' : rule.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={cn("font-bold text-xs", rule.performance.includes('+') ? "text-emerald-600" : "text-slate-400")}>
                    {rule.performance}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-purple-600">
                      <Edit2 size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                      {rule.status === 'Active' ? <Pause size={14} /> : <Play size={14} />}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
