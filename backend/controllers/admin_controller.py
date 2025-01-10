from flask import Blueprint, render_template, request, redirect, url_for
from models import Admin, Order
from app import db

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin/dashboard')
def dashboard():
    # Logic để hiển thị dashboard của admin
    orders = Order.query.all()
    return render_template('admin/dashboard.html', orders=orders)

@admin_bp.route('/admin/manage_orders')
def manage_orders():
    # Logic để quản lý các đơn hàng
    orders = Order.query.all()
    return render_template('admin/manage_orders.html', orders=orders)

@admin_bp.route('/admin/add_admin', methods=['GET', 'POST'])
def add_admin():
    if request.method == 'POST':
        # Logic thêm admin mới
        new_admin = Admin(name=request.form['name'], email=request.form['email'])
        db.session.add(new_admin)
        db.session.commit()
        return redirect(url_for('admin.dashboard'))
    return render_template('admin/add_admin.html')
