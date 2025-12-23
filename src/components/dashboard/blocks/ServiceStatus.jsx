import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Users, Clock, Activity } from 'lucide-react';
import { WaitDetailsDrawer, PrepDetailsDrawer, SlaDetailsDrawer } from './OperationalDrawers';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/Tooltip';

const KpiCard = ({ icon: Icon, title, value, sub, status, active, onClick, tooltip }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Card
          className="p-3 flex flex-col justify-between bg-white border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all cursor-pointer active:scale-95 group"
          onClick={onClick}
          role="button"
          tabIndex={0}
        >
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500 flex items-center gap-1 group-hover:text-gray-900 transition-colors">
            <Icon className="w-3 h-3" /> {title}
          </span>
          <div className="mt-1">
            <span className={`text-2xl md:text-[28px] font-bold block leading-none ${active ? 'text-gray-900' : 'text-emerald-600'}`}>
              {value}
            </span>
          </div>
          {sub}
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default function ServiceStatus() {
  const [activeDrawer, setActiveDrawer] = useState(null);

  const closeDrawer = () => setActiveDrawer(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-full">
        {/* CARD 1: ESPERA */}
        <KpiCard
          icon={Users}
          title="Espera"
          value="12"
          active
          tooltip="Número de filas à espera de mesa"
          onClick={() => setActiveDrawer('wait')}
          sub={(
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-gray-500 font-normal">filas</span>
              <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden flex-1 ml-1">
                <div className="bg-amber-400 h-full w-[40%]" />
              </div>
            </div>
          )}
        />

        {/* CARD 2: PREPARO */}
        <KpiCard
          icon={Clock}
          title="Prep"
          value={<>18<span className="text-lg font-semibold text-gray-400">m</span></>}
          active
          tooltip="Tempo médio de preparo de pedidos em andamento"
          onClick={() => setActiveDrawer('prep')}
          sub={(
            <div className="flex items-end gap-0.5 h-3 mt-2 opacity-30">
              <div className="w-1 bg-gray-900 h-full" />
              <div className="w-1 bg-gray-900 h-[80%]" />
              <div className="w-1 bg-gray-900 h-[40%]" />
              <div className="w-1 bg-gray-900 h-[60%]" />
              <div className="w-1 bg-gray-900 h-[90%]" />
            </div>
          )}
        />

        {/* CARD 3: SLA GERAL */}
        <KpiCard
          icon={Activity}
          title="SLA"
          value="98%"
          tooltip="Percentual de pedidos atendidos dentro do SLA configurado"
          onClick={() => setActiveDrawer('sla')}
          sub={(
            <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-1 py-0.5 rounded-full w-fit mt-2 text-center leading-tight block">
              Dentro da meta
            </span>
          )}
        />
      </div>

      {/* DRAWERS */}
      <WaitDetailsDrawer isOpen={activeDrawer === 'wait'} onClose={closeDrawer} />
      <PrepDetailsDrawer isOpen={activeDrawer === 'prep'} onClose={closeDrawer} />
      <SlaDetailsDrawer isOpen={activeDrawer === 'sla'} onClose={closeDrawer} />
    </>
  );
}
