import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import { DEEP_ANALYTICS_DATA } from '../../../services/mockAnalyticsDeep';
import { Clock, Layers, Search, ArrowRight } from 'lucide-react';

export default function Row2_JourneyExplorer() {
  const { journey } = DEEP_ANALYTICS_DATA;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Exploration Metrics - Spans 4 cols */}
      <Card className="md:col-span-4 border-border shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-sm font-bold text-foreground mb-4 gap-2 flex items-center">
            <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
            Jornada de Exploração
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Tempo no Menu</span>
              </div>
              <span className="text-lg font-bold">{journey.avgTimeOnMenu}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Itens Vistos/Sessão</span>
              </div>
              <span className="text-lg font-bold">{journey.itemsViewedPerSession}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium">Uso de Busca</span>
              </div>
              <span className="text-lg font-bold">12%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Views vs Sales - Spans 4 cols */}
      <Card className="md:col-span-4 border-border shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">Itens Mais Vistos vs Mais Vendidos</h3>
          <p className="text-xs text-muted-foreground mb-4">Discrepâncias indicam problemas de conversão.</p>
          <div className="space-y-3">
            {/* Mock bars */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Picanha</span>
                <span className="font-bold">Alta Conversão</span>
              </div>
              <div className="flex h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 w-[80%]"></div>
                <div className="bg-green-500 w-[75%]"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Lagosta</span>
                <span className="font-bold text-red-500">Baixa Conversão</span>
              </div>
              <div className="flex h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 w-[90%]"></div>
                <div className="bg-green-500 w-[20%]"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Gin Tônica</span>
                <span className="font-bold">Alta Conversão</span>
              </div>
              <div className="flex h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 w-[60%]"></div>
                <div className="bg-green-500 w-[55%]"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Click Paths - Spans 4 cols */}
      <Card className="md:col-span-4 border-border shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">Sequências Comuns</h3>
          <div className="space-y-3">
            {journey.commonPaths.map((path, idx) => (
              <div key={idx} className="p-3 border border-border rounded-lg text-xs">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                  <span className="font-bold text-primary">#{idx + 1}</span>
                  <span>{path.count} ocorrências</span>
                </div>
                <div className="font-medium flex items-center gap-1 flex-wrap">
                  {path.path.split(' -> ').map((step, i, arr) => (
                    <React.Fragment key={i}>
                      <span className="bg-muted px-1.5 py-0.5 rounded">{step}</span>
                      {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
