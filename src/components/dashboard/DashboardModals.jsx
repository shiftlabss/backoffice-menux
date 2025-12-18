
import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input, Button, Label } from '../ui/Form';
import { CheckCircle, AlertTriangle, TrendingUp, DollarSign, Package, Tag, ArrowRight } from 'lucide-react';

// ==========================================
// 1. Create Combo Modal
// ==========================================
export function CreateComboModal({ isOpen, onClose, onShowToast }) {
    const [name, setName] = useState("Combo Hambúrguer + Batata");
    const [price, setPrice] = useState("12.00");

    const handleSubmit = () => {
        onClose();
        if (onShowToast) onShowToast(`Combo "${name}" criado com sucesso!`, 'success');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Criar Combo Promocional">
            <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg flex items-start gap-3">
                    <Tag className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-yellow-800">IA Insight</p>
                        <p className="text-xs text-yellow-700">Clientes que compram "Hambúrguer Gourmet" levam "Batata Rústica" em 68% das vezes.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Produto Principal" value="Hambúrguer Gourmet" disabled />
                    <Input label="Produto Adicional" value="Batata Rústica" disabled />
                </div>

                <Input
                    label="Nome do Combo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Preço Adicional (R$)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="space-y-1.5">
                        <Label>Sugestão IA</Label>
                        <div className="flex bg-gray-50 border border-border rounded-xl h-12 items-center px-4 text-sm text-green-600 font-bold">
                            + R$ 12,00
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Criar e Ativar Combo
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

// ==========================================
// 2. Stock Check Modal
// ==========================================
export function StockCheckModal({ isOpen, onClose, onShowToast }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Análise de Estoque">
            <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 border border-red-100 bg-red-50 rounded-xl">
                    <div className="p-3 bg-red-100 rounded-full text-red-600">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-red-900">Anomalia Detectada</h4>
                        <p className="text-sm text-red-700">Queda de 40% nas vendas de "Sucos Naturais".</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-gray-50 rounded-xl border border-border">
                        <p className="text-xs text-muted-foreground uppercase font-bold">Estoque Atual</p>
                        <p className="text-2xl font-bold text-foreground mt-1">12 un.</p>
                        <p className="text-xs text-red-500 font-bold mt-1">Crítico</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-border">
                        <p className="text-xs text-muted-foreground uppercase font-bold">Média Diária</p>
                        <p className="text-2xl font-bold text-foreground mt-1">45 un.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-border">
                        <p className="text-xs text-muted-foreground uppercase font-bold">Última Compra</p>
                        <p className="text-2xl font-bold text-foreground mt-1">3d</p>
                    </div>
                </div>

                <div className="bg-background p-4 rounded-xl border border-border space-y-2">
                    <p className="text-sm font-bold text-foreground">Diagnóstico IA</p>
                    <p className="text-sm text-muted-foreground">O estoque baixo está causando ruptura intermitente. O produto está indisponível no cardápio digital em horários de pico.</p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-end gap-3">
                    <Button variant="secondary" onClick={onClose} className="w-full sm:w-auto">Fechar</Button>
                    <Button
                        onClick={() => { onClose(); if (onShowToast) onShowToast("Solicitação de compra enviada!", "success"); }}
                        className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                    >
                        <Package className="w-4 h-4 mr-2" />
                        Solicitar Reposição Urgente
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

// ==========================================
// 3. Price Adjust Modal
// ==========================================
export function PriceAdjustModal({ isOpen, onClose, onShowToast }) {
    const [price, setPrice] = useState("14.50");

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Otimização de Preço">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-lg font-bold text-foreground">Chopp Artesanal 300ml</h4>
                        <p className="text-sm text-muted-foreground">Categoria: Bebidas</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">Margem Atual</p>
                        <p className="text-lg font-bold text-green-600">45%</p>
                    </div>
                </div>

                <div className="bg-green-50 border border-green-100 p-4 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-green-800 font-bold text-sm">
                        <TrendingUp className="w-4 h-4" /> Projeção de Impacto
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-green-700">Receita Extra/Dia</p>
                            <p className="text-lg font-bold text-green-900">+ R$ 145,00</p>
                        </div>
                        <div>
                            <p className="text-xs text-green-700">Conversão</p>
                            <p className="text-lg font-bold text-green-900">Estável</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 items-end">
                    <div className="space-y-1.5 opacity-60">
                        <Label>Preço Atual</Label>
                        <div className="text-xl font-bold text-foreground px-4 py-2 border border-border rounded-xl bg-gray-50 flex items-center">R$ 13,00</div>
                    </div>
                    <div className="space-y-1.5">
                        <Label>Novo Preço Sugerido</Label>
                        <Input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="font-bold text-lg text-blue-600 border-blue-200 bg-blue-50"
                        />
                    </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                    <Button variant="secondary" onClick={onClose}>Manter</Button>
                    <Button
                        onClick={() => { onClose(); if (onShowToast) onShowToast("Preço atualizado com sucesso!", "success"); }}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Confirmar Ajuste
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

// ==========================================
// 4. Impact Detail Modal (Insight do Dia)
// ==========================================
export function ImpactDetailModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Insight Detalhado: Vendas & Clima" className="max-w-2xl">
            <div className="space-y-6">
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                    <p className="text-indigo-900 font-medium leading-relaxed">
                        "Terça-feira chuvosa costuma aumentar vendas de <strong>Vinho Tinto</strong> em 40%. O estoque está 15% abaixo do ideal."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h4 className="text-sm font-bold text-foreground uppercase">Histórico em Dias Chuvosos</h4>
                        <div className="bg-white border border-border rounded-xl p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Vinho Tinto</span>
                                <span className="text-sm font-bold text-green-600">+42%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-green-500 w-[80%] h-full rounded-full"></div>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm text-muted-foreground">Sopas & Caldos</span>
                                <span className="text-sm font-bold text-green-600">+28%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-green-500 w-[60%] h-full rounded-full"></div>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm text-muted-foreground">Saladas</span>
                                <span className="text-sm font-bold text-red-600">-15%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-red-500 w-[30%] h-full rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-bold text-foreground uppercase">Ações Recomendadas</h4>
                        <div className="space-y-3">
                            <button className="w-full p-3 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-left transition-colors flex items-center justify-between group">
                                <span className="text-sm font-bold text-indigo-900">Aplicar Desconto em Vinhos (10%)</span>
                                <ArrowRight className="w-4 h-4 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button className="w-full p-3 rounded-xl border border-border hover:bg-gray-50 text-left transition-colors flex items-center justify-between group">
                                <span className="text-sm font-medium text-foreground">Notificar Clientes VIP (WhatsApp)</span>
                                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button onClick={onClose}>Entendi</Button>
                </div>
            </div>
        </Modal>
    );
}

export default function DashboardModals({
    activeModal,
    onClose,
    onShowToast
}) {
    // Determine which modal to show
    return (
        <>
            <CreateComboModal
                isOpen={activeModal === 'create-combo'}
                onClose={onClose}
                onShowToast={onShowToast}
            />
            <StockCheckModal
                isOpen={activeModal === 'stock-check'}
                onClose={onClose}
                onShowToast={onShowToast}
            />
            <PriceAdjustModal
                isOpen={activeModal === 'price-adjust'}
                onClose={onClose}
                onShowToast={onShowToast}
            />
            <ImpactDetailModal
                isOpen={activeModal === 'impact-detail'}
                onClose={onClose}
            />
        </>
    );
}
