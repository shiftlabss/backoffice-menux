import { subDays, subHours, format, addDays } from 'date-fns';

const USERS_COUNT = 150;

// Helper to generate random int
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to generate random float
const randomFloat = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(2));

// Helper for random array pick
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper for date generation
const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const CHANNELS = ['Salão', 'Delivery', 'Retirada'];
const SHIFTS = ['Almoço', 'Jantar'];
const CATEGORIES = ['Pratos Principais', 'Bebidas', 'Sobremesas', 'Entradas', 'Vinhos'];
const ITEMS = [
  'Filé Mignon ao Molho Madeira', 'Risoto de Funghi', 'Salmão Grelhado', 'Pizza Margherita',
  'Hamburguer Artesanal', 'Coca-Cola Zero', 'Suco de Laranja', 'Petit Gateau', 'Tiramisu',
  'Vinho Tinto Malbec'
];

// Generate fake customers
export const generateMockCustomers = () => {
  return Array.from({ length: USERS_COUNT }).map((_, i) => {
    const id = `CUST-${(i + 1).toString().padStart(4, '0')}`;
    const name = `Cliente ${i + 1}`;
    const email = `cliente${i + 1}@email.com`;
    const phone = `(11) 9${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`;

    // RFM Simulation
    const lastOrderDaysAgo = randomInt(0, 365);
    const lastOrderDate = subDays(new Date(), lastOrderDaysAgo);
    const totalOrders = randomInt(1, 50);
    const ticketAverage = randomFloat(40, 250);
    const totalSpent = totalOrders * ticketAverage;
    const ltv = totalSpent * randomFloat(1.1, 1.5); // Projected LTV

    // Calculate RFM Score (simplified 1-5 scale)
    const rScore = lastOrderDaysAgo <= 30 ? 5 : lastOrderDaysAgo <= 60 ? 4 : lastOrderDaysAgo <= 90 ? 3 : 2;
    const fScore = totalOrders > 20 ? 5 : totalOrders > 10 ? 4 : totalOrders > 5 ? 3 : 2;
    const mScore = ticketAverage > 150 ? 5 : ticketAverage > 100 ? 4 : ticketAverage > 70 ? 3 : 2;
    const rfmScore = Math.round((rScore + fScore + mScore) / 3);

    // Determine Tags/Segments
    const tags = [];
    if (totalSpent > 3000 || (fScore >= 4 && mScore >= 4)) tags.push('VIP');
    else if (lastOrderDaysAgo > 60 && totalOrders > 3) tags.push('Em Risco');
    else if (totalOrders === 1 && lastOrderDaysAgo < 30) tags.push('Novo');
    else if (lastOrderDaysAgo < 15 && totalOrders > 10) tags.push('Leal');

    // Preferences
    const preferredChannel = pickRandom(CHANNELS);
    const preferredShift = pickRandom(SHIFTS);
    const topCategory = pickRandom(CATEGORIES);

    // Mock Next Best Action & Predictions
    let nextBestAction = 'Ofertar Combo Família';
    let churnRisk = 'Baixo';

    if (rScore <= 2) {
      nextBestAction = 'Enviar Cupom de Retorno';
      churnRisk = 'Alto';
    } else if (mScore >= 4) {
      nextBestAction = 'Convidar para Menu Degustação';
    }

    const nextLikelyPurchase = pickRandom(ITEMS);

    return {
      id,
      name,
      email,
      phone,
      since: subDays(new Date(), randomInt(30, 700)).toISOString(),
      metrics: {
        lastOrderDate: lastOrderDate.toISOString(),
        lastOrderDaysAgo,
        totalOrders,
        totalSpent,
        ticketAverage,
        ltv,
        frequencyDays: Math.floor(365 / Math.max(totalOrders, 1)), // Avg days between orders
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
        churnRisk, // Baixo, Médio, Alto
        churnProbability: randomInt(0, 100),
      },
      predictions: {
        nextBestAction,
        nextLikelyPurchase,
        nextPurchaseProbability: randomInt(20, 95),
      },
      tags,
    };
  });
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
