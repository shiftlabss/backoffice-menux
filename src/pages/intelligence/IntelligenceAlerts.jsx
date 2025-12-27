import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Loader2, Armchair, ChefHat } from 'lucide-react';
import { cn } from '../../lib/utils';
import { generateMockAlerts } from '../../services/alertMockData';

// New Components


import { AlertKanbanBoard } from '../../components/intelligence/alerts/AlertKanbanBoard'; // Using Kanban
import { AlertAnalysisDrawer } from '../../components/intelligence/alerts/AlertAnalysisDrawer';
import { PlaybookDrawer } from '../../components/intelligence/alerts/PlaybookDrawer';

// Reuse existing Operational View Cards (or recreate simplified versions if needed)
import { Card } from '../../components/ui/Card';

export default function IntelligenceAlerts() {
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);

  // State for Filters
  const [filters, setFilters] = useState({
    period: 'now',
    shift: 'all',
    area: 'all',
    severity: 'all',
    status: 'open', // Default to open alerts
    search: ''
  });

  // Drawer State
  const [activeDrawer, setActiveDrawer] = useState(null); // 'analyze' | 'playbook'
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Initial Fetch
  useEffect(() => {
    fetchData();
  }, [filters]); // Re-fetch/Re-filter when filters change

  const fetchData = async () => {
    setLoading(true);
    // Simulate Request
    await new Promise(r => setTimeout(r, 600));

    // Get Mock Data
    const allAlerts = generateMockAlerts();

    // Apply Client-Side Filtering (Mocking Server Filter)
    const filtered = allAlerts.filter(alert => {
      // 1. Status Filter
      if (filters.status !== 'all') {
        const statusMap = { 'open': 'Aberto', 'in_progress': 'Em andamento', 'resolved': 'Resolvido' };
        if (alert.status !== statusMap[filters.status]) return false;
      }

      // 2. Severity Filter
      if (filters.severity !== 'all') {
        const sevMap = { 'critical': 'Crítica', 'high': 'Alta', 'medium': 'Média', 'low': 'Baixa' };
        if (alert.severity !== sevMap[filters.severity]) return false;
      }

      // 3. Area Filter
      if (filters.area !== 'all') {
        // Loose match or map
        if (filters.area === 'kitchen' && alert.area !== 'Cozinha') return false;
        if (filters.area === 'hall' && alert.area !== 'Salão') return false;
        if (filters.area === 'bar' && alert.area !== 'Bar') return false;
        if (filters.area === 'stock' && alert.area !== 'Estoque') return false;
      }

      // 4. Search
      if (filters.search) {
        const term = filters.search.toLowerCase();
        return alert.title.toLowerCase().includes(term) ||
          alert.description.toLowerCase().includes(term) ||
          alert.type.toLowerCase().includes(term);
      }

      return true;
    });

    setAlerts(filtered);
    setLoading(false);
  };

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({ period: 'now', shift: 'all', area: 'all', severity: 'all', status: 'open', search: '' });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  // Actions
  const handleAnalyze = (alert) => {
    setSelectedAlert(alert);
    setActiveDrawer('analyze');
  };

  const handlePlaybook = (alert) => {
    setSelectedAlert(alert);
    setActiveDrawer('playbook');
  };

  const handleResolve = (alert) => {
    toast.success("Ação automatizada iniciada...");
    // Optimistic update
    setAlerts(prev => prev.filter(a => a.id !== alert.id));
  };

  const handleSnooze = (alert) => {
    toast("Alerta silenciado por 2 horas.");
    setAlerts(prev => prev.filter(a => a.id !== alert.id));
  };

  // Summary Metrics
  const criticalCount = alerts.filter(a => a.severity === 'Crítica').length;
  const summaryData = {
    criticalCount,
    bottleneck: { label: 'Grelha de Carnes', value: '+18 min', status: 'critical' }, // Mock dynamic
    riskTables: alerts.filter(a => a.type.includes('Mesas')).length,
    stockRisks: alerts.filter(a => a.type.includes('Estoque')).length
  };

  return (
    <div className="space-y-8 pb-20">

      {/* 1. Filters */}


      {/* 2. Operational Summary */}


      {/* 3. Helper Text if Empty */}
      {!loading && alerts.length === 0 && (
        <div className="p-10 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">Nenhum alerta encontrado com os filtros atuais.</p>
          <Button variant="link" onClick={() => handleFilterChange('reset', null)}>Limpar filtros</Button>
        </div>
      )}

      {/* 4. Kanban Board (Replaces Blocks) */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-96 bg-slate-100 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <AlertKanbanBoard
          alerts={alerts}
          onAnalyze={handleAnalyze}
          onPlaybook={handlePlaybook}
          onResolve={handleResolve}
          onSnooze={handleSnooze}
        />
      )}

      {/* 5. Operational Views (Map & Queues) - Kept simplified at bottom as context */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-200">
        {/* Simple Map Placeholder */}
        <Card className="p-6 border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Armchair size={18} className="text-slate-500" /> Mapa de Risco
          </h3>
          {/* Mini Map Visual */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className={cn(
                "w-8 h-8 rounded flex items-center justify-center text-xs font-bold border",
                i === 11 ? "bg-red-100 border-red-200 text-red-700 animate-pulse" : // Matching mock alert mesa 12
                  i % 4 === 0 ? "bg-purple-50 border-purple-100 text-purple-700" :
                    "bg-slate-50 border-slate-100 text-slate-300"
              )}>
                {i + 1}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">Mesa 12 está em estado crítico de atenção.</p>
        </Card>

        {/* Simple Queue Placeholder */}
        <Card className="p-6 border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ChefHat size={18} className="text-slate-500" /> Fila de Produção
          </h3>
          <div className="space-y-3">
            <QueueRow label="Grelha" count={12} color="red" />
            <QueueRow label="Salada" count={5} color="orange" />
            <QueueRow label="Bar" count={2} color="green" />
          </div>
        </Card>
      </div>


      {/* Drawers */}
      <AlertAnalysisDrawer
        isOpen={activeDrawer === 'analyze'}
        onClose={() => setActiveDrawer(null)}
        alert={selectedAlert}
        onResolve={handleResolve}
        onPlaybook={handlePlaybook}
      />

      <PlaybookDrawer
        isOpen={activeDrawer === 'playbook'}
        onClose={() => setActiveDrawer(null)}
        alert={selectedAlert}
      />

    </div>
  );
}

const QueueRow = ({ label, count, color }) => {
  const colorClass = color === 'red' ? 'text-red-600' : color === 'orange' ? 'text-orange-600' : 'text-emerald-600';
  return (
    <div className="flex justify-between items-center bg-slate-50 p-2 rounded text-sm">
      <span className="text-slate-700 font-medium">{label}</span>
      <span className={cn("font-bold", colorClass)}>{count} pedidos</span>
    </div>
  )
}
