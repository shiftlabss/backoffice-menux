import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { User, ArrowLeft, Star, ShoppingBag, Clock, TrendingUp, Sparkles, AlertTriangle } from 'lucide-react';
import ModuleLayout from '../../components/layout/ModuleLayout';

const MOCK_DETAIL = {
  id: '1',
  name: 'Fernando Calado',
  email: 'fernando@example.com',
  phone: '+55 11 99999-9999',
  type: 'Cadastrado',
  since: '2024-05-10',
  segment: 'VIP',
  stats: {
    totalSpent: 4500.00,
    avgTicket: 187.50,
    totalOrders: 24,
    frequency: 'Semanal',
    lastVisit: '2025-12-20',
    avgDecisionTime: '3m 20s'
  },
  menuBehavior: {
    topCategories: ['Hambúrgueres', 'Bebidas Artesanais', 'Sobremesas'],
    mostViewed: ['Hambúrguer Duplo', 'Milkshake Chocolate', 'Batata Rústica'],
    mostOrdered: ['Hambúrguer Artesanal', 'Coca-Cola Zero', 'Pudim'],
    abandoned: ['Adicional Bacon', 'Sobremesa Especial']
  },
  history: [
    { id: '#1234', date: '2025-12-20', total: 189.50, status: 'Finalizado', items: 'Hambúrguer Artesanal, Coca-Cola' },
    { id: '#1102', date: '2025-12-12', total: 150.00, status: 'Finalizado', items: 'Pizza Grande' },
    { id: '#0988', date: '2025-12-05', total: 210.00, status: 'Finalizado', items: 'Combos Família' },
  ],
  insights: [
    { type: 'upsell', text: 'Ele sempre pede bebida, mas quase nunca sobremesa.', action: 'Oferecer Pudim promocional' },
    { type: 'churn', text: 'Frequência caiu levemente nas últimas 2 semanas.', action: 'Enviar cupom de saudade' }
  ]
};

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // In real app, fetch customer by ID using useEffect

  const customer = MOCK_DETAIL; // Using mock

  return (
    <ModuleLayout
      title={
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/customers')} className="-ml-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <span>{customer.name}</span>
        </div>
      }
      subtitle={customer.type}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Exportar Histórico</Button>
          <Button size="sm" className="bg-primary text-white">Criar Oferta</Button>
        </div>
      }
    >
      <div className="space-y-6 max-w-7xl mx-auto pb-8">

        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-xs text-gray-500 font-bold uppercase">Total Gasto</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">R$ {customer.stats.totalSpent.toFixed(2)}</h3>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-gray-500 font-bold uppercase">Ticket Médio</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">R$ {customer.stats.avgTicket.toFixed(2)}</h3>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-gray-500 font-bold uppercase">Frequência</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{customer.stats.frequency}</h3>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-gray-500 font-bold uppercase">Decisão Média</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{customer.stats.avgDecisionTime}</h3>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Menu Behavior */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gray-500" /> Comportamento no Cardápio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-gray-600 mb-3 uppercase text-xs">Mais Visualizados</h4>
                  <ul className="space-y-2">
                    {customer.menuBehavior.mostViewed.map((item, i) => (
                      <li key={i} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-800">{item}</span>
                        <span className="text-xs text-gray-400">#{i + 1}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-600 mb-3 uppercase text-xs">Mais Pedidos</h4>
                  <ul className="space-y-2">
                    {customer.menuBehavior.mostOrdered.map((item, i) => (
                      <li key={i} className="flex items-center justify-between text-sm p-2 bg-green-50 rounded-lg">
                        <span className="font-medium text-green-900">{item}</span>
                        <Star className="w-3 h-3 text-green-600" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Order History */}
            <Card className="overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-gray-900">Histórico de Pedidos</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-gray-500 font-medium">
                    <tr>
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Data</th>
                      <th className="px-6 py-3">Itens</th>
                      <th className="px-6 py-3 text-right">Total</th>
                      <th className="px-6 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {customer.history.map((order, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-3 font-medium">{order.id}</td>
                        <td className="px-6 py-3 text-gray-600">{order.date}</td>
                        <td className="px-6 py-3 text-gray-600 truncate max-w-[200px]">{order.items}</td>
                        <td className="px-6 py-3 text-right font-medium">R$ {order.total.toFixed(2)}</td>
                        <td className="px-6 py-3 text-right">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{order.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">

            {/* Maestro Insights */}
            <Card className="bg-purple-900 text-white p-6 relative overflow-hidden border-none shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Sparkles className="w-24 h-24 text-white" />
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" /> Maestro Insights
                </h3>
                <div className="space-y-4">
                  {customer.insights.map((insight, i) => (
                    <div key={i} className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                      <p className="text-sm font-medium opacity-90 mb-3 leading-relaxed">"{insight.text}"</p>
                      <Button size="sm" className="w-full bg-white text-purple-900 hover:bg-gray-100 font-bold border-none h-8 text-xs">
                        {insight.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Profile Summary */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Perfil Provável</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                    <span>Explorador</span>
                    <span>Conservador</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[70%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                    <span>Econômico</span>
                    <span>Premium</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[85%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                    <span>Salgado</span>
                    <span>Doce</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[40%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </Card>

          </div>

        </div>

      </div>
    </ModuleLayout>
  );
}
