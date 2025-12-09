"""
Menux Demo Restaurant Database Seeder
Creates a complete restaurant database for demonstration purposes.
"""
import sqlite3
import uuid
from datetime import datetime

conn = sqlite3.connect('menux.db')
cursor = conn.cursor()

# Get restaurant ID
cursor.execute("SELECT id FROM restaurants LIMIT 1")
result = cursor.fetchone()
restaurant_id = result[0] if result else str(uuid.uuid4())

def gen_id():
    return str(uuid.uuid4())

# ============================================================
# CATEGORIES
# ============================================================
categories_data = [
    {"name": "Entradas", "sort_order": 0},
    {"name": "Pratos Principais", "sort_order": 1},
    {"name": "Massas", "sort_order": 2},
    {"name": "Sobremesas", "sort_order": 3},
    {"name": "Bebidas", "sort_order": 4},
    {"name": "Vinhos", "sort_order": 5},
]

categories = {}
for cat in categories_data:
    cat_id = gen_id()
    categories[cat["name"]] = cat_id
    cursor.execute('''
        INSERT INTO categories (id, restaurant_id, name, sort_order)
        VALUES (?, ?, ?, ?)
    ''', (cat_id, restaurant_id, cat["name"], cat["sort_order"]))

conn.commit()

# ============================================================
# SUBCATEGORIES
# ============================================================
subcategories_data = {
    "Entradas": [
        {"name": "Frias", "sort_order": 0},
        {"name": "Quentes", "sort_order": 1},
        {"name": "Para Compartilhar", "sort_order": 2},
    ],
    "Pratos Principais": [
        {"name": "Carnes", "sort_order": 0},
        {"name": "Frutos do Mar", "sort_order": 1},
        {"name": "Aves", "sort_order": 2},
    ],
    "Massas": [
        {"name": "Tradicionais", "sort_order": 0},
        {"name": "Especiais", "sort_order": 1},
    ],
    "Sobremesas": [
        {"name": "Clássicos", "sort_order": 0},
        {"name": "Gelados", "sort_order": 1},
        {"name": "Frutas", "sort_order": 2},
    ],
    "Bebidas": [
        {"name": "Refrigerantes", "sort_order": 0},
        {"name": "Sucos", "sort_order": 1},
        {"name": "Drinks", "sort_order": 2},
    ],
    "Vinhos": [
        {"name": "Tintos", "sort_order": 0},
        {"name": "Brancos", "sort_order": 1},
        {"name": "Espumantes", "sort_order": 2},
    ],
}

subcategories = {}
for cat_name, subs in subcategories_data.items():
    cat_id = categories[cat_name]
    for sub in subs:
        sub_id = gen_id()
        subcategories[f"{cat_name}_{sub['name']}"] = sub_id
        cursor.execute('''
            INSERT INTO subcategories (id, category_id, name, sort_order)
            VALUES (?, ?, ?, ?)
        ''', (sub_id, cat_id, sub["name"], sub["sort_order"]))

conn.commit()

# ============================================================
# PRODUCTS DATA
# ============================================================
products = []

# --- ENTRADAS FRIAS ---
products.extend([
    {
        "subcategory": "Entradas_Frias",
        "code": "ENT-001",
        "name": "Carpaccio de Filé Mignon",
        "description": "Finas fatias de filé mignon com rúcula selvagem, alcaparras, lascas de parmesão e molho mostarda Dijon.",
        "price": 58.00,
        "photo_url": "https://images.unsplash.com/photo-1544025162-d76978fc7f48?w=800"
    },
    {
        "subcategory": "Entradas_Frias",
        "code": "ENT-002",
        "name": "Burrata ao Pesto",
        "description": "Cremosa burrata italiana servida com pesto genovês, tomates confit e crostini crocante.",
        "price": 62.00,
        "photo_url": "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800"
    },
    {
        "subcategory": "Entradas_Frias",
        "code": "ENT-003",
        "name": "Tartare de Salmão",
        "description": "Cubos de salmão fresco com abacate, cebolinha, gergelim e molho ponzu cítrico.",
        "price": 68.00,
        "photo_url": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800"
    },
    {
        "subcategory": "Entradas_Frias",
        "code": "ENT-004",
        "name": "Ceviche Peruano",
        "description": "Peixe branco marinado em leche de tigre com cebola roxa, milho e batata doce.",
        "price": 54.00,
        "photo_url": "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=800"
    },
])

