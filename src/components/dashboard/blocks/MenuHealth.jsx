import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Activity, ImageOff, Tag, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function MenuHealth() {
  const healthScore = 85;
  const navigate = useNavigate();

  const handleResolve = (type) => {
    navigate('/menu');
    toast(`Filtrando produtos com problemas: ${type}`, { icon: '🔍' });
  }

  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" />
            Saúde do Cardápio
          </h3>
          <p className="text-xs text-gray-500 mt-1">Qualidade do cadastro afeta a conversão.</p>
        </div>
        <div className="text-center">
          <div className="radial-progress text-blue-600 text-xs font-bold relative w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-100 bg-blue-50 transition-all hover:scale-105 cursor-pointer" onClick={() => handleResolve('Geral')}>
            {healthScore}
          </div>
        </div>
      </div>

      <div className="space-y-3 flex-1">
        <div
          onClick={() => handleResolve('Sem Foto')}
          className="flex justify-between items-center p-2 rounded-lg bg-red-50 text-red-800 border border-red-100 hover:bg-red-100 transition-colors cursor-pointer active:scale-95"
        >
          <div className="flex items-center gap-2 text-sm">
            <ImageOff size={14} />
            <span className="font-medium">Itens sem foto</span>
          </div>
          <span className="font-bold bg-white px-2 rounded-md shadow-sm text-xs">12</span>
        </div>

        <div
          onClick={() => handleResolve('Descrição Curta')}
          className="flex justify-between items-center p-2 rounded-lg bg-orange-50 text-orange-800 border border-orange-100 hover:bg-orange-100 transition-colors cursor-pointer active:scale-95"
        >
          <div className="flex items-center gap-2 text-sm">
            <FileText size={14} />
            <span className="font-medium">Descrição curta</span>
          </div>
          <span className="font-bold bg-white px-2 rounded-md shadow-sm text-xs">8</span>
        </div>

        <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50 text-gray-600 border border-gray-100">
          <div className="flex items-center gap-2 text-sm">
            <Tag size={14} />
            <span className="font-medium">Sem tags</span>
          </div>
          <CheckCircle2 size={14} className="text-green-500" />
        </div>
      </div>

      <Button
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white h-9 text-xs"
        onClick={() => handleResolve('Geral')}
      >
        Resolver Pendências
      </Button>
    </Card>
  );
}
