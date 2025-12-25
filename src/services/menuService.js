import api from './api';

export const menuService = {
    // Full Hierarchy
    getFullMenu: async () => {
        const token = localStorage.getItem('token');
        if (token === 'mock-jwt-token-dev-123') {
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
            return [
                {
                    id: 1, name: 'Entradas', sort_order: 1,
                    subcategories: [
                        {
                            id: 11, name: 'Frias', items: [
                                { id: 101, name: 'Carpaccio Clássico', price: 42.00, description: 'Lâminas finas de carne com molho de mostarda, alcaparras e parmesão.', is_active: true },
                                { id: 102, name: 'Salada Caprese', price: 38.00, description: 'Tomate, mussarela de búfala e manjericão fresco.', is_active: true }
                            ]
                        },
                        {
                            id: 12, name: 'Quentes', items: [
                                { id: 504, name: 'Batata Frita Rústica', price: 32.00, description: 'Batatas rústicas crocantes com alecrim.', is_active: true }, // MATCHING DASHBOARD ID 504
                                { id: 103, name: 'Bruschetta Pomodoro', price: 28.00, description: 'Pão italiano, tomate picado, alho e azeite.', is_active: true }
                            ]
                        }
                    ]
                },
                {
                    id: 2, name: 'Pratos Principais', sort_order: 2,
                    subcategories: [
                        {
                            id: 21, name: 'Burgers & Combos', items: [
                                { id: 501, name: 'Burger Clássico', price: 35.00, description: 'Burger artesanal, queijo cheddar, alface e tomate.', is_active: true }, // MATCHING DASHBOARD ID 501
                                { id: 502, name: 'Combo Família G', price: 89.90, description: '4 Burgers, 4 Batatas, 1 Refri 2L', is_active: true } // MATCHING DASHBOARD ID 502
                            ]
                        },
                        {
                            id: 22, name: 'Massas', items: [
                                { id: 203, name: 'Spaghetti Carbonara', price: 62.00, description: 'Autêntica receita romana com guanciale e pecorino.', is_active: true },
                                { id: 204, name: 'Fettuccine Alfredo', price: 58.00, description: 'Molho cremoso de queijo parmesão.', is_active: true }
                            ]
                        }
                    ]
                },
                {
                    id: 3, name: 'Bebidas', sort_order: 3,
                    subcategories: [
                        { id: 31, name: 'Vinhos', items: [] },
                        {
                            id: 32, name: 'Não Alcoólicos', items: [
                                { id: 503, name: 'Coca-Cola Zero 350ml', price: 8.00, is_active: true }, // MATCHING DASHBOARD ID 503
                                { id: 301, name: 'Água Mineral', price: 6.00, is_active: true }
                            ]
                        }
                    ]
                },
                {
                    id: 4, name: 'Sobremesas', sort_order: 4,
                    subcategories: [
                        {
                            id: 41, name: 'Doces', items: [
                                { id: 505, name: 'Brownie de Chocolate com Sorvete', price: 30.00, description: 'Brownie quente com sorvete de creme.', is_active: true } // MATCHING DASHBOARD ID 505
                            ]
                        }
                    ]
                }
            ];
        }
        const response = await api.get('/menu/full');
        return response.data;
    },

    // Highlights (Vitrine)
    getHighlights: async () => {
        const token = localStorage.getItem('token');
        if (token === 'mock-jwt-token-dev-123') {
            await new Promise(resolve => setTimeout(resolve, 400));
            // Return IDs or small objects. Ideally full objects for display.
            // Using IDs 101, 201, 302 as default mock
            return [
                { id: 101, name: 'Carpaccio Clássico', price: 42.00, image_url: null },
                { id: 201, name: 'Filé Mignon ao Poivre', price: 89.00, image_url: null },
                { id: 302, name: 'Refrigerante Lata', price: 8.00, image_url: null }
            ];
        }
        const response = await api.get('/menu/highlights');
        return response.data;
    },

    updateHighlights: async (products) => {
        const token = localStorage.getItem('token');
        if (token === 'mock-jwt-token-dev-123') {
            await new Promise(resolve => setTimeout(resolve, 600));
            return products;
        }
        const response = await api.post('/menu/highlights', { products });
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
    // Wines
    getWines: async () => {
        const token = localStorage.getItem('token');
        if (token === 'mock-jwt-token-dev-123') {
            await new Promise(resolve => setTimeout(resolve, 600));
            return [
                { id: 401, name: 'DV Catena Malbec', price: 240.00, type: 'Tinto', country: 'Argentina', region: 'Mendoza', grapes: 'Malbec', is_active: true },
                { id: 402, name: 'Pera Manca Branco', price: 450.00, type: 'Branco', country: 'Portugal', region: 'Alentejo', grapes: 'Antão Vaz, Arinto', is_active: true },
                { id: 403, name: 'Moët & Chandon Imperial', price: 580.00, type: 'Espumante', country: 'França', region: 'Champagne', grapes: 'Chardonnay, Pinot Noir', is_active: true }
            ];
        }
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
