from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List
from uuid import UUID
from app.db.session import get_db
from app.api import deps
from app.models.all_models import User, Category, SubCategory, Item
from app.schemas.all_schemas import (
    CategoryOut, CategoryCreate, CategoryUpdate, CategoryFull,
    SubCategoryOut, SubCategoryCreate, SubCategoryUpdate,
    ItemOut, ItemCreate, ItemUpdate,
    ReorderRequest
)

router = APIRouter()

# --- Full Menu Hierarchy ---

@router.get("/full", response_model=List[CategoryFull])
def read_full_menu(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """
    Returns the complete menu hierarchy: Categories -> SubCategories -> Items.
    Useful for rendering the entire menu structure on the frontend.
    """
    categories = (
        db.query(Category)
        .filter(Category.restaurant_id == current_user.restaurant_id)
        .order_by(Category.sort_order)
        .options(
            joinedload(Category.subcategories)
            .joinedload(SubCategory.items)
        )
        .all()
    )
    return categories

# --- Categories ---

@router.get("/categories", response_model=List[CategoryOut])
def read_categories(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    return db.query(Category).filter(Category.restaurant_id == current_user.restaurant_id).order_by(Category.sort_order).all()

@router.post("/categories", response_model=CategoryOut)
def create_category(
    category_in: CategoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    category = Category(**category_in.dict(), restaurant_id=current_user.restaurant_id)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

@router.put("/categories/{category_id}", response_model=CategoryOut)
def update_category(
    category_id: UUID,
    category_in: CategoryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    category = db.query(Category).filter(Category.id == category_id, Category.restaurant_id == current_user.restaurant_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    for key, value in category_in.dict(exclude_unset=True).items():
        setattr(category, key, value)
    
    db.commit()
    db.refresh(category)
    return category

@router.delete("/categories/{category_id}")
def delete_category(
    category_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    category = db.query(Category).filter(Category.id == category_id, Category.restaurant_id == current_user.restaurant_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # Check if category has subcategories
    if category.subcategories:
        raise HTTPException(status_code=400, detail="Cannot delete category with subcategories. Remove them first.")
        
    db.delete(category)
    db.commit()
    return {"message": "Category deleted successfully"}

@router.post("/categories/reorder")
def reorder_categories(
    payload: ReorderRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """
    Updates the sort_order of categories based on the list of IDs provided.
    The order in the list determines the new sort_order (0-indexed).
    """
    for index, cat_id in enumerate(payload.ids):
        category = db.query(Category).filter(
            Category.id == cat_id,
            Category.restaurant_id == current_user.restaurant_id
        ).first()
        if category:
            category.sort_order = index
    
    db.commit()
    return {"message": "Categories reordered successfully"}

# --- SubCategories ---

@router.get("/categories/{category_id}/subcategories", response_model=List[SubCategoryOut])
def read_subcategories(
    category_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    # Verify category belongs to user
    category = db.query(Category).filter(Category.id == category_id, Category.restaurant_id == current_user.restaurant_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    return db.query(SubCategory).filter(SubCategory.category_id == category_id).order_by(SubCategory.sort_order).all()

@router.post("/subcategories", response_model=SubCategoryOut)
def create_subcategory(
    subcategory_in: SubCategoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    # Verify category exists and belongs to user
    # Convert UUID to string for SQLite compatibility
    category_id_str = str(subcategory_in.category_id)
    category = db.query(Category).filter(
        Category.id == category_id_str, 
        Category.restaurant_id == current_user.restaurant_id
    ).first()
    if not category:
        raise HTTPException(status_code=404, detail="Parent category not found")

    # Create subcategory with string category_id
    subcategory_data = subcategory_in.dict()
    subcategory_data['category_id'] = category_id_str
    subcategory = SubCategory(**subcategory_data)
    db.add(subcategory)
    db.commit()
    db.refresh(subcategory)
    return subcategory

@router.put("/subcategories/{subcategory_id}", response_model=SubCategoryOut)
def update_subcategory(
    subcategory_id: UUID,
    subcategory_in: SubCategoryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    # Join with Category to verify ownership
    subcategory = (
        db.query(SubCategory)
        .join(Category)
        .filter(SubCategory.id == subcategory_id, Category.restaurant_id == current_user.restaurant_id)
        .first()
    )
    if not subcategory:
        raise HTTPException(status_code=404, detail="Subcategory not found")
    
    for key, value in subcategory_in.dict(exclude_unset=True).items():
        setattr(subcategory, key, value)
    
    db.commit()
    db.refresh(subcategory)
    return subcategory

@router.delete("/subcategories/{subcategory_id}")
def delete_subcategory(
    subcategory_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    subcategory = (
        db.query(SubCategory)
        .join(Category)
        .filter(SubCategory.id == subcategory_id, Category.restaurant_id == current_user.restaurant_id)
        .first()
    )
    if not subcategory:
        raise HTTPException(status_code=404, detail="Subcategory not found")
    
    if subcategory.items:
        raise HTTPException(status_code=400, detail="Cannot delete subcategory with items. Please remove or move items first.")
    
    db.delete(subcategory)
    db.commit()
    return {"message": "Subcategory deleted successfully"}

@router.post("/subcategories/reorder")
def reorder_subcategories(
    payload: ReorderRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """
    Updates the sort_order of subcategories based on the list of IDs provided.
    """
    for index, sub_id in enumerate(payload.ids):
        subcategory = (
            db.query(SubCategory)
            .join(Category)
            .filter(SubCategory.id == sub_id, Category.restaurant_id == current_user.restaurant_id)
            .first()
        )
        if subcategory:
            subcategory.sort_order = index
    
    db.commit()
    return {"message": "Subcategories reordered successfully"}

# --- Items ---

@router.get("/items", response_model=List[ItemOut])
def read_items(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    return db.query(Item).filter(Item.restaurant_id == current_user.restaurant_id).order_by(Item.sort_order).all()

@router.get("/wines", response_model=List[ItemOut])
def read_wines(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """
    Returns only items marked as wines (is_wine=True).
    """
    return db.query(Item).filter(
        Item.restaurant_id == current_user.restaurant_id,
        Item.is_wine == True
    ).order_by(Item.sort_order).all()

@router.post("/items", response_model=ItemOut)
def create_item(
    item_in: ItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    # Verify subcategory exists and belongs to user (via category)
    subcategory = (
        db.query(SubCategory)
        .join(Category)
        .filter(SubCategory.id == item_in.subcategory_id, Category.restaurant_id == current_user.restaurant_id)
        .first()
    )
    if not subcategory:
        raise HTTPException(status_code=404, detail="Subcategory not found")

    # Validate unique code within subcategory
    existing = db.query(Item).filter(
        Item.code == item_in.code, 
        Item.subcategory_id == item_in.subcategory_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail={"error": "ITEM_CODE_ALREADY_EXISTS", "message": "Já existe um item com este código nesta subcategoria."})

    item = Item(**item_in.dict(), restaurant_id=current_user.restaurant_id)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/items/{item_id}", response_model=ItemOut)
def update_item(
    item_id: UUID,
    item_in: ItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    item = db.query(Item).filter(Item.id == item_id, Item.restaurant_id == current_user.restaurant_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # If code is changing, check uniqueness
    if item_in.code and item_in.code != item.code:
        # Determine target subcategory (if changing)
        target_sub_id = item_in.subcategory_id if item_in.subcategory_id else item.subcategory_id
        
        existing = db.query(Item).filter(
            Item.code == item_in.code, 
            Item.subcategory_id == target_sub_id
        ).first()
        if existing:
             raise HTTPException(status_code=400, detail={"error": "ITEM_CODE_ALREADY_EXISTS", "message": "Já existe um item com este código nesta subcategoria."})

    for key, value in item_in.dict(exclude_unset=True).items():
        setattr(item, key, value)
    
    db.commit()
    db.refresh(item)
    return item

@router.delete("/items/{item_id}")
def delete_item(
    item_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    item = db.query(Item).filter(Item.id == item_id, Item.restaurant_id == current_user.restaurant_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db.delete(item)
    db.commit()
    return {"message": "Item deleted successfully"}
