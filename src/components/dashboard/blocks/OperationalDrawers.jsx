import React, { useState } from 'react';
import { useAudit } from '../../../hooks/useAudit';
import { Drawer } from '../../ui/Drawer';
import { Button } from '../../ui/Form';
import {
  Clock,
  Users,
  Activity,
  AlertTriangle,
  Utensils,
  ThermometerSnowflake,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../../ui/Badge';
import toast from 'react-hot-toast';

// --- MOCK DATA & COMPONENTS FOR DRAWERS ---

const TableRow = ({ table, time, status, onAction }) => (
  <div className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${status === 'vip' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
        {table}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">Mesa {table} {status === 'vip' && <Badge className="ml-1 bg-purple-100 text-purple-700 border-purple-200 text-[10px] h-4 px-1">VIP</Badge>}</p>
        <p className="text-xs text-gray-500">Aguardando: {time}</p>
      </div>
    </div>
    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={onAction}>
      Liberar
    </Button>
  </div>
);

// 1. WAIT DETAILS DRAWER
export function WaitDetailsDrawer({ isOpen, onClose }) {
  const handleRelease = (table) => {
    toast.success(`Mesa ${table} liberada e notificada!`);
  };

  const footer = (
    <>
      <Button onClick={() => toast('Notificação de atraso enviada para todos', { icon: '📨' })}>Notificar Atraso Geral</Button>
      <Button variant="outline" onClick={onClose}>Fechar</Button>
    </>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Detalhes de Espera"
      footer={footer}
    >
      <div className="flex items-center gap-2 mb-4 text-gray-500">
        <Users className="w-5 h-5" />
        <span className="text-sm">12 grupos aguardando • Tempo médio: 35min</span>
      </div>

      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm text-amber-800 flex gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>Fila acima do normal para Terça-feira (+15%). Considere liberar mesas reservadas não reclamadas em 5min.</span>
        </div>

        <div className="space-y-1">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Próximos da Fila</h4>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <TableRow table="14" time="42 min" status="vip" onAction={() => handleRelease('14')} />
            <TableRow table="03" time="38 min" onAction={() => handleRelease('03')} />
            <TableRow table="09" time="35 min" onAction={() => handleRelease('09')} />
          </div>
        </div>
      </div>
    </Drawer>
  );
}

// 2. PREP DETAILS DRAWER
export function PrepDetailsDrawer({ isOpen, onClose }) {
  const footer = (
    <>
      <Button variant="destructive" onClick={() => toast.success('Alerta enviado para Estação Grelhados')}>Alertar Cozinha</Button>
      <Button variant="outline" onClick={onClose}>Fechar</Button>
    </>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Tempo de Preparo (KDS)"
      footer={footer}
    >
      <div className="flex items-center gap-2 mb-4 text-gray-500">
        <Clock className="w-5 h-5" />
        <span className="text-sm">Média atual: 18min (Meta: 15min)</span>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-center">
            <div className="text-xs text-red-600 font-medium uppercase">Cozinha</div>
            <div className="text-xl font-bold text-red-700">22m</div>
          </div>
          <div className="p-3 bg-green-50 border border-green-100 rounded-lg text-center">
            <div className="text-xs text-green-600 font-medium uppercase">Bar</div>
            <div className="text-xl font-bold text-green-700">8m</div>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-center">
            <div className="text-xs text-blue-600 font-medium uppercase">Sobremesa</div>
            <div className="text-xl font-bold text-blue-700">12m</div>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          A praça de <strong>Grelhados</strong> está impactando a média geral.
        </p>
      </div>
    </Drawer>
  );
}

// 3. SLA DETAILS DRAWER
export function SlaDetailsDrawer({ isOpen, onClose }) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Cumprimento de SLA"
      footer={<Button variant="outline" onClick={onClose}>Fechar</Button>}
    >
      <div className="flex items-center gap-2 mb-4 text-emerald-600">
        <Activity className="w-5 h-5" />
        <span className="text-sm">98% dos pedidos entregues no prazo hoje.</span>
      </div>

      <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200 text-gray-400 text-sm">
        [Gráfico de SLA Hora a Hora]
      </div>
    </Drawer>
  );
}

