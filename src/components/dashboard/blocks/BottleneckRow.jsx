import React from 'react';
import {
  AlertTriangle,
  Clock,
  Users,
  Utensils,
  MoreHorizontal,
  Eye,
  EyeOff,
  VolumeX,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Button } from '../../ui/Form';
import { Badge } from '../../ui/Badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/DropdownMenu';
import { cn } from '../../../lib/utils';

export const BottleneckRow = ({ bottleneck, onView, onMute, onMarkSeen, isSeen }) => {
  const { id, title, evidence, impact, type, priority, timeActive } = bottleneck;

  // Visual configs based on priority
  const priorityConfig = {
    critical: {
      bar: "bg-red-500",
      badge: "bg-red-50 text-red-700 border-red-200",
      icon: "text-red-500",
      label: "Crítico"
    },
    attention: {
      bar: "bg-orange-500",
      badge: "bg-orange-50 text-orange-700 border-orange-200",
      icon: "text-orange-500",
      label: "Atenção"
    },
    monitor: {
      bar: "bg-gray-400",
      badge: "bg-gray-50 text-gray-600 border-gray-200",
      icon: "text-gray-400",
      label: "Monitorar"
    }
  };

  const config = priorityConfig[priority] || priorityConfig.monitor;

  // Icon based on type
  const TypeIcon = {
    kitchen: Utensils,
    entrance: Users,
    bar: TrendingUp
  }[type] || AlertTriangle;

  return (
    <div
      className={cn(
        "group relative bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden",
        isSeen && "opacity-60 grayscale-[0.3]"
      )}
    >
      <div className="flex items-stretch min-h-[80px]">
        {/* Severity Sidebar */}
        <div className={cn("w-1.5 shrink-0", config.bar)} />

        {/* Content Container - Grid for better placement */}
        <div className="flex-1 p-3 grid grid-cols-[auto_1fr] md:grid-cols-[auto_2fr_2fr_auto] gap-3 items-center">

          {/* 1. Icon (Spans vertically on mobile if needed, but better centered top) */}
          <div className={cn("p-2 rounded-lg bg-gray-50 border border-gray-100 h-fit self-start md:self-center", config.icon)}>
            <TypeIcon className="w-4 h-4" />
          </div>

          {/* 2. Main Info (Title + Evidence) */}
          <div className="min-w-0 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4 className="text-sm font-semibold text-gray-900 truncate">{title}</h4>
              <Badge variant="outline" className={cn("text-[10px] h-4 px-1 rounded whitespace-nowrap", config.badge)}>
                {config.label}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 truncate">{evidence}</p>

            {/* Mobile-only Metrics & Time (appears below title on small screens) */}
            <div className="flex md:hidden items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="font-medium text-gray-700 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                {impact.primary}
              </span>
              <span className="flex items-center gap-1 font-mono text-gray-400">
                <Clock className="w-3 h-3" /> {timeActive}
              </span>
            </div>
          </div>

          {/* 3. Desktop Metrics (Hidden on mobile) */}
          <div className="hidden md:flex flex-col justify-center pl-4 border-l border-gray-100 h-full py-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-700 block">{impact.primary}</span>
                {impact.secondary && <span className="text-[10px] text-gray-400 block">{impact.secondary}</span>}
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs text-gray-400 font-mono">
                  <Clock className="w-3 h-3" />
                  <span>{timeActive}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Actions */}
          <div className="col-span-2 md:col-span-1 flex items-center justify-end md:justify-end gap-2 mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
            <Button
              size="sm"
              className={cn(
                "h-7 flex-1 md:flex-none text-xs font-medium shadow-sm transition-colors",
                priority === 'critical'
                  ? "bg-red-600 hover:bg-red-700 text-white border-transparent"
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200 border"
              )}
              onClick={() => onView(id)}
            >
              Ver <span className="inline md:hidden lg:inline">e agir</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-gray-700 shrink-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Ações Rápidas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onMarkSeen(id)}>
                  {isSeen ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                  {isSeen ? "Marcar como não visto" : "Marcar como visto"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onMute(id)} className="text-red-600 focus:text-red-700 focus:bg-red-50">
                  <VolumeX className="mr-2 h-4 w-4" />
                  Silenciar por 20 min
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </div>
    </div>
  );
};
