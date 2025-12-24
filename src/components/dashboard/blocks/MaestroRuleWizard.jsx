import React, { useState } from 'react';
import { Drawer } from '../../ui/Drawer';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Input } from '../../ui/Input';
import { useAudit } from '../../../hooks/useAudit';
import toast from 'react-hot-toast';
import {
  Sparkles,
  Zap,
  Target,
  MessageSquare,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  Loader2,
  TrendingUp
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const STEPS = [
  { id: 1, title: 'Objetivo' },
  { id: 2, title: 'Gatilho' },
  { id: 3, title: 'Sugestão' },
  { id: 4, title: 'Preview' },
  { id: 5, title: 'Publicação' }
];

export function MaestroRuleWizard({ isOpen, onClose, contextItem }) {
  const { log } = useAudit();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    goal: 'acceptance', // acceptance | ticket
    triggerId: 'predictive_idle',
    suggestionCopy: 'Que tal adicionar uma bebida?',
    publishNow: true
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handlePublish = () => {
    setLoading(true);
    log('maestro.rule.create.fromAcceptance', {
      itemId: contextItem?.id,
      goal: formData.goal,
      trigger: formData.triggerId
    });

    setTimeout(() => {
      setLoading(false);
      toast.success('Regra criada com sucesso!', {
        icon: '🤖',
        duration: 4000
      });
      onClose();
      // Reset state
      setCurrentStep(1);
    }, 1500);
  };

  if (!contextItem) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Criar Regra Inteligente"
      subtitle="Transforme insights em automações"
      size="lg"
      footer={
        <div className="flex w-full justify-between items-center bg-white">
          {currentStep > 1 && currentStep < 5 ? (
            <Button variant="outline" onClick={prevStep}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          ) : <div />}

          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            {currentStep < 5 ? (
              <Button onClick={nextStep} className="bg-purple-600 hover:bg-purple-700 text-white">
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handlePublish}
                className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[140px]"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publicar Regra'}
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="flex flex-col h-full">

        {/* Context Header */}
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-6 flex items-center gap-4">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">Base desta regra</span>
            <p className="text-sm font-medium text-purple-900 mt-0.5">
              Item: <span className="font-bold">{contextItem.name}</span>
            </p>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-purple-700">
              <span className="flex items-center gap-1"><Zap size={12} /> Gatilho: Ociosidade {'>'} 15min</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Sucesso: 42%</span>
            </div>
          </div>
        </div>

        {/* Stepper Indicator */}
        <div className="flex items-center justify-between mb-8 px-2 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10" />
          {STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center bg-white px-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors",
                currentStep >= step.id
                  ? "bg-purple-600 border-purple-600 text-white"
                  : "bg-white border-slate-200 text-slate-400"
              )}>
                {step.id}
              </div>
              <span className={cn(
                "text-[10px] uppercase font-bold mt-1.5 transition-colors",
                currentStep >= step.id ? "text-purple-600" : "text-slate-300"
              )}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-1">

          {/* STEP 1: OBJETIVO */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">Qual o objetivo desta regra?</h3>

              <div
                className={cn(
                  "p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50",
                  formData.goal === 'acceptance' ? "border-purple-600 bg-purple-50/50" : "border-slate-200"
                )}
                onClick={() => setFormData({ ...formData, goal: 'acceptance' })}
              >
                <div className="flex items-center gap-3">
                  <Target className={cn("w-6 h-6", formData.goal === 'acceptance' ? "text-purple-600" : "text-slate-400")} />
                  <div>
                    <h4 className="font-bold text-slate-900">Otimizar Aceitação</h4>
                    <p className="text-sm text-slate-500">Maximizar a quantidade de vezes que a sugestão é aceita, aproveitando o momento ideal.</p>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50",
                  formData.goal === 'ticket' ? "border-purple-600 bg-purple-50/50" : "border-slate-200"
                )}
                onClick={() => setFormData({ ...formData, goal: 'ticket' })}
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className={cn("w-6 h-6", formData.goal === 'ticket' ? "text-purple-600" : "text-slate-400")} />
                  <div>
                    <h4 className="font-bold text-slate-900">Aumentar Ticket Médio</h4>
                    <p className="text-sm text-slate-500">Focar em oferecer itens complementares de maior valor agregado.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: GATILHO */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">Disparador</h3>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 opacity-60 pointer-events-none">
                <span className="text-xs font-bold text-slate-400 uppercase">Gatilho Selecionado (Automático)</span>
                <div className="flex items-center gap-2 mt-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span className="font-bold text-slate-700">Ociosidade {'>'} 15min</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>
                  Este gatilho foi selecionado automaticamente pois demonstrou <strong>42% de conversão</strong> nos últimos 30 dias para este item.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: SUGESTÃO */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">Personalize a Sugestão</h3>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Texto de Destaque (Copy)
                </label>
                <Input
                  value={formData.suggestionCopy}
                  onChange={(e) => setFormData({ ...formData, suggestionCopy: e.target.value })}
                  className="border-slate-300 focus:border-purple-500"
                />
                <p className="text-xs text-slate-400">Este texto aparecerá acima da imagem do produto no modal.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-lg shrink-0 overflow-hidden">
                    {/* Placeholder Image */}
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-bold bg-slate-100">IMG</div>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">{contextItem.name}</h5>
                    <p className="text-sm text-slate-500 line-clamp-2">Burguer artesanal com blend 180g, queijo prato...</p>
                    <p className="font-bold text-purple-700 mt-1">R$ 35,00</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PREVIEW */}
          {currentStep === 4 && (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Como o cliente vai ver</h3>

              <div className="w-[280px] h-[500px] bg-slate-900 rounded-[32px] border-[6px] border-slate-800 relative flex flex-col overflow-hidden shadow-2xl">
                {/* Mobile Mockup Header */}
                <div className="h-12 bg-slate-800 w-full flex items-center justify-center text-[10px] text-slate-400">
                  12:42
                </div>

                {/* Mobile App Content */}
                <div className="flex-1 bg-white relative">
                  <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center p-4">
                    {/* The Modal */}
                    <div className="bg-white rounded-2xl w-full p-4 shadow-xl animate-in zoom-in-95 duration-300">
                      <div className="text-center mb-3">
                        <h4 className="text-sm font-bold text-slate-900">{formData.suggestionCopy}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Sugestão especial para você</p>
                      </div>

                      <div className="aspect-video bg-amber-100 rounded-lg mb-3 flex items-center justify-center text-amber-900/20 font-bold">
                        FOTO PRODUTO
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-slate-800 text-sm">{contextItem.name}</span>
                        <span className="font-bold text-emerald-600 text-sm">R$ 35,00</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-100 rounded-lg py-2 text-center text-[10px] font-bold text-slate-500">
                          Não, obrigado
                        </div>
                        <div className="bg-emerald-500 rounded-lg py-2 text-center text-[10px] font-bold text-white shadow-emerald-200 shadow-lg">
                          Adicionar (+R$ 35)
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 w-full px-4 space-y-2 opacity-30">
                    <div className="h-12 bg-slate-200 rounded-xl w-full" />
                    <div className="h-12 bg-slate-200 rounded-xl w-full" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PUBLICAÇÃO */}
          {currentStep === 5 && (
            <div className="flex flex-col items-center justify-center text-center py-8 animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-2">
                <Sparkles className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">Tudo pronto!</h3>
                <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                  Sua regra está configurada para maximizar a aceitação de <strong>{contextItem.name}</strong> através do gatilho de ociosidade.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 w-full text-left space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Abrangência</span>
                  <span className="font-bold text-slate-900">Todas as mesas</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Expectativa</span>
                  <span className="font-bold text-emerald-600">+12% conversão</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Status inicial</span>
                  <span className="font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Ativo</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </Drawer>
  );
}
