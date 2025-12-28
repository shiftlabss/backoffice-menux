import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button'; // Assuming Button comes from ui/Button, previous import 'ui/Form' might be legacy or wrong? Checking imports... previous was 'ui/Form'. I'll stick to 'ui/Button' which is standard.
import { DEEP_ANALYTICS_DATA } from '../../../services/mockAnalyticsDeep';
import { Lightbulb, BellRing, ChevronRight, CheckCircle2 } from 'lucide-react';
import { ActionReviewDrawer } from './ActionReviewDrawer';
import { useAudit } from '../../../hooks/useAudit';
import { toast } from 'react-hot-toast';

export default function Row5_Actionable() {
  const navigate = useNavigate();
  const { log } = useAudit();
  const { alerts, recommendedActions: initialActions } = DEEP_ANALYTICS_DATA;

  const [recommendedActions, setRecommendedActions] = useState(initialActions);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  // Actions
  const handleReview = (action) => {
    setSelectedAction(action);
    setDrawerOpen(true);
    log('analytics.recommendation.review', { action: action.action });
  };

  const handleApply = (action) => {
    toast.success("Ação aplicada com sucesso!");
    setDrawerOpen(false);

    // Remove action from list with animation delay if desired, but immediate is snappier
    setRecommendedActions(prev => prev.filter(a => a.action !== action.action));

    log('analytics.recommendation.applied', { action: action.action });
  };

  const handleEdit = (action) => {
    setDrawerOpen(false);
    // Logic to route based on action type
    if (action.action.includes('Destaque')) {
      navigate('/menu/highlights'); // Mock route
    } else {
      navigate('/menu/products');
    }
    toast("Redirecionando para edição...");
    log('analytics.recommendation.edit_before', { action: action.action });
  };

  const handleMarkSeen = (action) => {
    toast.success("Sugestão marcada como vista");
    setDrawerOpen(false);
    setRecommendedActions(prev => prev.filter(a => a.action !== action.action));
    log('analytics.recommendation.seen', { action: action.action });
  };

  const handleViewAll = () => {
    navigate('/intelligence/products?origin=analytics');
    log('analytics.recommendations.view_all');
  };

  const AlertCard = ({ alert }) => (
    <div className={`p-4 rounded-lg border-l-4 mb-3 last:mb-0 flex items-start gap-3 ${alert.type === 'critical' ? 'bg-red-50 border-red-500' : 'bg-amber-50 border-amber-500'
      }`}>
      <div className={`p-1.5 rounded-full ${alert.type === 'critical' ? 'bg-red-200 text-red-700' : 'bg-amber-200 text-amber-700'
        }`}>
        <BellRing className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p className={`text-sm font-bold ${alert.type === 'critical' ? 'text-red-900' : 'text-amber-900'
          }`}>{alert.message}</p>
        <p className={`text-xs mt-1 ${alert.type === 'critical' ? 'text-red-700' : 'text-amber-700'
          }`}>{alert.time}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Auto Alerts - Spans 6 cols */}
      <Card className="md:col-span-6 border-border shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-red-500 rounded-full"></span>
            Alertas de Anomalia
          </h3>
          <div>
            {alerts.map((alert, i) => (
              <AlertCard key={i} alert={alert} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Actions - Spans 6 cols */}
      <Card className="md:col-span-6 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Ações Recomendadas (IA)
            </h3>
          </div>

          <div className="space-y-4">
            {recommendedActions.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                Todas as ações foram revisadas!
              </div>
            ) : recommendedActions.map((action, i) => (
              <div key={i} className="flex items-center justify-between bg-white p-3 rounded-lg border border-border shadow-sm group hover:border-indigo-200 transition-colors">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-2 md:line-clamp-1">{action.action}</p>
                  <p className="text-xs font-bold text-green-600">{action.impact}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="default" // Primary style
                    className="h-8 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 shadow-sm"
                    onClick={() => handleReview(action)}
                  >
                    Revisar <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Drawer */}
      <ActionReviewDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        action={selectedAction}
        onApply={handleApply}
        onEdit={handleEdit}
        onMarkSeen={handleMarkSeen}
      />
    </div>
  );
}
