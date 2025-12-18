import React, { useState } from 'react';
import { Bell, Check, Info, AlertTriangle, X } from 'lucide-react';
import { Button } from '../ui/Form';
import { cn } from '../../lib/utils';

const MOCK_NOTIFICATIONS = [
    { id: 1, type: 'alert', title: 'Ruptura de Estoque', desc: 'Tomate atingiu nível crítico.', time: '10 min', read: false },
    { id: 2, type: 'info', title: 'Meta Batida', desc: 'Parabéns! Meta diária atingida.', time: '1 hora', read: false },
    { id: 3, type: 'system', title: 'Backup Realizado', desc: 'Backup de segurança concluído.', time: '2 horas', read: true },
];

export default function NotificationsPopover() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="relative shrink-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-gray-100"
                aria-label="Notificações"
            >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-[#FAFAFA]" />
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-border p-0 z-20 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-3 border-b border-muted flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-sm font-bold text-foreground">Notificações</h3>
                            {unreadCount > 0 && (
                                <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                                    Marcar lidas
                                </button>
                            )}
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-400">
                                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-xs">Nenhuma notificação</p>
                                </div>
                            ) : (
                                <div>
                                    {notifications.map((n) => (
                                        <div key={n.id} className={cn(
                                            "p-3 border-b border-muted flex items-start gap-3 hover:bg-gray-50 transition-colors group relative",
                                            !n.read ? "bg-blue-50/30" : ""
                                        )}>
                                            <div className={cn(
                                                "p-2 rounded-full shrink-0",
                                                n.type === 'alert' ? "bg-red-100 text-red-600" :
                                                    n.type === 'info' ? "bg-green-100 text-green-600" :
                                                        "bg-gray-100 text-gray-500"
                                            )}>
                                                {n.type === 'alert' ? <AlertTriangle className="w-4 h-4" /> :
                                                    n.type === 'info' ? <Check className="w-4 h-4" /> :
                                                        <Info className="w-4 h-4" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-0.5">
                                                    <p className={cn("text-xs font-bold truncate pr-6", !n.read ? "text-foreground" : "text-gray-500")}>
                                                        {n.title}
                                                    </p>
                                                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{n.time}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 line-clamp-2">{n.desc}</p>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                                                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="p-2 border-t border-muted bg-gray-50/50">
                            <Button variant="ghost" size="sm" className="w-full h-8 text-xs text-gray-500">
                                Ver todas
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