# --- ENTRADAS QUENTES ---
products.extend([
    {
        "subcategory": "Entradas_Quentes",
        "code": "ENT-005",
        "name": "Camarões ao Alho",
        "description": "Camarões rosa salteados na manteiga com alho crocante e pimenta calabresa. Acompanha pão italiano.",
        "price": 72.00,
        "photo_url": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800"
    },
    {
        "subcategory": "Entradas_Quentes",
        "code": "ENT-006",
        "name": "Polvo Grelhado",
        "description": "Tentáculos de polvo grelhados no carvão com purê de batata trufado e azeite defumado.",
        "price": 89.00,
        "photo_url": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800"
    },
    {
        "subcategory": "Entradas_Quentes",
        "code": "ENT-007",
        "name": "Cogumelos Recheados",
        "description": "Portobello recheado com queijo brie, nozes caramelizadas e redução de balsâmico.",
        "price": 48.00,
        "photo_url": "https://images.unsplash.com/photo-1518977676601-b53f82ber48a?w=800"
    },
    {
        "subcategory": "Entradas_Quentes",
        "code": "ENT-008",
        "name": "Bolinho de Bacalhau",
        "description": "Bolinhos dourados de bacalhau português com azeitonas pretas e aioli de limão siciliano.",
        "price": 42.00,
        "photo_url": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800"
    },
])

# --- ENTRADAS PARA COMPARTILHAR ---
products.extend([
    {
        "subcategory": "Entradas_Para Compartilhar",
        "code": "ENT-009",
        "name": "Tábua de Frios Premium",
        "description": "Seleção de presunto parma, salame milano, copa, queijos artesanais, geleias e torradas.",
        "price": 128.00,
        "photo_url": "https://images.unsplash.com/photo-1586816001966-79b736744398?w=800"
    },
    {
        "subcategory": "Entradas_Para Compartilhar",
        "code": "ENT-010",
        "name": "Trio de Bruschettas",
        "description": "Tomate e manjericão, cogumelos trufados e gorgonzola com mel. Servido em pão focaccia.",
        "price": 52.00,
        "photo_url": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800"
    },
    {
        "subcategory": "Entradas_Para Compartilhar",
        "code": "ENT-011",
        "name": "Fondue de Queijo",
        "description": "Fondue cremoso de gruyère e emmental com pães, legumes e embutidos para mergulhar.",
        "price": 98.00,
        "photo_url": "https://images.unsplash.com/photo-1530554764233-e79e16c91d08?w=800"
    },
    {
        "subcategory": "Entradas_Para Compartilhar",
        "code": "ENT-012",
        "name": "Nachos Supreme",
        "description": "Nachos crocantes com chili, queijo cheddar, guacamole, sour cream e jalapeños frescos.",
        "price": 68.00,
        "photo_url": "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800"
    },
])

