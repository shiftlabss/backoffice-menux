import { subDays, subHours, format, addDays } from 'date-fns';

const USERS_COUNT = 150;

// Helper to generate random int
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to generate random float
const randomFloat = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(2));

// Helper for random array pick
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const CHANNELS = ['Salão', 'Delivery', 'Retirada'];
const SHIFTS = ['Almoço', 'Jantar'];
const CATEGORIES = ['Pratos Principais', 'Bebidas', 'Sobremesas', 'Entradas', 'Vinhos'];
const ITEMS = [
  'Filé Mignon ao Molho Madeira', 'Risoto de Funghi', 'Salmão Grelhado', 'Pizza Margherita',
  'Hamburguer Artesanal', 'Coca-Cola Zero', 'Suco de Laranja', 'Petit Gateau', 'Tiramisu',
  'Vinho Tinto Malbec'
];

const ORIGINS = ['Mesa 12', 'Mesa 04', 'Mesa 21', 'QR Balcão', 'Link Delivery', 'Instagram', 'Mesa 18'];

const FIRST_NAMES = [
  'Ana', 'Bruno', 'Carla', 'Daniel', 'Eduarda', 'Felipe', 'Gabriela', 'Henrique', 'Isabela', 'João',
  'Karina', 'Lucas', 'Mariana', 'Nicolas', 'Olivia', 'Pedro', 'Quintino', 'Rafael', 'Sofia', 'Thiago'
];

const LAST_NAMES = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes',
  'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa'
];

