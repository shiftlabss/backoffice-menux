import React from 'react';
import { Drawer } from '../../ui/Drawer';
import { Button } from '../../ui/Button';
import { CheckSquare } from 'lucide-react';

export function PlaybookDrawer({ isOpen, onClose, alert }) {
  if (!alert) return null;

  // Mock static playbook content based on alert type logic
  // In a real app, this would fetch a specific playbook ID

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Playbook: ${alert.type}`}
      size="md"
    >
      <div className="space-y-6 pb-20">
        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
          <p className="text-sm text-indigo-900 font-medium">
            Este playbook é um guia padronizado para resolver incidentes de <strong>{alert.type}</strong>. Siga os passos abaixo para garantir consistência e segurança na operação.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-slate-900">Procedimento Padrão</h4>
          <div className="space-y-0 divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
            {/* Combined Checklist from alert + standard items */}
            {[...(alert.checklist || []), "Registrar ocorrência no livro de turno", "Verificar se problema persiste após 15 min"].map((step, i) => (
              <label key={i} className="flex items-start gap-3 p-4 bg-white hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm text-slate-700">{step}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg">
          <h5 className="font-bold text-xs text-slate-500 uppercase mb-2">Contatos de Emergência</h5>
          <div className="space-y-2">
            <ContactRow role="Gerente Geral" name="Carlos Silva" phone="(11) 99999-9999" />
            <ContactRow role="Manutenção" name="TecnoService" phone="0800 555 1234" />
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-10">
        <Button className="w-full" onClick={onClose}>Fechar Playbook</Button>
      </div>
    </Drawer>
  );
}

const ContactRow = ({ role, name, phone }) => (
  <div className="flex justify-between text-sm">
    <span className="font-medium text-slate-700">{role}:</span>
    <span className="text-slate-600">{name} - {phone}</span>
  </div>
);
