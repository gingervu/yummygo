from models.models import Order

def create_order(db, customer_id, restaurant_id, address, coord, delivery_fee, food_fee, order_status, created_at, delivered_at, note):
    order = Order(customer_id=customer_id, restaurant_id=restaurant_id, address=address, coord=coord, delivery_fee=delivery_fee, food_fee=food_fee, order_status=order_status, created_at=created_at, delivered_at=delivered_at, note=note)
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

def get_order_by_id(db, order_id):
    return db.query(Order).filter(Order.order_id == order_id).first()