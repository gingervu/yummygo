from models.models import Restaurant

def create_restaurant(db, name, address, coord, phone, opening_time, closing_time, food_fee, delivery_fee):
    restaurant = Restaurant(name=name, address=address, coord=coord, phone=phone, opening_time=opening_time, closing_time=closing_time, food_fee=food_fee, delivery_fee=delivery_fee)
    db.add(restaurant)
    db.commit()
    db.refresh(restaurant)
    return restaurant

def get_restaurant_by_id(db, restaurant_id):
    return db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id).first()