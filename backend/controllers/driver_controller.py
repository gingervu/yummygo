from flask import Blueprint, render_template, request, redirect, url_for
from models import Driver, Order
from app import db

driver_bp = Blueprint('driver', __name__)

@driver_bp.route('/driver/orders')
def orders():
    # Lấy các đơn hàng đang chờ tài xế giao
    orders = Order.query.filter_by(status='pending').all()
    return render_template('driver/orders.html', orders=orders)

@driver_bp.route('/driver/accept_order/<int:order_id>')
def accept_order(order_id):
    # Tài xế nhận đơn hàng
    order = Order.query.get(order_id)
    order.status = 'accepted'
    db.session.commit()
    return redirect(url_for('driver.orders'))
