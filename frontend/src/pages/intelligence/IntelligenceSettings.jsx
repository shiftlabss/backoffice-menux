import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button, Input } from '../../components/ui/Form';
import { Settings, Zap, Bell, Sliders, Loader2, Save } from 'lucide-react';
import { cn } from '../../lib/utils';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

export default function IntelligenceSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    alert_sensitivity: 'Média',
    enabled_recommendations: {
      upsell: true,
      cross_sell: true,
      pricing: false,
      stock: true
    },
    notification_channels: {
      backoffice: true,
      email: true,
      whatsapp: false
    },
    whatsapp_number: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/intelligence/settings');
      // Map backend response if needed, but assuming direct match for MVP
      setFormData(res.data);
    } catch (err) {
      toast.error("Erro ao carregar configurações.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/intelligence/settings', formData);
      toast.success("Configurações salvas com sucesso!");
    } catch (err) {
      toast.error("Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  const toggleRec = (key) => {
    setFormData(prev => ({
      ...prev,
      enabled_recommendations: {
        ...prev.enabled_recommendations,
        [key]: !prev.enabled_recommendations[key]
      }
    }));
  };

  const toggleChannel = (key) => {
    setFormData(prev => ({
      ...prev,
      notification_channels: {
        ...prev.notification_channels,
        [key]: !prev.notification_channels[key]
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-purple-600" /></div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Settings className="w-6 h-6 text-purple-600" />
          Configurações da IA
        </h2>
        <p className="text-sm text-gray-500 mt-1">Ajuste o comportamento e as notificações da Maestro.</p>
      </div>

      {/* Sensitivity */}
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Sliders className="w-5 h-5" /></div>
          <div>
            <h3 className="font-bold text-foreground">Sensibilidade de Alertas</h3>
            <p className="text-sm text-gray-500">Define a frequência e rigidez dos alertas gerados.</p>
          </div>
        </div>

        <div className="flex gap-4 flex-col sm:flex-row">
          {['Baixa', 'Média', 'Alta'].map((level) => (
            <button
              key={level}
              onClick={() => setFormData({ ...formData, alert_sensitivity: level })}
              className={cn(
                "flex-1 py-4 px-4 rounded-xl border-2 text-left transition-all",
                formData.alert_sensitivity === level ? "border-purple-600 bg-purple-50" : "border-border hover:border-purple-200"
              )}
            >
              <p className="font-bold text-foreground capitalize">{level}</p>
              <p className="text-xs text-gray-500 mt-1">
                {level === 'Baixa' ? 'Apenas alertas críticos.' : level === 'Média' ? 'Equilíbrio ideal.' : 'Máximo detalhamento.'}
              </p>
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Enabled Types */}
        <Card className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600"><Zap className="w-5 h-5" /></div>
            <div>
              <h3 className="font-bold text-foreground">Tipos Habilitados</h3>
              <p className="text-sm text-gray-500">Quais recomendações você deseja receber.</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { key: 'upsell', label: 'Upsell' },
              { key: 'cross_sell', label: 'Cross-sell' },
              { key: 'pricing', label: 'Ajuste Dinâmico de Preços' },
              { key: 'stock', label: 'Alertas de Estoque' }
            ].map((item) => (
              <label key={item.key} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.enabled_recommendations[item.key] || false}
                  onChange={() => toggleRec(item.key)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
                />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Bell className="w-5 h-5" /></div>
            <div>
              <h3 className="font-bold text-foreground">Canais de Notificação</h3>
              <p className="text-sm text-gray-500">Onde você quer ser avisado.</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { key: 'backoffice', label: 'Painel Menux (Push)' },
              { key: 'email', label: 'E-mail Diário' },
              { key: 'whatsapp', label: 'WhatsApp (Urgente)' }
            ].map((item) => (
              <div key={item.key}>
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.notification_channels[item.key] || false}
                    onChange={() => toggleChannel(item.key)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
                  />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </label>
                {item.key === 'whatsapp' && formData.notification_channels.whatsapp && (
                  <div className="mt-2 pl-4">
                    <Input
                      label="Número do WhatsApp"
                      placeholder="+55 11 99999-9999"
                      value={formData.whatsapp_number || ''}
                      onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#121212] text-white hover:bg-gray-900 px-8 flex items-center gap-2"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>
    </div>
  );
}
