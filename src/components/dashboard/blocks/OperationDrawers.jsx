import React from 'react';
import { Drawer } from '../../ui/Drawer';
import { Button } from '../../ui/Form';
import { Badge } from '../../ui/Badge';

export function StockDrawer({ isOpen, onClose, onConfirm, action }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Repor Estoque: Coca-Cola" size="md">
      <div className="space-y-6 pt-4">
        <div className="p-4 bg-red-50 rounded-lg border border-red-100 flex gap-4 items-center">
          <div className="text-3xl font-bold text-red-600">3un</div>
          <div>
            <div className="font-bold text-red-900">Estoque Crítico</div>
            <div className="text-xs text-red-700">Previsão de ruptura em 20 min</div>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-slate-900">Ações Recomendadas</h4>
          <Button className="w-full justify-start" variant="outline" onClick={onConfirm}>
            Notificar Bar (Prioridade Alta)
          </Button>
          <Button className="w-full justify-start" variant="outline" onClick={onConfirm}>
            Criar Ordem de Compra Expressa
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export function ComboDrawer({ isOpen, onClose, onConfirm, action }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Ativar Combo 'Happy Hour'" size="md">
      <div className="space-y-6 pt-4">
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 flex gap-4 items-center">
          <div className="text-3xl font-bold text-amber-600">+R$ 800</div>
          <div>
            <div className="font-bold text-amber-900">Potencial de Ganho</div>
            <div className="text-xs text-amber-700">Com base no fluxo atual de clientes</div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-slate-600">Este combo inclui 2 Chopps + 1 Porção de Fritas com 15% off.</p>
          <Button className="w-full bg-slate-900 text-white hover:bg-black" onClick={onConfirm}>
            Ativar Agora
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export function SlaDrawer({ isOpen, onClose, onConfirm, action }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Ajustar Tempo de Preparo" size="md">
      <div className="space-y-6 pt-4">
        <p className="text-sm text-slate-600">
          A cozinha está operando com média de <strong>25 min</strong> por prato, acima do SLA de 15 min.
        </p>
        <div className="space-y-2">
          <Button className="w-full" variant="outline" onClick={onConfirm}>
            Ajustar SLA para 25min (Temporário)
          </Button>
          <Button className="w-full" variant="outline" onClick={onConfirm}>
            Solicitar Reforço de Equipe
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export function GoalDrawer({ isOpen, onClose, onConfirm, action }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Revisar Meta do Jantar" size="md">
      <div className="space-y-6 pt-4">
        <p className="text-sm text-slate-600">
          A meta atual de <strong>R$ 15k</strong> está longe de ser atingida (Proj: R$ 10k).
        </p>
        <div className="space-y-2">
          <Button className="w-full" variant="outline" onClick={onConfirm}>
            Reduzir Meta para R$ 12k
          </Button>
          <Button className="w-full" variant="outline" onClick={onConfirm}>
            Manter e Criar Incentivo
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
