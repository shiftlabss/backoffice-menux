import api from './api';

export const menuService = {
    // Full Hierarchy
    getFullMenu: async () => {
        const response = await api.get('/menu/full');
        return response.data;
    },

    // Categories
    getCategories: async () => {
        const response = await api.get('/menu/categories');
        return response.data;
    },
    createCategory: async (data) => {
        const response = await api.post('/menu/categories', data);
        return response.data;
    },
    updateCategory: async (id, data) => {
        const response = await api.put(`/menu/categories/${id}`, data);
        return response.data;
    },
    deleteCategory: async (id) => {
        const response = await api.delete(`/menu/categories/${id}`);
        return response.data;
    },
    reorderCategories: async (ids) => {
        const response = await api.post('/menu/categories/reorder', { ids });
        return response.data;
    },

    // SubCategories
    getSubCategories: async (categoryId) => {
        const response = await api.get(`/menu/categories/${categoryId}/subcategories`);
        return response.data;
    },
    createSubCategory: async (data) => {
        const response = await api.post('/menu/subcategories', data);
        return response.data;
    },
    updateSubCategory: async (id, data) => {
        const response = await api.put(`/menu/subcategories/${id}`, data);
        return response.data;
    },
    deleteSubCategory: async (id) => {
        const response = await api.delete(`/menu/subcategories/${id}`);
        return response.data;
    },
    reorderSubCategories: async (ids) => {
        const response = await api.post('/menu/subcategories/reorder', { ids });
        return response.data;
    },

    // Items
    createItem: async (data) => {
        const response = await api.post('/menu/items', data);
        return response.data;
    },
    updateItem: async (id, data) => {
        const response = await api.put(`/menu/items/${id}`, data);
        return response.data;
    },
    deleteItem: async (id) => {
        const response = await api.delete(`/menu/items/${id}`);
        return response.data;
    },

    // Wines
    getWines: async () => {
        const response = await api.get('/menu/wines');
        return response.data;
    },
};
