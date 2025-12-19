import api from './api';
import {
  getImpactData,
  getForecastData,
  getInsightData,
  getKPIData,
  getRecommendationsData,
  getProductsData,
  getAlertsData
} from './mockIntelligence';

export const ordersService = {
  // ... ordersService remains unchanged ...
  getOrders: async (status = null, limit = 50) => {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (limit) params.append('limit', limit.toString());

    const response = await api.get(`/orders?${params.toString()}`);
    return response.data;
  },

  getOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  createOrder: async (data) => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  },

  cancelOrder: async (orderId) => {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  }
};

export const dashboardService = {
  getMetrics: async () => {
    const response = await api.get('/dashboard');
    return response.data;
  }
};

export const intelligenceService = {
  getForecast: async () => {
    return new Promise(resolve => setTimeout(() => resolve(getForecastData()), 600));
  },

  getInsight: async () => {
    return new Promise(resolve => setTimeout(() => resolve(getInsightData()), 500));
  },

  getKPIs: async (period = '7d') => {
    return new Promise(resolve => setTimeout(() => resolve(getKPIData(period)), 700));
  },

  getRecommendations: async (filters = {}) => {
    return new Promise(resolve => setTimeout(() => resolve(getRecommendationsData(filters)), 800));
  },

  applyRecommendation: async (id) => {
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 400));
  },

  ignoreRecommendation: async (id) => {
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 400));
  },

  getImpact: async (period = '30d') => {
    return new Promise(resolve => setTimeout(() => resolve(getImpactData(period)), 800));
  },

  getProducts: async () => {
    return new Promise(resolve => setTimeout(() => resolve(getProductsData()), 900));
  },

  getAlerts: async () => {
    return new Promise(resolve => setTimeout(() => resolve(getAlertsData()), 600));
  },

  resolveAlert: async (id) => {
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 400));
  },

  getSettings: async () => {
    // Keep settings as API for now or mock if needed too
    // Assuming settings might be less critical or already working?
    // Let's mock it to be safe as "API error" is the theme
    return new Promise(resolve => setTimeout(() => resolve({
      enabled: true,
      sensitivity: 'medium',
      auto_apply_pricing: false
    }), 500));
  },

  updateSettings: async (settings) => {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, ...settings }), 500));
  }
};
