import requests
from models.schemas import ObjectUpdateAddress, AddressSuggestion
from sqlalchemy.orm import Session
from models.models import *
from models.schemas import *
from fastapi import HTTPException, status

class NominatimService:
    BASE_URL = "https://nominatim.openstreetmap.org/search"
    USER_AGENT = "YummyGo/1.0 (vuhuyebtram872@gmail.com)"  # Thay bằng thông tin của bạn

    @staticmethod
    def search(query: str, format: str = "json", limit: int = 5):
        headers = {
            "User-Agent": NominatimService.USER_AGENT
        }
        params = {
            "q": query,
            "format": format,
            "addressdetails": 1,
            "limit": limit,
        }
        try:
            response = requests.get(NominatimService.BASE_URL, params=params, headers=headers, timeout=5)
            response.raise_for_status()
            data = response.json()

            # Trích xuất tên địa chỉ và tọa độ
            results = [
                {
                    "address": item.get("display_name"),
                    "latitude": item.get("lat"),
                    "longitude": item.get("lon"),
                }
                for item in data
            ]
            return results

        except requests.RequestException as e:
            print(f"Error while fetching data: {e}")
            return []


def address_suggestion(address: str):
    results = NominatimService.search(address)
    suggestions = []
    if results:
        for result in results:
            suggestions.append(AddressSuggestion(
                address=result['address'],
                x=result['latitude'],
                y=result['longitude']
            ))
    return suggestions


def restaurant_set_address(address_choice: AddressSuggestion, restaurant_id: int,  db: Session):
    db_restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id,
                                                Restaurant.is_deleted == False).first()
    
    if not db_restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not exist")

    db_restaurant.address = address_choice.address
    db_restaurant.x = address_choice.x
    db_restaurant.y = address_choice.y
    
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant
    
def order_set_address(address_choice: AddressSuggestion, order_id: int, db: Session):
    db_order = db.query(Order).filter(Order.order_id == order_id).first()
    
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not exist")

    db_order.address = address_choice.address
    db_order.x = address_choice.x
    db_order.y = address_choice.y
    
    db_restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == db_order.restaurant_id,
                                                Restaurant.is_deleted == False).first()
    origin, destination = (db_restaurant.x, db_restaurant.y), (db_order.x, db_order.y)
    distance = calculate_osrm_distance(origin, destination)
    db_order.distance = distance
    db_order.delivery_fee = get_delivery_fee(distance)
    db.commit()
    db.refresh(db_order)
    return db_order

def get_delivery_fee(distance: float):
    if distance < 2:
        return 14000
    return 14000 + 4000 * (distance - 2)


OSRM_URL = "http://router.project-osrm.org/route/v1/driving"

def calculate_osrm_distance(origin, destination):
    """
    Tính khoảng cách và thời gian thực tế giữa hai tọa độ dùng OSRM API
    :param origin: tuple (lat, lon) của điểm xuất phát
    :param destination: tuple (lat, lon) của điểm đến
    :return: khoảng cách (km), thời gian (phút)
    """
    # Định dạng tọa độ thành chuỗi "lon,lat"
    origin_str = f"{origin[1]},{origin[0]}"
    destination_str = f"{destination[1]},{destination[0]}"
    
    # Gửi yêu cầu đến OSRM API
    url = f"http://router.project-osrm.org/route/v1/driving/{origin_str};{destination_str}?overview=false"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        if "routes" in data and data["routes"]:
            distance_km = round(data["routes"][0]["distance"] / 1000, 1) 
            # duration_min = round(data["routes"][0]["duration"] / 60) 
            return distance_km
        else:
            raise ValueError("Không có kết quả từ OSRM.")
    else:
        raise ValueError(f"Lỗi từ OSRM API: {response.status_code}")