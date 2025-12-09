-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 4.1 restaurants
create table if not exists restaurants (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    logo_url text,
    open_hours text,
    created_at timestamp default now()
);

-- 4.2 users
create table if not exists users (
    id uuid primary key default gen_random_uuid(),
    restaurant_id uuid references restaurants(id),
    email text not null unique,
    password_hash text not null,
    role text not null check (role in ('admin', 'manager')),
    created_at timestamp default now()
);

-- 4.3 item_groups
create table if not exists item_groups (
    id uuid primary key default gen_random_uuid(),
    restaurant_id uuid references restaurants(id),
    name text not null,
    sort_order int default 0,
    created_at timestamp default now()
);

-- 4.4 items
create table if not exists items (
    id uuid primary key default gen_random_uuid(),
    restaurant_id uuid references restaurants(id),
    group_id uuid references item_groups(id),
    code text not null,
    name text not null,
    short_description text,
    photo_url text,
    price numeric(10,2) not null,
    is_active boolean default true,
    sort_order int default 0,
    created_at timestamp default now(),
    unique (restaurant_id, code)
);

-- 4.5 sessions
create table if not exists sessions (
    id uuid primary key default gen_random_uuid(),
    restaurant_id uuid references restaurants(id),
    started_at timestamp default now(),
    expired_at timestamp
);

-- 4.6 orders
create table if not exists orders (
    id uuid primary key default gen_random_uuid(),
    restaurant_id uuid references restaurants(id),
    session_id uuid references sessions(id),
    total_value numeric(10,2) not null,
    decision_time_seconds int,
    notes text,
    status text default 'initiated', -- initiated, finalized
    created_at timestamp default now()
);

-- 4.7 order_items
create table if not exists order_items (
    id uuid primary key default gen_random_uuid(),
    order_id uuid references orders(id),
    item_id uuid references items(id),
    item_code text,
    item_name text,
    quantity int not null,
    unit_price numeric(10,2) not null
);

-- 4.8 item_events
create table if not exists item_events (
    id uuid primary key default gen_random_uuid(),
    restaurant_id uuid references restaurants(id),
    session_id uuid references sessions(id),
    item_id uuid references items(id),
    event_type text not null, -- item_viewed, item_clicked, item_added_to_order
    created_at timestamp default now()
);

-- 4.9 supabase_log
create table if not exists supabase_log (
    id uuid primary key default gen_random_uuid(),
    restaurant_id uuid references restaurants(id),
    user_id uuid references users(id),
    tipo_acao text,
    descricao_curta text,
    payload_json jsonb,
    data_hora timestamp default now()
);
