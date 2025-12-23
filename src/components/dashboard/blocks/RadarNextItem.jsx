import React from 'react';
import { Button } from '../../ui/Form';
import { ChevronRight, Utensils, Users, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '../../../lib/utils';

export const RadarNextItem = ({ bottleneck, onView }) => {
  const { id, title, impact, type, timeActive } = bottleneck;

  const TypeIcon = {
    kitchen: Utensils,
    entrance: Users,
    bar: TrendingUp
  }[type] || AlertTriangle;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onView(id)}
      className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 shrink-0 group-hover:bg-white transition-colors">
          <TypeIcon className="w-4 h-4 text-gray-500" />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-medium bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">{impact.primary}</span>
            <span className="flex items-center gap-1 font-mono text-gray-400">
              <Clock className="w-3 h-3" /> {timeActive}
            </span>
          </div>
        </div>
      </div>

      <Button variant="ghost" size="icon" className="text-gray-300 group-hover:text-blue-500 transition-colors">
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
