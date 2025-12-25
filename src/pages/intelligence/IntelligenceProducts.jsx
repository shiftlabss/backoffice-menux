import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { Drawer } from '../../components/ui/Drawer';
import { intelligenceService } from '../../services/dataService';
import { toast } from 'react-hot-toast';
import {
  Package,
  Sparkles,
  TrendingUp,
  Layers,
  Loader2,
  DollarSign,
  ArrowUpRight,
  ArrowRight,
  Utensils,

  Search,
  MoreHorizontal,
  Plus,
  ChevronRight,
  XCircle,
  CheckCircle2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../../lib/utils';
import { MOCK_PRODUCTS, MOCK_KPIS } from '../../services/mockIntelligence';

export default function IntelligenceProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ period: 'today', shift: 'all', channel: 'all' });
  const [searchTerm, setSearchTerm] = useState('');

  // Drawer State
  const [activeDrawer, setActiveDrawer] = useState(null); // 'product-detail' | 'filters' | 'new-combo'
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      const data = await intelligenceService.getProducts();
      setProducts(data || []);
    } catch (err) {
      toast.error("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Mock Combos
  const combos = [
    { name: 'Combo Família Inteligente', items: ['2x Burger', '2x Batata', '1x Refri 2L'], revenue: 'R$ 890,00', ticketVar: '+15%', status: 'Ativo' },
    { name: 'Combo Happy Hour', items: ['Porção Fritas', '2x Chopp'], revenue: 'R$ 1.200,00', ticketVar: '+22%', status: 'Sugerido' },
    { name: 'Trio Universitário', items: ['Pizza Média', 'Refri Lata'], revenue: 'R$ 450,00', ticketVar: '+8%', status: 'Ativo' },
  ];

  // Filtering
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Block 1: Executive KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard title="Receita Atribuída" value={`R$ ${MOCK_KPIS.ai_revenue}`} trend="+12%" icon={DollarSign} color="text-emerald-600" />
        <KPICard title="Produtos Influenciados" value="12" trend="+3" icon={Package} color="text-purple-600" />
        <KPICard title="Lift de Conversão" value="+15%" trend="vs média" icon={TrendingUp} color="text-blue-600" />
        <KPICard title="Ticket Médio (Com IA)" value="R$ 85,50" trend="+18%" icon={ArrowUpRight} color="text-orange-600" />
        <KPICard title="Vendas de Combos" value="450" trend="+5%" icon={Layers} color="text-pink-600" />
        <KPICard title="Margem Média" value="32%" trend="-1%" icon={Utensils} color="text-slate-600" />
      </div>

      {/* Block 3: Combos e Pares (Moved up for visibility or kept down? Layout says "Block 3", but logic often flow better if combos are highlighted. I'll stick to plan: KPIs -> Table -> Combos) */}

      {/* Block 2 (Table) & Block 3 (Combos) Container */}
      <div className="flex flex-col gap-8">

        {/* Products Table (Span 2) */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Performance por Produto</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar produto..."
                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Card className="border-border overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-b border-slate-100 hover:bg-transparent">
                    <TableHead className="w-[30%]">Produto</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-center">Conv.</TableHead>
                    <TableHead className="text-right">Receita</TableHead>
                    <TableHead className="text-right">Lift</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={6} className="h-40 text-center"><Loader2 className="animate-spin w-8 h-8 mx-auto text-purple-600" /></TableCell></TableRow>
                  ) : filteredProducts.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="h-40 text-center text-slate-500">Nenhum produto encontrado.</TableCell></TableRow>
                  ) : (
                    filteredProducts.map((p) => (
                      <TableRow key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 cursor-pointer group" onClick={() => { setSelectedProduct(p); setActiveDrawer('product-detail'); }}>
                        <TableCell className="font-medium text-slate-900">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                              <Utensils size={14} />
                            </div>
                            <div>
                              <div>{p.name}</div>
                              {p.recommendations_count > 0 && (
                                <div className="flex items-center gap-1 text-[10px] text-purple-600 font-medium">
                                  <Sparkles size={10} /> {p.recommendations_count} oportunidades
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-500">{p.category}</TableCell>
                        <TableCell className="text-center font-bold text-slate-700">{p.conversion_rate?.toFixed(1)}%</TableCell>
                        <TableCell className="text-right font-medium text-emerald-600">
                          R$ {p.revenue_attributed?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell className="text-right font-bold text-blue-600 text-xs">+12%</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight size={16} className="text-slate-400" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        {/* Combos & Suggestions (Span 1) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Action Card */}
          <div className="bg-purple-900 rounded-xl p-6 text-white relative overflow-hidden shadow-lg shadow-purple-900/20">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Criar Novo Combo</h3>
              <p className="text-purple-100 text-sm mb-4">Aumente o ticket médio combinando itens com alta afinidade.</p>
              <Button
                className="w-full bg-white text-purple-900 hover:bg-purple-50 hover:text-purple-950 font-bold"
                onClick={() => setActiveDrawer('new-combo')}
              >
                <Plus size={16} className="mr-2" />
                Iniciar Assistente
              </Button>
            </div>
            <Sparkles className="absolute -bottom-4 -right-4 w-32 h-32 text-purple-800 opacity-50" />
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Layers size={18} className="text-slate-500" /> Combos Ativos
            </h3>
            <div className="space-y-4">
              {combos.map((combo, i) => (
                <Card key={i} className="p-4 border border-slate-200 hover:border-purple-200 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-purple-700 transition-colors">{combo.name}</h4>
                    <Badge variant="outline" className={cn("text-[10px]",
                      combo.status === 'Ativo' ? "bg-green-50 text-green-700 border-green-200" : "bg-purple-50 text-purple-700 border-purple-200")}>
                      {combo.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2">{combo.items.join(' + ')}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className="text-xs font-bold text-emerald-600">{combo.revenue}</span>
                    <span className="text-[10px] text-slate-400">{combo.ticketVar} Ticket</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Maestro Suggestions from Upsell */}
      <div className="pt-8 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          Sugestões do Maestro para Produtos e Combos
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="flex flex-col h-full border-t-4 border-purple-600 hover:shadow-lg transition-shadow">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary" className="bg-gray-100 text-gray-600">Combo</Badge>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">Alto Impacto</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Combo de Almoço Executivo</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Seus pratos executivos têm alta saída entre 11h e 14h, mas baixo ticket médio. Crie um combo com bebida e sobremesa "mini" para aumentar o ticket em 25%.
              </p>
              <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <TrendingUp size={18} className="text-green-600" />
                <span className="font-bold text-gray-900">+ R$ 2.400/mês</span>
                <span className="text-xs text-gray-500">projecão</span>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-2">
              <Button className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-red-600 shadow-sm" size="sm">
                <XCircle size={16} className="mr-2" /> Ignorar
              </Button>
              <Button className="flex-1 bg-gray-900 text-white hover:bg-black shadow-sm" size="sm">
                <CheckCircle2 size={16} className="mr-2" /> Aplicar
              </Button>
            </div>
          </Card>

          <Card className="flex flex-col h-full border-t-4 border-red-600 hover:shadow-lg transition-shadow">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary" className="bg-gray-100 text-gray-600">Harmonização</Badge>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">Médio Impacto</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Vinhos para Carnes</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                A "Picanha na Brasa" é seu item mais vendido. Sugira o vinho "Malbec Argentino" automaticamente quando ela for adicionada ao carrinho.
              </p>
              <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <TrendingUp size={18} className="text-green-600" />
                <span className="font-bold text-gray-900">+ R$ 1.800/mês</span>
                <span className="text-xs text-gray-500">projecão</span>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-2">
              <Button className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-red-600 shadow-sm" size="sm">
                <XCircle size={16} className="mr-2" /> Ignorar
              </Button>
              <Button className="flex-1 bg-gray-900 text-white hover:bg-black shadow-sm" size="sm">
                <CheckCircle2 size={16} className="mr-2" /> Aplicar
              </Button>
            </div>
          </Card>

          <Card className="flex flex-col h-full border-t-4 border-green-600 hover:shadow-lg transition-shadow">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary" className="bg-gray-100 text-gray-600">Tamanho</Badge>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">Alto Impacto</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Upsell de Sucos</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                80% dos clientes pedem suco de 300ml. A margem no de 500ml é 40% maior. Ative a sugestão de upgrade por +R$ 4,00.
              </p>
              <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <TrendingUp size={18} className="text-green-600" />
                <span className="font-bold text-gray-900">+ R$ 900/mês</span>
                <span className="text-xs text-gray-500">projecão</span>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-2">
              <Button className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-red-600 shadow-sm" size="sm">
                <XCircle size={16} className="mr-2" /> Ignorar
              </Button>
              <Button className="flex-1 bg-gray-900 text-white hover:bg-black shadow-sm" size="sm">
                <CheckCircle2 size={16} className="mr-2" /> Aplicar
              </Button>
            </div>
          </Card>
        </div>
      </div>



      {/* --- Drawers --- */}

      {/* Product Detail Drawer */}
      <Drawer
        isOpen={activeDrawer === 'product-detail'}
        onClose={() => { setActiveDrawer(null); setSelectedProduct(null); }}
        title={selectedProduct?.name || "Detalhes do Produto"}
        size="md"
      >
        {selectedProduct && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Receita Gerada (IA)</p>
                <p className="text-2xl font-bold text-emerald-600">R$ {selectedProduct.revenue_attributed?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase font-bold">Conversão</p>
                <p className="text-2xl font-bold text-blue-600">{selectedProduct.conversion_rate?.toFixed(1)}%</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-3">Oportunidades Relacionadas</h4>
              <div className="space-y-2">
                <div
                  className="p-3 border rounded-lg hover:bg-slate-50 flex justify-between items-center cursor-pointer active:bg-slate-100 transition-colors"
                  onClick={() => toast.success("Sugestão de Upsell configurada!")}
                >
                  <div className="flex items-center gap-3">
                    <TrendingUp size={16} className="text-blue-500" />
                    <span className="text-sm font-medium text-slate-700">Sugerir como Upsell de Bebida</span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Pendente</Badge>
                </div>
                <div
                  className="p-3 border rounded-lg hover:bg-slate-50 flex justify-between items-center cursor-pointer active:bg-slate-100 transition-colors"
                  onClick={() => toast.success("Combo criado e enviado para aprovação!")}
                >
                  <div className="flex items-center gap-3">
                    <Layers size={16} className="text-purple-500" />
                    <span className="text-sm font-medium text-slate-700">Criar Combo com Batata</span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Alta Afinidade</Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-3">Histórico de Performance</h4>
              <div className="h-48 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { date: 'Seg', sales: 120, conv: 12 },
                      { date: 'Ter', sales: 135, conv: 14 },
                      { date: 'Qua', sales: 110, conv: 11 },
                      { date: 'Qui', sales: 195, conv: 18 },
                      { date: 'Sex', sales: 240, conv: 22 },
                      { date: 'Sáb', sales: 300, conv: 25 },
                      { date: 'Dom', sales: 280, conv: 24 },
                    ]}
                    margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#94a3b8' }}
                      dy={5}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#94a3b8' }}
                    />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                      labelStyle={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stackId="1"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.1}
                      name="Vendas"
                    />
                    <Area
                      type="monotone"
                      dataKey="conv"
                      stackId="2"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.1}
                      name="Conversão"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-20">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={() => { toast.success("Ações aplicadas!"); setActiveDrawer(null); }}>
                Aplicar Otimizações Automáticas
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* New Combo Wizard Mock */}
      <Drawer
        isOpen={activeDrawer === 'new-combo'}
        onClose={() => setActiveDrawer(null)}
        title="Assistente de Combos"
        size="lg"
      >
        <div className="space-y-6">
          <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl">
            <h4 className="font-bold text-purple-900 mb-1">Sugestão da IA</h4>
            <p className="text-sm text-purple-800">Identificamos que <strong>Hamburguer + Milkshake</strong> são vendidos juntos em <strong>35%</strong> dos pedidos de Domingo à noite.</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase">Item Principal</p>
              <div className="p-3 border rounded-lg bg-white font-medium text-slate-800">Hamburguer Artesanal</div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase">Acompanhamento</p>
              <div className="p-3 border rounded-lg bg-white font-medium text-slate-800">Milkshake Chocolate</div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase">Preço do Combo Sugerido</p>
            <div className="flex items-center gap-4">
              <input type="text" value="R$ 42,90" className="p-3 border rounded-lg w-32 font-bold text-slate-900 text-lg" readOnly />
              <span className="text-sm text-green-600 font-medium">Desconto de 12% aplicado</span>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setActiveDrawer(null)}>Cancelar</Button>
            <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={() => { toast.success("Combo criado e enviado para aprovação!"); setActiveDrawer(null); }}>
              Criar Oferta
            </Button>
          </div>
        </div>
      </Drawer>

    </div >
  );
}

// Helper Components
const KPICard = ({ title, value, trend, icon: Icon, color }) => (
  <Card className="p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-2">
      <Icon size={16} className={cn("opacity-80", color)} />
      <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600",
        trend.includes('+') && "bg-green-50 text-green-700",
        trend.includes('-') && "bg-red-50 text-red-700"
      )}>{trend}</span>
    </div>
    <div className="text-2xl font-bold text-slate-900 tracking-tight">{value}</div>
    <p className="text-[10px] text-slate-400 font-medium uppercase mt-1 truncate">{title}</p>
  </Card>
);
