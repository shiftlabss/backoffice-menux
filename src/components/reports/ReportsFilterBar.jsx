import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button, Select } from '../../components/ui/Form';
import { Calendar, Filter, Download, Share2 } from 'lucide-react';

export default function ReportsFilterBar() {
  return (
    <Card className="p-4 mb-6 sticky top-0 z-20 shadow-sm border-b border-gray-100 rounded-xl">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        {/* Visual Filters */}
        <div className="flex flex-wrap gap-2 items-center flex-1">
          <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
            <Calendar size={16} className="text-gray-500 ml-2" />
            <Select className="border-none bg-transparent text-sm h-8 w-32 focus:ring-0">
              <option>Hoje</option>
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
              <option>Este Mês</option>
            </Select>
          </div>

          <div className="h-6 w-px bg-gray-200 hidden lg:block"></div>

          <div className="flex gap-2">
            <Select className="h-9 text-sm w-32">
              <option value="all">Turno: Todos</option>
              <option value="lunch">Almoço</option>
              <option value="dinner">Jantar</option>
            </Select>
            <Select className="h-9 text-sm w-36">
              <option value="all">Canal: Todos</option>
              <option value="table">Mesa</option>
              <option value="pickup">Balcão</option>
            </Select>
          </div>

          <Button variant="ghost" size="sm" className="text-gray-500 ml-auto lg:ml-0">
            <Filter size={16} className="mr-2" /> Mais Filtros
          </Button>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-gray-600">
            <Share2 size={16} className="mr-2" /> Compartilhar
          </Button>
          <Button size="sm" className="bg-gray-900 text-white">
            <Download size={16} className="mr-2" /> Exportar
          </Button>
        </div>
      </div>
    </Card>
  );
}
