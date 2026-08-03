from fastapi import HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import json

from app.core.redis import redis_client

class CartItemSchema(BaseModel):
    item_id: int
    name: str
    price: float
    quantity: int = 1
    image_url: Optional[str] = None
    restaurant_id: Optional[int] = None

class UpdateCartItemSchema(BaseModel):
    quantity: int

def get_cart(user_id: int) -> Dict[str, Any]:
    """Fetch cart items for the current user from Redis"""
    cart_data = redis_client.get(f"cart:{user_id}")
    items = json.loads(cart_data) if cart_data else []
    
    total_amount = sum(item["price"] * item["quantity"] for item in items)
    
    return {
        "status": "success",
        "items": items,
        "total_items": sum(item["quantity"] for item in items),
        "total_amount": total_amount
    }

def add_to_cart(user_id: int, item: CartItemSchema) -> Dict[str, Any]:
    """Add a new item or increment quantity if it already exists in the cart"""
    cart_data = redis_client.get(f"cart:{user_id}")
    items = json.loads(cart_data) if cart_data else []
    
    # Check if item from different restaurant is in cart
    if items and item.restaurant_id:
        existing_rest_id = items[0].get("restaurant_id")
        if existing_rest_id and existing_rest_id != item.restaurant_id:
            raise HTTPException(
                status_code=400, 
                detail="Cart contains items from another restaurant. Please clear your cart first."
            )
            
    # Check if item already exists
    item_found = False
    for existing_item in items:
        if existing_item["item_id"] == item.item_id:
            existing_item["quantity"] += item.quantity
            item_found = True
            break
            
    if not item_found:
        items.append(item.dict())
        
    redis_client.setex(f"cart:{user_id}", 86400, json.dumps(items))  # 24 hours TTL
    return get_cart(user_id)

def update_cart_item(user_id: int, item_id: int, data: UpdateCartItemSchema) -> Dict[str, Any]:
    """Update quantity of a cart item or remove it if quantity is <= 0"""
    cart_data = redis_client.get(f"cart:{user_id}")
    if not cart_data:
        raise HTTPException(status_code=404, detail="Cart is empty")
        
    items = json.loads(cart_data)
    
    if data.quantity <= 0:
        items = [i for i in items if i["item_id"] != item_id]
    else:
        for item in items:
            if item["item_id"] == item_id:
                item["quantity"] = data.quantity
                break
                
    redis_client.setex(f"cart:{user_id}", 86400, json.dumps(items))
    return get_cart(user_id)

def remove_from_cart(user_id: int, item_id: int) -> Dict[str, Any]:
    """Remove a specific item from cart"""
    cart_data = redis_client.get(f"cart:{user_id}")
    if not cart_data:
        raise HTTPException(status_code=404, detail="Cart is empty")
        
    items = json.loads(cart_data)
    items = [i for i in items if i["item_id"] != item_id]
    
    redis_client.setex(f"cart:{user_id}", 86400, json.dumps(items))
    return get_cart(user_id)

def clear_cart(user_id: int) -> Dict[str, Any]:
    """Clear all items from user cart"""
    redis_client.delete(f"cart:{user_id}")
    return {"status": "success", "message": "Cart cleared", "items": [], "total_items": 0, "total_amount": 0.0}