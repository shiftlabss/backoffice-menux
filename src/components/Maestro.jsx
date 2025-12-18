import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMenux } from '../context/MenuxContext';
import {
    Send, Bot, X, Zap, Loader2, Sparkles,
    LayoutDashboard, UtensilsCrossed, TrendingUp,
    History, ChevronRight, Lightbulb, ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Maestro() {
    const { role, isIAPanelOpen, toggleIAPanel } = useMenux();
    const location = useLocation();
    const navigate = useNavigate();

    // State
    const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'actions' | 'history'
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            content: 'Olá! Sou seu assistente executivo. Estou analisando os dados do restaurante em tempo real. Como posso ajudar a decidir melhor hoje?',
            timestamp: new Date().toISOString()
        }
    ]);

    const messagesEndRef = useRef(null);

    // Scroll to bottom on new message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (activeTab === 'chat') {
            scrollToBottom();
        }
    }, [messages, isTyping, activeTab]);

    // Contextual Prompts Configuration
    const getContextualActions = () => {
        const path = location.pathname;

        if (path.includes('/menu')) {
            return {
                theme: 'Cardápio & Engenharia',
                color: 'text-orange-500',
                bg: 'bg-orange-50',
                actions: [
                    { id: 'm1', label: 'Listar pratos com baixa conversão', prompt: 'Quais pratos estão tendo muita visualização mas poucos pedidos?' },
                    { id: 'm2', label: 'Sugestão de descrições vendedoras', prompt: 'Analise as descrições dos pratos principais e sugira melhorias persuasivas.' },
                    { id: 'm3', label: 'Oportunidades de combo', prompt: 'Com base nos pedidos recentes, quais itens poderiam formar um combo vencedor?' }
                ]
            };
        }

        if (path.includes('/orders') || path.includes('/sales')) {
            return {
                theme: 'Vendas & Operação',
                color: 'text-green-500',
                bg: 'bg-green-50',
                actions: [
                    { id: 'v1', label: 'Análise de ticket médio hoje', prompt: 'Como está meu ticket médio hoje comparado com a semana passada?' },
                    { id: 'v2', label: 'Previsão de movimento', prompt: 'Qual a previsão de movimento para as próximas 2 horas?' },
                    { id: 'v3', label: 'Itens para upsell agora', prompt: 'O que a equipe deve oferecer agora para aumentar o faturamento?' }
                ]
            };
        }

        if (path.includes('/intelligence') || path.includes('/settings')) {
            return {
                theme: 'Estratégia & IA',
                color: 'text-purple-500',
                bg: 'bg-purple-50',
                actions: [
                    { id: 'i1', label: 'Impacto da IA nas vendas', prompt: 'Quanto a IA influenciou no faturamento deste mês?' },
                    { id: 'i2', label: 'Dúvidas frequentes na mesa', prompt: 'Quais são as perguntas que os clientes mais fazem para a IA?' },
                    { id: 'i3', label: 'Otimizar configurações', prompt: 'Sugira ajustes nas configurações da IA para ser mais agressiva nas vendas.' }
                ]
            };
        }

        // Default / Dashboard
        return {
            theme: 'Visão Geral Executiva',
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            actions: [
                { id: 'g1', label: 'Resumo do dia até agora', prompt: 'Me dê um resumo executivo da performance do restaurante hoje.' },
                { id: 'g2', label: 'Ações prioritárias', prompt: 'O que eu deveria focar agora para melhorar o resultado do dia?' },
                { id: 'g3', label: 'Comparativo semanal', prompt: 'Como estamos em relação à mesma semana do mês passado?' }
            ]
        };
    };

    const currentContext = getContextualActions();

    // AI Response Logic (Backend Connection)
    const generateResponse = async (text) => {
        try {
            // Check context
            const contextTheme = currentContext.theme;

            const response = await fetch('/api/intelligence/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure auth
                },
                body: JSON.stringify({
                    message: text,
                    context: contextTheme
                })
            });

            if (!response.ok) {
                throw new Error('Erro na comunicação com a IA');
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error("AI Error:", error);
            return {
                text: 'Desculpe, estou com dificuldade de acessar o servidor de inteligência agora. Tente novamente em alguns instantes.',
                text2: 'Verifique sua conexão ou contate o suporte.'
            };
        }
    };

    const sendMessage = async (text, fromAction = false) => {
        if (!text.trim()) return;

        // If switching from another tab, go to chat
        if (activeTab !== 'chat') setActiveTab('chat');

        const userMsg = { id: Date.now(), type: 'user', content: text, fromAction };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Realistic typing delay + Backend Call
        try {
            // Minumum delay for UX
            const [response] = await Promise.all([
                generateResponse(text),
                new Promise(resolve => setTimeout(resolve, 1000))
            ]);

            const aiMsg = {
                id: Date.now() + 1,
                type: 'ai',
                ...response,
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (err) {
            console.error(err);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        sendMessage(input);
    };

    // Render Components
    if (!isIAPanelOpen) {
        return (
            <button
                onClick={toggleIAPanel}
                className="fixed bottom-6 right-6 h-14 w-14 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-full shadow-xl shadow-primary/20 flex items-center justify-center hover:scale-105 transition-all z-50 animate-in fade-in zoom-in duration-300 group"
            >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20 group-hover:opacity-40" />
                <Bot className="h-7 w-7" />
                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-green-500 border-2 border-white rounded-full"></span>
            </button>
        );
    }

    return (
        <div className="w-[400px] border-l border-border/60 bg-surface/95 backdrop-blur-xl flex flex-col h-screen fixed right-0 top-0 z-50 shadow-2xl transition-transform duration-300 animate-in slide-in-from-right">

            {/* 1. Header Reformulado */}
            <div className="px-5 py-4 border-b border-border/60 bg-surface/50 shrink-0">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-900/10">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <span className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="font-bold text-base text-gray-900 leading-tight">Maestro</h3>
                            <p className="text-xs font-medium text-purple-600">Assistente Executivo</p>
                        </div>
                    </div>
                    <button onClick={toggleIAPanel} className="text-gray-400 hover:text-gray-900 p-2 hover:bg-gray-100/80 rounded-full transition-all">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Microtexto de Apoio */}
                <p className="text-xs text-gray-500 leading-relaxed px-1">
                    Eu ajudo você a entender seu cardápio, suas vendas e o impacto da IA neste restaurante.
                </p>

                {/* Tabs Navigation */}
                <div className="flex p-1 bg-gray-100/80 rounded-lg mt-4 w-full">
                    {[
                        { id: 'chat', label: 'Chat', icon: Bot },
                        { id: 'actions', label: 'Ações', icon: Zap },
                        { id: 'history', label: 'Playbooks', icon: History },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all",
                                activeTab === tab.id
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                            )}
                        >
                            <tab.icon className="h-3.5 w-3.5" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50/50 scroll-smooth relative">

                {/* TAB: CHAT */}
                {activeTab === 'chat' && (
                    <div className="p-4 space-y-5 min-h-full">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
                                    msg.type === 'user' ? "justify-end" : "justify-start"
                                )}
                            >
                                <div className={cn(
                                    "max-w-[90%] rounded-2xl px-4 py-3.5 text-sm shadow-sm",
                                    msg.type === 'user'
                                        ? "bg-gray-900 text-white rounded-br-none"
                                        : "bg-white border border-gray-100 text-gray-700 rounded-bl-none"
                                )}>
                                    {/* Sender Label */}
                                    {msg.type === 'ai' && (
                                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100 text-xs font-semibold text-purple-600 uppercase tracking-wider">
                                            <Bot className="h-3 w-3" />
                                            Maestro
                                        </div>
                                    )}

                                    <div className="leading-relaxed space-y-3">
                                        <p>{msg.text || msg.content}</p>

                                        {/* Rich Content: Bullets */}
                                        {msg.bullets && (
                                            <ul className="space-y-2 mt-2">
                                                {msg.bullets.map((bullet, i) => (
                                                    <li key={i} className="flex gap-2 text-xs bg-gray-50 p-2 rounded-lg border border-gray-100">
                                                        <span className="text-purple-500 shrink-0">•</span>
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Rich Content: Cards */}
                                        {msg.cards && (
                                            <div className="grid grid-cols-1 gap-2 mt-2">
                                                {msg.cards.map((card, i) => (
                                                    <div key={i} className="p-3 bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-xl shadow-sm">
                                                        <div className="text-xs text-gray-500 mb-1">{card.title}</div>
                                                        <div className="flex justify-between items-end">
                                                            <div className="font-bold text-gray-900 text-base">{card.value}</div>
                                                            <div className={cn("text-xs font-medium px-1.5 py-0.5 rounded-full bg-green-100 text-green-700")}>
                                                                {card.trend}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Secondary Text */}
                                        {msg.text2 && <p className="mt-2 text-gray-600">{msg.text2}</p>}

                                        {/* Quote Block */}
                                        {msg.quote && (
                                            <div className="mt-2 p-3 bg-purple-50 border-l-2 border-purple-500 italic text-purple-900 rounded-r-lg">
                                                {msg.quote}
                                            </div>
                                        )}

                                        {/* Action Suggestion */}
                                        {msg.actionSuggestion && (
                                            <button
                                                onClick={() => sendMessage('Sim, por favor faça isso.', true)}
                                                className="mt-3 flex items-center justify-between w-full p-2 pl-3 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors"
                                            >
                                                {msg.actionSuggestion}
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start w-full animate-in fade-in duration-300">
                                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-3">
                                    <div className="flex gap-1">
                                        <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" />
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium animate-pulse">Analisando dados...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} className="h-4" />
                    </div>
                )}

                {/* TAB: ACTIONS */}
                {activeTab === 'actions' && (
                    <div className="p-4 space-y-6">
                        {/* Contextual Block */}
                        <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                            <div className="flex items-center gap-2 mb-3">
                                <span className={cn("p-1.5 rounded-lg", currentContext.bg, currentContext.color)}>
                                    <Zap className="h-4 w-4" />
                                </span>
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                    {currentContext.theme}
                                </h4>
                            </div>
                            <div className="grid gap-3">
                                {currentContext.actions.map(action => (
                                    <button
                                        key={action.id}
                                        onClick={() => sendMessage(action.prompt)}
                                        className="group text-left p-3.5 bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-200 rounded-xl transition-all shadow-sm hover:shadow-md"
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-semibold text-gray-800 group-hover:text-purple-700 text-sm">
                                                {action.label}
                                            </span>
                                            <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-purple-400 transition-colors" />
                                        </div>
                                        <p className="text-xs text-gray-500 group-hover:text-purple-600/80 line-clamp-2">
                                            "{action.prompt}"
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* General Quick Actions */}
                        <div className="pt-4 border-t border-gray-100">
                            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Ações Gerais</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { label: 'Resumo Diário', icon: LayoutDashboard },
                                    { label: 'Análise Cardápio', icon: UtensilsCrossed },
                                    { label: 'Previsão Vendas', icon: TrendingUp },
                                    { label: 'Gatilhos IA', icon: Sparkles }
                                ].map((btn, i) => (
                                    <button
                                        key={i}
                                        onClick={() => sendMessage(`Gostaria de ver o ${btn.label}`)}
                                        className="flex flex-col items-center justify-center gap-2 p-3 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        <btn.icon className="h-5 w-5 text-gray-400" />
                                        <span className="text-xs font-medium text-gray-600">{btn.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB: HISTORY/PLAYBOOKS */}
                {activeTab === 'history' && (
                    <div className="p-4 space-y-6">
                        <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                <History className="h-4 w-4 text-gray-400" />
                                Recentes
                            </h4>
                            <div className="space-y-2">
                                {[
                                    { text: "Análise de ticket médio no almoço", time: "Hoje, 10:30" },
                                    { text: "Sugestão de descrição para Risoto", time: "Ontem, 18:45" },
                                    { text: "Comparativo de vendas vs. mês passado", time: "12/12/2024" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 text-sm text-gray-600 bg-white border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-300 shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-800">{item.text}</p>
                                            <span className="text-xs text-gray-400">{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-3 flex items-center gap-2">
                                <Lightbulb className="h-4 w-4" />
                                Playbooks Recomendados
                            </h4>
                            <div className="space-y-3">
                                {[
                                    { title: "Revisão Semanal de Cardápio", desc: "Checklist completo de itens, preços e estoque." },
                                    { title: "Auditoria de IA na Mesa", desc: "Verifique se o Menux está oferecendo os itens certos." },
                                    { title: "Plano de Ação para Dias Fracos", desc: "Estratégias para aumentar movimento terça e quarta." }
                                ].map((playbook, i) => (
                                    <button
                                        key={i}
                                        onClick={() => sendMessage(`Iniciar playbook: ${playbook.title}`)}
                                        className="w-full text-left p-3 rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10 hover:border-primary/30 transition-all"
                                    >
                                        <h5 className="font-bold text-sm text-gray-900">{playbook.title}</h5>
                                        <p className="text-xs text-gray-500 mt-1">{playbook.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Footer (Visible only in Chat tab, or globally? Requirement says keep input) */}
            {/* Allowing input in all tabs for quick access, but visually prioritized in Chat */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                <form onSubmit={handleSend} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Pergunte ao seu copiloto..."
                        className="w-full pl-4 pr-12 py-3.5 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-gray-400 shadow-sm"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md flex items-center justify-center w-9 h-9"
                    >
                        {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </button>
                </form>
                <div className="text-center mt-2">
                    <span className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold">Maestro Enterprise</span>
                </div>
            </div>
        </div>
    );
}
