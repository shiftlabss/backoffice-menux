import React, { useState } from 'react';
import { ArrowRight, Clock, Check, Loader2 } from 'lucide-react';
import { Button } from '../../ui/Form';
import { cn } from '../../../lib/utils';
import { Badge } from '../../ui/Badge';

const priorityConfig = {
  high: { color: 'bg-red-500', label: 'Alta' },
  medium: { color: 'bg-amber-500', label: 'Média' },
  low: { color: 'bg-blue-500', label: 'Baixa' }
};

export function OperationCard({ action, onAction, isSeen = false }) {
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleClick = async () => {
    if (status !== 'idle') return;

    // Let the parent handle the actual logic (drawer opening, etc)
    // Depending on user interaction design, we might show loading here IF the action is immediate
    // But for drawers, we usually just open them.
    // Assuming immediate actions or drawer triggers.

    onAction(action);
  };

  const isResolved = status === 'success';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
      className={cn(
        "group relative flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1 select-none",
        isSeen ? "bg-slate-50 border-slate-100 opacity-80" : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm active:scale-[0.98]"
      )}
    >
      {/* Side Urgency Indicator - Hidden if seen */}
      {!isSeen && (
        <div className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-l-lg", priorityConfig[action.priority]?.color || 'bg-slate-300')} />
      )}

      <div className={cn("pl-3 flex flex-col gap-1 transition-opacity", isResolved ? "opacity-50" : "opacity-100")}>
        <span className={cn(
          "text-sm font-semibold leading-tight line-clamp-1",
          isSeen ? "text-slate-600" : "text-slate-900 group-hover:text-black"
        )}>
          {action.title}
        </span>
        <div className="flex items-center gap-3">
          <span className={cn(
            "text-xs font-medium px-1.5 py-0.5 rounded-sm border",
            isSeen
              ? "bg-slate-100 text-slate-500 border-slate-200"
              : "bg-slate-50 text-slate-600 border-slate-200"
          )}>
            {action.impact}
          </span>

          {!isSeen && (
            <span className="flex items-center gap-1 text-xs font-normal text-slate-400">
              <Clock className="w-3 h-3" /> {action.time} atraso
            </span>
          )}
        </div>
      </div>

      <Button
        size="sm"
        variant="ghost"
        className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900"
        aria-label={`Resolver ${action.title}`}
      >
        {status === 'loading' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : status === 'success' ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : (
          <ArrowRight className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
