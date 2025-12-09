from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.api import deps
from app.models.all_models import User
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta, timezone
import random
from uuid import uuid4

router = APIRouter()

# --- Schemas ---

class ForecastData(BaseModel):
    prediction_today: float
    confidence_pct: int
    projected_final: float
    vs_forecast_pct: int
    last_updated: datetime

class InsightData(BaseModel):
    id: str
    title: str
    description: str
    full_description: str
    data_period: str
    order_volume: int
    conversion_increase: int
    avg_ticket: float
    channel: str
    is_new: bool

class KPIData(BaseModel):
    ai_revenue: float
    ai_revenue_pct: int
    ai_orders: int
    conversion_rate: float
    previous_period_comparison: Dict[str, str]

class RecommendationItem(BaseModel):
    id: str
    title: str
    entity: str
    timestamp: datetime
    status: str
    type: str
    context: Optional[str] = None
    impact_estimate: Optional[str] = None

class SalesImpactData(BaseModel):
    period: str
    revenue_generated: float
    revenue_pct: int
    ticket_with_ai: float
    ticket_without_ai: float
    conversion_lift: float
    chart_data: List[Dict[str, Any]] = []

class ProductPerformance(BaseModel):
    id: str
    name: str
    category: str
    recommendations_count: int
    conversion_rate: float
    revenue_attributed: float

class AlertItem(BaseModel):
    id: str
    severity: str
    type: str
    description: str
    full_description: Optional[str] = None
    recommendation: Optional[str] = None
    created_at: datetime
    status: str
    time_to_resolve_avg: Optional[str] = "2h"

class AISettings(BaseModel):
    alert_sensitivity: str
    enabled_recommendations: Dict[str, bool]
    notification_channels: Dict[str, bool]
    whatsapp_number: Optional[str] = None

# --- Endpoints (ALL NOW REQUIRE AUTHENTICATION) ---