# --- PRATOS PRINCIPAIS - CARNES ---
products.extend([
    {
        "subcategory": "Pratos Principais_Carnes",
        "code": "PRI-001",
        "name": "Filé Mignon ao Molho Madeira",
        "description": "Medalhão de filé mignon grelhado ao ponto com molho madeira e cogumelos paris.",
        "price": 98.00,
        "photo_url": "https://images.unsplash.com/photo-1558030006-450675393462?w=800"
    },
    {
        "subcategory": "Pratos Principais_Carnes",
        "code": "PRI-002",
        "name": "Picanha na Brasa",
        "description": "Picanha premium de 400g grelhada na brasa com farofa especial e vinagrete.",
        "price": 112.00,
        "photo_url": "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=800"
    },
    {
        "subcategory": "Pratos Principais_Carnes",
        "code": "PRI-003",
        "name": "Costela Desfiada",
        "description": "Este prato excepcional traz costela bovina desfiada lentamente por 12 horas em baixa temperatura, resultando em uma carne extremamente macia que desmancha na boca. Servida com purê de mandioquinha defumado artesanalmente e molho barbecue da casa feito com ingredientes secretos.",
        "price": 86.00,
        "photo_url": "https://images.unsplash.com/photo-1544025162-d76978fc7f48?w=800",
        "long_description": True  # Test case for long description
    },
    {
        "subcategory": "Pratos Principais_Carnes",
        "code": "PRI-004",
        "name": "Cordeiro Assado",
        "description": "Carré de cordeiro com crosta de ervas finas, risoto de hortelã e jus de cordeiro.",
        "price": 138.00,
        "photo_url": "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800"
    },
    {
        "subcategory": "Pratos Principais_Carnes",
        "code": "PRI-005",
        "name": "Bife de Chorizo",
        "description": "Corte argentino de 350g grelhado com chimichurri caseiro e batatas rústicas.",
        "price": 105.00,
        "photo_url": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800"
    },
    {
        "subcategory": "Pratos Principais_Carnes",
        "code": "PRI-006",
        "name": "Ossobuco alla Milanese",
        "description": "Ossobuco bovino braseado com gremolata, risoto açafrão e tutano gratinado.",
        "price": 94.00,
        "photo_url": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800"
    },
])

# --- PRATOS PRINCIPAIS - FRUTOS DO MAR ---
products.extend([
    {
        "subcategory": "Pratos Principais_Frutos do Mar",
        "code": "PRI-007",
        "name": "Salmão Grelhado",
        "description": "Filé de salmão norueguês grelhado com legumes na manteiga e molho de alcaparras.",
        "price": 88.00,
        "photo_url": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800"
    },
    {
        "subcategory": "Pratos Principais_Frutos do Mar",
        "code": "PRI-008",
        "name": "Camarão à Paulista",
        "description": "Camarões grandes empanados e fritos com arroz de brócolis e molho tártaro.",
        "price": 92.00,
        "photo_url": "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800"
    },
    {
        "subcategory": "Pratos Principais_Frutos do Mar",
        "code": "PRI-009",
        "name": "Moqueca de Peixe",
        "description": "Tradicional moqueca baiana com filé de robalo, dendê, leite de coco e pirão.",
        "price": 96.00,
        "photo_url": "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800"
    },
    {
        "subcategory": "Pratos Principais_Frutos do Mar",
        "code": "PRI-010",
        "name": "Lagosta Termidor",
        "description": "Meia lagosta gratinada com molho béchamel, queijo gruyère e champignon.",
        "price": 198.00,
        "photo_url": "https://images.unsplash.com/photo-1553247407-23251ce81f59?w=800"
    },
    {
        "subcategory": "Pratos Principais_Frutos do Mar",
        "code": "PRI-011",
        "name": "Risoto de Camarão",
        "description": "Risoto cremoso com camarões, tomate seco, rúcula e raspas de limão siciliano.",
        "price": 84.00,
        "photo_url": "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800"
    },
])

# --- PRATOS PRINCIPAIS - AVES ---
products.extend([
    {
        "subcategory": "Pratos Principais_Aves",
        "code": "PRI-012",
        "name": "Frango ao Curry",
        "description": "Peito de frango com molho curry cremoso, arroz basmati e naan artesanal.",
        "price": 62.00,
        "photo_url": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800"
    },
    {
        "subcategory": "Pratos Principais_Aves",
        "code": "PRI-013",
        "name": "Pato com Laranja",
        "description": "Magret de pato grelhado com redução de laranja, purê de cenoura e aspargos.",
        "price": 108.00,
        "photo_url": "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=800"
    },
    {
        "subcategory": "Pratos Principais_Aves",
        "code": "PRI-014",
        "name": "Galeto à Passarinho",
        "description": "Meio galeto crocante com polenta cremosa, couve refogada e vinagrete.",
        "price": 58.00,
        "photo_url": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800"
    },
    {
        "subcategory": "Pratos Principais_Aves",
        "code": "PRI-015",
        "name": "Supreme de Frango Recheado",
        "description": "Peito de frango recheado com queijo brie e tomate seco, gratin de batatas.",
        "price": 68.00,
        "photo_url": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800"
    },
])

