from sqlalchemy import Column, String, Boolean, Integer, Numeric, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.db.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class Restaurant(Base):
    __tablename__ = "restaurants"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    logo_url = Column(String)
    open_hours = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    users = relationship("User", back_populates="restaurant")
    categories = relationship("Category", back_populates="restaurant")
    items = relationship("Item", back_populates="restaurant")
    orders = relationship("Order", back_populates="restaurant")

class User(Base):
    __tablename__ = "users"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    restaurant_id = Column(String(36), ForeignKey("restaurants.id"))
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, nullable=False) # admin, manager
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    restaurant = relationship("Restaurant", back_populates="users")

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    restaurant_id = Column(String(36), ForeignKey("restaurants.id"))
    name = Column(String, nullable=False)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    restaurant = relationship("Restaurant", back_populates="categories")
    subcategories = relationship("SubCategory", back_populates="category", cascade="all, delete-orphan")

class SubCategory(Base):
    __tablename__ = "subcategories"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    category_id = Column(String(36), ForeignKey("categories.id"))
    name = Column(String, nullable=False)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    category = relationship("Category", back_populates="subcategories")
    items = relationship("Item", back_populates="subcategory")

class Item(Base):
    __tablename__ = "items"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    restaurant_id = Column(String(36), ForeignKey("restaurants.id"))
    subcategory_id = Column(String(36), ForeignKey("subcategories.id")) # Changed from group_id
    code = Column(String, nullable=False)
    name = Column(String, nullable=False)
    short_description = Column(Text)
    photo_url = Column(String)
    price = Column(Numeric(10, 2), nullable=False)
    is_active = Column(Boolean, default=True)
    sort_order = Column(Integer, default=0)
    
    # Wine Specific Fields
    is_wine = Column(Boolean, default=False)
    wine_type = Column(String) # Tinto, Branco, Rose, Espumante
    grape = Column(String)
    vintage = Column(String) # Safra
    origin = Column(String) # Pais/Regiao
    alcohol_content = Column(String)
    volume = Column(String) # 750ml
    pairing_notes = Column(Text)
    
    # Sensory Profile
    sensory_intensity = Column(Integer, default=50) # 0-100: Leve - Intenso
    sensory_softness = Column(Integer, default=50)  # 0-100: Acido - Macio
    sensory_smoothness = Column(Integer, default=50) # 0-100: Tanico - Suave
    sensory_sweetness = Column(Integer, default=50) # 0-100: Seco - Doce
    aroma_notes = Column(JSON) # List of selected tags
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    restaurant = relationship("Restaurant", back_populates="items")
    subcategory = relationship("SubCategory", back_populates="items") # Changed from group

class Session(Base):
    __tablename__ = "sessions"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    restaurant_id = Column(String(36), ForeignKey("restaurants.id"))
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    expired_at = Column(DateTime(timezone=True))

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    restaurant_id = Column(String(36), ForeignKey("restaurants.id"))
    session_id = Column(String(36), ForeignKey("sessions.id"))
    total_value = Column(Numeric(10, 2), nullable=False)
    table_number = Column(String)
    customer_name = Column(String)
    decision_time_seconds = Column(Integer)
    notes = Column(Text)
    status = Column(String, default="initiated")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    restaurant = relationship("Restaurant", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    order_id = Column(String(36), ForeignKey("orders.id"))
    item_id = Column(String(36), ForeignKey("items.id"))
    item_code = Column(String)
    item_name = Column(String)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=False)

    order = relationship("Order", back_populates="items")

class ItemEvent(Base):
    __tablename__ = "item_events"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    restaurant_id = Column(String(36), ForeignKey("restaurants.id"))
    session_id = Column(String(36), ForeignKey("sessions.id"))
    item_id = Column(String(36), ForeignKey("items.id"))
    event_type = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
