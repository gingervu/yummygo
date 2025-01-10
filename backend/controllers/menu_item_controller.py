from flask import Blueprint, render_template, request, redirect, url_for
from models import MenuItem
from app import db

menu_item_bp = Blueprint('menu_item', __name__)

@menu_item_bp.route('/menu')
def menu():
    # Hiển thị danh sách món ăn
    menu_items = MenuItem.query.all()
    return render_template('menu/menu.html', menu_items=menu_items)

@menu_item_bp.route('/menu/add', methods=['GET', 'POST'])
def add_menu_item():
    if request.method == 'POST':
        # Thêm món ăn mới
        new_item = MenuItem(name=request.form['name'], price=request.form['price'])
        db.session.add(new_item)
        db.session.commit()
        return redirect(url_for('menu_item.menu'))
    return render_template('menu/add_item.html')