# --- MASSAS TRADICIONAIS ---
products.extend([
    {
        "subcategory": "Massas_Tradicionais",
        "code": "MAS-001",
        "name": "Spaghetti Carbonara",
        "description": "Spaghetti al dente com gema de ovo, guanciale crocante, pecorino e pimenta preta.",
        "price": 56.00,
        "photo_url": "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800"
    },
    {
        "subcategory": "Massas_Tradicionais",
        "code": "MAS-002",
        "name": "Fettuccine Alfredo",
        "description": "Fettuccine fresco com molho cremoso de parmesão e noz-moscada ralada na hora.",
        "price": 52.00,
        "photo_url": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800"
    },
    {
        "subcategory": "Massas_Tradicionais",
        "code": "MAS-003",
        "name": "Lasanha Bolonhesa",
        "description": "Camadas de massa fresca, ragù bolognese, béchamel e queijo gratinado.",
        "price": 62.00,
        "photo_url": "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800"
    },
    {
        "subcategory": "Massas_Tradicionais",
        "code": "MAS-004",
        "name": "Penne Arrabbiata",
        "description": "Penne com molho de tomate picante, alho, pimenta calabresa e manjericão.",
        "price": 48.00,
        "photo_url": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800"
    },
    {
        "subcategory": "Massas_Tradicionais",
        "code": "MAS-005",
        "name": "Tagliatelle ao Ragù",
        "description": "Tagliatelle artesanal com ragù de carne suína e bovina cozido por 6 horas.",
        "price": 58.00,
        "photo_url": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800"
    },
])

# --- MASSAS ESPECIAIS ---
products.extend([
    {
        "subcategory": "Massas_Especiais",
        "code": "MAS-006",
        "name": "Ravioli de Lagosta",
        "description": "Ravioli recheado com lagosta e ricota, molho bisque de crustáceos e caviar.",
        "price": 128.00,
        "photo_url": "https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=800"
    },
    {
        "subcategory": "Massas_Especiais",
        "code": "MAS-007",
        "name": "Gnocchi de Batata Trufado",
        "description": "Gnocchi artesanal com creme de trufas negras, parmesão e lascas de trufa.",
        "price": 92.00,
        "photo_url": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800"
    },
    {
        "subcategory": "Massas_Especiais",
        "code": "MAS-008",
        "name": "Risoto de Funghi",
        "description": "Risoto cremoso com mix de cogumelos frescos e secos, finalizado com trufa.",
        "price": 78.00,
        "photo_url": "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800"
    },
    {
        "subcategory": "Massas_Especiais",
        "code": "MAS-009",
        "name": "Tortellini in Brodo",
        "description": "Tortellini recheado com carne em caldo de cappone aromático tradicional.",
        "price": 68.00,
        "photo_url": "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=800"
    },
])

# --- SOBREMESAS CLÁSSICOS ---
products.extend([
    {
        "subcategory": "Sobremesas_Clássicos",
        "code": "SOB-001",
        "name": "Tiramisù",
        "description": "Clássico italiano com camadas de biscoito, café espresso e creme mascarpone.",
        "price": 36.00,
        "photo_url": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800"
    },
    {
        "subcategory": "Sobremesas_Clássicos",
        "code": "SOB-002",
        "name": "Crème Brûlée",
        "description": "Creme de baunilha com casquinha de açúcar caramelizado na hora.",
        "price": 32.00,
        "photo_url": "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800"
    },
    {
        "subcategory": "Sobremesas_Clássicos",
        "code": "SOB-003",
        "name": "Petit Gâteau",
        "description": "Bolinho quente de chocolate com centro cremoso, sorvete de baunilha.",
        "price": 38.00,
        "photo_url": "https://images.unsplash.com/photo-1617195737496-bc30194e3a19?w=800"
    },
    {
        "subcategory": "Sobremesas_Clássicos",
        "code": "SOB-004",
        "name": "Cheesecake NY",
        "description": "Cheesecake cremoso estilo Nova York com calda de frutas vermelhas.",
        "price": 34.00,
        "photo_url": "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800"
    },
    {
        "subcategory": "Sobremesas_Clássicos",
        "code": "SOB-005",
        "name": "Torta de Limão Siciliano",
        "description": "Torta com creme de limão siciliano e merengue italiano maçaricado.",
        "price": 28.00,
        "photo_url": "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800",
        "is_promo": True,
        "original_price": 38.00  # Promotional price test
    },
])

