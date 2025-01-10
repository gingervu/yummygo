from flask import Blueprint, render_template, request, redirect, url_for
from models import Restaurant
from app import db

restaurant_bp = Blueprint('restaurant', __name__)

@restaurant_bp.route('/restaurant/info')
def restaurant_info():
    # Hiển thị thông tin nhà hàng
    restaurant = Restaurant.query.first()
    return render_template('restaurant/info.html', restaurant=restaurant)

@restaurant_bp.route('/restaurant/update_info', methods=['GET', 'POST'])
def update_info():
    if request.method == 'POST':
        # Cập nhật thông tin nhà hàng
        restaurant = Restaurant.query.first()
        restaurant.name = request.form['name']
        restaurant.location = request.form['location']
        db.session.commit()
        return redirect(url_for('restaurant.restaurant_info'))
    return render_template('restaurant/update_info.html')
