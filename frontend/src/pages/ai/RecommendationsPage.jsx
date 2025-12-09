import React from 'react';
import { Card } from '../../components/ui/Card';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RecommendationsPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Histórico de Recomendações
          </h1>
          <p className="text-sm text-gray-500">Log completo de sugestões da Menux Intelligence.</p>
        </div>
      </div>

      <Card className="p-12 text-center border-dashed border-2 border-gray-200 bg-gray-50/50">
        <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900">Em Desenvolvimento</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          A visualização detalhada do histórico de IA estará disponível na próxima atualização.
        </p>
      </Card>
    </div>
  );
}
