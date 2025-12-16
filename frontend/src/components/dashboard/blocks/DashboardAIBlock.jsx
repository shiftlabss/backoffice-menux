import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Badge } from '../../ui/Badge';
import { Modal } from '../../ui/Modal';
import { Sparkles, TrendingUp, AlertTriangle, Package, DollarSign, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { cn } from '../../../lib/utils';
import toast from 'react-hot-toast';

const RECOMENDACOES_MOCK = [
    { id: 1, type: 'upsell', title: 'Oportunidade de Upsell', desc: 'Sugerir "Bebida Grande" no Combo Família aumenta ticket em 15%.', action: 'Criar combo', actionType: 'create_combo' },
    { id: 2, type: 'anomalia', title: 'Anomalia de Preço', desc: 'Seu "Hamburguer Clássico" está 10% abaixo da média da região.', action: 'Ajustar preço', actionType: 'adjust_price' },
    { id: 3, type: 'estoque', title: 'Alerta de Estoque', desc: 'Tomate atingiu nível crítico. Previsão de esgotar em 4h.', action: 'Alertar compras', actionType: 'alert_stock' },
];

export default function DashboardAIBlock() {
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState(null); // 'alert_stock' only
    const [processing, setProcessing] = useState(false);

    const handleAction = (type) => {
        if (type === 'create_combo') {
            navigate('/menu/upsell');
            toast.success('Redirecionando para criação de Combo com sugestão aplicada...');
        } else if (type === 'adjust_price') {
            navigate('/menu');
            toast.success('Filtrando produto para ajuste de preço...');
        } else if (type === 'alert_stock') {
            setActiveModal('alert_stock');
        }
    };

    const handleStockAlert = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setActiveModal(null);
            toast.success('Alerta enviado para equipe de compras.', { icon: '📦' });
        }, 1200);
    };

    return (
        <div className="space-y-4 relative">
            <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-bold text-foreground">Maestro</h2>
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

                {/* 3. Vendas com IA */}
                <Card className="p-5 flex flex-col justify-between bg-[#121212] text-white border-[#121212]">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <p className="text-sm text-gray-300 font-medium">Vendas com Maestro</p>
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
                            toast('Navegando para histórico...', { icon: '📜' });
                            navigate('/intelligence/recommendations');
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
                                <div className={`p-2 rounded-lg shrink-0 ${rec.type === 'upsell' ? 'bg-green-100 text-green-600' :
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
                                onClick={() => handleAction(rec.actionType)}
                            >
                                {rec.action}
                            </Button>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Modals */}
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
                            onClick={handleStockAlert}
                        >
                            {processing ? 'Enviando...' : 'Enviar Alerta'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