# --- SOBREMESAS GELADOS ---
products.extend([
    {
        "subcategory": "Sobremesas_Gelados",
        "code": "SOB-006",
        "name": "Sorvete Artesanal (3 bolas)",
        "description": "Escolha 3 sabores: chocolate belga, pistache, frutas vermelhas, doce de leite.",
        "price": 26.00,
        "photo_url": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800"
    },
    {
        "subcategory": "Sobremesas_Gelados",
        "code": "SOB-007",
        "name": "Affogato",
        "description": "Sorvete de baunilha afogado em espresso quente com licor Amaretto.",
        "price": 28.00,
        "photo_url": "https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=800"
    },
    {
        "subcategory": "Sobremesas_Gelados",
        "code": "SOB-008",
        "name": "Banana Split",
        "description": "Bananas, sorvetes de chocolate, morango e baunilha com calda e chantilly.",
        "price": 32.00,
        "photo_url": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800"
    },
    {
        "subcategory": "Sobremesas_Gelados",
        "code": "SOB-009",
        "name": "Milkshake Premium",
        "description": "Milkshake cremoso nos sabores: Oreo, Nutella ou Ovomaltine com chantilly.",
        "price": 24.00,
        "photo_url": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800"
    },
])

# --- SOBREMESAS FRUTAS ---
products.extend([
    {
        "subcategory": "Sobremesas_Frutas",
        "code": "SOB-010",
        "name": "Salada de Frutas Premium",
        "description": "Mix de frutas frescas da estação com hortelã, mel e iogurte grego.",
        "price": 22.00,
        "photo_url": "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800"
    },
    {
        "subcategory": "Sobremesas_Frutas",
        "code": "SOB-011",
        "name": "Abacaxi Flambado",
        "description": "Fatias de abacaxi caramelizadas flambadas com rum e sorvete de coco.",
        "price": 34.00,
        "photo_url": "https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=800"
    },
    {
        "subcategory": "Sobremesas_Frutas",
        "code": "SOB-012",
        "name": "Morangos com Chocolate",
        "description": "Morangos frescos com fondue de chocolate belga meio amargo.",
        "price": 38.00,
        "photo_url": "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=800"
    },
])

# --- BEBIDAS REFRIGERANTES ---
products.extend([
    {
        "subcategory": "Bebidas_Refrigerantes",
        "code": "BEB-001",
        "name": "Coca-Cola",
        "description": "Lata 350ml. Servida bem gelada.",
        "price": 8.00,
        "photo_url": "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800"
    },
    {
        "subcategory": "Bebidas_Refrigerantes",
        "code": "BEB-002",
        "name": "Guaraná Antarctica",
        "description": "Lata 350ml. O refrigerante brasileiro mais amado.",
        "price": 7.00,
        "photo_url": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800"
    },
    {
        "subcategory": "Bebidas_Refrigerantes",
        "code": "BEB-003",
        "name": "Água Mineral",
        "description": "Garrafa 500ml. Com ou sem gás.",
        "price": 6.00,
        "photo_url": "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800"
    },
    {
        "subcategory": "Bebidas_Refrigerantes",
        "code": "BEB-004",
        "name": "Água Tônica",
        "description": "Schweppes 350ml. Perfeita para drinks ou solo.",
        "price": 9.00,
        "photo_url": "https://images.unsplash.com/photo-1558645836-e44122a743ee?w=800"
    },
])

