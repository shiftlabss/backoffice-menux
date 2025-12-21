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

    // AI Generation (Mock)
    generateProductDetails: async (productName) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simple mock logic based on keywords
        const lowerName = productName.toLowerCase();
        let description = `Uma deliciosa opção de ${productName}, preparada com ingredientes selecionados e muito sabor. Ideal para qualquer momento do dia.`;
        let ingredients = "Ingredientes frescos e selecionados.";

        if (lowerName.includes('burger') || lowerName.includes('hambúrguer')) {
            description = `Suculento hambúrguer artesanal no pão brioche, com blend de carnes nobres (160g), queijo cheddar derretido, alface americana crocante e tomate fresco. Acompanha maionese especial da casa. Uma explosão de sabor a cada mordida!`;
            ingredients = "Pão brioche, blend de carne bovina (160g), queijo cheddar, alface americana, tomate, maionese temperada.";
        } else if (lowerName.includes('pizza')) {
            description = `Pizza artesanal com massa de longa fermentação, molho de tomate italiano autêntico e cobertura generosa. Assada em forno a lenha para garantir a crocância perfeita e bordas levemente chamuscadas.`;
            ingredients = "Massa de fermentação natural, molho de tomate pelati, queijo mussarela, orégano, azeite extra virgem.";
        } else if (lowerName.includes('coca') || lowerName.includes('refrigerante')) {
            description = `Refrescante e saborosa, a escolha perfeita para acompanhar sua refeição. Servida bem gelada para realçar o sabor inconfundível.`;
            ingredients = "Água gaseificada, açúcar, extrato de noz de cola, cafeína, corante caramelo IV, acidulante ácido fosfórico, aroma natural.";
        } else if (lowerName.includes('vinho')) {
            description = `Vinho elegante e equilibrado, com notas frutadas e taninos macios. Harmoniza perfeitamente com carnes vermelhas e massas. Uma experiência sensorial única.`;
            ingredients = "Uvas viníferas fermentadas. Contém sulfitos.";
        }

        return { description, ingredients };
    },
};
