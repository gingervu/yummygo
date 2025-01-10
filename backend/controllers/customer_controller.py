from flask import Blueprint, render_template, request, redirect, url_for
from models import Customer, Order
from app import db

customer_bp = Blueprint('customer', __name__)

@customer_bp.route('/customer/profile')
def profile():
    # Hiển thị thông tin khách hàng
    customer = Customer.query.get(1)  # Lấy thông tin khách hàng
    return render_template('customer/profile.html', customer=customer)

@customer_bp.route('/customer/orders')
def orders():
    # Hiển thị danh sách đơn hàng của khách hàng
    orders = Order.query.filter_by(customer_id=1).all()
    return render_template('customer/orders.html', orders=orders)
