import React, { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { MoreHorizontal, ChevronDown, ChevronRight } from 'lucide-react';
import { KanbanCard } from './KanbanCard';
import { Button } from '../../ui/Button';
import { cn } from '../../../lib/utils';
import { Badge } from '../../ui/Badge';

export function KanbanColumn({ id, title, cards, color, count }) {
  const { setNodeRef } = useDroppable({ id });
  const cardIds = useMemo(() => cards.map((c) => c.id), [cards]);

  return (
    <div className="flex flex-col h-full min-w-[320px] max-w-[360px] bg-slate-50/50 rounded-xl border border-slate-200/60">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-slate-50/95 backdrop-blur-sm rounded-t-xl z-10">
        <div className="flex items-center gap-2">
          <button className="text-slate-400 hover:text-slate-600 -ml-1">
            <ChevronDown size={14} />
          </button>
          <h3 className={cn("font-bold text-xs uppercase tracking-wider", color)}>
            {title}
          </h3>
          <Badge variant="secondary" className="bg-white border border-slate-200 text-slate-600 text-[10px] min-w-[20px] justify-center h-5">
            {cards.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 font-medium">WIP 5</span>
          <button className="text-slate-300 hover:text-slate-500">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Cards Stack */}
      <div ref={setNodeRef} className="flex-1 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 pb-4">
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <KanbanCard key={card.id} card={card} index={index} />
              ))
            ) : (
              <div className="h-32 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 gap-2">
                <span className="text-xs font-medium">Sem oportunidades</span>
              </div>
            )}

            {cards.length > 5 && (
              <Button variant="ghost" className="w-full text-xs text-slate-500 hover:text-slate-700 h-8 mt-2">
                Ver todas ({cards.length})
                <ChevronRight size={12} className="ml-1" />
              </Button>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
