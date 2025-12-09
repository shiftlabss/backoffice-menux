"""
Seed script to add sample products and wines to the database.
"""
import sqlite3
import uuid
from datetime import datetime

# Connect to database
conn = sqlite3.connect('menux.db')
cursor = conn.cursor()

# Get IDs
restaurant_id = '3fad514c-41fa-455e-a144-1884d5795de1'
bebidas_category_id = 'd7a04246-737d-4116-8582-63c596702b56'
sobremesas_category_id = 'e2b1c4a0-a50b-40d2-b102-660b5c58d228'
vinhos_subcategory_id = 'b89972e8-650e-433e-b38e-db0789a7d8dd'

# Create additional subcategories
subcategories = [
    (str(uuid.uuid4()), 'Vinhos Tintos', bebidas_category_id, 1),
    (str(uuid.uuid4()), 'Vinhos Brancos', bebidas_category_id, 2),
    (str(uuid.uuid4()), 'Espumantes', bebidas_category_id, 3),
    (str(uuid.uuid4()), 'Doces', sobremesas_category_id, 0),
    (str(uuid.uuid4()), 'Tortas', sobremesas_category_id, 1),
]

for sub_id, name, cat_id, sort in subcategories:
    try:
        cursor.execute('''
            INSERT INTO subcategories (id, name, category_id, sort_order)
            VALUES (?, ?, ?, ?)
        ''', (sub_id, name, cat_id, sort))
    except sqlite3.IntegrityError:
        pass

conn.commit()

# Fetch subcategory IDs
cursor.execute("SELECT id, name FROM subcategories")
subcats = {row[1]: row[0] for row in cursor.fetchall()}

# Sample wines data
wines = [
    {
        'code': 'WINE-001',
        'name': 'Angelica Zapata Malbec',
        'short_description': 'Cor vermelho violáceo profundo. Aromas de frutas negras maduras, ameixas e toques de chocolate. Taninos suaves e final longo.',
        'photo_url': 'https://images.vivino.com/thumbs/ApnHW-6J2a8ZK8j1T4xPq2_375x500.png',
        'price': 289.00,
        'is_active': True,
        'is_wine': True,
        'wine_type': 'Tinto',
        'grape': 'Malbec',
        'vintage': '2020',
        'origin': 'Mendoza, Argentina',
        'alcohol_content': '14.5%',
        'volume': '750ml',
        'pairing_notes': 'Carnes vermelhas grelhadas, cordeiro, queijos curados',
        'subcategory_id': subcats.get('Vinhos Tintos', vinhos_subcategory_id),
    },
    {
        'code': 'WINE-002',
        'name': 'Catena Alta Cabernet Sauvignon',
        'short_description': 'Intenso e complexo, com notas de cassis, cedro e especiarias. Corpo cheio com taninos elegantes e persistente.',
        'photo_url': 'https://images.vivino.com/thumbs/lSFzPiMIiOPLo8sWIXUfHg_375x500.png',
        'price': 349.00,
        'is_active': True,
        'is_wine': True,
        'wine_type': 'Tinto',
        'grape': 'Cabernet Sauvignon',
        'vintage': '2019',
        'origin': 'Mendoza, Argentina',
        'alcohol_content': '13.9%',
        'volume': '750ml',
        'pairing_notes': 'Costela assada, filé mignon, queijos intensos',
        'subcategory_id': subcats.get('Vinhos Tintos', vinhos_subcategory_id),
    },
    {
        'code': 'WINE-003',
        'name': 'Cloudy Bay Sauvignon Blanc',
        'short_description': 'Refrescante com aromas cítricos vibrantes, maracujá e notas herbáceas. Acidez equilibrada e final mineral.',
        'photo_url': 'https://images.vivino.com/thumbs/Kf1ooTN5zC2jt4tOzDGkJQ_375x500.png',
        'price': 259.00,
        'is_active': True,
        'is_wine': True,
        'wine_type': 'Branco',
        'grape': 'Sauvignon Blanc',
        'vintage': '2022',
        'origin': 'Marlborough, Nova Zelândia',
        'alcohol_content': '13.5%',
        'volume': '750ml',
        'pairing_notes': 'Frutos do mar, saladas, queijos de cabra',
        'subcategory_id': subcats.get('Vinhos Brancos', vinhos_subcategory_id),
    },
    {
        'code': 'WINE-004',
        'name': 'Veuve Clicquot Brut',
        'short_description': 'Champagne clássico com notas de pêra, brioche e amêndoas. Elegante, com borbulhas finas e persistentes.',
        'photo_url': 'https://images.vivino.com/thumbs/DUcFBxdUDN6lFhSP_kLsdo_375x500.png',
        'price': 599.00,
        'is_active': True,
        'is_wine': True,
        'wine_type': 'Espumante',
        'grape': 'Pinot Noir, Chardonnay, Pinot Meunier',
        'vintage': 'N/V',
        'origin': 'Champagne, França',
        'alcohol_content': '12%',
        'volume': '750ml',
        'pairing_notes': 'Ostras, canapés, celebrações',
        'subcategory_id': subcats.get('Espumantes', vinhos_subcategory_id),
    },
    {
        'code': 'WINE-005',
        'name': 'Whispering Angel Rosé',
        'short_description': 'Rosé delicado e elegante com notas de morango, pêssego e flores. Fresco e equilibrado.',
        'photo_url': 'https://images.vivino.com/thumbs/B_Yy3SVFcJHJ3SqcyAi_3g_375x500.png',
        'price': 189.00,
        'is_active': True,
        'is_wine': True,
        'wine_type': 'Rosé',
        'grape': 'Grenache, Cinsault, Rolle',
        'vintage': '2023',
        'origin': 'Provence, França',
        'alcohol_content': '13%',
        'volume': '750ml',
        'pairing_notes': 'Saladas mediterrâneas, peixes grelhados, aperitivos',
        'subcategory_id': subcats.get('Vinhos Tintos', vinhos_subcategory_id),  # Putting in Tintos as fallback
    },
]