// --- SUMMARY DRAWER ---

export function BottleneckSummaryDrawer({ isOpen, onClose }) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Resumo de Gargalos"
      footer={<Button variant="outline" onClick={onClose}>Fechar</Button>}
    >
      <div className="flex items-center gap-2 mb-4 text-gray-500">
        <Activity className="w-5 h-5" />
        <span className="text-sm">Histórico e Tendências do Turno</span>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-2">Gargalos resolvidos recentemente</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-xs text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="line-through">Fila no Bar (20 min)</span>
              <span className="text-gray-400 ml-auto">Há 15min</span>
            </li>
            <li className="flex items-center gap-2 text-xs text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="line-through">Atraso na liberação da Mesa 10</span>
              <span className="text-gray-400 ml-auto">Há 45min</span>
            </li>
          </ul>
        </div>

        <div className="p-3 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100">
          <strong>Insight:</strong> A cozinha tem sido o maior gargalo hoje (60% das ocorrências).
        </div>
      </div>
    </Drawer>
  );
}

// --- BOTTLENECK DRAWERS ---

// --- SUBS FOR KITCHEN DRAWER ---

const OrderDetailsDrawer = ({ orderId, isOpen, onClose }) => {
  if (!orderId) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalhes do Pedido #${orderId}`}
      size="sm"
      className="border-l border-gray-100 shadow-2xl"
    >
      <div className="space-y-4">
        <div className="bg-red-50 p-3 rounded-lg border border-red-100 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">Status Crítico</span>
            <p className="text-lg font-bold text-gray-900 mt-1">32 min</p>
            <p className="text-xs text-gray-500">Tempo total de espera</p>
          </div>
          <Badge variant="destructive" className="bg-red-200 text-red-800 border-red-200">Atrasado</Badge>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Itens do Pedido</h4>
          <ul className="space-y-2">
            <li className="flex justify-between text-sm py-2 border-b border-gray-100 last:border-0">
              <span>1x Bife Ancho (Ao Ponto)</span>
              <span className="font-bold text-red-600">32m</span>
            </li>
            <li className="flex justify-between text-sm py-2 border-b border-gray-100 last:border-0 text-gray-400">
              <span>1x Coca-Cola Zero</span>
              <span className="font-medium text-green-600 animate-pulse">Entregue</span>
            </li>
          </ul>
        </div>

        <div className="space-y-2 pt-4">
          <Button className="w-full justify-start gap-2" variant="outline" onClick={() => toast.success(`Pedido #${orderId} priorizado na tela da cozinha!`)}>
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            Priorizar na Cozinha
          </Button>
          <Button className="w-full justify-start gap-2" variant="outline" onClick={() => toast.success(`Pedido #${orderId} transferido para Estação 2`)}>
            <Utensils className="w-4 h-4 text-blue-500" />
            Transferir para Outra Estação
          </Button>
          <Button className="w-full justify-start gap-2" variant="outline" onClick={() => toast('Cliente notificado sobre o atraso', { icon: '💬' })}>
            <Users className="w-4 h-4 text-gray-500" />
            Notificar Cliente
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

const RedistributeConfirmModal = ({ isOpen, onClose, onConfirm, count }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-5 animate-in zoom-in-95 duration-200">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Redistribuir Pedidos?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Você está prestes a redistribuir <strong>{count} pedidos</strong> críticos da Estação Principal para a <strong>Cozinha Auxiliar 2</strong>.
        </p>
        <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg border border-blue-100 mb-4">
          Estação 2 está com 40% de capacidade livre.
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose} size="sm">Cancelar</Button>
          <Button onClick={onConfirm} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            Confirmar Redistribuição
          </Button>
        </div>
      </div>
    </div>
  );
};

const PauseDishesModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-5 animate-in zoom-in-95 duration-200">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Pausar Pratos Críticos</h3>
        <p className="text-sm text-gray-600 mb-4">
          Os seguintes itens serão removidos temporariamente do cardápio digital:
        </p>
        <ul className="space-y-1 mb-4 text-sm font-medium text-gray-800 bg-gray-50 p-2 rounded">
          <li>• Bife Ancho</li>
          <li>• Risoto de Cogumelos</li>
        </ul>
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Tempo de Pausa</label>
          <select className="w-full text-sm border-gray-300 rounded-md shadow-sm p-2 bg-white border">
            <option>30 minutos</option>
            <option>1 hora</option>
            <option>Até normalizar manualmente</option>
          </select>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose} size="sm">Cancelar</Button>
          <Button onClick={onConfirm} size="sm" variant="destructive">
            Confirmar Pausa
          </Button>
        </div>
      </div>
    </div>
  );
};

// 4. KITCHEN OVERLOAD
export function KitchenOverloadDrawer({ isOpen, onClose }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showRedistributeModal, setShowRedistributeModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);

  const { logMutation } = useAudit();

  // Actions
  const handleRedistribute = () => {
    setShowRedistributeModal(false);
    logMutation('dashboard.radar.kitchen.redistribute', { count: 8, target: 'Station 2' });
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Redistribuindo pedidos...',
        success: <b>8 pedidos movidos para Estação 2!</b>,
        error: <b>Erro ao redistribuir.</b>,
      }
    );
  };

  const handlePause = () => {
    setShowPauseModal(false);
    logMutation('dashboard.radar.kitchen.pause', { duration: '30min', items: ['Ancho', 'Risoto'] });
    toast.success("Pratos críticos pausados por 30min", { icon: '⏸️' });
  };

  const footer = (
    <div className="flex flex-col gap-2 w-full sm:flex-row sm:justify-end">
      <Button
        onClick={() => setShowRedistributeModal(true)}
        className="bg-gray-900 text-white hover:bg-black"
      >
        Redistribuir Pedidos
      </Button>
      <Button
        variant="outline"
        className="text-red-600 border-red-200 hover:bg-red-50"
        onClick={() => setShowPauseModal(true)}
      >
        Pausar Pratos Críticos
      </Button>
    </div>
  );

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title="Cozinha Sobrecarregada"
        footer={footer}
      >
        <div className="flex items-center gap-2 mb-4 text-red-600">
          <Utensils className="w-5 h-5" />
          <span className="text-sm">8 pedidos críticos acima de 25min</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            {[
              { id: '1024', mesa: '12', time: '32min', item: 'Bife Ancho' },
              { id: '1029', mesa: '04', time: '28min', item: 'Risoto' },
              { id: '1033', mesa: '08', time: '26min', item: 'Bife Ancho' }
            ].map((order) => (
              <div key={order.id} className="flex justify-between items-center p-3 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors">
                <div>
                  <p className="text-sm font-bold text-gray-900">Pedido #{order.id} - Mesa {order.mesa}</p>
                  <p className="text-xs text-red-600">Tempo: {order.time} • {order.item}</p>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
                  onClick={() => setSelectedOrder(order.id)}
                >
                  Ver
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Drawer>

      {/* Nested Interactions */}
      <OrderDetailsDrawer
        isOpen={!!selectedOrder}
        orderId={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      <RedistributeConfirmModal
        isOpen={showRedistributeModal}
        count={8}
        onClose={() => setShowRedistributeModal(false)}
        onConfirm={handleRedistribute}
      />

      <PauseDishesModal
        isOpen={showPauseModal}
        onClose={() => setShowPauseModal(false)}
        onConfirm={handlePause}
      />
    </>
  );
}

// 5. SLOW DECISION (DECISÃO LENTA)
export function SlowDecisionDrawer({ isOpen, onClose }) {
  const { logMutation } = useAudit();

  const handleApproached = () => {
    logMutation('dashboard.bottleneck.decision_slow.resolve', { action: 'manual_approach' });
    toast.success('Mesas marcadas como abordadas!');
  };

  const handleApplySuggestion = () => {
    logMutation('dashboard.bottleneck.decision_slow.resolve', { action: 'apply_suggestion' });
    toast.success('Sugestão de "Entradas Rápidas" enviada para tablets das mesas.', { icon: '💡' });
  };

  const handleSnooze = () => {
    logMutation('dashboard.bottleneck.decision_slow.snooze');
    toast('Alerta silenciado por 20 min.', { icon: 'zzz' });
  };

  const footer = (
    <div className="flex flex-col gap-2 w-full sm:flex-row sm:justify-end">
      <Button variant="ghost" onClick={handleSnooze}>Silenciar (20m)</Button>
      <Button variant="outline" onClick={handleApproached}>Marcar como Abordado</Button>
      <Button
        className="bg-emerald-600 hover:bg-emerald-700 text-white"
        onClick={handleApplySuggestion}
      >
        Aplicar Sugestão
      </Button>
    </div>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Decisão Lenta no Cardápio"
      footer={footer}
    >
      <div className="flex items-center gap-2 mb-4 text-orange-600">
        <Clock className="w-5 h-5" />
        <span className="text-sm font-semibold">9 mesas sem pedir há &gt; 10 min</span>
      </div>

      <div className="space-y-5">

        {/* IMPACT LIST */}
        <div className="border border-orange-100 rounded-lg overflow-hidden">
          <div className="bg-orange-50 px-3 py-2 text-xs font-bold text-orange-800 uppercase tracking-wide">
            Mesas Impactadas
          </div>
          {[
            { mesa: '05', tempo: '14 min', status: 'Crítico' },
            { mesa: '12', tempo: '12 min', status: 'Atenção' },
            { mesa: '08', tempo: '11 min', status: 'Atenção' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-gray-700">
                  {item.mesa}
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900 block">Mesa {item.mesa}</span>
                  <span className="text-xs text-gray-500">Sem pedido há {item.tempo}</span>
                </div>
              </div>
              <Badge variant={item.status === 'Crítico' ? 'destructive' : 'outline'} className={item.status === 'Crítico' ? '' : 'text-orange-600 border-orange-200 bg-orange-50'}>
                {item.status}
              </Badge>
            </div>
          ))}
          <div className="p-2 text-center text-xs text-gray-400 bg-gray-50">
            + 6 outras mesas entre 8-10 min
          </div>
        </div>

        {/* MAESTRO SUGGESTION */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Utensils size={64} />
          </div>
          <h4 className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
            <Activity size={16} /> Sugestão do Maestro
          </h4>
          <p className="text-sm text-emerald-900 mb-3">
            Destravar pedidos oferecendo <strong>"Mix de Entradas"</strong> com 10% OFF nos tablets destas mesas.
          </p>
          <div className="bg-white/60 p-3 rounded-lg border border-emerald-100/50">
            <p className="text-xs font-bold text-emerald-700 uppercase mb-1">Sugestão de Abordagem:</p>
            <p className="text-sm italic text-emerald-800">
              "Olá! Enquanto escolhem os pratos principais, que tal nossa tábua de entradas que sai super rápido?"
            </p>
          </div>
        </div>

      </div>
    </Drawer>
  );
}

// 6. BAR ICE BREAK
export function BarIceBreakDrawer({ isOpen, onClose }) {
  const { logMutation } = useAudit();

  const handleNotify = () => {
    logMutation('dashboard.radar.bar.notify');
    toast.success('Solicitação de gelo enviada ao Estoque');
  };

  const handlePauseDrinks = () => {
    logMutation('dashboard.radar.bar.pause');
    toast('Drinks com gelo pausados', { icon: 'cocktail' });
  };

  const footer = (
    <Button variant="ghost" onClick={onClose}>Fechar</Button>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Ruptura de Gelo"
      footer={footer}
    >
      <div className="flex items-center gap-2 mb-4 text-blue-600">
        <ThermometerSnowflake className="w-5 h-5" />
        <span className="text-sm">Estoque no Bar Principal crítico.</span>
      </div>

      <div className="space-y-4">
        <div className="p-3 bg-blue-50 text-blue-800 rounded-lg text-sm">
          Recomendação do Maestro: Oferecer drinks "Neat" ou Cervejas até reposição.
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={handleNotify}>
            Notificar Reposição
          </Button>
          <Button variant="outline" onClick={handlePauseDrinks}>
            Pausar Drinks c/ Gelo
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
