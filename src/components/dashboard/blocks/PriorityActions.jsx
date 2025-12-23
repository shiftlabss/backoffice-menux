import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Badge } from '../../ui/Badge';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import toast from 'react-hot-toast';

// New Components
import { OperationCard } from './OperationCard';
import { MarkAllSeenModal } from './MarkAllSeenModal';
import { StockDrawer, ComboDrawer, SlaDrawer, GoalDrawer } from './OperationDrawers';

const INITIAL_ACTIONS = [
    {
        id: 'reporEstoque',
        title: 'Repor Estoque: Coca-Cola',
        impact: 'Risco de Ruptura',
        priority: 'high',
        time: '15min'
    },
    {
        id: 'ativarCombo',
        title: 'Ativar Combo "Happy Hour"',
        impact: '+R$ 800 Potencial',
        priority: 'medium',
        time: '2h'
    },
    {
        id: 'ajustarSLA',
        title: 'Ajustar Tempo de Preparo',
        impact: 'SLA em risco',
        priority: 'high',
        time: '5min'
    },
    {
        id: 'revisarMeta',
        title: 'Revisar Meta do Jantar',
        impact: 'Abaixo do esperado',
        priority: 'medium',
        time: '1h'
    }
];

export default function PriorityActions() {
    const navigate = useNavigate();
    const [actions, setActions] = useState(INITIAL_ACTIONS);
    const [seenAll, setSeenAll] = useState(false);

    // UI State
    const [isMarkSeenModalOpen, setIsMarkSeenModalOpen] = useState(false);
    const [activeDrawer, setActiveDrawer] = useState(null); // { type: 'stock', action: ... }

    // --- LOGIC ---

    const handleActionClick = (action) => {
        // Open appropriate drawer based on ID/Type
        if (action.id === 'reporEstoque') setActiveDrawer({ type: 'stock', action });
        if (action.id === 'ativarCombo') setActiveDrawer({ type: 'combo', action });
        if (action.id === 'ajustarSLA') setActiveDrawer({ type: 'sla', action });
        if (action.id === 'revisarMeta') setActiveDrawer({ type: 'goal', action });
    };

    const handleResolveAction = (actionId) => {
        // Close Drawer
        setActiveDrawer(null);

        // Remove Action with Animation Delay (simulated by React state update)
        setActions(prev => prev.filter(a => a.id !== actionId));

        // Feedback
        toast.success(`Pendência resolvida!`, { icon: '✅' });

        // Log Audit Mock
        console.log(`[AUDIT] Action Resolved: ${actionId}`, { user: 'admin', timestamp: new Date() });
    };

    const handleMarkAllSeen = () => {
        setSeenAll(true);
        setIsMarkSeenModalOpen(false);
        toast.success(`${actions.length} pendências marcadas como vistas`);
        console.log(`[AUDIT] Mark All Seen`, { user: 'admin', count: actions.length });
    };

    // --- RENDER HELPERS ---

    const renderDrawer = () => {
        if (!activeDrawer) return null;

        const props = {
            isOpen: true,
            onClose: () => setActiveDrawer(null),
            onConfirm: () => handleResolveAction(activeDrawer.action.id),
            action: activeDrawer.action
        };

        switch (activeDrawer.type) {
            case 'stock': return <StockDrawer {...props} />;
            case 'combo': return <ComboDrawer {...props} />;
            case 'sla': return <SlaDrawer {...props} />;
            case 'goal': return <GoalDrawer {...props} />;
            default: return null;
        }
    };

    if (actions.length === 0) {
        return (
            <Card className="h-full flex flex-col items-center justify-center p-6 bg-white border-gray-200 shadow-sm text-center gap-3 min-h-[300px]" >
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="font-bold text-slate-900">Tudo certo por aqui!</h3>
                <p className="text-sm text-slate-500">Nenhuma pendência prioritária no momento.</p>
            </Card>
        );
    }

    return (
        <Card className="h-full flex flex-col bg-white border-gray-200 shadow-sm overflow-hidden" >
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                    <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-gray-900" />
                        Ações Prioritárias
                    </h3>
                    <p className="text-xs font-normal text-gray-500 mt-1">
                        {actions.length} pendências requerem atenção
                    </p>
                </div>
                {!seenAll && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 animate-in zoom-in">
                        {actions.length}
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 relative">
                {actions.map((action) => (
                    <OperationCard
                        key={action.id}
                        action={action}
                        onAction={handleActionClick}
                        isSeen={seenAll}
                    />
                ))}
            </div>

            {!seenAll && (
                <div className="p-3 bg-gray-50 border-t border-gray-100 text-center mt-auto">
                    <button
                        onClick={() => setIsMarkSeenModalOpen(true)}
                        className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1 transition-colors w-full p-2 rounded hover:bg-gray-200/50"
                    >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Marcar todas como vistas
                    </button>
                </div>
            )}

            {/* Modals & Drawers */}
            <MarkAllSeenModal
                isOpen={isMarkSeenModalOpen}
                onClose={() => setIsMarkSeenModalOpen(false)}
                onConfirm={handleMarkAllSeen}
            />
            {renderDrawer()}

        </Card >
    );
}
