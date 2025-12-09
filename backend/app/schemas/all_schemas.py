from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from decimal import Decimal

# Helper for reordering
class ReorderRequest(BaseModel):
    ids: List[UUID]

# Auth
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class PasswordResetRequest(BaseModel):
    email: EmailStr

# User
class UserBase(BaseModel):
    email: EmailStr
    role: str

class UserCreate(UserBase):
    password: str
    restaurant_id: UUID

class UserUpdate(BaseModel):
    role: Optional[str] = None
    password: Optional[str] = None

class UserOut(UserBase):
    id: UUID
    restaurant_id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True

# Restaurant
class RestaurantBase(BaseModel):
    name: str
    logo_url: Optional[str] = None
    open_hours: Optional[str] = None

class RestaurantUpdate(RestaurantBase):
    pass

class RestaurantOut(RestaurantBase):
    id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True

# Category (Replacing ItemGroup)
class CategoryBase(BaseModel):
    name: str
    sort_order: int = 0

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass

class CategoryOut(CategoryBase):
    id: UUID
    restaurant_id: UUID
    
    class Config:
        from_attributes = True

# SubCategory
class SubCategoryBase(BaseModel):
    name: str
    sort_order: int = 0
    category_id: UUID

class SubCategoryCreate(SubCategoryBase):
    pass

class SubCategoryUpdate(SubCategoryBase):
    name: Optional[str] = None
    sort_order: Optional[int] = None
    category_id: Optional[UUID] = None

class SubCategoryOut(SubCategoryBase):
    id: UUID
    
    class Config:
        from_attributes = True

# Item
class ItemBase(BaseModel):
    code: str
    name: str
    short_description: Optional[str] = None
    photo_url: Optional[str] = None
    price: Decimal = Field(..., gt=0)
    is_active: bool = True
    sort_order: int = 0
    subcategory_id: UUID

    # Wine Fields
    is_wine: bool = False
    wine_type: Optional[str] = None
    grape: Optional[str] = None
    vintage: Optional[str] = None
    origin: Optional[str] = None
    alcohol_content: Optional[str] = None
    volume: Optional[str] = None
    pairing_notes: Optional[str] = None

    # Sensory Profile
    sensory_intensity: Optional[int] = 50
    sensory_softness: Optional[int] = 50
    sensory_smoothness: Optional[int] = 50
    sensory_sweetness: Optional[int] = 50
    aroma_notes: Optional[List[str]] = None

class ItemCreate(ItemBase):
    pass

class ItemUpdate(BaseModel):
    code: Optional[str] = None
    name: Optional[str] = None
    short_description: Optional[str] = None
    photo_url: Optional[str] = None
    price: Optional[Decimal] = Field(None, gt=0)
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None
    subcategory_id: Optional[UUID] = None
    
    # Wine Fields
    is_wine: Optional[bool] = None
    wine_type: Optional[str] = None
    grape: Optional[str] = None
    vintage: Optional[str] = None
    origin: Optional[str] = None
    alcohol_content: Optional[str] = None
    volume: Optional[str] = None
    pairing_notes: Optional[str] = None

    # Sensory Profile
    sensory_intensity: Optional[int] = None
    sensory_softness: Optional[int] = None
    sensory_smoothness: Optional[int] = None
    sensory_sweetness: Optional[int] = None
    aroma_notes: Optional[List[str]] = None

class ItemOut(ItemBase):
    id: UUID
    restaurant_id: UUID
    
    class Config:
        from_attributes = True

# --- Nested Schemas for Full Menu ---
class SubCategoryFull(SubCategoryOut):
    items: List[ItemOut] = []

class CategoryFull(CategoryOut):
    subcategories: List[SubCategoryFull] = []

# Order
class OrderItemOut(BaseModel):
    item_code: Optional[str]
    item_name: Optional[str]
    quantity: int
    unit_price: Decimal

    class Config:
        from_attributes = True

class OrderOut(BaseModel):
    id: UUID
    total_value: Decimal
    table_number: Optional[str] = None
    customer_name: Optional[str] = None
    decision_time_seconds: Optional[int]
    notes: Optional[str]
    status: str
    created_at: datetime
    items: List[OrderItemOut] = []

    class Config:
        from_attributes = True

# Dashboard
class DashboardMetrics(BaseModel):
    orders_initiated: int
    orders_finalized: int
    average_ticket: Decimal
    avg_decision_time: int # seconds
