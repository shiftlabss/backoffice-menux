from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel
from decimal import Decimal
from datetime import datetime
from app.db.session import get_db
from app.api import deps
from app.models.all_models import User, Order, OrderItem, Item
from app.schemas.all_schemas import OrderOut

router = APIRouter()

# --- Additional Schemas ---

class OrderItemCreate(BaseModel):
    item_id: UUID
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    notes: Optional[str] = None
    table_number: Optional[str] = None  # For future use

class OrderStatusUpdate(BaseModel):
    status: str  # initiated, preparing, ready, delivered, cancelled

# --- Endpoints ---

@router.get("/", response_model=List[OrderOut])
def read_orders(
    status: Optional[str] = Query(None, regex="^(all|initiated|preparing|ready|delivered|cancelled)$"),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Get all orders for the current restaurant with optional status filter."""
    query = db.query(Order).filter(Order.restaurant_id == current_user.restaurant_id)
    
    if status and status != "all":
        query = query.filter(Order.status == status)
    
    return query.order_by(Order.created_at.desc()).limit(limit).all()

@router.get("/{order_id}", response_model=OrderOut)
def read_order(
    order_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Get a specific order by ID."""
    order = db.query(Order).filter(
        Order.id == str(order_id),
        Order.restaurant_id == current_user.restaurant_id
    ).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.post("/", response_model=OrderOut, status_code=status.HTTP_201_CREATED)
def create_order(
    order_in: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Create a new order."""
    if not order_in.items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order must have at least one item"
        )
    
    # Calculate total and validate items
    total_value = Decimal("0.00")
    order_items_data = []
    
    for item_data in order_in.items:
        item = db.query(Item).filter(
            Item.id == str(item_data.item_id),
            Item.restaurant_id == current_user.restaurant_id,
            Item.is_active == True
        ).first()
        
        if not item:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Item {item_data.item_id} not found or not active"
            )
        
        item_total = item.price * item_data.quantity
        total_value += item_total
        
        order_items_data.append({
            "item_id": str(item.id),
            "item_code": item.code,
            "item_name": item.name,
            "quantity": item_data.quantity,
            "unit_price": item.price
        })
    
    # Create order
    order = Order(
        restaurant_id=current_user.restaurant_id,
        total_value=total_value,
        status="initiated",
        notes=order_in.notes
    )
    db.add(order)
    db.flush()  # Get the order ID
    
    # Create order items
    for item_data in order_items_data:
        order_item = OrderItem(
            order_id=order.id,
            **item_data
        )
        db.add(order_item)
    
    db.commit()
    db.refresh(order)
    return order

@router.put("/{order_id}/status", response_model=OrderOut)
def update_order_status(
    order_id: UUID,
    status_update: OrderStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Update the status of an order."""
    valid_statuses = ["initiated", "preparing", "ready", "delivered", "cancelled"]
    
    if status_update.status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
        )
    
    order = db.query(Order).filter(
        Order.id == str(order_id),
        Order.restaurant_id == current_user.restaurant_id
    ).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Update status
    order.status = status_update.status
    
    # If finalized (delivered), calculate decision time
    if status_update.status == "delivered" and order.created_at:
        delta = datetime.utcnow() - order.created_at.replace(tzinfo=None)
        order.decision_time_seconds = int(delta.total_seconds())
    
    db.commit()
    db.refresh(order)
    return order

@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def cancel_order(
    order_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Cancel an order (soft delete by setting status to cancelled)."""
    order = db.query(Order).filter(
        Order.id == str(order_id),
        Order.restaurant_id == current_user.restaurant_id
    ).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.status == "delivered":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot cancel a delivered order"
        )
    
    order.status = "cancelled"
    db.commit()
    return None
