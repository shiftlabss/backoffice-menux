import React from 'react';
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

// 4. KITCHEN OVERLOAD
export function KitchenOverloadDrawer({ isOpen, onClose }) {
  const footer = (
    <div className="flex flex-col gap-2 w-full sm:flex-row sm:justify-end">
      <Button onClick={() => toast.success('Pedidos redistribuídos para Praça 2')}>
        Redistribuir Pedidos
      </Button>
      <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => toast('Venda de Grelhados Pausada', { icon: '⏸️' })}>
        Pausar Pratos Críticos
      </Button>
    </div>
  );

  return (
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
          <div className="flex justify-between items-center p-3 bg-red-50 border border-red-100 rounded-lg">
            <div>
              <p className="text-sm font-bold text-gray-900">Pedido #1024 - Mesa 12</p>
              <p className="text-xs text-red-600">Tempo: 32min • Bife Ancho</p>
            </div>
            <Button size="sm" variant="secondary" className="bg-white">Ver</Button>
          </div>
          <div className="flex justify-between items-center p-3 bg-red-50 border border-red-100 rounded-lg">
            <div>
              <p className="text-sm font-bold text-gray-900">Pedido #1029 - Mesa 04</p>
              <p className="text-xs text-red-600">Tempo: 28min • Risoto</p>
            </div>
            <Button size="sm" variant="secondary" className="bg-white">Ver</Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

// 5. ENTRANCE WAIT
export function EntranceWaitDrawer({ isOpen, onClose }) {
  const footer = (
    <Button variant="outline" onClick={onClose}>Fechar</Button>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Espera na Entrada"
      footer={footer}
    >
      <div className="flex items-center gap-2 mb-4 text-gray-500">
        <Users className="w-5 h-5" />
        <span className="text-sm">Fila de 12 pessoas acumulada no balcão.</span>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        O tempo estimado subiu para <strong>45min</strong>. Clientes estão sinalizando insatisfação.
      </p>
      <Button className="w-full mb-2" onClick={() => toast.success('SMS de estimativa enviado para fila')}>
        Enviar SMS de Estimativa Atualizada
      </Button>
    </Drawer>
  );
}

// 6. BAR ICE BREAK
export function BarIceBreakDrawer({ isOpen, onClose }) {
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
          <Button variant="outline" onClick={() => toast.success('Solicitação de gelo enviada ao Estoque')}>
            Notificar Reposição
          </Button>
          <Button variant="outline" onClick={() => toast('Drinks com gelo pausados', { icon: 'cocktail' })}>
            Pausar Drinks c/ Gelo
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
