
import React from 'react';
import { ArrowDown, AlertCircle, Clock } from 'lucide-react';
import { cn } from '../../../lib/utils'; // Assuming global utils

export function FullFunnel({ stages }) {
  if (!stages) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Funil de Conversão: Ponta a Ponta</h3>

      <div className="flex flex-col gap-1 relative">
        {/* Vertical connector line */}
        <div className="absolute left-[38px] top-6 bottom-6 w-0.5 bg-slate-100 z-0"></div>

        {stages.map((stage, i) => {
          const isLast = i === stages.length - 1;
          const dropoffVal = parseFloat(stage.dropoff);
          const isHighDropoff = dropoffVal > 30; // simple threshold logic

          return (
            <div key={i} className="relative z-10 grid grid-cols-12 gap-4 items-center group">

              {/* Step Indicator */}
              <div className="col-span-1 md:col-span-1 flex justify-center">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-sm border-2 border-white",
                  isLast ? "bg-emerald-500" : "bg-purple-600"
                )}>
                  {i + 1}
                </div>
              </div>

              {/* Metric Card */}
              <div className="col-span-11 md:col-span-11">
                <div className="bg-white p-4 rounded-xl border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                    {/* Left: Title & Absolute # */}
                    <div className="w-full md:w-1/3">
                      <h4 className="text-sm font-bold text-slate-900">{stage.step}</h4>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl font-bold text-slate-800">{stage.value.toLocaleString()}</span>
                        <span className="text-xs text-slate-400">eventos</span>
                      </div>
                    </div>

                    {/* Middle: Conversion Rate */}
                    <div className="w-full md:w-1/3 flex flex-col md:items-center">
                      <div className="flex items-center gap-1.5">
                        <span className={cn("text-lg font-bold", isLast ? "text-emerald-600" : "text-slate-700")}>
                          {stage.passRate}
                        </span>
                        <span className="text-xs text-slate-400 uppercase font-semibold">Conversão</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1 max-w-[120px]">
                        <div className={cn("h-full rounded-full", isLast ? "bg-emerald-500" : "bg-purple-500")} style={{ width: stage.passRate }}></div>
                      </div>
                    </div>

                    {/* Right: Dropoff & Time */}
                    <div className="w-full md:w-1/3 flex justify-between md:justify-end gap-6">

                      {/* Dropoff (Skip for last step if irrelevant, but mock has it as 0 sometimes or logic) */}
                      {!isLast && (
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1 text-xs font-semibold text-slate-400 uppercase mb-0.5">
                            <span>Abandono</span>
                            {isHighDropoff && <AlertCircle size={12} className="text-red-500" />}
                          </div>
                          <span className={cn("text-sm font-bold", isHighDropoff ? "text-red-500" : "text-slate-500")}>
                            {stage.dropoff}
                          </span>
                        </div>
                      )}

                      {/* Time */}
                      <div className="text-right min-w-[60px]">
                        <div className="flex items-center justify-end gap-1 text-xs font-semibold text-slate-400 uppercase mb-0.5">
                          <Clock size={12} />
                          <span>Tempo</span>
                        </div>
                        <span className="text-sm font-medium text-slate-600">
                          {stage.avgTime}
                        </span>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
