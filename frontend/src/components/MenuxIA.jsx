import React, { useState, useRef, useEffect } from 'react';
import { useMenux } from '../context/MenuxContext';
import { Send, Bot, X, Zap, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function MenuxIA() {
    const { role, isIAPanelOpen, toggleIAPanel } = useMenux();
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([
        {
            id: 1, type: 'ai', text: role === 'manager'
                ? 'Olá! Sou seu assistente executivo. Como posso ajudar com o cardápio ou métricas hoje?'
                : 'Olá! Estou pronto para ajudar nas vendas. Qual mesa precisa de atenção?'
        }
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    if (!isIAPanelOpen) {
        return (
            <button
                onClick={toggleIAPanel}
                className="fixed bottom-6 right-6 h-14 w-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all z-50 animate-in fade-in zoom-in duration-300"
            >
                <Bot className="h-6 w-6" />
            </button>
        );
    }

    const generateResponse = (text) => {
        const lowerText = text.toLowerCase();

        if (role === 'manager') {
            if (lowerText.includes('vendas') || lowerText.includes('faturamento')) {
                return 'Hoje o faturamento está 15% acima da média das últimas 4 terças-feiras. O prato mais vendido é o "Risoto de Camarão".';
            }
            if (lowerText.includes('destaque') || lowerText.includes('sugestão')) {
                return 'Sugiro destacar o "Filet Mignon ao Molho Madeira". Temos um estoque alto de insumos para ele e a margem de contribuição é de 40%.';
            }
            if (lowerText.includes('preço') || lowerText.includes('ajustar')) {
                return 'Posso ajudar com isso. O último reajuste foi há 3 meses. Deseja simular um aumento de 5% em qual categoria?';
            }
        } else {
            if (lowerText.includes('mesa 4') || lowerText.includes('sugestão')) {
                return 'Para a Mesa 4 (Casal), sugiro oferecer o vinho "Malbec Reserva" que harmoniza bem com os pedidos atuais.';
            }
            if (lowerText.includes('vender agora') || lowerText.includes('o que oferecer')) {
                return 'As sobremesas estão com saída lenta. Tente oferecer o "Petit Gâteau" promoção.';
            }
        }

        return 'Entendi. Posso processar essa solicitação. (Nota: Esta é uma resposta simulada do MVP)';
    };

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI processing
        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                type: 'ai',
                text: generateResponse(text)
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSend = (e) => {
        e.preventDefault();
        sendMessage(input);
    };

    const quickActions = role === 'manager'
        ? ['Análise de vendas', 'Sugestão de destaque', 'Ajustar preços']
        : ['Sugestão mesa 4', 'O que vender agora?', 'Alertas de mesa'];

    return (
        <div className="w-80 md:w-96 border-l border-border bg-surface flex flex-col h-screen fixed right-0 top-0 z-40 shadow-xl transition-transform duration-300 animate-in slide-in-from-right">
            {/* Header */}
            <div className="h-[60px] border-b border-border flex items-center justify-between px-4 bg-surface shrink-0">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
                        <Bot className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm tracking-tight text-text-primary">Menux IA</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                            <span className="text-xs text-text-secondary font-medium">Online</span>
                        </div>
                    </div>
                </div>
                <button onClick={toggleIAPanel} className="text-text-secondary hover:text-text-primary p-2 hover:bg-background rounded-full transition-colors">
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50 scroll-smooth">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
                            msg.type === 'user' ? "justify-end" : "justify-start"
                        )}
                    >
                        <div className={cn(
                            "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed",
                            msg.type === 'user'
                                ? "bg-primary text-primary-foreground rounded-br-none"
                                : "bg-surface border border-border text-text-primary rounded-bl-none"
                        )}>
                            {msg.text}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start w-full animate-in fade-in duration-300">
                        <div className="bg-surface border border-border rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                            <span className="text-xs text-text-secondary font-medium">Menux IA digitando</span>
                            <span className="flex gap-1">
                                <span className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce delay-0" />
                                <span className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce delay-150" />
                                <span className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce delay-300" />
                            </span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-4 bg-surface border-t border-border mt-auto shrink-0">
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-2 px-2">
                    {quickActions.map((action, i) => (
                        <button
                            key={i}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-background hover:bg-primary/5 border border-border hover:border-primary/30 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95"
                            onClick={() => sendMessage(action)}
                        >
                            <Zap className="h-3 w-3 text-warning" />
                            {action}
                        </button>
                    ))}
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="relative mt-1">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={role === 'manager' ? "Pergunte sobre métricas..." : "Dúvidas sobre pedidos..."}
                        className="w-full pl-4 pr-12 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-text-tertiary"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
                    >
                        {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </button>
                </form>
            </div>
        </div>
    );
}
