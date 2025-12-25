import React, { useState, useEffect } from 'react';
import { useAudit } from '../../../hooks/useAudit';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../../ui/Tooltip';
import { Drawer } from '../../ui/Drawer';
import { Popover, PopoverTrigger, PopoverContent } from '../../ui/Popover';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '../../ui/DropdownMenu';
import { Switch } from '../../ui/Switch';
import { Skeleton } from '../../ui/Skeleton';
import {
    ShoppingBag, TrendingUp, TrendingDown, Eye, ArrowRight, Loader2, ImageOff,
    MousePointer2, ShoppingCart, Receipt, MoreVertical, Star, Edit2,
    Image as ImageIcon, Sparkles, HelpCircle, Target, Info, Zap,
    Search, ArrowUpRight, ArrowDownRight, Layout, Percent, DollarSign,
    Camera, FileText, Move, Tag, Package, BarChart3, Clock, Check, RefreshCcw, AlertTriangle
} from 'lucide-react';
import { cn, formatCurrency } from '../../../lib/utils';
import toast from 'react-hot-toast';
import { OptimizeButton } from './OptimizeButton';
import { ItemOverflowMenu } from './ItemOverflowMenu';
import { MaestroAcceptanceDrawer } from './MaestroAcceptanceDrawer';
import { ClickableMetricCell } from '../ui/ClickableMetricCell';

// --- MOCK DATA ENRICHED ---
const RICH_PRODUCTS_DATA = {
    'Hoje': [
        {
            id: 1,
            name: 'Burger Clássico',
            category: 'Burger Artesanal',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=150&auto=format&fit=crop',
            funnel: { vis: 1240, cliq: 450, carr: 180, ped: 142 },
            funnelPrev: { vis: 1100, cliq: 420, carr: 160, ped: 120 },
            conversion: { current: 11.45, delta: 2.1, trend: 'up', base: 1240 },
            revenue: { current: 4970, trend: '+14%', ticket: 35.00 },
            margin: { percent: 45, level: 'high' },
            status: ['alta_margem', 'em_destaque'],
            maestro: {
                recommendation: 'Aumentar exposição no jantar',
                confidence: 94,
                impact: 'R$ 450',
                acceptance: { rate: 22.4, delta: 3.1, trend: 'up', base: 142, accepted: 32 }
            }
        },
        {
            id: 2,
            name: 'Combo Família G',
            category: 'Combos Especiais',
            image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=150&auto=format&fit=crop',
            funnel: { vis: 890, cliq: 220, carr: 95, ped: 82 },
            funnelPrev: { vis: 950, cliq: 240, carr: 100, ped: 90 },
            conversion: { current: 9.21, delta: -0.8, trend: 'down', base: 890 },
            revenue: { current: 7380, trend: '-2%', ticket: 89.90 },
            margin: { percent: 32, level: 'medium' },
            status: ['em_destaque'],
            maestro: {
                recommendation: 'Revisar descrição e itens inclusos',
                confidence: 88,
                impact: 'R$ 820',
                acceptance: { rate: 18.2, delta: -1.2, trend: 'down', base: 85, accepted: 15 }
            }
        },
        {
            id: 3,
            name: 'Coca-Cola Zero 350ml',
            category: 'Bebidas',
            image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=150&auto=format&fit=crop',
            funnel: { vis: 3200, cliq: 1540, carr: 1200, ped: 1150 },
            funnelPrev: { vis: 3000, cliq: 1400, carr: 1100, ped: 1050 },
            conversion: { current: 35.93, delta: 4.5, trend: 'up', base: 3200 },
            revenue: { current: 9200, trend: '+8%', ticket: 8.00 },
            margin: { percent: 85, level: 'high' },
            status: ['alta_margem'],
            maestro: {
                recommendation: 'Sugerir como cross-sell automático',
                confidence: 97,
                impact: 'R$ 1.1k',
                acceptance: { rate: 45.0, delta: 5.2, trend: 'up', base: 890, accepted: 400 }
            }
        },
        {
            id: 4,
            name: 'Batata Frita Rústica',
            category: 'Entradas',
            image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=150&auto=format&fit=crop',
            funnel: { vis: 1650, cliq: 510, carr: 310, ped: 98 },
            funnelPrev: { vis: 1500, cliq: 480, carr: 290, ped: 90 },
            conversion: { current: 5.94, delta: 0.2, trend: 'up', base: 1650 },
            revenue: { current: 3136, trend: '+5%', ticket: 32.00 },
            margin: { percent: 60, level: 'high' },
            status: ['alta_margem', 'em_promo'],
            maestro: {
                recommendation: 'Melhorar qualidade da foto do item',
                confidence: 75,
                impact: 'R$ 280',
                acceptance: { rate: 12.5, delta: 0.0, trend: 'stable', base: 45, accepted: 5 }
            }
        },
        {
            id: 5,
            name: 'Brownie de Chocolate com Sorvete',
            category: 'Sobremesas',
            image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476d?q=80&w=150&auto=format&fit=crop',
            funnel: { vis: 420, cliq: 80, carr: 30, ped: 15 },
            funnelPrev: { vis: 600, cliq: 120, carr: 50, ped: 25 },
            conversion: { current: 3.57, delta: -2.1, trend: 'down', base: 420 },
            revenue: { current: 450, trend: '-45%', ticket: 30.00 },
            margin: { percent: 25, level: 'low' },
            status: [],
            maestro: {
                recommendation: 'Queda de cliques: Posicionar mais acima',
                confidence: 92,
                impact: 'R$ 350',
                acceptance: null // Testar estado vazio
            }
        }
    ]
};

