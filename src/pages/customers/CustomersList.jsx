import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button, Input } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import {
  Users,
  Search,
  Download,
  Plus,
  Filter,
  MoreHorizontal,
  Star,
  ExternalLink,
  Clock,
  ShoppingBag
} from 'lucide-react';
import ModuleLayout from '../../components/layout/ModuleLayout';
import { useNavigate } from 'react-router-dom';

// Mock Data
const MOCK_CUSTOMERS = [
  { id: '1', name: 'Fernando Calado', type: 'Cadastrado', lastOrder: '2025-12-20T10:30:00', lastValue: 189.50, totalSpent: 4500.00, orders: 24, favorite: 'Hambúrguer Artesanal', segment: 'VIP' },
  { id: '2', name: 'Cliente Anônimo #A92F', type: 'Anônimo', lastOrder: '2025-12-19T20:15:00', lastValue: 45.00, totalSpent: 45.00, orders: 1, favorite: 'Coca-Cola', segment: 'Novo' },
  { id: '3', name: 'Mariana Silva', type: 'Cadastrado', lastOrder: '2025-12-18T12:00:00', lastValue: 98.00, totalSpent: 1200.00, orders: 8, favorite: 'Salada Caesar', segment: 'Recorrente' },
  { id: '4', name: 'João Souza', type: 'Cadastrado', lastOrder: '2025-11-30T19:00:00', lastValue: 250.00, totalSpent: 850.00, orders: 4, favorite: 'Pizza Grande', segment: 'Em Risco' },
  { id: '5', name: 'Cliente Anônimo #B11X', type: 'Anônimo', lastOrder: '2025-12-20T11:00:00', lastValue: 12.00, totalSpent: 12.00, orders: 1, favorite: 'Água sem gás', segment: 'Novo' },
];

export default function CustomersList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredCustomers = MOCK_CUSTOMERS.filter(c =>
    (filterType === 'all' || c.type.toLowerCase() === filterType) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.id.includes(search))
  );

  return (
    <ModuleLayout
      title="Clientes"
      subtitle="Raio X e fidelização"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" /> Exportar
          </Button>
          <Button size="sm" className="gap-2 bg-primary hover:bg-primary-hover text-white">
            <Plus className="w-4 h-4" /> Novo Segmento
          </Button>
        </div>
      }
    >
      <div className="space-y-6 max-w-7xl mx-auto pb-8">

        {/* KPIs Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Clientes Únicos (30d)</p>
              <h3 className="text-2xl font-bold text-gray-900">1,248</h3>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Recorrentes</p>
              <h3 className="text-2xl font-bold text-gray-900">32%</h3>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Ticket Médio</p>
              <h3 className="text-2xl font-bold text-gray-900">R$ 89,50</h3>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Tempo Médio Decisão</p>
              <h3 className="text-2xl font-bold text-gray-900">4m 12s</h3>
            </div>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
            <Button
              variant={filterType === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilterType('all')}
              className="rounded-full"
            >
              Todos
            </Button>
            <Button
              variant={filterType === 'cadastrado' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilterType('cadastrado')}
              className="rounded-full"
            >
              Cadastrados
            </Button>
            <Button
              variant={filterType === 'anônimo' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilterType('anônimo')}
              className="rounded-full"
            >
              Anônimos
            </Button>
            <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>
            <Button variant="ghost" size="sm" className="hidden md:flex gap-2 text-gray-500">
              <Filter className="w-4 h-4" /> Mais Filtros
            </Button>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, telefone ou ID..."
              className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </Card>

        {/* Main Table */}
        <Card className="overflow-hidden border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Último Pedido</th>
                  <th className="px-6 py-4">Total Gasto</th>
                  <th className="px-6 py-4">Pedidos</th>
                  <th className="px-6 py-4">Favorito</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    onClick={() => navigate(`/customers/${customer.id}`)}
                    className="hover:bg-gray-50/80 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">{customer.name}</span>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary" className={
                            customer.type === 'Cadastrado'
                              ? "bg-purple-50 text-purple-700 border-purple-100"
                              : "bg-gray-100 text-gray-500 border-gray-200"
                          }>
                            {customer.type}
                          </Badge>
                          {customer.segment === 'VIP' && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-500" /> VIP
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(customer.lastOrder).toLocaleDateString()}
                      <span className="text-xs text-gray-400 block">{new Date(customer.lastOrder).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      R$ {customer.totalSpent.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {customer.orders}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {customer.favorite}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="text-gray-400 group-hover:text-primary">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </ModuleLayout>
  );
}
