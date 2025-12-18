import api from './api';

export const ordersService = {
  /**
   * Get all orders with optional status filter
   */
  getOrders: async (status = null, limit = 50) => {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (limit) params.append('limit', limit.toString());

    const response = await api.get(`/orders?${params.toString()}`);
    return response.data;
  },

  /**
   * Get a single order by ID
   */
  getOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  /**
   * Create a new order
   */
  createOrder: async (data) => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  /**
   * Update order status
   */
  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  },

  /**
   * Cancel an order
   */
  cancelOrder: async (orderId) => {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  }
};

export const dashboardService = {
  /**
   * Get dashboard metrics
   */
  getMetrics: async () => {
    const response = await api.get('/dashboard');
    return response.data;
  }
};

export const intelligenceService = {
  /**
   * Get AI forecast
   */
  getForecast: async () => {
    const response = await api.get('/intelligence/overview/forecast');
    return response.data;
  },

  /**
   * Get insight of the day
   */
  getInsight: async () => {
    const response = await api.get('/intelligence/insight-of-the-day');
    return response.data;
  },

  /**
   * Get AI KPIs
   */
  getKPIs: async (period = '7d') => {
    const response = await api.get(`/intelligence/overview/kpis?period=${period}`);
    return response.data;
  },

  /**
   * Get AI recommendations
   */
  getRecommendations: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.type) params.append('type', filters.type);
    if (filters.period) params.append('period', filters.period);

    const response = await api.get(`/intelligence/recommendations?${params.toString()}`);
    return response.data;
  },

  /**
   * Apply a recommendation
   */
  applyRecommendation: async (id) => {
    const response = await api.post(`/intelligence/recommendations/${id}/apply`);
    return response.data;
  },

  /**
   * Ignore a recommendation
   */
  ignoreRecommendation: async (id) => {
    const response = await api.post(`/intelligence/recommendations/${id}/ignore`);
    return response.data;
  },

  /**
   * Get sales impact data
   */
  getImpact: async (period = '30d') => {
    const response = await api.get(`/intelligence/impact?period=${period}`);
    return response.data;
  },

  /**
   * Get product performance
   */
  getProducts: async () => {
    const response = await api.get('/intelligence/products');
    return response.data;
  },

  /**
   * Get alerts
   */
  getAlerts: async () => {
    const response = await api.get('/intelligence/alerts');
    return response.data;
  },

  /**
   * Resolve an alert
   */
  resolveAlert: async (id) => {
    const response = await api.post(`/intelligence/alerts/${id}/resolve`);
    return response.data;
  },

  /**
   * Get AI settings
   */
  getSettings: async () => {
    const response = await api.get('/intelligence/settings');
    return response.data;
  },

  /**
   * Update AI settings
   */
  updateSettings: async (settings) => {
    const response = await api.put('/intelligence/settings', settings);
    return response.data;
  }
};
