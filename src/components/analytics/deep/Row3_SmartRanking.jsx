import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../ui/Table';
import { Badge } from '../../ui/Badge';
import { DEEP_ANALYTICS_DATA } from '../../../services/mockAnalyticsDeep';
import { AlertTriangle, TrendingUp, Lightbulb } from 'lucide-react';

export default function Row3_SmartRanking() {
  const { smartRanking, highInterestLowConv, highConvLowExposure } = DEEP_ANALYTICS_DATA;

  const StatusBadge = ({ status }) => {
    const colors = {
      'Estrela': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Alta Conv.': 'bg-green-100 text-green-800 border-green-200',
      'Atenção': 'bg-red-100 text-red-800 border-red-200',
      'Oportunidade': 'bg-blue-100 text-blue-800 border-blue-200',
      'Normal': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ${colors[status] || colors['Normal']}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">


      {/* AI Insights Column - Spans 12 cols */}
      <div className="md:col-span-12 grid md:grid-cols-2 gap-6">
        {/* High Interest / Low Conversion */}
        <Card className="border-border shadow-sm border-l-4 border-l-red-400">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-900">Alto Interesse, Baixa Conversão</h4>
                <p className="text-xs text-red-700 mt-1">Visitados mas não comprados.</p>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              {highInterestLowConv.map((item, i) => (
                <div key={i} className="text-xs border-b last:border-0 border-dashed border-red-200 pb-2 last:pb-0">
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>{item.name}</span>
                    <span>{item.conversion}% Conv.</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-red-600 mt-1">
                    <Lightbulb className="w-3 h-3" />
                    <span>{item.suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* High Conversion / Low Exposure */}
        <Card className="border-border shadow-sm border-l-4 border-l-green-400">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-green-900">Alta Conversão, Baixa Exposição</h4>
                <p className="text-xs text-green-700 mt-1">Potencial escondido no menu.</p>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              {highConvLowExposure.map((item, i) => (
                <div key={i} className="text-xs border-b last:border-0 border-dashed border-green-200 pb-2 last:pb-0">
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>{item.name}</span>
                    <span>{item.conversion}% Conv.</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-green-600 mt-1">
                    <Lightbulb className="w-3 h-3" />
                    <span>{item.suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
