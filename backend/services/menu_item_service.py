from sqlalchemy.orm import Session
from typing import List
from models.models import *
from models.schemas import *
from models.enums import *
from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

# tạo món mới
def create_menu_item(menu_item: MenuItemCreate, restaurant_id: int,db: Session) -> MenuItem:
    """
    Tạo một menu item mới.
    """
    # Kiểm tra nếu nhà hàng có trong cơ sở dữ liệu
    restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id,
                                             Restaurant.is_deleted == False).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Nhà hàng không tồn tại")

    # Tạo mới menu item
    new_menu_item = MenuItem (
        restaurant_id = restaurant_id,
        name = menu_item.name,
        img_url = menu_item.img_url,
        description = menu_item.description,
        price = menu_item.price        
    )
    db.add(new_menu_item)
    db.commit()
    db.refresh(new_menu_item)
    return new_menu_item

# lấy ra danh sách món của nhà hàng ---> cho nhà hàng xem
def list_menu_items(restaurant_id: int, db: Session) -> List[MenuItem]:
    """
    Lấy danh sách tất cả món chưa bị xóa của nhà hàng .
    """
    return db.query(MenuItem).filter(MenuItem.restaurant_id == restaurant_id, MenuItem.is_deleted == False).all()

# lấy ra danh sách món status=available theo nhà hàng ---> khách hàng xem
def available_items(restaurant_id: int, db: Session) -> List[MenuItem]:
    return db.query(MenuItem).filter(MenuItem.restaurant_id == restaurant_id,
                                     MenuItem.status == ItemStatusEnum.available,
                                     MenuItem.is_deleted == False).all()


def get_menu_item(item_id: int, db: Session) -> MenuItem:
    """
    Lấy thông tin chi tiết của một menu item theo ID.
    """
    menu_item = db.query(MenuItem).filter(MenuItem.item_id == item_id,
                                          MenuItem.is_deleted == False).first()
    if not menu_item:
        raise HTTPException(status_code=404, detail="Món ăn không tồn tại")
    return menu_item


def update_menu_item(item_id: int, menu_item: MenuItemUpdate, db: Session) -> MenuItem:
    """
    Cập nhật thông tin của một menu item.
    """
    db_menu_item = db.query(MenuItem).filter(MenuItem.item_id == item_id,
                                             MenuItem.is_deleted == False).first()
    if not db_menu_item:
        raise HTTPException(status_code=404, detail="Món ăn không tồn tại")
    
    # Cập nhật thông tin
    for key, value in menu_item.model_dump().items():
        setattr(db_menu_item, key, value)

    db.commit()
    db.refresh(db_menu_item)
    return db_menu_item



def delete_menu_item(item_id: int, restaurant_id: int, db: Session):
    """
    Xóa mềm (soft delete) một menu item.
    """
    # Kiểm tra nhà hàng tồn tại
    db_restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id).first()
    if not db_restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    # Kiểm tra món ăn tồn tại
    db_menu_item = db.query(MenuItem).filter(MenuItem.item_id == item_id).first()
    if not db_menu_item:
        raise HTTPException(status_code=404, detail="Menu item not found")

    # Soft delete món ăn (cập nhật `is_deleted` thành True)
    db_menu_item.is_deleted = True
    
    # Lấy các đơn hàng đang trong trạng thái cart
    db_orders = db.query(Order).filter(Order.order_status == OrderStatusEnum.cart).all()

    if db_orders:
        # Lọc các order_items có item_id này trong các đơn hàng đang có trong giỏ hàng
        order_ids = [order.order_id for order in db_orders]
        order_items_to_delete = db.query(OrderItem).filter(OrderItem.item_id == item_id,
                                                             OrderItem.order_id.in_(order_ids))
        
        # Nếu tìm thấy order items, xóa chúng
        if order_items_to_delete.count() > 0:
            order_items_to_delete.delete(synchronize_session=False)
        
        for order in db_orders:
            # Kiểm tra xem đơn hàng có còn items trong giỏ hàng không
            remaining_items = db.query(OrderItem).filter(OrderItem.order_id == order.order_id).all()
            if not remaining_items:
                # Nếu không còn order_items, xóa đơn hàng
                db.query(Order).filter(Order.order_id == order.order_id).delete(synchronize_session=False)

    # Commit các thay đổi vào database
    try:
        db.commit()
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error during commit")
    
    return {"detail": "Món ăn đã bị xóa"}

