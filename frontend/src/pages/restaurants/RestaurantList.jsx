import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Building2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RestaurantList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for MVP
  const restaurants = [
    { id: 1, name: 'Menux Demo Restaurant', cnpj: '12.345.678/0001-90', plan: 'Premium', status: 'Ativo', health: 98, lastAccess: 'Hoje, 10:42' },
    { id: 2, name: 'Cantina Italiana', cnpj: '98.765.432/0001-10', plan: 'Basic', status: 'Inativo', health: 45, lastAccess: 'Há 5 dias' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Restaurantes</h1>
          <p className="text-gray-500 mt-1">Gerencie as unidades e lojas da rede.</p>
        </div>
        <button
          onClick={() => navigate('/restaurants/new')}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl transition-colors active:scale-95"
        >
          <Plus size={20} />
          <span>Novo Restaurante</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome ou CNPJ..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Restaurante</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plano</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Health Score</th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => navigate(`/restaurants/${restaurant.id}`)}>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{restaurant.name}</p>
                        <p className="text-sm text-gray-500">{restaurant.cnpj}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${restaurant.plan === 'Premium' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-gray-100 text-gray-600'
                      }`}>
                      {restaurant.plan}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${restaurant.status === 'Ativo'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : 'bg-red-50 text-red-700 border-red-100'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${restaurant.status === 'Ativo' ? 'bg-emerald-500' : 'bg-red-500'
                        }`} />
                      {restaurant.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${restaurant.health > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${restaurant.health}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{restaurant.health}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Editar">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
