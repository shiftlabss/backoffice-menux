import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import { DEEP_ANALYTICS_DATA } from '../../../services/mockAnalyticsDeep';
import { ArrowRight, MousePointer, ShoppingCart, CheckCircle, Eye, TrendingUp } from 'lucide-react';
import { cn } from '../../../lib/utils';

export default function Row1_FunnelMetrics() {
  const { funnel } = DEEP_ANALYTICS_DATA;

  const FunnelStep = ({ label, value, icon: Icon, color, isLast }) => (
    <div className="flex items-center flex-1">
      <div className={`p-3 rounded-full ${color} bg-opacity-10 mr-3`}>
        <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase font-bold">{label}</p>
        <p className="text-xl font-bold text-foreground">{value.toLocaleString()}</p>
      </div>
      {!isLast && <ArrowRight className="w-5 h-5 text-muted-foreground mx-auto opacity-30" />}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Funnel Card - Spans 6 cols */}
      <Card className="md:col-span-6 border-border shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-sm font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full"></span>
            Funil do Cardápio
          </h3>
          <div className="flex justify-between items-center gap-2">
            <FunnelStep label="Vis." value={funnel.views} icon={Eye} color="bg-blue-500" />
            <FunnelStep label="Cliques" value={funnel.clicks} icon={MousePointer} color="bg-purple-500" />
            <FunnelStep label="Adições" value={funnel.adds} icon={ShoppingCart} color="bg-orange-500" />
            <FunnelStep label="Pedidos" value={funnel.orders} icon={CheckCircle} color="bg-green-500" isLast />
          </div>
        </CardContent>
      </Card>

      {/* CTR Card - Spans 3 cols */}
      <Card className="md:col-span-3 border-border shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-sm font-bold text-muted-foreground mb-2">CTR Médio (Cliques/Vis.)</h3>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-primary">{funnel.ctr.value}%</span>
            <div className={cn("flex items-center text-xs font-bold mb-1 px-2 py-0.5 rounded-full",
              funnel.ctr.trend > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}>
              {funnel.ctr.trend > 0 ? '+' : ''}{funnel.ctr.trend}%
              <TrendingUp className="w-3 h-3 ml-1" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Eficiência de atração dos itens.</p>
        </CardContent>
      </Card>

      {/* Conversion Card - Spans 3 cols */}
      <Card className="md:col-span-3 border-border shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-sm font-bold text-muted-foreground mb-2">Conversão Média</h3>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-green-600">{funnel.conversion.value}%</span>
            <div className={cn("flex items-center text-xs font-bold mb-1 px-2 py-0.5 rounded-full",
              funnel.conversion.trend > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}>
              {funnel.conversion.trend > 0 ? '+' : ''}{funnel.conversion.trend}%
              <TrendingUp className="w-3 h-3 ml-1" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Pedidos finalizados por visita.</p>
        </CardContent>
      </Card>
    </div>
  );
}
