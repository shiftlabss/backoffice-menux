from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, date
from app.db.session import get_db
from app.api import deps
from app.models.all_models import User, Order
from app.schemas.all_schemas import DashboardMetrics

router = APIRouter()

@router.get("/", response_model=DashboardMetrics)
def read_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    today = date.today()
    
    # Base query for today's orders
    base_query = db.query(Order).filter(
        Order.restaurant_id == current_user.restaurant_id,
        func.date(Order.created_at) == today
    )
    
    orders_initiated = base_query.filter(Order.status == 'initiated').count()
    orders_finalized = base_query.filter(Order.status == 'finalized').count()
    
    # Calculate average ticket and decision time for finalized orders
    finalized_stats = base_query.filter(Order.status == 'finalized').with_entities(
        func.avg(Order.total_value).label('avg_ticket'),
        func.avg(Order.decision_time_seconds).label('avg_time')
    ).first()
    
    avg_ticket = finalized_stats.avg_ticket or 0
    avg_time = finalized_stats.avg_time or 0
    
    return {
        "orders_initiated": orders_initiated,
        "orders_finalized": orders_finalized,
        "average_ticket": avg_ticket,
        "avg_decision_time": int(avg_time)
    }
