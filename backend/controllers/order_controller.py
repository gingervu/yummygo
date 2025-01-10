from flask import Blueprint, render_template, request, redirect, url_for
from models import Order
from app import db

order_bp = Blueprint('order', __name__)

@order_bp.route('/orders')
def orders():
    # Hiển thị tất cả các đơn hàng
    orders = Order.query.all()
    return render_template('orders/orders.html', orders=orders)

@order_bp.route('/order/create', methods=['GET', 'POST'])
def create_order():
    if request.method == 'POST':
        # Logic tạo đơn hàng mới
        new_order = Order(customer_id=1, menu_item_id=request.form['menu_item_id'])
        db.session.add(new_order)
        db.session.commit()
        return redirect(url_for('order.orders'))
    return render_template('orders/create_order.html')
