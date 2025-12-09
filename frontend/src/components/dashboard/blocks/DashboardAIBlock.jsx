import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Badge } from '../../ui/Badge';
import { Modal } from '../../ui/Modal';
import { Sparkles, TrendingUp, AlertTriangle, Package, DollarSign, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { cn } from '../../../lib/utils';

const RECOMENDACOES_MOCK = [
    { id: 1, type: 'upsell', title: 'Oportunidade de Upsell', desc: 'Sugerir "Bebida Grande" no Combo Família aumenta ticket em 15%.', action: 'Criar combo', actionType: 'create_combo' },
    { id: 2, type: 'anomalia', title: 'Anomalia de Preço', desc: 'Seu "Hamburguer Clássico" está 10% abaixo da média da região.', action: 'Ajustar preço', actionType: 'adjust_price' },
    { id: 3, type: 'estoque', title: 'Alerta de Estoque', desc: 'Tomate atingiu nível crítico. Previsão de esgotar em 4h.', action: 'Alertar compras', actionType: 'alert_stock' },
];

export default function DashboardAIBlock() {
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState(null); // 'create_combo' | 'adjust_price' | 'alert_stock'
    const [processing, setProcessing] = useState(false);
    const [toast, setToast] = useState(null);

    // Helpers
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleAction = (type) => {
        setProcessing(true);
        // Simulate API
        setTimeout(() => {
            setProcessing(false);
            setActiveModal(null);

            if (type === 'create_combo') showToast('Combo criado com sucesso e adicionado ao cardápio.', 'success');
            if (type === 'adjust_price') showToast('Preço atualizado para R$ 32,90.', 'success');
            if (type === 'alert_stock') showToast('Alerta enviado para equipe de compras.', 'success');

        }, 1200);
    };

    return (
        <div className="space-y-4 relative">
            {/* Local Toast */}
            {toast && (
                <div className="absolute top-0 right-0 z-50 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className={cn(
                        "text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2",
                        "bg-primary"
                    )}>
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        {toast.message}
                    </div>
                </div>
            )}

            <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-bold text-foreground">Menux Intelligence</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* 1. Previsão Hoje */}
                <Card className="p-5 flex flex-col justify-between bg-gradient-to-br from-purple-50 to-white border-purple-100">
                    <div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">Previsão Hoje</p>
                        <h3 className="text-3xl font-bold text-foreground">R$ 12.450</h3>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="success" className="bg-green-100 text-green-700 border-green-200">
                                Confiança Alta (92%)
                            </Badge>
                        </div>
                    </div>
                </Card>

                {/* 2. Projeção Final */}
                <Card className="p-5 flex flex-col justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">Projeção Final</p>
                        <h3 className="text-3xl font-bold text-foreground">R$ 14.200</h3>
                        <p className="text-sm text-green-600 flex items-center gap-1 mt-2 font-medium">
                            <TrendingUp className="w-4 h-4" />
                            +14% vs Previsão Inicial
                        </p>
                    </div>
                </Card>

                {/* 3. Insight do Dia */}
                {/* 3. Vendas com IA */}
                <Card className="p-5 flex flex-col justify-between bg-[#121212] text-white border-[#121212]">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <p className="text-sm text-gray-300 font-medium">Vendas com IA</p>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">R$ 3.850</h3>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/20">
                                42 Pedidos
                            </Badge>
                            <span className="text-xs text-green-400 font-bold">+18% hoje</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* 4. Lista de Recomendações */}
            <Card className="p-5 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-foreground">Recomendações em Tempo Real</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-purple-600 hover:text-purple-700"
                        onClick={() => {
                            showToast('Navegando para histórico...', 'info');
                            navigate('/ai/recommendations');
                        }}
                    >
                        Ver histórico completo
                        <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                </div>

                <div className="space-y-3">
                    {RECOMENDACOES_MOCK.map((rec) => (
                        <div key={rec.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-border hover:border-[#121212] transition-colors bg-background/50">
                            <div className="flex items-start gap-3">
                                <div className={`p - 2 rounded - lg shrink - 0 ${rec.type === 'upsell' ? 'bg-green-100 text-green-600' :
                                    rec.type === 'anomalia' ? 'bg-amber-100 text-amber-600' :
                                        'bg-red-100 text-red-600'
                                    } `}>
                                    {rec.type === 'upsell' ? <DollarSign className="w-4 h-4" /> :
                                        rec.type === 'anomalia' ? <TrendingUp className="w-4 h-4" /> :
                                            <AlertTriangle className="w-4 h-4" />}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-foreground">{rec.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">{rec.desc}</p>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                className="shrink-0 text-xs h-8"
                                onClick={() => setActiveModal(rec.actionType)}
                            >
                                {rec.action}
                            </Button>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Modals */}


            <Modal isOpen={activeModal === 'create_combo'} onClose={() => setActiveModal(null)} title="Criar Combo Sugerido">
                <div className="space-y-4">
                    <p className="text-sm text-gray-500">A IA sugere este combo baseado na margem de contribuição e popularidade.</p>
                    <div className="p-4 border border-border rounded-xl bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold">Combo Família + Bebida</span>
                            <span className="text-green-600 font-bold">R$ 49,90</span>
                        </div>
                        <p className="text-xs text-gray-500">Inclui: 2 Hamburgueres, 1 Porção Batata G, 1 Refri 2L.</p>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" onClick={() => setActiveModal(null)}>Cancelar</Button>
                        <Button
                            className="bg-[#121212] text-white min-w-[120px]"
                            disabled={processing}
                            onClick={() => handleAction('create_combo')}
                        >
                            {processing ? 'Processando...' : 'Criar Combo'}
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'adjust_price'} onClose={() => setActiveModal(null)} title="Ajuste de Preço Inteligente">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <div>
                            <p className="text-xs text-amber-800 font-bold uppercase mb-1">Preço Atual</p>
                            <p className="text-xl font-bold text-amber-900 line-through opacity-60">R$ 29,90</p>
                        </div>
                        <ArrowRight className="text-amber-400" />
                        <div className="text-right">
                            <p className="text-xs text-green-700 font-bold uppercase mb-1">Sugerido</p>
                            <p className="text-2xl font-bold text-green-700">R$ 32,90</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 text-center">Este ajuste coloca seu produto na média da região e aumenta a margem em 8%.</p>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" onClick={() => setActiveModal(null)}>Manter Atual</Button>
                        <Button
                            className="bg-[#121212] text-white min-w-[120px]"
                            disabled={processing}
                            onClick={() => handleAction('adjust_price')}
                        >
                            {processing ? 'Atualizando...' : 'Aplicar Novo Preço'}
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'alert_stock'} onClose={() => setActiveModal(null)} title="Alerta de Ruptura">
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                        <div className="bg-white p-2 rounded-lg border border-red-100">
                            <Package className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                            <p className="font-bold text-red-900">Tomate Italiano</p>
                            <p className="text-xs text-red-700">Estoque atual: 2kg (Crítico)</p>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-700">Mensagem para Compras</label>
                        <textarea className="w-full mt-1 p-2 border border-gray-200 rounded-lg text-sm h-20" defaultValue="Estoque de Tomate crítico. Favor repor com urgência até as 18h." />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" onClick={() => setActiveModal(null)}>Cancelar</Button>
                        <Button
                            className="bg-red-600 hover:bg-red-700 text-white min-w-[120px]"
                            disabled={processing}
                            onClick={() => handleAction('alert_stock')}
                        >
                            {processing ? 'Enviando...' : 'Enviar Alerta'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
