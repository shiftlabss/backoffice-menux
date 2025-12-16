import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button, Input, Select } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { ArrowRight, Check, Sparkles, Smartphone } from 'lucide-react';

export default function UpsellWizard({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    triggerType: 'item', // item, category, tag
    triggerValue: '',
    offerType: 'upsell', // upsell, cross_sell
    offerItem: '',
    priceRule: 'fixed', // fixed, percentage, override
    priceValue: '',
    message: ''
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const steps = [
    { id: 1, title: 'Definir Gatilho' },
    { id: 2, title: 'Configurar Oferta' },
    { id: 3, title: 'Mensagem e Preview' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Criar Nova Regra" maxWidth="max-w-4xl">
      <div className="flex flex-col h-[600px]">
        {/* Stepper */}
        <div className="flex justify-between items-center mb-8 px-12">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                {step > s.id ? <Check size={16} /> : s.id}
              </div>
              <span className={`text-xs mt-2 font-medium ${step >= s.id ? 'text-purple-600' : 'text-gray-400'
                }`}>{s.title}</span>
            </div>
          ))}
          {/* Progress Bar background would go here ideally */}
        </div>

        <div className="flex-1 overflow-y-auto px-4">

          {/* Step 1: Trigger */}
          {step === 1 && (
            <div className="space-y-6 max-w-lg mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Regra</label>
                <Input placeholder="Ex: Batata Grande Upsell" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quando o cliente adicionar...</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {['item', 'category', 'tag'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, triggerType: type })}
                      className={`p-3 text-sm font-medium border rounded-xl transition-all ${formData.triggerType === type
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                    >
                      {type === 'item' ? 'Item Específico' : type === 'category' ? 'Uma Categoria' : 'Uma Tag'}
                    </button>
                  ))}
                </div>
                <Select>
                  <option>Selecione...</option>
                  <option>Batata Frita P</option>
                  <option>Hambúrguer Clássico</option>
                </Select>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Condições Opcionais</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded text-purple-600" />
                    Apenas em dias específicos
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded text-purple-600" />
                    Apenas em horários específicos (Happy Hour)
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Offer */}
          {step === 2 && (
            <div className="space-y-6 max-w-lg mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Oferta</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormData({ ...formData, offerType: 'upsell' })}
                    className={`p-4 border rounded-xl text-left transition-all ${formData.offerType === 'upsell' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'}`}
                  >
                    <strong className="block text-gray-900">Upsell</strong>
                    <span className="text-xs text-gray-500">Upgrade do mesmo item (Ex: P para G)</span>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, offerType: 'cross_sell' })}
                    className={`p-4 border rounded-xl text-left transition-all ${formData.offerType === 'cross_sell' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'}`}
                  >
                    <strong className="block text-gray-900">Cross-sell</strong>
                    <span className="text-xs text-gray-500">Oferecer item complementar</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item a sugerir</label>
                <Select>
                  <option>Selecione o item...</option>
                  <option>Batata Frita G</option>
                  <option>Coca-Cola</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Regra de Preço</label>
                <div className="flex gap-4">
                  <Select className="w-1/3" value={formData.priceRule} onChange={e => setFormData({ ...formData, priceRule: e.target.value })}>
                    <option value="fixed">Adicionar Valor (+ R$)</option>
                    <option value="percentage">Adicionar %</option>
                    <option value="override">Preço Fixo (Por R$)</option>
                  </Select>
                  <Input placeholder="0,00" value={formData.priceValue} onChange={e => setFormData({ ...formData, priceValue: e.target.value })} className="flex-1" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Message & Preview */}
          {step === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
              {/* Form Side */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título da Sugestão</label>
                  <Input
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ex: Que tal aumentar sua batata?"
                  />
                  <p className="text-xs text-gray-500 mt-1">Seja curto e persuasivo.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo / Gatilho Mental</label>
                  <Input placeholder="Ex: Por apenas + R$ 2,00" />
                </div>

                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex items-start gap-3">
                  <Sparkles className="text-yellow-600 mt-1 shrink-0" size={18} />
                  <div>
                    <h5 className="font-bold text-yellow-800 text-sm">Dica do Maestro</h5>
                    <p className="text-xs text-yellow-700 mt-1">Frases com perguntas ("Que tal...?") aumentam a conversão em 12%.</p>
                  </div>
                </div>
              </div>

              {/* Preview Side */}
              <div className="bg-gray-900 rounded-3xl p-6 relative border-4 border-gray-800 shadow-2xl flex items-center justify-center">
                <div className="absolute top-0 w-32 h-6 bg-black rounded-b-xl left-1/2 -translate-x-1/2"></div>

                {/* Phone Screen Mockup */}
                <div className="w-full max-w-xs bg-white h-[400px] rounded-xl overflow-hidden relative shadow-inner flex flex-col">
                  {/* App Header */}
                  <div className="bg-gray-100 h-12 w-full mb-4"></div>

                  {/* App Content Background */}
                  <div className="flex-1 bg-gray-50 p-4 relative">

                    {/* The Popup */}
                    <div className="absolute inset-x-4 bottom-4 bg-white rounded-xl shadow-lg border border-gray-100 p-4 animate-in slide-in-from-bottom-10 fade-in duration-700">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0"></div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{formData.message || "Título da sugestão"}</h4>
                          <p className="text-xs text-gray-500 mt-1">Batata Frita G</p>
                          <p className="text-sm font-bold text-green-600 mt-1">+ R$ {formData.priceValue || '2,00'}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <button className="py-2 text-xs font-bold text-gray-500 bg-gray-100 rounded-lg">Não, obrigado</button>
                        <button className="py-2 text-xs font-bold text-white bg-purple-600 rounded-lg">Adicionar</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-6 flex justify-between mt-auto">
          {step > 1 ? (
            <Button variant="ghost" onClick={prevStep}>Voltar</Button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <Button onClick={nextStep} className="bg-gray-900 text-white flex items-center gap-2">
              Próximo <ArrowRight size={16} />
            </Button>
          ) : (
            <Button onClick={onClose} className="bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200">
              Salvar Regra
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
