
export const mockOrders = [
  {
    id: 1001,
    table_number: 'Mesa 3',
    status: 'pending',
    items: [
      { id: 1, name: 'Bife Ancho com Batatas', quantity: 2, price: 85.00 },
      { id: 2, name: 'Stella Artois Long Neck', quantity: 2, price: 14.00 }
    ],
    total_amount: 198.00,
    created_at: new Date(Date.now() - 10 * 60000).toISOString(), // 10 min ago
    customer_name: 'Carlos Silva'
  },
  {
    id: 1002,
    table_number: 'Mesa 7',
    status: 'preparing',
    items: [
      { id: 3, name: 'Risoto de Camarão', quantity: 1, price: 92.00 },
      { id: 4, name: 'Taça de Vinho Branco', quantity: 1, price: 32.00 }
    ],
    total_amount: 124.00,
    created_at: new Date(Date.now() - 25 * 60000).toISOString(), // 25 min ago
    customer_name: 'Ana Pereira'
  },
  {
    id: 1003,
    table_number: 'Mesa 12',
    status: 'ready',
    items: [
      { id: 5, name: 'Picanha na Chapa (2 pessoas)', quantity: 1, price: 150.00 },
      { id: 6, name: 'Guaraná Antarctica 2L', quantity: 1, price: 18.00 },
      { id: 7, name: 'Porção de Fritas', quantity: 1, price: 28.00 }
    ],
    total_amount: 196.00,
    created_at: new Date(Date.now() - 35 * 60000).toISOString(), // 35 min ago
    customer_name: 'Roberto Souza'
  },
  {
    id: 1004,
    table_number: 'Mesa 5',
    status: 'pending',
    items: [
      { id: 8, name: 'Hambúrguer Artesanal', quantity: 4, price: 42.00 },
      { id: 9, name: 'Refrigerante Lata', quantity: 4, price: 8.00 }
    ],
    total_amount: 200.00,
    created_at: new Date(Date.now() - 5 * 60000).toISOString(), // 5 min ago
    customer_name: 'Grupo Família'
  },
  {
    id: 1005,
    table_number: 'Mesa 9',
    status: 'preparing',
    items: [
      { id: 10, name: 'Salada Caesar com Frango', quantity: 1, price: 38.00 },
      { id: 11, name: 'Suco de Laranja Natural', quantity: 1, price: 12.00 }
    ],
    total_amount: 50.00,
    created_at: new Date(Date.now() - 15 * 60000).toISOString(), // 15 min ago
    customer_name: 'Juliana Costa'
  },
  {
    id: 1006,
    table_number: 'Mesa 2',
    status: 'pending',
    items: [
      { id: 12, name: 'Espaguete à Carbonara', quantity: 2, price: 55.00 },
      { id: 13, name: 'Coca-Cola Zero', quantity: 2, price: 8.00 }
    ],
    total_amount: 126.00,
    created_at: new Date(Date.now() - 2 * 60000).toISOString(), // 2 min ago
    customer_name: 'Pedro e Maria'
  },
  {
    id: 1007,
    table_number: 'Mesa 8',
    status: 'ready',
    items: [
      { id: 14, name: 'Filé Parmegiana', quantity: 1, price: 65.00 },
      { id: 15, name: 'Água com Gás', quantity: 1, price: 6.00 }
    ],
    total_amount: 71.00,
    created_at: new Date(Date.now() - 40 * 60000).toISOString(),
    customer_name: 'João'
  },
  {
    id: 1008,
    table_number: 'Mesa 1',
    status: 'pending',
    items: [
      { id: 16, name: 'Entrada de Bruschettas', quantity: 1, price: 25.00 }
    ],
    total_amount: 25.00,
    created_at: new Date(Date.now() - 1 * 60000).toISOString(),
    customer_name: 'Visitante'
  }
];