# Sample desserts (regular products)
desserts = [
    {
        'code': 'DESSERT-001',
        'name': 'Petit Gâteau',
        'short_description': 'Bolo de chocolate quente com interior cremoso, servido com sorvete de baunilha artesanal.',
        'photo_url': 'https://images.unsplash.com/photo-1617195737496-bc30194e3a19?w=400',
        'price': 38.00,
        'is_active': True,
        'is_wine': False,
        'subcategory_id': subcats.get('Doces', sobremesas_category_id),
    },
    {
        'code': 'DESSERT-002',
        'name': 'Cheesecake de Frutas Vermelhas',
        'short_description': 'Cremoso cheesecake com base crocante e calda de frutas vermelhas frescas.',
        'photo_url': 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400',
        'price': 32.00,
        'is_active': True,
        'is_wine': False,
        'subcategory_id': subcats.get('Tortas', sobremesas_category_id),
    },
    {
        'code': 'DESSERT-003',
        'name': 'Tiramisu',
        'short_description': 'Clássico italiano com camadas de biscoito champagne, café espresso e creme mascarpone.',
        'photo_url': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
        'price': 36.00,
        'is_active': True,
        'is_wine': False,
        'subcategory_id': subcats.get('Doces', sobremesas_category_id),
    },
    {
        'code': 'DESSERT-004',
        'name': 'Torta de Limão Siciliano',
        'short_description': 'Torta com creme de limão siciliano e merengue maçaricado, base amanteigada.',
        'photo_url': 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400',
        'price': 28.00,
        'is_active': True,
        'is_wine': False,
        'subcategory_id': subcats.get('Tortas', sobremesas_category_id),
    },
]

# Insert wines
for idx, wine in enumerate(wines):
    item_id = str(uuid.uuid4())
    cursor.execute('''
        INSERT INTO items (id, restaurant_id, subcategory_id, code, name, short_description, photo_url, price, is_active, sort_order, is_wine, wine_type, grape, vintage, origin, alcohol_content, volume, pairing_notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        item_id, restaurant_id, wine['subcategory_id'], wine['code'], wine['name'],
        wine['short_description'], wine['photo_url'], wine['price'], wine['is_active'],
        idx, True, wine['wine_type'], wine['grape'], wine['vintage'], wine['origin'],
        wine['alcohol_content'], wine['volume'], wine['pairing_notes']
    ))

# Insert desserts
for idx, dessert in enumerate(desserts):
    item_id = str(uuid.uuid4())
    cursor.execute('''
        INSERT INTO items (id, restaurant_id, subcategory_id, code, name, short_description, photo_url, price, is_active, sort_order, is_wine)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        item_id, restaurant_id, dessert['subcategory_id'], dessert['code'], dessert['name'],
        dessert['short_description'], dessert['photo_url'], dessert['price'], dessert['is_active'],
        idx, False
    ))

conn.commit()
conn.close()

print("✅ Seed data inserted successfully!")
print(f"   - {len(wines)} wines added")
print(f"   - {len(desserts)} desserts added")