// Generate fake customers
export const generateMockCustomers = () => {
  // Hardcoded specific test cases
  const specificCases = [
    {
      id: '101',
      customer_type: 'registered',
      name: 'Maria Eduarda de Albuquerque Cavalcanti Neto',
      email: 'maria.cavalcanti@email.com',
      phone: '(11) 94301-3623',
      since: '2025-08-05',
      rfm: { score: 4.8, classification: 'Leal', r: 5, f: 5, m: 4 },
      metrics: {
        totalSpent: 10851.83,
        lastOrderDate: '2025-08-05',
        totalOrders: 47,
        frequencyDays: 7,
        ticketAverage: 230.89,
        ltv: 25000,
        lastOrderDaysAgo: 138,
        churnProbability: 15
      },
      preferences: {
        topItems: ['Vinho Tinto', 'Queijo Brie', 'Filé Mignon'],
        topCategory: 'Vinhos',
        channel: 'Retirada',
        shift: 'Jantar'
      },
      tags: ['Leal', 'Vinhos'],
      predictions: {
        nextBestAction: 'Enviar Cupom de Retorno',
        nextPurchaseProbability: 85,
        likelyToChurn: false
      },
      risk: { churnRisk: 'Baixo', churnProbability: 15 }
    },
    {
      id: 'ANON-0192',
      customer_type: 'anonymous',
      name: 'Cliente Anônimo',
      anon_id: 'ANON-0192',
      origin: 'Mesa 12',
      email: '',
      phone: '',
      since: '2025-12-20',
      rfm: { score: 1.0, classification: 'Novo', r: 5, f: 1, m: 1 },
      metrics: {
        totalSpent: 185.90,
        lastOrderDate: '2025-12-20',
        totalOrders: 1,
        frequencyDays: 0,
        ticketAverage: 185.90,
        ltv: 185.90,
        lastOrderDaysAgo: 1,
        churnProbability: 80
      },
      preferences: {
        topItems: ['Picanha Grelhada', 'Caipirinha'],
        topCategory: 'Pratos Principais',
        channel: 'Mesa',
        shift: 'Jantar'
      },
      tags: ['Anônimo', 'Novo'],
      predictions: {
        nextBestAction: 'Capturar Cadastro no Wi-Fi',
        nextPurchaseProbability: 20,
        likelyToChurn: true
      },
      risk: { churnRisk: 'Alto', churnProbability: 80 }
    }
  ];

  const generatedCount = USERS_COUNT - specificCases.length;

  const generated = Array.from({ length: generatedCount }).map((_, i) => {
    // 20% Anonymous
    const isAnonymous = Math.random() < 0.2;
    const customerType = isAnonymous ? 'anonymous' : 'registered';

    // IDs
    const idNum = (i + 103).toString().padStart(4, '0');
    const id = isAnonymous ? `ANON-${idNum}` : `CUST-${idNum}`;
    const anonId = isAnonymous ? `ANON-${idNum}` : null;

    // Names & Contact
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

    // Some long names
    const hasMiddleName = Math.random() < 0.3;
    const middleName = hasMiddleName ? LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)] : '';

    const name = isAnonymous
      ? 'Cliente Anônimo'
      : `${firstName} ${middleName} ${lastName}`.replace('  ', ' ');

    const email = isAnonymous ? '' : `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`;
    const phone = isAnonymous ? '' : `(11) 9${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`;
    const origin = isAnonymous ? pickRandom(ORIGINS) : null;

    // RFM Simulation
    const lastOrderDaysAgo = randomInt(0, 365);
    const lastOrderDate = subDays(new Date(), lastOrderDaysAgo);
    const totalOrders = randomInt(1, 50);
    const ticketAverage = randomFloat(40, 250);
    const totalSpent = totalOrders * ticketAverage;
    const ltv = totalSpent * randomFloat(1.1, 1.5);

    // Calculate RFM Score
    const rScore = lastOrderDaysAgo <= 30 ? 5 : lastOrderDaysAgo <= 60 ? 4 : lastOrderDaysAgo <= 90 ? 3 : 2;
    const fScore = totalOrders > 20 ? 5 : totalOrders > 10 ? 4 : totalOrders > 5 ? 3 : 2;
    const mScore = ticketAverage > 150 ? 5 : ticketAverage > 100 ? 4 : ticketAverage > 70 ? 3 : 2;
    const rfmScore = Math.round((rScore + fScore + mScore) / 3);

    // Determine Tags
    const tags = [];
    if (isAnonymous) tags.push('Anônimo');
    else if (totalSpent > 3000 || (fScore >= 4 && mScore >= 4)) tags.push('VIP');

    if (lastOrderDaysAgo > 60 && totalOrders > 3) tags.push('Em Risco');
    else if (totalOrders === 1 && lastOrderDaysAgo < 30) tags.push('Novo');
    else if (lastOrderDaysAgo < 15 && totalOrders > 10) tags.push('Leal');

    // Preferences
    const preferredChannel = pickRandom(CHANNELS);
    const preferredShift = pickRandom(SHIFTS);
    const topCategory = pickRandom(CATEGORIES);

    return {
      id: isAnonymous ? anonId : id,
      customer_type: customerType,
      name,
      email,
      phone,
      anon_id: anonId,
      origin,
      since: subDays(new Date(), randomInt(30, 700)).toISOString(),
      metrics: {
        lastOrderDate: lastOrderDate.toISOString(),
        lastOrderDaysAgo,
        totalOrders,
        totalSpent,
        ticketAverage,
        ltv,
        frequencyDays: Math.floor(365 / Math.max(totalOrders, 1)),
      },
      preferences: {
        channel: preferredChannel,
        shift: preferredShift,
        topCategory,
        topItems: [pickRandom(ITEMS), pickRandom(ITEMS), pickRandom(ITEMS)],
      },
      rfm: {
        r: rScore,
        f: fScore,
        m: mScore,
        score: rfmScore,
        classification: rfmScore >= 4.5 ? 'Campeão' : rfmScore >= 3.5 ? 'Leal' : rfmScore >= 2.5 ? 'Promissor' : 'Em Risco',
      },
      risk: {
        churnRisk: rScore <= 2 ? 'Alto' : 'Baixo',
        churnProbability: randomInt(0, 100),
      },
      predictions: {
        nextBestAction: isAnonymous ? 'Capturar Cadastro' : 'Recomendar Prato do Dia',
        nextPurchaseProbability: randomInt(20, 95),
      },
      tags,
    };
  });

  return [...specificCases, ...generated];
};

// Generate mock order history for a specific customer
export const generateCustomerHistory = (customerId) => {
  const count = randomInt(3, 15);
  return Array.from({ length: count }).map((_, i) => {
    const date = subDays(new Date(), randomInt(1, 300));
    const value = randomFloat(50, 300);
    return {
      id: `ORD-${customerId}-${i}`,
      date: date.toISOString(),
      value,
      items: [pickRandom(ITEMS), pickRandom(ITEMS)],
      channel: pickRandom(CHANNELS),
      status: 'Concluído',
      rating: randomInt(3, 5),
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
};