# --- BEBIDAS SUCOS ---
products.extend([
    {
        "subcategory": "Bebidas_Sucos",
        "code": "BEB-005",
        "name": "Suco de Laranja Natural",
        "description": "Espremido na hora. 400ml de vitamina C pura.",
        "price": 14.00,
        "photo_url": "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800"
    },
    {
        "subcategory": "Bebidas_Sucos",
        "code": "BEB-006",
        "name": "Limonada Suíça",
        "description": "Limão siciliano batido com leite condensado e gelo. Refrescante e cremoso.",
        "price": 16.00,
        "photo_url": "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=800",
        "is_promo": True,
        "original_price": 22.00  # Promotional price test
    },
    {
        "subcategory": "Bebidas_Sucos",
        "code": "BEB-007",
        "name": "Suco Verde Detox",
        "description": "Couve, maçã verde, gengibre e hortelã. Energizante e saudável.",
        "price": 18.00,
        "photo_url": "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800"
    },
    {
        "subcategory": "Bebidas_Sucos",
        "code": "BEB-008",
        "name": "Açaí na Tigela",
        "description": "Açaí cremoso com granola, banana, morango e mel. 500ml de energia.",
        "price": 28.00,
        "photo_url": "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800"
    },
])

# --- BEBIDAS DRINKS ---
products.extend([
    {
        "subcategory": "Bebidas_Drinks",
        "code": "BEB-009",
        "name": "Caipirinha Tradicional",
        "description": "Cachaça artesanal, limão tahiti, açúcar e muito gelo. O clássico brasileiro.",
        "price": 28.00,
        "photo_url": "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800"
    },
    {
        "subcategory": "Bebidas_Drinks",
        "code": "BEB-010",
        "name": "Mojito Cubano",
        "description": "Rum branco, hortelã fresca, limão, açúcar demerara e água com gás.",
        "price": 32.00,
        "photo_url": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800"
    },
    {
        "subcategory": "Bebidas_Drinks",
        "code": "BEB-011",
        "name": "Negroni",
        "description": "Gin, Campari e vermute rosso. Intenso e sofisticado.",
        "price": 38.00,
        "photo_url": "https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=800"
    },
    {
        "subcategory": "Bebidas_Drinks",
        "code": "BEB-012",
        "name": "Aperol Spritz",
        "description": "Aperol, prosecco e água com gás. Refrescante e vibrante.",
        "price": 36.00,
        "photo_url": "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=800"
    },
    {
        "subcategory": "Bebidas_Drinks",
        "code": "BEB-013",
        "name": "Espresso Martini",
        "description": "Vodka, licor de café, espresso e açúcar. O wake-up cocktail.",
        "price": 34.00,
        "photo_url": "https://images.unsplash.com/photo-1545438102-799c3991ab33?w=800",
        "low_stock": True  # Test case for low stock
    },
])