// --- HELPER COMPONENTS ---

function CompactFunnel({ data, prevData }) {
    const max = data.vis;
    const stages = [
        { label: 'Vis', value: data.vis, prev: prevData?.vis, key: 'vis' },
        { label: 'Cliq', value: data.cliq, prev: prevData?.cliq, key: 'cliq' },
        { label: 'Carr', value: data.carr, prev: prevData?.carr, key: 'carr' },
        { label: 'Ped', value: data.ped, prev: prevData?.ped, key: 'ped' },
    ];

    // Calculate drops
    const drops = [
        { from: 'Vis', to: 'Cliq', drop: ((data.vis - data.cliq) / data.vis * 100).toFixed(0) },
        { from: 'Cliq', to: 'Carr', drop: ((data.cliq - data.carr) / data.cliq * 100).toFixed(0) },
        { from: 'Carr', to: 'Ped', drop: ((data.carr - data.ped) / data.carr * 100).toFixed(0) },
    ];

    const worstDrop = [...drops].sort((a, b) => b.drop - a.drop)[0];

    return (
        <div className="flex flex-col gap-1.5 min-w-[140px]">
            <div className="flex items-end justify-between gap-1 h-8">
                {stages.map((s) => {
                    const height = Math.max((s.value / max) * 100, 5);
                    return (
                        <Tooltip key={s.label}>
                            <TooltipTrigger>
                                <div className="flex flex-col items-center gap-1 group/bar">
                                    <div
                                        className={cn(
                                            "w-4 rounded-t-sm transition-all duration-300",
                                            s.key === 'ped' ? "bg-emerald-500" : "bg-slate-300 group-hover/bar:bg-slate-400"
                                        )}
                                        style={{ height: `${height}%` }}
                                    />
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{s.label}</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-bold text-sm">{s.value.toLocaleString()}</span>
                                    <span className="text-[10px] opacity-70">{s.label === 'Vis' ? 'Visualizações' : s.label === 'Cliq' ? 'Cliques' : s.label === 'Carr' ? 'No Carrinho' : 'Pedidos'}</span>
                                    {s.prev && (
                                        <span className={cn(
                                            "text-[10px] font-bold mt-1",
                                            s.value >= s.prev ? "text-emerald-400" : "text-red-400"
                                        )}>
                                            {s.value >= s.prev ? '▲' : '▼'} {Math.abs(((s.value - s.prev) / s.prev) * 100).toFixed(1)}% vs anterior
                                        </span>
                                    )}
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
            <p className="text-[9px] text-slate-400 font-medium">
                Maior perda: <span className="text-red-500 font-bold">{worstDrop.drop}% no {worstDrop.to}</span>
            </p>
        </div>
    );
}

function ProductInfo({ item }) {
    return (
        <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 shrink-0 shadow-sm">
                {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImageIcon size={20} />
                    </div>
                )}
            </div>
            <div className="flex flex-col min-w-0">
                <h4 className="text-sm font-bold text-slate-900 leading-tight line-clamp-2">{item.name}</h4>
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide mt-0.5">{item.category}</span>
                <div className="flex flex-wrap gap-1 mt-1.5">
                    {item.status.includes('alta_margem') && (
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-emerald-100 bg-emerald-50 text-emerald-700 font-bold">Alta Margem</Badge>
                    )}
                    {item.status.includes('em_destaque') && (
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-amber-100 bg-amber-50 text-amber-700 font-bold">Destaque</Badge>
                    )}
                    {item.status.includes('em_promo') && (
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-blue-100 bg-blue-50 text-blue-700 font-bold">Promoção</Badge>
                    )}
                </div>
            </div>
        </div>
    );
}


// --- DETAIL DRAWER ---

function ItemDetailDrawer({ item, isOpen, onClose }) {
    const { log, logMutation } = useAudit();

    if (!item) return null;

    const handleViewMenu = () => {
        log('dashboard.products.detail.view_menu', { itemId: item.id });
        navigate('/menu/products', { state: { highlightProductId: item.id } });
    };

    const handleSave = () => {
        logMutation('dashboard.products.detail.save', { itemId: item.id });
        toast.success("Alterações salvas no produto");
    };

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            title="Detalhes do Item"
            size="lg"
            footer={
                <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1" onClick={handleViewMenu}>Ver no Cardápio</Button>
                    <Button className="flex-1 bg-slate-900 text-white hover:bg-black" onClick={handleSave}>Salvar Alterações</Button>
                </div>
            }
        >
            <div className="space-y-8 animate-in fade-in duration-300">
                {/* Header Resumo */}
                <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md shrink-0 border border-slate-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                        <Badge variant="outline" className="font-bold text-[10px] uppercase">{item.category}</Badge>
                        <h3 className="text-2xl font-bold text-slate-900 leading-tight">{item.name}</h3>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Receita</span>
                                <span className="text-lg font-bold text-slate-900">{formatCurrency(item.revenue.current)}</span>
                            </div>
                            <div className="w-px h-8 bg-slate-100" />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Conversão</span>
                                <span className="text-lg font-bold text-emerald-600">{item.conversion.current}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Funil Detalhado Section */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <BarChart3 size={18} className="text-slate-400" />
                        Funil de Conversão Detalhado
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { label: 'Visualizações', val: item.funnel.vis, icon: Eye, color: 'bg-blue-50 text-blue-600' },
                            { label: 'Cliques', val: item.funnel.cliq, icon: MousePointer2, color: 'bg-purple-50 text-purple-600' },
                            { label: 'Carrinho', val: item.funnel.carr, icon: ShoppingCart, color: 'bg-amber-50 text-amber-600' },
                            { label: 'Pedidos', val: item.funnel.ped, icon: Receipt, color: 'bg-emerald-50 text-emerald-600' },
                        ].map(stage => (
                            <div key={stage.label} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                                <div className={cn("p-1.5 rounded-lg w-fit", stage.color)}>
                                    <stage.icon size={14} />
                                </div>
                                <p className="text-lg font-extrabold text-slate-900">{stage.val.toLocaleString()}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{stage.label}</p>
                            </div>
                        ))}
                    </div>
                    <div className="h-40 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 text-xs italic">
                        [Gráfico de Série Temporal do Funil]
                    </div>
                </div>

                {/* Segmentos e Problemas */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h5 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Perform melhor em</h5>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-emerald-50/50 rounded-lg text-xs">
                                <span className="font-medium text-slate-700">Turno: Jantar</span>
                                <span className="font-bold text-emerald-600">32% conv.</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-emerald-50/50 rounded-lg text-xs">
                                <span className="font-medium text-slate-700">Canal: Desk</span>
                                <span className="font-bold text-emerald-600">18% conv.</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h5 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Problemas Críticos</h5>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 p-2 bg-red-50/50 rounded-lg text-xs border border-red-100">
                                <AlertTriangle size={14} className="text-red-500" />
                                <span className="font-medium text-red-700">Abandono no Carrinho: 52%</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-amber-50/50 rounded-lg text-xs border border-amber-100">
                                <Clock size={14} className="text-amber-500" />
                                <span className="font-medium text-amber-700">Queda de 8% vs última 24h</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Maestro Recommendations */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Sparkles size={18} className="text-emerald-500" />
                        Otimizações do Maestro
                    </h4>
                    <div className="space-y-3">
                        {[
                            { icon: Zap, title: item.maestro.recommendation, impact: item.maestro.impact, confidence: item.maestro.confidence, time: '2 min' },
                            { icon: Camera, title: 'Atualizar foto para padrão alta resolução', impact: 'R$ 180', confidence: 82, time: '5 min' },
                            { icon: FileText, title: 'Adicionar termos técnicos na descrição', impact: 'R$ 120', confidence: 78, time: '3 min' },
                        ].map((rec, i) => (
                            <div key={i} className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-200 hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex gap-3">
                                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                            <rec.icon size={18} />
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold text-slate-900 underline decoration-slate-200 group-hover:decoration-emerald-200 underline-offset-4">{rec.title}</h5>
                                            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
                                                <span className="flex items-center gap-1 text-emerald-600"><TrendingUp size={12} /> Impacto: {rec.impact}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                <span>Confiança: {rec.confidence}%</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                <span>Tempo: {rec.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button size="sm" className="h-8 bg-slate-900 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">Aplicar</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Drawer>
    );
}

// --- MAIN WRAPPER ---
export default function DashboardProductsBlock({ isLoading: propLoading = false, period: propPeriod = 'Hoje' }) {
    const [period, setPeriod] = useState(propPeriod);
    const [sortBy, setSortBy] = useState('Receita');
    const [showCompare, setShowCompare] = useState(true);
    const [isLoading, setIsLoading] = useState(propLoading);
    const [selectedItem, setSelectedItem] = useState(null);
    const [maestroItem, setMaestroItem] = useState(null); // For Maestro Acceptance Drawer

    useEffect(() => {
        setIsLoading(propLoading);
    }, [propLoading]);

    useEffect(() => {
        setPeriod(propPeriod);
    }, [propPeriod]);
    const navigate = useNavigate();

    const { log } = useAudit();

    const products = RICH_PRODUCTS_DATA[period] || RICH_PRODUCTS_DATA['Hoje'];

    const handlePeriodChange = (val) => {
        setIsLoading(true);
        setPeriod(val);
        log('dashboard.products.filter.period', { value: val });
        setTimeout(() => setIsLoading(false), 800);
    };

    const handleSortChange = (e) => {
        const val = e.target.value;
        setSortBy(val);
        setIsLoading(true);
        log('dashboard.products.filter.sort', { value: val });
        setTimeout(() => setIsLoading(false), 400);
    };

    const handleOpenDetail = (item) => {
        log('dashboard.products.open_detail', { itemId: item.id });
        setSelectedItem(item);
    }

    const handleSummaryClick = (type) => {
        log('dashboard.products.open_summary', { type });
        if (type === 'Destaque') {
            const item = products.find(p => p.id === 3); // Coca-Cola Zero
            if (item) setSelectedItem(item);
        } else if (type === 'Atencao') {
            const item = products.find(p => p.id === 5); // Brownie
            if (item) setSelectedItem(item);
        } else if (type === 'Media Conversao') {
            toast.success("A média de conversão do Top 5 está 12% acima da média geral da loja (16.2%).", {
                icon: '📈',
                duration: 4000
            });
        }
    }

    return (
        <TooltipProvider>
            <div className="flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group/card hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                {/* --- HEADER --- */}
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors group-hover/card:bg-slate-50/30">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                            Top Vendas e Conversão
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircle size={16} className="text-slate-300 hover:text-slate-900 transition-colors cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent side="right" className="max-w-[200px] whitespace-normal">
                                    <p className="font-bold mb-1">Dicionário de Termos:</p>
                                    <ul className="space-y-1 text-[10px]">
                                        <li><strong>Vis:</strong> Vezes que o item apareceu na tela</li>
                                        <li><strong>Cliq:</strong> Vezes que o item foi aberto</li>
                                        <li><strong>Carr:</strong> Adições ao carrinho</li>
                                        <li><strong>Ped:</strong> Pedidos concluídos</li>
                                    </ul>
                                </TooltipContent>
                            </Tooltip>
                        </h3>
                        <p className="text-sm font-medium text-slate-500">
                            Ranking por <span className="text-slate-900 font-bold underline decoration-slate-200">{sortBy}</span> no recorte <span className="text-slate-900 font-bold">{period}</span>
                        </p>
                    </div>

                </div>

                {/* --- SUMMARY STRIP --- */}
                {!isLoading && (
                    <div className="px-6 py-2 bg-slate-50/50 border-b border-slate-100 flex flex-wrap items-center gap-6 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-2 group/sum cursor-pointer" onClick={() => handleSummaryClick('Media Conversao')}>
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                                <Percent size={12} />
                                Média Conv. Top 5:
                            </div>
                            <span className="text-[11px] font-extrabold text-slate-900">18.4%</span>
                        </div>

                        <div className="w-px h-4 bg-slate-200" />

                        <div className="flex items-center gap-2 group/sum cursor-pointer" onClick={() => handleSummaryClick('Destaque')}>
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                                <TrendingUp size={12} className="text-emerald-500" />
                                Destaque:
                            </div>
                            <span className="text-[11px] font-extrabold text-emerald-600 underline underline-offset-2">Cola Zero (+35%)</span>
                        </div>

                        <div className="w-px h-4 bg-slate-200" />

                        <div className="flex items-center gap-2 group/sum cursor-pointer" onClick={() => handleSummaryClick('Atencao')}>
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                                <TrendingDown size={12} className="text-red-500" />
                                Atenção:
                            </div>
                            <span className="text-[11px] font-extrabold text-red-600 underline underline-offset-2">Brownie Chocol. (-22%)</span>
                        </div>
                    </div>
                )}

                {/* --- CONTENT TABLE --- */}
                <div className="flex-1 overflow-x-auto min-h-[400px]">
                    {isLoading ? (
                        <div className="p-6 space-y-4">
                            <Skeleton className="h-10 w-full rounded-xl" />
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="flex gap-4 items-center">
                                    <Skeleton className="w-12 h-12 rounded-lg" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-[40%] rounded" />
                                        <Skeleton className="h-3 w-[20%] rounded" />
                                    </div>
                                    <Skeleton className="w-32 h-10 rounded-lg" />
                                    <Skeleton className="w-24 h-10 rounded-lg" />
                                    <Skeleton className="w-24 h-10 rounded-lg" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/30 border-b border-slate-100">
                                    <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[34%]">Produto e Categoria</th>
                                    <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[22%]">
                                        <div className="flex items-center gap-1.5">
                                            Aceitação Maestro
                                            <Tooltip>
                                                <TooltipTrigger><Sparkles size={12} className="text-emerald-500" /></TooltipTrigger>
                                                <TooltipContent className="max-w-[220px]">
                                                    <p>Taxa de sugestões aceitas pelos clientes.</p>
                                                    <p className="text-[10px] mt-1 opacity-80">Exibidas vs Adicionadas ao pedido</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </th>
                                    <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[22%]">Conversão</th>
                                    <th className="px-4 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[22%]">Receita</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100/50">
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-12">
                                            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50 mx-6">
                                                <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                                                    <Package className="w-8 h-8 text-gray-300" />
                                                </div>
                                                <h4 className="text-base font-semibold text-gray-900">Nenhum produto encontrado</h4>
                                                <p className="text-sm text-gray-500 mt-1 max-w-sm">
                                                    Não encontramos vendas ou dados para o período de <strong>{period}</strong>.
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    className="mt-4 bg-white"
                                                    onClick={() => handlePeriodChange('30 dias')}
                                                >
                                                    Ver histórico de 30 dias
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="group/row hover:bg-slate-50/80 active:bg-slate-100/50 transition-all duration-160 cursor-pointer"
                                            onClick={() => handleOpenDetail(item)}
                                        >
                                            <td className="px-6 py-4">
                                                <ProductInfo item={item} />
                                            </td>

                                            {/* COLUNA ACEITAÇÃO MAESTRO */}
                                            <td className="p-0">
                                                <ClickableMetricCell
                                                    onClick={(e) => { e.stopPropagation(); setMaestroItem(item); log('dashboard.topSales.maestroAcceptance.open', { itemId: item.id }); }}
                                                    tooltip="Ver detalhes de aceitação"
                                                >
                                                    {item.maestro.acceptance ? (
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-base font-extrabold text-slate-900">{item.maestro.acceptance.rate}%</span>
                                                                {showCompare && (
                                                                    <span className={cn(
                                                                        "text-[9px] font-bold",
                                                                        item.maestro.acceptance.trend === 'up' ? "text-emerald-500" : "text-gray-400"
                                                                    )}>
                                                                        {item.maestro.acceptance.trend === 'up' ? '▲' : '▼'} {Math.abs(item.maestro.acceptance.delta)}%
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex flex-col gap-0.5">
                                                                <span className="text-[10px] font-medium text-slate-400 tracking-tight">
                                                                    Base: <span className="font-bold">{item.maestro.acceptance.base} sug.</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-slate-300">—</span>
                                                            <span className="text-[9px] text-slate-400">Sem sugestões</span>
                                                        </div>
                                                    )}
                                                </ClickableMetricCell>
                                            </td>

                                            <td className="p-0">
                                                <ClickableMetricCell
                                                    tooltip="Ver análise de conversão"
                                                    // Note: We might want a specific handler here if "Conversão" opens something different than the main drawer
                                                    // But previous code didn't have a specific onClick for this column (it just bubbled to row click or wasn't specifically clickable distinct from row?)
                                                    // Wait, the prompt says "Conversão -> funil e breakdown".
                                                    // The previous code had NO specific onClick on this TD, so it bubbled to `tr.onClick` which opens `handleOpenDetail(item)`.
                                                    // So, hitting this cell opens the main drawer which HAS the funnel.
                                                    // SO we keep that behavior but now explicit.
                                                    onClick={(e) => { e.stopPropagation(); handleOpenDetail(item); }}
                                                >
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-base font-extrabold text-slate-900">{item.conversion.current}%</span>
                                                            {showCompare && (
                                                                <Badge variant="outline" className={cn(
                                                                    "text-[9px] px-1.5 py-0 border-0 font-bold",
                                                                    item.conversion.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                                                                )}>
                                                                    {item.conversion.trend === 'up' ? '▲' : '▼'} {item.conversion.delta}%
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <span className="text-[10px] font-medium text-slate-400 tracking-tight">
                                                            Base: <span className="font-bold">{item.conversion.base} sessões</span>
                                                        </span>
                                                    </div>
                                                </ClickableMetricCell>
                                            </td>

                                            <td className="p-0 text-right md:text-left">
                                                <ClickableMetricCell
                                                    tooltip="Ver composição da receita"
                                                    onClick={(e) => { e.stopPropagation(); handleOpenDetail(item); }}
                                                >
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-base font-extrabold text-slate-900">{formatCurrency(item.revenue.current)}</span>
                                                            {showCompare && (
                                                                <span className={cn(
                                                                    "text-[10px] font-bold",
                                                                    item.revenue.trend.startsWith('+') ? "text-emerald-500" : "text-red-500"
                                                                )}>
                                                                    {item.revenue.trend}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-[10px] font-medium text-slate-400 tracking-tight">
                                                            Ticket Médio: <span className="font-bold">{formatCurrency(item.revenue.ticket)}</span>
                                                        </span>
                                                    </div>
                                                </ClickableMetricCell>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* --- FOOTER CTA --- */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center transition-colors group-hover/card:bg-slate-100/50">
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest pl-2">
                        Mostrando 5 de 124 itens • Última atualização 10:43
                    </p>
                </div>

                {/* DRAWER DRILLDOWN */}
                <ItemDetailDrawer
                    item={selectedItem}
                    isOpen={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                />

                {/* DRAWER MAESTRO ACCEPTANCE */}
                <MaestroAcceptanceDrawer
                    item={maestroItem}
                    isOpen={!!maestroItem}
                    onClose={() => setMaestroItem(null)}
                />
            </div>
        </TooltipProvider>
    );
}
