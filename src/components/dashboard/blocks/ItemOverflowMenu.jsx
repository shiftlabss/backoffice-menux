import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '../../ui/DropdownMenu';
import { Button } from '../../ui/Button';
import { Tooltip, TooltipTrigger, TooltipContent } from '../../ui/Tooltip';
import {
  MoreVertical,
  BarChart3,
  Camera,
  FileText,
  Move,
  DollarSign,
  Tag,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import { useItemActions } from '../../../hooks/useItemActions';

export function ItemOverflowMenu({ itemId, permissions = { canEdit: true, canPricing: true }, itemStatus = {} }) {
  const actions = useItemActions();

  const handleAction = (callback) => (e) => {
    e.stopPropagation();
    callback(itemId);
  };

  const isCombo = itemStatus.isCombo || false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:text-slate-900 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 overflow-hidden border-slate-200 shadow-xl animate-in fade-in zoom-in-95 duration-100">
        <DropdownMenuLabel>Ações do Item</DropdownMenuLabel>

        <DropdownMenuItem className="gap-2" onClick={handleAction(actions.openItemDetail)}>
          <BarChart3 size={14} className="text-slate-400" /> Ver item detale
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2" onClick={handleAction(actions.editPhoto)}>
          <Camera size={14} className="text-slate-400" /> Melhora foto
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2" onClick={handleAction(actions.editDescription)}>
          <FileText size={14} className="text-slate-400" /> Melhorar descrição
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2" onClick={handleAction(actions.editPosition)}>
          <Move size={14} className="text-slate-400" /> Ajustar posição
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {permissions.canPricing ? (
          <DropdownMenuItem className="gap-2 text-emerald-600 font-bold" onClick={handleAction(actions.suggestPrice)}>
            <DollarSign size={14} /> Sugerir ajuste preço
          </DropdownMenuItem>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuItem className="gap-2 opacity-50 cursor-not-allowed" onClick={(e) => e.stopPropagation()}>
                <DollarSign size={14} className="text-slate-400" /> Sugerir ajuste preço
              </DropdownMenuItem>
            </TooltipTrigger>
            <TooltipContent>Módulo de pricing não ativo</TooltipContent>
          </Tooltip>
        )}

        <DropdownMenuItem className="gap-2" onClick={() => actions.createRule('upsell', itemId)}>
          <Tag size={14} className="text-slate-400" /> Criar upsell
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2" onClick={() => actions.createRule('crosssell', itemId)}>
          <Layers size={14} className="text-slate-400" /> Criar cross sell
        </DropdownMenuItem>

        {!isCombo && (
          <DropdownMenuItem className="gap-2" onClick={() => actions.createRule('combo', itemId)}>
            <Sparkles size={14} className="text-slate-400" /> Criar combo
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-700 focus:bg-red-50 font-medium" onClick={handleAction(actions.viewEvidence)}>
          <Info size={14} /> Ver evidência Maestro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