# ============================================================
# WINES
# ============================================================
wines = [
    {
        "subcategory": "Vinhos_Tintos",
        "code": "VIN-001",
        "name": "Catena Zapata Malbec Argentino",
        "description": "Elegante e complexo com notas de frutas negras maduras, chocolate e especiarias. Taninos aveludados.",
        "price": 420.00,
        "photo_url": "https://images.vivino.com/thumbs/ApnHW-6J2a8ZK8j1T4xPq2_375x500.png",
        "is_wine": True,
        "wine_type": "Tinto",
        "grape": "Malbec",
        "vintage": "2019",
        "origin": "Argentina",
        "alcohol_content": "14.5%",
        "volume": "750ml",
        "pairing_notes": "Carnes vermelhas, cordeiro, queijos curados"
    },
    {
        "subcategory": "Vinhos_Tintos",
        "code": "VIN-002",
        "name": "Brunello di Montalcino DOCG",
        "description": "Potência e elegância italiana com aromas de cereja madura, couro e tabaco. Longa persistência extraordinária que permanece no paladar por minutos após cada gole, revelando camadas de complexidade.",
        "price": 580.00,
        "photo_url": "https://images.vivino.com/thumbs/lSFzPiMIiOPLo8sWIXUfHg_375x500.png",
        "is_wine": True,
        "wine_type": "Tinto",
        "grape": "Sangiovese",
        "vintage": "2017",
        "origin": "Itália",
        "alcohol_content": "14%",
        "volume": "750ml",
        "pairing_notes": "Ossobuco, carnes de caça, trufas",
        "long_description": True  # Test case for long description
    },
    {
        "subcategory": "Vinhos_Brancos",
        "code": "VIN-003",
        "name": "Cloudy Bay Sauvignon Blanc",
        "description": "Refrescante neozelandês com aromas cítricos, maracujá e notas herbáceas. Acidez vibrante.",
        "price": 320.00,
        "photo_url": "https://images.vivino.com/thumbs/Kf1ooTN5zC2jt4tOzDGkJQ_375x500.png",
        "is_wine": True,
        "wine_type": "Branco",
        "grape": "Sauvignon Blanc",
        "vintage": "2022",
        "origin": "Nova Zelândia",
        "alcohol_content": "13.5%",
        "volume": "750ml",
        "pairing_notes": "Frutos do mar, saladas, queijo de cabra"
    },
    {
        "subcategory": "Vinhos_Brancos",
        "code": "VIN-004",
        "name": "Chablis Premier Cru",
        "description": "Elegante borgonha branco com mineralidade, notas de frutas brancas e toque amanteigado.",
        "price": 450.00,
        "photo_url": "https://images.vivino.com/thumbs/L27ByymddWNt-3RdvP2u3w_375x500.png",
        "is_wine": True,
        "wine_type": "Branco",
        "grape": "Chardonnay",
        "vintage": "2021",
        "origin": "França",
        "alcohol_content": "13%",
        "volume": "750ml",
        "pairing_notes": "Ostras, peixes nobres, lagosta"
    },
    {
        "subcategory": "Vinhos_Espumantes",
        "code": "VIN-005",
        "name": "Veuve Clicquot Brut",
        "description": "Champagne clássico com borbulhas finas, notas de pêra, brioche e amêndoas torradas.",
        "price": 650.00,
        "photo_url": "https://images.vivino.com/thumbs/DUcFBxdUDN6lFhSP_kLsdo_375x500.png",
        "is_wine": True,
        "wine_type": "Espumante",
        "grape": "Blend Champagne",
        "vintage": "N/V",
        "origin": "França",
        "alcohol_content": "12%",
        "volume": "750ml",
        "pairing_notes": "Celebrações, canapés, ostras"
    },
]

# ============================================================
# INSERT ALL PRODUCTS
# ============================================================
print("Inserting products...")
count = 0
for idx, product in enumerate(products):
    item_id = gen_id()
    sub_key = product["subcategory"]
    sub_id = subcategories.get(sub_key)
    
    if not sub_id:
        print(f"Warning: Subcategory not found: {sub_key}")
        continue
    
    cursor.execute('''
        INSERT INTO items (id, restaurant_id, subcategory_id, code, name, short_description, photo_url, price, is_active, sort_order, is_wine)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        item_id, restaurant_id, sub_id, product["code"], product["name"],
        product["description"], product["photo_url"], product["price"],
        True, idx, False
    ))
    count += 1

print(f"Inserted {count} products")

# Insert wines
print("Inserting wines...")
wine_count = 0
for idx, wine in enumerate(wines):
    item_id = gen_id()
    sub_key = wine["subcategory"]
    sub_id = subcategories.get(sub_key)
    
    if not sub_id:
        print(f"Warning: Subcategory not found: {sub_key}")
        continue
    
    cursor.execute('''
        INSERT INTO items (id, restaurant_id, subcategory_id, code, name, short_description, photo_url, price, is_active, sort_order, is_wine, wine_type, grape, vintage, origin, alcohol_content, volume, pairing_notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        item_id, restaurant_id, sub_id, wine["code"], wine["name"],
        wine["description"], wine["photo_url"], wine["price"],
        True, idx, True, wine["wine_type"], wine["grape"], wine["vintage"],
        wine["origin"], wine["alcohol_content"], wine["volume"], wine["pairing_notes"]
    ))
    wine_count += 1

print(f"Inserted {wine_count} wines")

conn.commit()
conn.close()

print("\n" + "="*60)
print("✅ MENUX DEMO DATABASE CREATED SUCCESSFULLY!")
print("="*60)
print(f"📁 Categories: {len(categories_data)}")
print(f"📂 Subcategories: {sum(len(v) for v in subcategories_data.values())}")
print(f"🍽️  Products: {count}")
print(f"🍷 Wines: {wine_count}")
print(f"📊 Total Items: {count + wine_count}")
print("="*60)