@router.get("/overview/forecast", response_model=ForecastData)
def get_forecast(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Get AI forecast for today's revenue."""
    return ForecastData(
        prediction_today=random.uniform(1500, 3000),
        confidence_pct=random.randint(85, 98),
        projected_final=random.uniform(3000, 4500),
        vs_forecast_pct=random.randint(5, 15),
        last_updated=datetime.now(timezone.utc)
    )

@router.get("/insight-of-the-day", response_model=InsightData)
def get_insight(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Get the AI-generated insight of the day."""
    return InsightData(
        id=str(uuid4()),
        title="Oportunidade em Bebidas Premium",
        description="Bebidas Premium têm alta conversão com Hambúrgueres em dias chuvosos.",
        full_description="Analisando o histórico dos últimos 6 meses, identificamos que em dias com precipitação acima de 5mm, a oferta de Bebidas Premium (vinhos, cervejas artesanais) junto com Hambúrgueres Artesanais tem uma aceitação 25% maior.",
        data_period="Últimos 6 meses",
        order_volume=142,
        conversion_increase=25,
        avg_ticket=85.50,
        channel="Salão e Delivery",
        is_new=True
    )

@router.get("/overview/kpis", response_model=KPIData)
def get_kpis(
    period: str = "7d",
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Get AI-related KPIs for the specified period."""
    return KPIData(
        ai_revenue=random.uniform(5000, 15000),
        ai_revenue_pct=random.randint(10, 30),
        ai_orders=random.randint(50, 200),
        conversion_rate=random.uniform(15, 25),
        previous_period_comparison={
            "ai_revenue": "+12% vs anterior",
            "ai_orders": "+8% vs anterior",
            "conversion_rate": "+2.5% vs anterior"
        }
    )

@router.get("/recommendations", response_model=List[RecommendationItem])
def get_recommendations(
    status: str = None,
    type: str = None,
    period: str = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Get AI-generated recommendations."""
    recs = []
    types = ["Upsell", "Cross-sell", "Estoque", "Preço"]
    statuses = ["Pendente", "Aplicada", "Ignorada"]
    entities = ["Coca Cola Zero", "Burger Clássico", "Batata Frita", "Suco de Laranja"]
    
    for _ in range(10):
        recs.append(RecommendationItem(
            id=str(uuid4()),
            title=f"Ajuste de {random.choice(types)}",
            entity=random.choice(entities),
            timestamp=datetime.now(timezone.utc) - timedelta(hours=random.randint(1, 48)),
            status=random.choice(statuses) if not status else status,
            type=random.choice(types),
            context="Alta demanda detectada",
            impact_estimate="+R$ 150,00/dia"
        ))
    return recs

@router.post("/recommendations/{id}/apply")
def apply_recommendation(
    id: str,
    current_user: User = Depends(deps.get_current_user)
):
    """Apply an AI recommendation."""
    return {"status": "success", "message": "Recomendação aplicada com sucesso."}

@router.post("/recommendations/{id}/ignore")
def ignore_recommendation(
    id: str,
    current_user: User = Depends(deps.get_current_user)
):
    """Ignore an AI recommendation."""
    return {"status": "success", "message": "Recomendação ignorada."}

@router.get("/impact", response_model=SalesImpactData)
def get_impact(
    period: str = "30d",
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Get AI sales impact data."""
    days = 30 if period == "30d" else 7
    chart = []
    for i in range(days):
        chart.append({
            "date": (datetime.now(timezone.utc) - timedelta(days=days-i)).strftime("%d/%m"),
            "value": random.randint(100, 500)
        })
        
    return SalesImpactData(
        period=period,
        revenue_generated=12500.00,
        revenue_pct=18,
        ticket_with_ai=92.00,
        ticket_without_ai=78.00,
        conversion_lift=4.5,
        chart_data=chart
    )

@router.get("/products", response_model=List[ProductPerformance])
def get_products_performance(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Get product performance data related to AI recommendations."""
    prods = []
    for i in range(5):
        prods.append(ProductPerformance(
            id=str(uuid4()),
            name=f"Produto Top {i+1}",
            category="Hambúrgueres",
            recommendations_count=random.randint(50, 200),
            conversion_rate=random.uniform(20, 40),
            revenue_attributed=random.uniform(1000, 5000)
        ))
    return prods

@router.get("/alerts", response_model=List[AlertItem])
def get_alerts(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Get AI-generated operational alerts."""
    alerts = []
    severities = ["Alta", "Média", "Baixa"]
    types = ["Estoque", "Operação", "Performance"]
    
    for i in range(4):
        alerts.append(AlertItem(
            id=str(uuid4()),
            severity=random.choice(severities),
            type=random.choice(types),
            description=f"Alerta de {random.choice(types)} detectado",
            full_description="Descrição detalhada do problema detectado pela IA...",
            recommendation="Verificar reposição imediata.",
            created_at=datetime.now(timezone.utc) - timedelta(minutes=random.randint(10, 300)),
            status="Aberto",
            time_to_resolve_avg="1h 30m"
        ))
    return alerts

@router.post("/alerts/{id}/resolve")
def resolve_alert(
    id: str,
    current_user: User = Depends(deps.get_current_user)
):
    """Resolve an AI alert."""
    return {"status": "success", "message": "Alerta marcado como resolvido."}

@router.get("/settings", response_model=AISettings)
def get_settings(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Get AI settings for the current restaurant."""
    return AISettings(
        alert_sensitivity="Média",
        enabled_recommendations={
            "upsell": True,
            "cross_sell": True,
            "pricing": False,
            "stock": True
        },
        notification_channels={
            "backoffice": True,
            "email": True,
            "whatsapp": False
        },
        whatsapp_number=""
    )

@router.put("/settings")
def update_settings(
    settings_data: AISettings,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Update AI settings for the current restaurant."""
    # In a real implementation, this would persist to the database
    return {"status": "success", "message": "Configurações salvas."}
