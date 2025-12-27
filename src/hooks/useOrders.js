import { useState, useEffect, useCallback } from 'react';
import { mockOrders } from '../services/mockOrders';
import { supabase } from '../lib/supabase';
import { useAudit } from './useAudit';
import toast from 'react-hot-toast';

/**
 * Hook to manage orders data lifecycle: fetch, subscription, and updates.
 * @returns {object} Orders data and mutation methods
 */
export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { log, logMutation } = useAudit();

  // 1. Fetch Initial Data
  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .neq('status', 'finished') // Only active orders
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setOrders(data);
      } else {
        // Fallback to Mock Data if DB is empty
        console.log('No orders found in DB, using mock data.');
        setOrders(mockOrders);
      }
    } catch (err) {
      console.warn('Error fetching orders, falling back to mock data:', err);
      // Fallback to Mock Data on error
      setOrders(mockOrders);
      // Optional: keep error state if you want to show a warning, 
      // but if the goal is to mock seamlessly, clearing error might be better 
      // or handling it UI side. For now, let's allow the UI to show data.
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 2. Real-time Subscription
  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        // New order received
        setOrders((prev) => [payload.new, ...prev]);
        toast.success(`Novo pedido da ${payload.new.table_number || 'Mesa'}!`, { icon: '🔔' });
        log('orders.realtime.insert', { id: payload.new.id });
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
        // Order updated
        setOrders((prev) => prev.map((o) => (o.id === payload.new.id ? payload.new : o)));
        // If status changed, we could log here too, but mutation log handles the trigger
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchOrders, log]);

  // 3. Mutation: Update Status
  const updateOrderStatus = useCallback(async (orderId, newStatus) => {
    // Optimistic Update
    const oldOrder = orders.find(o => o.id === orderId);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      const labels = {
        pending: 'Pendente',
        preparing: 'Em Preparo',
        ready: 'Pronto',
        finished: 'Finalizado'
      };

      toast.success(`Pedido movido para ${labels[newStatus] || newStatus}`);
      logMutation('orders.status.update', {
        orderId,
        oldStatus: oldOrder?.status,
        newStatus,
        method: 'manual'
      });

    } catch (err) {
      // Rollback
      console.error('Error updating order:', err);
      toast.error('Erro ao atualizar status.');
      if (oldOrder) {
        setOrders(prev => prev.map(o => o.id === orderId ? oldOrder : o));
      }
    }
  }, [orders, logMutation]);

  // 4. Mutation: Create Order (Simulation for Demo)
  const createMockOrder = useCallback(async () => {
    const mockOrder = {
      id: Math.floor(Math.random() * 9000) + 1000,
      table_number: `Mesa ${Math.floor(Math.random() * 15) + 1}`,
      status: 'pending',
      items: [
        { name: 'Item Exemplo', quantity: 1, price: 50.00 }
      ],
      total_amount: 50.00,
      created_at: new Date().toISOString()
    };

    // In real app, backend creates. Here we insert for demo.
    await supabase.from('orders').insert(mockOrder);

    // Optimistic update for Simulation/Mock mode
    setOrders(prev => [mockOrder, ...prev]);
    toast.success('Pedido Simulado Criado!', { icon: '🚀' });

    logMutation('orders.create_mock', mockOrder);
  }, [logMutation]);

  return {
    orders,
    isLoading,
    error,
    updateOrderStatus,
    createMockOrder, // Only for testing/demo
    refetch: fetchOrders
  };
}

/**
 * Helper to calculate stats from order list
 */
export function useOrderStats(orders) {
  return {
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    all: orders.length
  };
}
