import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { DEEP_ANALYTICS_DATA } from '../../../services/mockAnalyticsDeep';
import { Lightbulb, BellRing, ChevronRight, ArrowRight } from 'lucide-react';

export default function Row5_Actionable() {
  const { alerts, recommendedActions } = DEEP_ANALYTICS_DATA;

  const AlertCard = ({ alert }) => (
    <div className={`p-4 rounded-lg border-l-4 mb-3 last:mb-0 flex items-start gap-3 ${alert.type === 'critical' ? 'bg-red-50 border-red-500' : 'bg-amber-50 border-amber-500'
      }`}>
      <div className={`p-1.5 rounded-full ${alert.type === 'critical' ? 'bg-red-200 text-red-700' : 'bg-amber-200 text-amber-700'
        }`}>
        <BellRing className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p className={`text-sm font-bold ${alert.type === 'critical' ? 'text-red-900' : 'text-amber-900'
          }`}>{alert.message}</p>
        <p className={`text-xs mt-1 ${alert.type === 'critical' ? 'text-red-700' : 'text-amber-700'
          }`}>{alert.time}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Auto Alerts - Spans 6 cols */}
      <Card className="md:col-span-6 border-border shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-red-500 rounded-full"></span>
            Alertas de Anomalia
          </h3>
          <div>
            {alerts.map((alert, i) => (
              <AlertCard key={i} alert={alert} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Actions - Spans 6 cols */}
      <Card className="md:col-span-6 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Ações Recomendadas (IA)
          </h3>
          <div className="space-y-4">
            {recommendedActions.map((action, i) => (
              <div key={i} className="flex items-center justify-between bg-white p-3 rounded-lg border border-border shadow-sm">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-900">{action.action}</p>
                  <p className="text-xs font-bold text-green-600">{action.impact}</p>
                </div>
                <Button size="sm" variant="outline" className="h-8">
                  Aplicar <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="link" size="sm" className="text-primary text-xs">
              Ver todas as sugestões <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
